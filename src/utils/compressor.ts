import { CustomMessage } from "../transactions";
import { Version } from "../transactions/version";
import { isCustomMessage, isVersionMessage } from "./helpers";
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
    if (isCustomMessage(customMessage)) return customMessage;
    if (isVersionMessage(customMessage)) return customMessage;

    throw new Error(
      "Message decompression failed. The returned object is not a valid message."
    );
  }
}

export { MessageCompressor };
