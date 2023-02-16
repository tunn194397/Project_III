import axios from 'axios';
import {IGetListManager} from "./types";
import {ICreateManager} from "./types";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

export const getList = async (token: string | null, props: IGetListManager) => {
    try {
        const result = await axios.get(`${baseAdminURL}managers`, {
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
            message = 'Get list managers unsuccessful'
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

export const getAllBranch = async (token: string | null) => {
    try {
        const result = await axios.get(`${baseAdminURL}managers/branch`, {
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
            message = 'Get list managers unsuccessful'
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

export const createNewManager = async (token: string | null, data: ICreateManager) => {
    try {
        const result = await axios.post(`${baseAdminURL}managers`,data, {
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

export const getDetailManager = async (token: string | null, id: number) => {
    try {
        const result = await axios.get(`${baseAdminURL}managers/${id}`, {
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
            message = 'Get manager detail unsuccessful'
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