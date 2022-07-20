import { WhaleApiClient } from "@defichain/whale-api-client";
import {
  WhaleFeeRateProvider,
  WhalePrevoutProvider,
  WhaleWalletAccount,
} from "@defichain/whale-api-wallet";
import { Network } from "@defichain/jellyfish-network";
import { CustomMessage } from "./message";
import { CustomTXBuilder } from "../blockchain/customtransactionbuilder";
import { MessageCompressor } from "../utils/compressor";
import { MessageEncryptor } from "../utils/encryptor";
import { Version } from "./version";
import {
  isVersionMessage,
  WIZARD_TRANSACTION_CONFIG_PREFIX,
  WIZARD_TRANSACTION_VERSION_PREFIX,
} from "../utils/helpers";

interface DFITransaction {
  send: (message: CustomMessage) => void;
}

interface DecryptedConfig {
  blockTime: number;
  config: CustomMessage;
}

/**
 * The options that must be passed in order to create a transaction.
 */
interface TransactionConfig {
  client: WhaleApiClient;
  account: WhaleWalletAccount;
  network: Network;
  passphrase: string[];
}

/**
 * The transaction class that offers all methods to send a
 * transaction or to read the custom message from a transaction.
 */
class Transaction implements DFITransaction {
  private readonly client: WhaleApiClient;
  private readonly account: WhaleWalletAccount;
  private readonly network: Network;
  private readonly passphrase: string[];
  /**
   * The constructor takes the transaction configuration {@link TransactionConfig}.
   *
   * @param config The transaction configuration object
   */
  constructor(config: TransactionConfig) {
    this.client = config.client;
    this.account = config.account;
    this.network = config.network;
    this.passphrase = config.passphrase;
  }

  /**
   * Will compress, encrypt and send the given custom message.
   * @param message The {@link CustomMessage} or {@link Version} to send.
   * @returns the transaction id
   */
  async send(message: CustomMessage | Version): Promise<string> {
    return await this.sendCustomMessage(
      this.compressAndEncryptMessage(message),
      isVersionMessage(message)
        ? WIZARD_TRANSACTION_VERSION_PREFIX
        : WIZARD_TRANSACTION_CONFIG_PREFIX
    );
  }

  /**
   * Retrieves the last config for this bot. This could either be a {{@link CustomMessage}} or a {{@link Version}}.
   * @returns The latest transaction found for this address
   */
  /*
  async findLastBlockchainConfiguration(): Promise<DecryptedConfig | null> {
    const address = await this.account.getAddress();

    // read all transactions for the configured address and only keep VOUT transactions
    const myVoutTXs = (
      await this.client.address.listTransaction(address, 99999999)
    ).filter((tx) => tx.type === "vout");

    // loop over all VOUT transactions
    for (const transaction of myVoutTXs) {
      // read details of transaction
      const transactionVouts = await this.client.transactions.getVouts(transaction.txid)
      );
    }

    return null;
  }
  */

  /**
   * Takes the compressed and encrypted message from the transaction and returns the
   * decompressed and decrypted {@link CustomMessage}.
   *
   * @param message The message as extracted from the transaction.
   * @returns The custom message.
   */
  getCustomMessage(message: string): CustomMessage | Version {
    return this.decryptAndDecompressMessage(message);
  }

  /**
   * Takes the compressed and encrypted message as string and sends it.
   * @param message The message as prepared string to send.
   * @returns
   */
  private async sendCustomMessage(
    message: string,
    prefix?: string
  ): Promise<string> {
    const feeRateProvider = new WhaleFeeRateProvider(this.client);
    const prevoutProvider = new WhalePrevoutProvider(this.account, 200);
    const builder = new CustomTXBuilder(
      feeRateProvider,
      prevoutProvider,
      {
        get: () => this.account,
      },
      this.network
    );
    const txn = await builder.getCustomTx(
      message,
      await this.account.getScript(),
      prefix
    );
    const transaction = await builder.sendTransaction({
      txn,
      initialWaitTime: 2000,
      waitTime: 5000,
      retries: 3,
      client: this.client,
    }); //

    return transaction.txId;
  }

  /**
   * Takes the {@link CustomMessage} and compresses and encrypts it.
   *
   * @param message The {@link CustomMessage} to compress and encrypt
   * @returns the compressed and encrypted message as string
   */
  private compressAndEncryptMessage(message: CustomMessage | Version): string {
    // first we will compress the message
    const compressedData = MessageCompressor.compress(message);
    // now we will encrypt the message
    return MessageEncryptor.encrypt(compressedData, this.passphrase);
  }

  /**
   * Takes the compressed and encrypted string from the transaction and returns the {@link CustomMessage}.
   *
   * @param message The compressed and encrypted string from the transaction
   * @returns the uncompressed and decrypted {@link CustomMessage}
   */
  private decryptAndDecompressMessage(
    message: string
  ): CustomMessage | Version {
    // first we will decrypt the message
    const decryptedData = MessageEncryptor.decrypt(message, this.passphrase);
    // now we will decompress the message
    return MessageCompressor.decompress(decryptedData);
  }
}

export { Transaction, TransactionConfig, DecryptedConfig };
