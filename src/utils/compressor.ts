import { CustomMessage } from "../transactions";
import { encode, decode } from "@msgpack/msgpack";
const cjson = require("compressed-json");

class MessageCompressor {
  /**
   * Compresses the Custom Message.
   * @param data The custom message to be compressed.
   * @returns The compressed data as string.
   */
  static compress(data: CustomMessage): string {
    return this.uInt8ArrayToString(encode(cjson.compress(data)));
  }

  /**
   * Decompresses the compressed string to get the original Custom Message.
   * @param data The data to be decompressed.
   * @returns The original Custom Message from the frontend.
   */
  static decompress(data: string): CustomMessage {
    const uncompressed: any = decode(this.stringToUint8Array(data));
    const restored = cjson.decompress(uncompressed);
    if (this.isCustomMessage(restored)) return restored;
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
   * Converts a Uint8Array to a string.
   * @param array The Uint8Array to be converted into a string.
   * @returns The Uint8Array as string.
   */
  private static uInt8ArrayToString(array: Uint8Array): string {
    return array.toString();
  }

  /**
   * Converts a string to a Uint8Array.
   * @param array The string to be converted into a Uint8Array.
   * @returns The string as Uint8Array
   */
  private static stringToUint8Array(string: string): Uint8Array {
    return Uint8Array.from(string.split(",").map((x) => parseInt(x, 10)));
  }
}

export { MessageCompressor };
