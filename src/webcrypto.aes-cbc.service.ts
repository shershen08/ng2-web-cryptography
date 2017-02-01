import { Utils } from './utils'

export class CryptAESCBC {
    Crypto;
    name:string = 'AES-CBC';
    keyUsagesEncryptDecrypt: string[] = ["encrypt", "decrypt"];
    KEY;

    constructor() {
        this.Crypto = window.crypto.subtle;
    }
    getKey():Promise<any> {
        if(this.KEY){
            return new Promise((resolve, reject) => {
                resolve(this.KEY);
            });
        }
        return this.keyGenerate();
    }
    keyGenerate():Promise<any> {

        const keyDetails = { 'name': this.name, 'length': 256 };

        let dfd = new Promise((resolve, reject) => {
            this.Crypto.generateKey(keyDetails, true, this.keyUsagesEncryptDecrypt).then((key) => {
                this.KEY = key;
                resolve(key);
            }, Utils.throwError);
        });

        return dfd;
    }
    encrypt(dataArrayBuffer:ArrayBuffer):Promise<any> {
        const conf = { 
            name: this.name,
            iv: window.crypto.getRandomValues(new Uint8Array(16))
        };
        return this.Crypto.encrypt(conf, this.KEY,dataArrayBuffer);
    }
}