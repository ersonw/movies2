import AesCrypto from 'react-native-aes-pack';
import CryptoJs from 'crypto-js';
export default class AESUtil {
    static secretKey = 'cPdS+pz9B640l/4VxWuhzQ==';
    static encrypt(data) {
        return new Promise(async (resolve,reject)=>{
            // const iv = await cryptoRandomStringAsync({length: 128, type: 'AES'});
            AesCrypto.encrypt(data,this.secretKey, iv).then(cipher=>{
                console.log(cipher);// return a string type cipher
                resolve(cipher);
            }).catch(err=>{
                console.log(err);
                reject(err);
            });

        });
    }

    static async decrypt(data) {
        try {
            // const iv = CryptoJs.enc.Latin1.parse(await cryptoRandomStringAsync({length: 128, type: 'AES'}));
            // console.log();
            return CryptoJs.AES.decrypt(
                { cipherText: CryptoJs.enc.Base64.parse(data)},
                CryptoJs.enc.Latin1.parse(this.secretKey),
                { iv },
            ).toString();
        }catch (e) {
            console.log(`decrypt: ${e}`);
        }
    }
}