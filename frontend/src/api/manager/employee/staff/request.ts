import axios from 'axios';
import {IGetListStaff, ICreateStaff} from "./types";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;
export const getList = async (token: string | null, props: IGetListStaff) => {
    try {
        const result = await axios.get(`${baseAdminURL}staffs`, {
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
            message = 'Get list staffs unsuccessful'
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

export const getDetailStaff = async (token: string | null, id: number) => {
    try {
        const result = await axios.get(`${baseAdminURL}staffs/${id}`, {
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
            message = 'Get staff detail unsuccessful'
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

export const createNewStaff = async (token: string | null, data: ICreateStaff) => {
    try {
        const result = await axios.post(`${baseAdminURL}staffs`,data, {
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
