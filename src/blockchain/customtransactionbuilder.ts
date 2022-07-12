import { P2WPKHTxnBuilder } from "@defichain/jellyfish-transaction-builder/dist";
import {
  DeFiTransactionConstants,
  Transaction,
  TransactionSegWit,
  CTransactionSegWit,
  Script,
  Vout,
  OP_PUSHDATA,
  OP_CODES,
} from "@defichain/jellyfish-transaction";
import { BigNumber } from "@defichain/jellyfish-api-core";
import { WhaleApiClient } from "@defichain/whale-api-client";
import { WIZARD_TRANSACTION_CONFIG_PREFIX } from "../utils/helpers";
import retry from "async-await-retry";
import { Rawtx } from "@defichain/whale-api-client/dist/api/rawtx";

/**
 * The configuration to send a transaction.
 */
interface TransactionConfig {
  txn: TransactionSegWit;
  initialWaitTime: number;
  waitTime: number;
  retries: number;
  client: WhaleApiClient;
}

/**
 * The Custom Transaction Builder, that actually builds the transaction based on the passed data.
 */
class CustomTXBuilder extends P2WPKHTxnBuilder {
  async getCustomTx(
    data: string,
    changeScript: Script,
    prefix = WIZARD_TRANSACTION_CONFIG_PREFIX
  ) {
    const { prevouts, vin, total } = await this.allPrevouts();
    const buf = Buffer.from(prefix + data);
    const op = new OP_PUSHDATA(buf, "little");
    const deFiOut: Vout = {
      value: new BigNumber(0),
      script: {
        stack: [OP_CODES.OP_RETURN, OP_CODES.OP_0, op],
      },
      tokenId: 0x00,
    };

    const change: Vout = {
      value: total,
      script: changeScript,
      tokenId: 0x00,
    };

    const txn: Transaction = {
      version: DeFiTransactionConstants.Version,
      vin: vin,
      vout: [deFiOut, change],
      lockTime: 0x00000000,
    };

    const fee = await this.calculateFee(txn);
    change.value = total.minus(fee);

    return await this.sign(txn, prevouts);
  }

  /**
   * Sends the actual RAW transaction
   *
   * @param rawTx The RAW Tx object to send
   * @param hex the object with the hex data
   * @returns The transaction id
   */
  sendRawTx = async (rawtx: Rawtx, hex: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const tx = rawtx.send(hex);
        resolve(tx);
      } catch (e) {
        reject(e);
      }
    });
  };

  /**
   * Triggers the RAW transaction.
   *
   * First waits some time before it starts (config.initialWaitTime) and then tries several times (config.retries) until successful.
   *
   * Will throw error if it failed after the defined number of retries.
   */
  async sendTransaction(
    config: TransactionConfig
  ): Promise<CTransactionSegWit> {
    const ctx = new CTransactionSegWit(config.txn);

    // first wait for config.initialWaitTime before doing anything
    setTimeout(async () => {
      try {
        await retry(
          this.sendRawTx,
          [config.client.rawtx, { hex: ctx.toHex() }],
          {
            retriesMax: config.retries,
            interval: config.waitTime,
            exponential: true,
            factor: 3,
          }
        );
      } catch (err) {
        throw Error(
          `Could not send transaction after ${config.retries} retries. ERR: ${err}.`
        );
      }
    }, config.initialWaitTime);
    return ctx;
  }
}

export { CustomTXBuilder };
