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
import { Prevout } from "@defichain/jellyfish-transaction-builder/dist/provider";

/**
 * The configuration to send a transaction.
 */
interface CustomTransactionConfig {
  txn: TransactionSegWit;
  initialWaitTime: number;
  waitTime: number;
  retries: number;
  client: WhaleApiClient;
}

interface Hex {
  hex: string;
}

/**
 * The Custom Transaction Builder, that actually builds the transaction based on the passed data.
 */
class CustomTXBuilder extends P2WPKHTxnBuilder {
  /** Create an official transaction with prevout.*/

  //TODO: Merge this function with the customTX function to reduce redundant code
  async getPrevoutTx(
    txn: TransactionSegWit,
    prevout: Prevout | Prevout[] | undefined
  ): Promise<TransactionSegWit> {
    // check if we need to consider prevouts
    if (prevout) {
      const prevouts = Array.isArray(prevout) ? prevout : [prevout];
      const customTx: Transaction = {
        version: DeFiTransactionConstants.Version,
        vin: prevouts.map((prev) => {
          return {
            txid: prev.txid,
            index: prev.vout,
            script: { stack: [] },
            sequence: 0xffffffff,
          };
        }),
        vout: txn.vout,
        lockTime: 0x00000000,
      };

      const fee = await this.calculateFee(customTx);
      const prevOutsValue = prevouts
        .map((prev) => prev.value)
        .reduce((sum, val) => sum.plus(val), new BigNumber(0));
      customTx.vout[1].value = prevOutsValue.minus(fee);
      const signed = await this.sign(customTx, prevouts);
      if (!signed) {
        throw new Error("cannot sign custom transaction");
      }
      txn = signed;
    }
    return txn;
  }

  /** Create a custom transaction */
  async getCustomTx(
    data: string,
    changeScript: Script,
    prefix = WIZARD_TRANSACTION_CONFIG_PREFIX
  ): Promise<TransactionSegWit> {
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
  sendRawTx = async (rawtx: Rawtx, hex: Hex): Promise<string> => {
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
    config: CustomTransactionConfig
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
