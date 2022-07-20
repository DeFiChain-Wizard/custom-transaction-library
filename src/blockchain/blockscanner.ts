import { ApiPagedResponse, WhaleApiClient } from "@defichain/whale-api-client";
import { AddressActivity } from "@defichain/whale-api-client/dist/api/address";

/**
 * The transaction message contains the following properties
 *
 * - blockTime: Time to wait
 * - message: The message as extracted from the transaction
 * - theConfigBlock: So that we don't have to check all transactions - we just go back to the last block that contained the last config
 *
 */
interface TransactionMessage {
  blockTime: number;
  message: string;
  lastConfigBlock: number;
}

interface BlockScannerConfig {
  client: WhaleApiClient;
  address: string;
  lastConfigBlock: number;
}

class BlockScanner {
  private readonly client: WhaleApiClient;
  private readonly address: string;
  private readonly lastConfigBlock: number;

  /**
   * The constructor takes the transaction configuration {@link TransactionConfig}.
   *
   * @param config The transaction configuration object
   */
  constructor(config: BlockScannerConfig) {
    this.client = config.client;
    this.address = config.address;
    this.lastConfigBlock = config.lastConfigBlock;
  }

  /**
   * Retrieves the last config for this bot. This could either be a {@link CustomMessage} or a {@link Version}.
   *
   * @param numberOfTransactions The number of transactions to check back in one rush (paging)
   * @returns The latest transaction found for this address
   */
  async findLastBlockchainConfiguration(
    numberOfTransactions = 200
  ): Promise<TransactionMessage | undefined> {
    let next: string | undefined;
    let myTXs: ApiPagedResponse<AddressActivity>;
    /* let txMessage: TransactionMessage = {
      blockTime: 0,
      message: "", // encrypted and compressed message as String
      lastConfigBlock: 0,
    };*/
    let transactionBlock = 0;
    do {
      // get all transactions (paged)
      myTXs = await this.client.address.listTransaction(
        this.address,
        numberOfTransactions,
        next
      );

      // only check vout transactions - we don't care about others
      let myVoutTXs = myTXs.filter((tx) => tx.type === "vout");

      // iterate through the relevant vout transactions (filtered by nulldata type && config message)
      for (const transaction of myVoutTXs) {
        let wizardTransactions = (
          await this.client.transactions.getVouts(transaction.txid)
        ).filter(
          (vout) =>
            vout.script.type === "nulldata" &&
            // use REGEX for that (helper function)
            vout.script.hex.toString().substring(10).startsWith("577a5478")
        );

        // loop through the existing wizard transactions
        for (const transactionVout of wizardTransactions) {
          console.log(transactionVout);
        }

        transactionBlock = transaction.block.height;
        console.log("Transaction block: ", transactionBlock);

        // if we're in a block that we've already scanned last time, let's stop and don't return anything
        if (transactionBlock === this.lastConfigBlock) {
          return undefined;
        }
      }

      // ....
      // .... Check for WZ Config and return if found
      // ....
      next = myTXs.nextToken;
      // only scan until the block that we've checked last time
    } while (transactionBlock !== this.lastConfigBlock && myTXs.hasNext);

    return undefined;
  }
}

export { BlockScanner, BlockScannerConfig };
