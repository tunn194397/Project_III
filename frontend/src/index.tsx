import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <ToastContainer style={{ fontSize: 18 }} autoClose={2000} newestOnTop />
        </BrowserRouter>
    </React.StrictMode>
);
