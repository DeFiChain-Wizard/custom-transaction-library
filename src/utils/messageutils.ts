import { CustomMessage } from "../transactions/message";
import { MessageCompressor } from "./compressor";
import { MessageEncryptor } from "./encryptor";
import { Version } from "../transactions/version";

/**
 * The message utils class that offers all methods to send a
 * to read the custom message from a transaction.
 */
class MessageUtils {
  /**
   * Takes the {@link CustomMessage} and compresses and encrypts it.
   *
   * @param message The {@link CustomMessage} to compress and encrypt
   * @returns the compressed and encrypted message as string
   */
  public static compressAndEncryptMessage(
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
  public static decryptAndDecompressMessage(
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
