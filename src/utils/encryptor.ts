import CryptoJS from "crypto-js";

class MessageEncryptor {
  /**
   * Compresses the Custom Message with the Lempel–Ziv–Markov chain algorithm.
   * @param data The custom message to be compressed
   * @returns The compressed data as Uint8Array
   */
  static encrypt(data: string, passphrase: string): string {
    return CryptoJS.AES.encrypt(data, passphrase).toString();
  }

  /**
   * Decompresses the LZMA compressed Uint8Array and returns the Custom Message.
   * @param data The data to be decompressed.
   * @returns The original Custom Message from the frontend.
   */
  static decrypt(data: string, passphrase: string): string {
    return JSON.parse(
      CryptoJS.AES.decrypt(data, passphrase).toString(CryptoJS.enc.Utf8)
    ).content;
  }
}

export { MessageEncryptor };
