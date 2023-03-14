import axios from 'axios';
import {IAddNewItemToCart, IDeleteItemInCart, IGetCart, IUpdateBankInformation} from "./types";
const baseUserURL = `${process.env.REACT_APP_BE_HOST}`;

export const getListCart = async (token: string | null, props: IGetCart) => {
    try {
        const result = await axios.get(`${baseUserURL}customer/${props.customerId}/cart`, {
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
            message = 'Get list carts unsuccessful'
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

export const addNewItemToCart = async (token: string | null, data: IAddNewItemToCart) => {
    try {
        const result = await axios.post(`${baseUserURL}customer/${data.customerId}/cart`,{itemId: data.itemId}, {
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

export const deleteOneItemInCart = async (token: string | null, data: IDeleteItemInCart) => {
    try {
        const result = await axios.delete(`${baseUserURL}customer/${data.customerId}/cart?cartId=${data.cartId}`, {
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

export const updateBankInformation = async (token: string | null, data: IUpdateBankInformation) => {
    try {
        const result = await axios.put(`${baseUserURL}users/${data.customerId}/bank-information`,{
            bankName: data.bankName,
            bankAccount: data.bankAccount,
            bankOwner: data.bankOwner,
            phone: data.phone,
            address: data.address
        }, {
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