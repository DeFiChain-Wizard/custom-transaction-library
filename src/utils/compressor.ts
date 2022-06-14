import LZMA from "lzma-web";
import { CustomMessage } from "../transactions";
const COMPRESSOR = new LZMA();
const COMPRESS_RATIO = 9;

class MessageCompressor {
  /**
   * Compresses the Custom Message with the Lempel–Ziv–Markov chain algorithm.
   * @param data The custom message to be compressed
   * @returns The compressed data as Uint8Array
   */
  static async compress(data: CustomMessage): Promise<string> {
    const compressed = await COMPRESSOR.compress(
      JSON.stringify(data),
      COMPRESS_RATIO
    );
    return new TextDecoder("utf-8").decode(compressed);
  }

  /**
   * Decompresses the LZMA compressed Uint8Array and returns the Custom Message.
   * @param data The data to be decompressed.
   * @returns The original Custom Message from the frontend.
   */
  static async decompress(data: string): Promise<CustomMessage> {
    const uncompressed = await COMPRESSOR.decompress(
      new TextEncoder().encode(data)
    );
    if (typeof uncompressed === "string") return JSON.parse(uncompressed);
    throw new Error("Custom Message could not be decoded to valid UTF-8 text.");
  }
}

export { MessageCompressor };
