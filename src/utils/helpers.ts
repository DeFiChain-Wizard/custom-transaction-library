import { TransactionVout } from "@defichain/whale-api-client/dist/api/transactions";
import { CustomMessage } from "../transactions";
import { Version } from "../transactions/version";

const WIZARD_TRANSACTION_CONFIG_PREFIX = "WzTx";
const WIZARD_TRANSACTION_VERSION_PREFIX = "WzVx";

/**
 * Removes the {@link WIZARD_TRANSACTION_CONFIG_PREFIX} or {@link WIZARD_TRANSACTION_VERSION_PREFIX} from the message string.
 *
 * @param message the message the tx prefix should be removed from.
 * @returns the new message without the tx prefix.
 */
const removeTXPrefix = (message: string): string => {
  const regex = new RegExp(
    `^(${WIZARD_TRANSACTION_CONFIG_PREFIX}|${WIZARD_TRANSACTION_VERSION_PREFIX})`,
    "gm"
  );
  return message.replace(regex, "");
};

/**
 * Converts a given ASCII String to HEX.
 *
 * @param ascii The ASCII string to convert to a HEX String
 * @returns The HEX string for a given ASCII String.
 */
const asciiToHex = (ascii: string): string => {
  var arr1 = [];
  for (var n = 0, l = ascii.length; n < l; n++) {
    var hex = Number(ascii.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join("");
};

/**
 * Checks if a given transaction message is using one of the prefixes.
 * It will just check for the prefixes.
 *
 * */
const isWizardMessage = (transaction: TransactionVout): boolean => {
  const regex = new RegExp(
    `^.{10}(${asciiToHex(WIZARD_TRANSACTION_CONFIG_PREFIX)}|${asciiToHex(
      WIZARD_TRANSACTION_VERSION_PREFIX
    )})`,
    "gmi"
  );
  return regex.test(transaction.script.hex.toString());
};

/**
 * This internal type guard checks if the decompressed message is of type {@link CustomMessage}.
 *
 * For interoperability it only checks for three members.
 *
 * @param message The message to check if it's a custom message
 * @returns true if it's a Custom Message
 */
const isCustomMessage = (message: any): message is CustomMessage => {
  return (
    "version" in message &&
    "vaultId" in message &&
    "rules" in message &&
    "pause" in message &&
    "compounding" in message &&
    "poolpairs" in message
  );
};

/**
 * This internal type guard checks if the decompressed message is of type {@link Version}.
 *
 * For interoperability it's only check for three members.
 *
 * @param message The message to check if it's a custom message
 * @returns true if it's a Version
 */
const isVersionMessage = (message: any): message is Version => {
  return (
    "version" in message &&
    !("vaultId" in message) &&
    !("rules" in message) &&
    !("pause" in message) &&
    !("compounding" in message) &&
    !("poolpairs" in message)
  );
};

export {
  WIZARD_TRANSACTION_CONFIG_PREFIX,
  WIZARD_TRANSACTION_VERSION_PREFIX,
  removeTXPrefix,
  isCustomMessage,
  isVersionMessage,
  isWizardMessage,
};
