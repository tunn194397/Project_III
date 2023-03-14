import {useNavigate, useRoutes} from 'react-router-dom';
import { routes } from './routes';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./context/AuthContext";
import {toast} from "react-toastify";
export default function App() {
    const element = useRoutes(routes);
    const {isLogin} = useContext(AuthContext)

    const navigate = useNavigate()
    useEffect(() => {
        if (!isLogin) {
            if (window.location.href.includes('manager')) navigate('/manager/login')
            else navigate('/user')
        }
    }, [isLogin])
    return <div>{element}</div>;
}
