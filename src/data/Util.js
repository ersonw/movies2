import AsyncStorage from '@react-native-community/async-storage';
class Util  {
  constructor(name) {
    this.state = { name: name };
    this.read();
  }
  async read() {
    try {
      const v = await AsyncStorage.getItem(this.name);
      if (!v)return;
      const newValue = JSON.parse(v);
      this.value = {...newValue};
    } catch (e) {
      console.log(e);
    }
  }
  save() {
    try {
      AsyncStorage.setItem(this.name, JSON.stringify(this.value));
    } catch (e) {
        console.log(e);
    }
  }
  get name(){
    const {name} = this.state;
    return name;
  }
  get value(){
    const {value} = this.state;
    return {...value}
  }
  set value(newValue){
    if (!newValue) return;
    const state = this.state;
    this.state = { ...state, value: {...newValue}};
  }
}
export default Util;
