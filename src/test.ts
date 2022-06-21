import { CustomMessage } from "./transactions";
import { MessageCompressor } from "./utils/compressor";
import { MessageEncryptor } from "./utils/encryptor";
//import { MessageEncryptor } from "./utils/encryptor";

const message: CustomMessage = {
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

const testCompressed = MessageCompressor.compress(message);
console.log("COMPRESSED!!!");
console.log(testCompressed);
console.log("COMPRESSED!!!");
const testUncompressed = MessageCompressor.decompress(testCompressed);
console.log("DECOMPRESSED!!!");
console.log(testUncompressed);
console.log("DECOMPRESSED!!!");
const testCompressedEncrypted = MessageEncryptor.encrypt(
  testCompressed,
  "test1234"
);
console.log("COMPRESSEDENCRYPTED!!!");
console.log(testCompressedEncrypted);
console.log("COMPRESSEDENCRYPTED!!!");
const testFinal = MessageEncryptor.decrypt(testCompressedEncrypted, "test1234");
console.log("DECRYPTED!!!");
console.log(testFinal);
console.log("DECRYPTED!!!");
const testFinal2 = MessageCompressor.decompress(testFinal);
console.log("DECRYPTEDDECOMPRESSED!!!");
console.log(testFinal2);
console.log("DECRYPTEDDECOMPRESSED!!!");
/* 
const testUncompressed = MessageCompressor.decompress(testCompressed);
console.log("DECOMPRESSED!!!");
console.log(testUncompressed);
console.log("DECOMPRESSED!!!");
const testCompressedEncrypted = MessageEncryptor.encrypt(
  testCompressed,
  "test1234"
);
console.log("COMPRESSEDENCRYPTED!!!");
console.log(testCompressedEncrypted);
console.log("COMPRESSEDENCRYPTED!!!");
const testFinal = MessageEncryptor.decrypt(testCompressedEncrypted, "test1234");
console.log("DECRYPTED!!!");
console.log(testFinal);
console.log("DECRYPTED!!!");
const testFinal2 = MessageCompressor.decompress(testFinal);
console.log("DECRYPTEDDECOMPRESSED!!!");
console.log(testFinal2);
console.log("DECRYPTEDDECOMPRESSED!!!");
/*

const testFinal = MessageEncryptor.decrypt(testCompressedEncrypted, "test1234");
console.log("DECRYPTED!!!");
console.log(testFinal);
console.log("DECRYPTED!!!");
const testFinal2 = MessageCompressor.decompress(testFinal);
console.log("DECRYPTEDDECOMPRESSED!!!");
console.log(testFinal2);
console.log("DECRYPTEDDECOMPRESSED!!!");*/
