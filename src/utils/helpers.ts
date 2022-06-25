const WIZARD_TRANSACTION_PREFIX = "WzTx";

/**
 * Removes the {@link WIZARD_TRANSACTION_PREFIX} from the message string.
 *
 * @param message the message the tx prefix should be removed from.
 * @returns the new message without the tx prefix.
 */
const removeTXPrefix = (message: string): string => {
  return message.replace(WIZARD_TRANSACTION_PREFIX, "");
};

export { WIZARD_TRANSACTION_PREFIX, removeTXPrefix };
