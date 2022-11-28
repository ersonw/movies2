import {Platform} from 'react-native';
import RNFS, {downloadFile, readDir, uploadFiles} from 'react-native-fs';
const rNFsPath = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalDirectoryPath;
// const rNFsPath = RNFS.MainBundlePath;

class FileUtil {
    async writeFile(key, data){
        if (await this.isExists(key)){
            await this.deleteFile(key);
        }
        const path = `${rNFsPath}/${key}`;
        if (key.indexOf('/') > -1){
            var p = key.split('/');
            p.splice(p.length-1,1);
            await this.mkdir(p.join("/"));
        }
        try {
            await RNFS.write(path, data,0, 'utf8');
            return path;
        }catch (e) {
            console.log(e)
        }
    }
    async appendFile(key, data){
        if (!await this.isExists(key)){
            return  await this.writeFile(key,data);
        }
        const path = `${rNFsPath}/${key}`;
        try {
            data = data + '\n';
            await RNFS.appendFile(path, data, 'utf8');
            return path;
        }catch (e) {
            console.log(e)
        }
    }
    async readFile(key){
        const path = `${rNFsPath}/${key}`;
        try {
            return await RNFS.readFile(path, 'utf8');
        }catch (e) {
            console.log(e)
        }
    }
    async mkdir(key,options){
        const path = `${rNFsPath}/${key}`;
        try {
            return await RNFS.mkdir(path, options);
        }catch (e) {
            console.log(e)
        }
    }
    async readDir(key){
        const path = `${rNFsPath}/${key}`;
        return await new Promise((resolve, reject) => {
            RNFS.readDir(path)
                .then(result=>{
                    resolve(result);
                    // for (var i=0;i<result.length;i++) {
                    //     console.log(result[i]);
                    // }
                    // let index = result.length - 1;
                    // return Promise.all([RNFS.stat(result[index].path), result[index].path]);
                })
                .catch(e=>reject(e));
        });
    }
    async deleteFile(key){
        const path = `${rNFsPath}/${key}`;
        return await new Promise((resolve) => {
            RNFS.unlink(path)
                .then(()=>resolve())
                .catch(console.log);
        });
    }
    async isExists(key){
        const path = `${rNFsPath}/${key}`;
        return await new Promise((resolve) => {
            RNFS.exists(path)
                .then((v)=>resolve(v))
                .catch(console.log);
        });
    }
    async checkFile(key){
        if (await this.isExists(key)){
            return `${rNFsPath}/${key}`;
        }
    }
    async copyFile(key){
        const path = `${rNFsPath}/${key}`;
        return await new Promise((resolve) => {
            RNFS.copyFile(path)
                .then(()=>resolve())
                .catch(console.log);
        });
    }
    get baseUri(){
        // return `file://${rNFsPath}`;
        return rNFsPath;
    }
    downloadFile = RNFS.downloadFile;
    uploadFiles = RNFS.uploadFiles;
    test(){

        // this.readDir('test').then(console.log);
        // this.writeFile('test123/test','test123');
        // this.deleteFile('test123').then(console.log);
    }
}
const fileUtil = new FileUtil();
export default fileUtil;