import {useNavigate, useRoutes} from 'react-router-dom';
import { routes } from './routes';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./context/AuthContext";
import {toast} from "react-toastify";
export default function App() {
    const element = useRoutes(routes);
    const {isLogin} = useContext(AuthContext)
    const [oldLogin, setOldLogin] = useState(isLogin);
    const [newLogin, setNewLogin] = useState(oldLogin);
    const saveLogin = () => {
        setOldLogin(newLogin)
        setNewLogin(isLogin)
        console.log("login: ", isLogin, "old", oldLogin, "new" ,newLogin)
    }
    console.log(isLogin, oldLogin, newLogin)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLogin) {
            navigate('/manager/login')
        }
        saveLogin()
    }, [isLogin])
    return <div>{element}</div>;
}
