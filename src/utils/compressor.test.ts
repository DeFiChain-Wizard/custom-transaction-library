import { MessageCompressor } from "./compressor";
describe("Testing Compressions", () => {
  test("test if compression and decompression gives the same result", () => {
    const customMessage = {
      version: "1.0",
      vaultId: "dsafasdfasdfasdfasd",
      pause: 0,
      compounding: {
        threshold: 1,
        mode: 1,
        token: "DFI",
      },
      poolpairs: {},
      rules: { keepMaxRatio: 150, keepMinRatio: 160 },
      telegram: { receiver: "rest", key: "1" },
    };
    const compressed = MessageCompressor.compress(customMessage);
    const decompressed = MessageCompressor.decompress(compressed);
    expect(JSON.stringify(customMessage) === JSON.stringify(decompressed));
  });
});
