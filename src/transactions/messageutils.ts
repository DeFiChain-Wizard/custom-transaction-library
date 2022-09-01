import { CustomMessage } from "./message";
import { MessageCompressor } from "../utils/compressor";
import { MessageEncryptor } from "../utils/encryptor";
import { Version } from "./version";

/**
 * The message utils class that offers all methods to send a
 * to read the custom message from a transaction.
 */
class MessageUtils {
  /**
   * Takes the compressed and encrypted message from the transaction and returns the
   * decompressed and decrypted {@link CustomMessage}.
   *
   * @param message The message as extracted from the transaction.
   * @returns The custom message.
   */
  public static getCustomMessage(
    message: string,
    passphrase: string[]
  ): CustomMessage | Version {
    return MessageUtils.decryptAndDecompressMessage(message, passphrase);
  }

  /**
   * Takes the {@link CustomMessage} and compresses and encrypts it.
   *
   * @param message The {@link CustomMessage} to compress and encrypt
   * @returns the compressed and encrypted message as string
   */
  static compressAndEncryptMessage(
    message: CustomMessage | Version,
    passphrase: string[]
  ): string {
    // first we will compress the message
    const compressedData = MessageCompressor.compress(message);
    // now we will encrypt the message
    return MessageEncryptor.encrypt(compressedData, passphrase);
  }

  /**
   * Takes the compressed and encrypted string from the transaction and returns the {@link CustomMessage}.
   *
   * @param message The compressed and encrypted string from the transaction
   * @returns the uncompressed and decrypted {@link CustomMessage}
   */
  static decryptAndDecompressMessage(
    message: string,
    passphrase: string[]
  ): CustomMessage | Version {
    // first we will decrypt the message
    const decryptedData = MessageEncryptor.decrypt(message, passphrase);
    // now we will decompress the message
    return MessageCompressor.decompress(decryptedData);
  }
}

export { MessageUtils };
