import CryptoJS from "crypto-js";
import { removeTXPrefix } from "./helpers";
class MessageEncryptor {
  /**
   * Encrypts a certain string data.
   *
   * @param data The string/data to encrypt.
   * @param passphrase The passphrase as string array to encrypt
   * @returns The encrypted string.
   */
  static encrypt(data: string, passphrase: string[]): string {
    return CryptoJS.AES.encrypt(data, passphrase.join("")).toString();
  }

  /**
   * Decrypts a certain encryted string and returns the unencrypted string.
   *
   * @param data The string/data to decrypt.
   * @param passphrase The passphrase as string array to decrypt
   * @returns The unencrypted string.
   */
  static decrypt(data: string, passphrase: string[]): string {
    let decData = CryptoJS.AES.decrypt(
      removeTXPrefix(data),
      passphrase.join("")
    );
    let bytes = decData.toString(CryptoJS.enc.Utf8);
    return bytes;
  }
}

export { MessageEncryptor };
