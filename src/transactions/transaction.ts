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

interface DFITransaction {
  send: (message: CustomMessage) => void;
}

interface TransactionOptions {
  client: WhaleApiClient;
  account: WhaleWalletAccount;
  network: Network;
  passphrase: string;
}

class Transaction implements DFITransaction {
  private readonly client: WhaleApiClient;
  private readonly account: WhaleWalletAccount;
  private readonly network: Network;
  private readonly passphrase: string;
  constructor(config: TransactionOptions) {
    this.client = config.client;
    this.account = config.account;
    this.network = config.network;
    this.passphrase = config.passphrase;
  }

  async send(message: CustomMessage): Promise<string> {
    return await this.sendCustomMessage(
      await this.compressAndEncryptMessage(message)
    );
  }

  getCustomMessage(message: Buffer): CustomMessage {
    return this.decryptAndDecompressMessage(message);
  }

  private async sendCustomMessage(message: Buffer): Promise<string> {
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
      await this.account.getScript()
    );
    const transaction = await builder.sendTransaction({
      txn,
      initialWaitTime: 2000,
      waitTime: 5000,
      retries: 3,
      client: this.client,
    }); //

    if (transaction.vin.length > 0)
      return new String(transaction.vin[0].txid).toString();
    throw Error("No transcation ID received!");
  }

  private compressAndEncryptMessage(message: CustomMessage): Buffer {
    // first we will compress the message
    console.log("Compressing message");
    const compressedData = MessageCompressor.compress(message);
    console.log(compressedData);
    // now we will encrypt the message

    console.log("Encrypting message");
    const encryptedData = MessageEncryptor.encrypt(
      compressedData,
      this.passphrase
    );

    console.log(encryptedData);

    return encryptedData;
  }

  private decryptAndDecompressMessage(message: Buffer): CustomMessage {
    // first we will decrypt the message
    console.log("decrypting message");
    const decryptedData = MessageEncryptor.decrypt(message, this.passphrase);
    console.log(decryptedData);
    console.log("Decompressing message");
    const decompressedData = MessageCompressor.decompress(decryptedData);
    console.log(decompressedData);
    // now we will encrypt the message
    return decompressedData;
  }
}

export { Transaction, TransactionOptions };
