import { ApiPagedResponse, WhaleApiClient } from "@defichain/whale-api-client";
import { AddressActivity } from "@defichain/whale-api-client/dist/api/address";
import { Block } from "@defichain/whale-api-client/dist/api/blocks";
import { isWizardMessage } from "../utils/helpers";

/**
 * The transaction message contains the following properties
 *
 * - blockTime: Time to wait
 * - message: The message as extracted from the transaction
 * - theConfigBlock: So that we don't have to check all transactions - we just go back to the last block that contained the last config
 */
interface TransactionMessage {
  blockTime: number;
  message: string;
  lastConfigBlock: number;
}

interface BlockScannerConfig {
  client: WhaleApiClient;
  address: string;
}

/** Will scan for blocks e.g. to search for transactions. */
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
   * Returns the current block.
   * @returns the current block.
   */
  async getCurrentBlock(): Promise<Block> {
    return this.client.blocks.get(`${await this.getBlockHeight()}`);
  }

  /**
   * Returns the current block height.
   * @returns the current block height.
   */
  async getBlockHeight(): Promise<number> {
    return (await this.client.stats.get()).count.blocks;
  }

  /**
   * Retrieves the last config for this bot. This could either be a {@link CustomMessage} or a {@link Version}.
   *
   * It will return UNDEFINED if:
   *
   * - no custom message was found at all
   * - no custom message was found since last config block
   *
   * @param numberOfTransactions The number of transactions to check back in one rush (paging)
   * @returns The latest transaction found for this address, with current block height, the message and the lastConfigBlock.
   */
  async findLastWizardConfiguration(
    lastConfigBlock = 0,
    numberOfTransactions = 200
  ): Promise<TransactionMessage | undefined> {
    let next: string | undefined;
    let myTXs: ApiPagedResponse<AddressActivity>;
    let transactionBlock = 0;

    do {
      // get all transactions (paged)
      myTXs = await this.client.address.listTransaction(
        this.address,
        numberOfTransactions,
        next
      );

      // only check vout transactions - we don't care about others
      const myVoutTXs = myTXs.filter((tx) => tx.type === "vout");

      // iterate through the relevant vout transactions (filtered by nulldata type && config message)
      for (const transaction of myVoutTXs) {
        transactionBlock = transaction.block.height;

        // if we're in a block that we've already scanned last time, let's stop and don't return anything
        if (transactionBlock <= lastConfigBlock) {
          return undefined;
        }

        // get latest transaction that contains a message with one of our wizard prefixes
        const latestWizardTransaction = (
          await this.client.transactions.getVouts(transaction.txid)
        ).find(
          (vout) => vout.script.type === "nulldata" && isWizardMessage(vout)
        );

        // no custom message found - return undefined
        if (!latestWizardTransaction) return latestWizardTransaction;

        return {
          blockTime: await this.getBlockHeight(),
          message: Buffer.from(
            latestWizardTransaction.script.hex.substring(10),
            "hex"
          ).toString(), // encrypted and compressed message as String
          lastConfigBlock: transactionBlock,
        };
      }

      next = myTXs.nextToken;
    } while (myTXs.hasNext);

    return undefined;
  }
}

export { BlockScanner, BlockScannerConfig };
