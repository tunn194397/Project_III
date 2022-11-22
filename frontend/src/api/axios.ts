import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { managerRoute, userRoute } from '../routes/ConstRoute';
import { LOCAL_STORAGE } from '../utils/constant';
import { IError, ISuccessResponse } from './types';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BE_HOST,
    withCredentials: false
});

const handleSuccess = (res: AxiosResponse<ISuccessResponse>) => {
    if (res.data?.meta.code < 200 && res.data?.meta.code > 299) {
        return Promise.reject(res.data);
    }
    const result = res.data;
    if (result?.meta?.pagination) {
        result.data = {
            list: result.data,
            pagination: result?.meta?.pagination
        };
    }
    return result;
};

const handleError = (err: AxiosError<IError>) => {
    //we not redirect when request is login api
    if (
        (err?.response?.data.meta.code === 401 || err?.response?.data.meta.code === 403) &&
        err.config.url !== '/user/login' &&
        err.config.url !== '/user/is-active-security'
    ) {
        localStorage.clear();
        window.location.href = userRoute.home.path;
    }
    const data = err?.response?.data;
    if (typeof data?.meta.message === 'string') {
        data.meta.message = [data.meta.message];
    }
    return Promise.reject(data);
};

axiosInstance.interceptors.response.use(handleSuccess, handleError);

axiosInstance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        config = {
            ...config,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE.token)}`
            },
            data: config.data
        };

        return config;
    },
    error => Promise.reject(error)
);

export const convertToFormData = (data: { string: string }) => {
    const bodyFormData = new FormData();
    if (data) {
        for (const [key, value] of Object.entries(data)) {
            bodyFormData.append(key, value || '');
        }
    }
    return bodyFormData;
};
