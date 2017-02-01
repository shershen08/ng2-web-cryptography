export class Utils {
    /**
     * can polyfill with 
     * https://github.com/inexorabletash/text-encoding
     */
    static getArrayFromString(str:string) {
        return new TextEncoder('utf-8').encode(str);
    }

    static getRandomValues():ArrayBuffer {
        var array = new Int32Array(16);
        window.crypto.getRandomValues(array);
        return array.buffer;
    }
    static throwError(err){
        throw new Error(err);
    }
}