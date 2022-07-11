import { CustomMessage } from "../transactions";
import { Version } from "../transactions/version";
const LZUTF8 = require("lzutf8");

const BASE_ENCODING = "Base64";

class MessageCompressor {
  /**
   * Compresses the Custom Message.
   * @param data The custom message to be compressed.
   * @returns The compressed data as string.
   */
  static compress(data: CustomMessage | Version): string {
    return LZUTF8.compress(JSON.stringify(data), {
      outputEncoding: BASE_ENCODING,
    });
  }

  /**
   * Decompresses the compressed string to get the original Custom Message.
   * @param data The data to be decompressed.
   * @returns The original Custom Message from the frontend.
   */
  static decompress(data: string): CustomMessage | Version {
    const uncompressed = LZUTF8.decompress(data, {
      inputEncoding: BASE_ENCODING,
    });
    const customMessage = JSON.parse(uncompressed);
    if (this.isCustomMessage(customMessage)) return customMessage;
    if (this.isVersionMessage(customMessage)) return customMessage;

    throw new Error(
      "Message decompression failed. The returned object is not a valid message."
    );
  }

  /**
   * This internal type guard checks if the decompressed message is of type {@link CustomMessage}.
   *
   * For interoperability it's only check for three members.
   *
   * @param message The message to check if it's a custom message
   * @returns true if it's a Custom Message
   */
  private static isCustomMessage(message: any): message is CustomMessage {
    return "version" in message && "vaultId" in message && "rules" in message;
  }

  /**
   * This internal type guard checks if the decompressed message is of type {@link Version}.
   *
   * For interoperability it's only check for three members.
   *
   * @param message The message to check if it's a custom message
   * @returns true if it's a Version
   */
  private static isVersionMessage(message: any): message is Version {
    return (
      "version" in message && !("vaultId" in message) && !("rules" in message)
    );
  }
}

export { MessageCompressor };
