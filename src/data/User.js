'use strict';
import Util from './Util';

class User extends Util {
    constructor() {
        super('user');
    }
    static formatJson(str){
        let share = new User();
        if ('string' === typeof str){
            const value = JSON.parse(str);
            if (value){
                for (const valueKey in value) {
                    share[valueKey] = value[valueKey];
                }
            }
        }else if ('object' === typeof str){
            if (str){
                for (const valueKey in str) {
                    share[valueKey] = str[valueKey];
                }
            }
        }
        return share;
    }
    toString(){
        return JSON.stringify(this.value);
    }
    get id(){
        const {id} = this.value;
        return id;
    }
    set id(id){
        this.value = { id };
    }
    get username(){
        const {username} = this.value;
        return username;
    }
    set username(username){
        this.value = { username };
    }
    get nickname(){
        const {nickname} = this.value;
        return nickname;
    }
    set nickname(nickname){
        this.value = { nickname };
    }
}
export default User;