import { WhaleApiClient } from "@defichain/whale-api-client";
import {
  WhaleFeeRateProvider,
  WhalePrevoutProvider,
  WhaleWalletAccount,
} from "@defichain/whale-api-wallet";
import {
  CTransactionSegWit,
  TransactionSegWit,
} from "@defichain/jellyfish-transaction";
import { Network } from "@defichain/jellyfish-network";
import { Prevout } from "@defichain/jellyfish-transaction-builder/dist/provider";
import { CustomMessage } from "./message";
import {
  CustomTransactionConfig,
  CustomTXBuilder,
} from "../blockchain/customtransactionbuilder";
import { MessageCompressor } from "../utils/compressor";
import { MessageEncryptor } from "../utils/encryptor";
import { Version } from "./version";
import {
  isVersionMessage,
  WIZARD_TRANSACTION_CONFIG_PREFIX,
  WIZARD_TRANSACTION_VERSION_PREFIX,
} from "../utils/helpers";

/**
 * The interface for the transaction, which defines the methods to be exposed.
 */
interface DFITransaction {
  send: (message: CustomMessage) => void;
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
  private readonly ctxBuilder: CustomTXBuilder;
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
    this.ctxBuilder = new CustomTXBuilder(
      new WhaleFeeRateProvider(this.client),
      new WhalePrevoutProvider(this.account, 200),
      {
        get: () => this.account,
      },
      this.network
    );
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
    const txn = await this.ctxBuilder.getCustomTx(
      message,
      await this.account.getScript(),
      prefix
    );
    const transaction = await this.ctxBuilder.sendTransaction({
      txn,
      initialWaitTime: 1000,
      waitTime: 5000,
      retries: 3,
      client: this.client,
    });

    return transaction.txId;
  }

  /**
   * Takes a transaction config and sends it directly.
   * @param config The custom transaction configuration containing the transaction to send
   * @returns
   */
  async sendTransaction(
    config: CustomTransactionConfig
  ): Promise<CTransactionSegWit> {
    const { txn, initialWaitTime, waitTime, retries, client } = config;
    const transaction = await this.ctxBuilder.sendTransaction({
      txn,
      initialWaitTime,
      waitTime,
      retries,
      client,
    });

    return transaction;
  }

  /**
   * Sends a transaction together with others in the same block
   * @param transactionToSend The transaction to be sent
   * @param prevout The list of prevouts
   * @returns The transaction id
   */
  async sendTransactionWithPrevout(
    transactionToSend: TransactionSegWit,
    prevout: Prevout | Prevout[] | undefined
  ): Promise<CTransactionSegWit> {
    const txn = await this.ctxBuilder.getPrevoutTx(transactionToSend, prevout);
    const transaction = this.ctxBuilder.sendTransaction({
      txn,
      initialWaitTime: 5000,
      waitTime: 5000,
      retries: 3,
      client: this.client,
    });

    return transaction;
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

  /**
   * Creating a Prevout Object from a transactionObject
   *
   * @param tx transaction to convert to prevout
   * @returns prevout Object
   */
  public static prevOutFromTx(tx: CTransactionSegWit): Prevout {
    return {
      txid: tx.txId,
      vout: 1,
      value: tx.vout[1].value,
      script: tx.vout[1].script,
      tokenId: tx.vout[1].tokenId,
    };
  }
}

export { Transaction, TransactionConfig };
