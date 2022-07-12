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
 * This internal type guard checks if the decompressed message is of type {@link CustomMessage}.
 *
 * For interoperability it only checks for three members.
 *
 * @param message The message to check if it's a custom message
 * @returns true if it's a Custom Message
 */
const isCustomMessage = (message: any): message is CustomMessage => {
  return "version" in message && "vaultId" in message && "rules" in message;
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
    "version" in message && !("vaultId" in message) && !("rules" in message)
  );
};

export {
  WIZARD_TRANSACTION_CONFIG_PREFIX,
  WIZARD_TRANSACTION_VERSION_PREFIX,
  removeTXPrefix,
  isCustomMessage,
  isVersionMessage,
};
