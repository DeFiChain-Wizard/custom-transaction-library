import { CustomMessage } from "../transactions";
import { Version } from "../transactions/version";
import { isCustomMessage, isVersionMessage } from "./helpers";

class MessageCompressor {
  /**
   * Compresses the Custom Message.
   * @param data The custom message to be compressed.
   * @returns The compressed data as string.
   */
  static compress(data: CustomMessage | Version): string {
    //TODO: For now we do not compress, once the data increases we will introduce compression.
    return JSON.stringify(data);
  }

  /**
   * Decompresses the compressed string to get the original Custom Message.
   * @param data The data to be decompressed.
   * @returns The original Custom Message from the frontend.
   */
  static decompress(data: string): CustomMessage | Version {
    //TODO: For now we do not compress, once the data increases we will introduce compression.
    const uncompressed = data;
    const customMessage = JSON.parse(uncompressed);
    if (isCustomMessage(customMessage)) return customMessage;
    if (isVersionMessage(customMessage)) return customMessage;

    throw new Error(
      "Message decompression failed. The returned object is not a valid message."
    );
  }
}

export { MessageCompressor };
