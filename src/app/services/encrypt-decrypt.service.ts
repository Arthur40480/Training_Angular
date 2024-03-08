import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {
  secretKey = "YourSecretKeyEncryptAndDecrypt";

  constructor() { }

  /**
   * Méthode pour crypter une string
   * @param value String
   * @returns String
   */
  encrypt(value: string) : string {
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  /**
   * Méthode pour décrypter une string
   * @param textToDecrypt String
   * @returns String
   */
  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}
