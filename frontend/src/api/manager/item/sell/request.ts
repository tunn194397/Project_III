import axios from 'axios';
import {IGetListSellReceipt, ICreateSellReceipt} from "./types";
import {IGetHomeData} from "../supply/types";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

export const getList = async (token: string | null, props: IGetListSellReceipt) => {
    try {
        const result = await axios.get(`${baseAdminURL}receipt/sell`, {
            params: props,
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return result.data
    } catch (error: unknown) {
        let message = '';
        if (axios.isAxiosError(error)) {
            message = 'Get list sell receipt unsuccessful'
            return {
                success: false,
                data: null,
                message: message
            };
        } else {
            return {
                success: false,
                message: 'Network error',
                data: null
            };
        }
    }
};

export const createNewSellReceipt = async (token: string | null, data: ICreateSellReceipt) => {
    try {
        const result = await axios.post(`${baseAdminURL}receipt/sell`,data, {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return result.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error?.response?.status === 401) {
                return {
                    success: false,
                    data: null,
                    message: 'Unauthorized'
                };
            } else {
                return {
                    success: false,
                    data: null,
                    message: 'Failed to create data!'
                };
            }
        } else {
            return {
                success: false,
                message: 'Network error',
                data: null
            };
        }
    }
}

export const getDetailSellReceipt = async (token: string | null, id: number) => {
    try {
        const result = await axios.get(`${baseAdminURL}receipt/sell/${id}`, {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return result.data
    } catch (error: unknown) {
        let message = '';
        if (axios.isAxiosError(error)) {
            message = 'Get item receipt detail unsuccessful'
            return {
                success: false,
                data: null,
                message: message
            };
        } else {
            return {
                success: false,
                message: 'Network error',
                data: null
            };
        }
    }
}

export const getSellHomeData = async (token: string | null, data: IGetHomeData) => {
    try {
        const result = await axios.get(`${baseAdminURL}receipt/sell/home`, {
            params: data,
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        });
        return result.data
    } catch (error: unknown) {
        let message = '';
        if (axios.isAxiosError(error)) {
            message = 'Get item receipt detail unsuccessful'
            return {
                success: false,
                data: null,
                message: message
            };
        } else {
            return {
                success: false,
                message: 'Network error',
                data: null
            };
        }
    }
};
