import { ApiPagedResponse, WhaleApiClient } from "@defichain/whale-api-client";
import { AddressActivity } from "@defichain/whale-api-client/dist/api/address";
import { CustomMessage } from "../transactions";

interface TransactionMessage {
  blockTime: number;
  message: string;
  lastConfigBlock: number;
}

interface BlockScannerConfig {
  client: WhaleApiClient;
  address: string;
}

class BlockScanner {
  private readonly client: WhaleApiClient;
  private readonly address: string;

  /**
   * The constructor takes the transaction configuration {@link TransactionConfig}.
   *
   * @param config The transaction configuration object
   */
  constructor(config: BlockScannerConfig) {
    this.client = config.client;
    this.address = config.address;
  }

  /**
   * Retrieves the last config for this bot. This could either be a {@link CustomMessage} or a {@link Version}.
   *
   * @param numberOfTransactions The number of transactions to check back in one rush (paging)
   * @returns The latest transaction found for this address
   */
  async findLastBlockchainConfiguration(
    numberOfTransactions = 500
  ): Promise<TransactionMessage | undefined> {
    let next: string | undefined;
    let myTXs: ApiPagedResponse<AddressActivity>;
    let txMessage: TransactionMessage = {
      blockTime: 0,
      message: "test", // encrypted and compressed message as String
    };
    do {
      myTXs = await this.client.address.listTransaction(
        this.address,
        numberOfTransactions,
        next
      );

      // only keep VOUT transactions - we don't care about others
      let myVoutTXs = myTXs.filter((tx) => tx.type === "vout");

      console.log(myTXs);
      console.log(myVoutTXs);

      // ....
      // .... Check for WZ Config and return if found
      // ....
      next = myTXs.nextToken;
    } while (myTXs.hasNext);

    return null;
  }
}

export { BlockScanner, BlockScannerConfig };
