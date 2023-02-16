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
            navigate('/manager/login')
        }
    }, [isLogin])
    return <div>{element}</div>;
}
