import AsyncStorage from '@react-native-community/async-storage';
import {useState} from "react";
const DataUtil= (clazz: string) =>  {
  const [name,setName] = useState('');
  const [value,setValue] = useState([]);
  setName(clazz);
  const read = async() => {
    try {
      const v = await AsyncStorage.getItem(name);
      if (!v)return;
      const newValue = JSON.parse(v);
      setValue({...newValue});
    } catch (e) {
      console.log(e);
    }
  }
  const save = () =>{
    try {
      AsyncStorage.setItem(name, JSON.stringify(value));
    } catch (e) {
        console.log(e);
    }
  }
  read();
  return {name,value,setValue,read,save};
}
export default DataUtil;
