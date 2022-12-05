import {useState} from "react";

export type LoginInfoProps = {
    phone: string,
    password: string,
};
const LoginInfo=(props?: LoginInfoProps)=> {
    const [phone,setPhone] = useState(props?.phone);
    const [password,setPassword] = useState(props?.password);
    return {
        phone,
        setPhone,
        password,
        setPassword,
    };
}
export default LoginInfo;