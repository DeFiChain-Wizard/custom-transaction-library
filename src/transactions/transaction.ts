import { WhaleApiClient } from "@defichain/whale-api-client";
import {
  WhaleFeeRateProvider,
  WhalePrevoutProvider,
  WhaleWalletAccount,
} from "@defichain/whale-api-wallet";
import { Network } from "@defichain/jellyfish-network";
import { CustomMessage } from "./message";
import { CustomTXBuilder } from "../blockchain/customtransactionbuilder";

interface DFITransaction {
  send: (message: CustomMessage) => void;
}

interface TransactionOptions {
  client: WhaleApiClient;
  account: WhaleWalletAccount;
  network: Network;
}

class Transaction implements DFITransaction {
  private readonly client: WhaleApiClient;
  private readonly account: WhaleWalletAccount;
  private readonly network: Network;
  constructor(config: TransactionOptions) {
    this.client = config.client;
    this.account = config.account;
    this.network = config.network;
  }

  async send(message: CustomMessage): Promise<string> {
    return await this.sendCustomMessage(this.prepareMessage(message));
  }

  private async sendCustomMessage(message: string): Promise<string> {
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

  private prepareMessage(message: CustomMessage): string {
    // first we will compress the message
    console.log("Compressing message");
    console.log(message);
    // now we will encrypt the message
    console.log("Encrypting message");
    return "compressed & encrypted message";
  }
}

export { Transaction, TransactionOptions };
