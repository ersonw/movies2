import User from '../data/User';

class Global {
    static showSearch = false;
    get user(){
        return new User();
    }
}
let global = new Global();
export default global;
