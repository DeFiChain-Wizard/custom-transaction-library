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

export {
  WIZARD_TRANSACTION_CONFIG_PREFIX,
  WIZARD_TRANSACTION_VERSION_PREFIX,
  removeTXPrefix,
};
