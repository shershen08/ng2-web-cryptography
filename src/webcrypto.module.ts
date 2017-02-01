import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs/Observable';

import {CryptRSAOAEP} from './webcrypto.rsa-oaep.service';
import {CryptAESCBC} from './webcrypto.aes-cbc.service';
import { Utils } from './utils'

@NgModule({
    imports: [CommonModule],
    providers: [CryptRSAOAEP, CryptAESCBC],
})


const typesSupported = ['AES-CBC', 'RSA-OAEP'];

export class Ng2WebCryptoModule {
  type: string;
  keyUsagesEncryptDecrypt: string[] = ["encrypt", "decrypt"];
  keyUsagesWrapUnwrap: string[] = ["wrapKey", "unwrapKey"];
  key;
  text;
  lib;

  constructor(type:string) {
    if (typesSupported.indexOf(type) > -1) {
      this.type = type;
    } else {
      throw new Error('This encryption type is not supported.')
    }
    this.lib = (this.type == typesSupported[0]) ? new CryptAESCBC() : new CryptRSAOAEP();
  }
  decrypt(key) {
    this.key = key;
  }
  encrypt(text:string):Promise<any>  {
    this.text = Utils.getArrayFromString(text);

    let dfd = new Promise((resolve, reject) => {
      this.lib.getKey().then(() => {
        this.lib.encrypt(this.text).then((res) => {
          resolve(new Uint8Array(res));
        });
      })
    });
    return dfd;

  }
}