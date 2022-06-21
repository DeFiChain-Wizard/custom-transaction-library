import CryptoJS from "crypto-js";

class MessageEncryptor {
  static encrypt(data: string, passphrase: string): string {
    let encJson = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      passphrase
    ).toString();
    let encData = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(encJson)
    );
    return encData;
  }

  static decrypt(data: string, passphrase: string): string {
    let decData = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
    let bytes = CryptoJS.AES.decrypt(decData, passphrase).toString(
      CryptoJS.enc.Utf8
    );
    return JSON.parse(bytes);
  }
}

export { MessageEncryptor };
