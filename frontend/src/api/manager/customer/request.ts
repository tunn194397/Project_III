import axios from 'axios';
import {ICreateCustomer, IGetListCustomer, IUpdateCustomer, IUpdateUserDto} from "./types";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;
export const getList = async (token: string | null, props: IGetListCustomer) => {
    try {
        const result = await axios.get(`${baseAdminURL}customer`, {
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
            message = 'Get list customers unsuccessful'
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

export const createNewCustomer = async (token: string | null, data: ICreateCustomer) => {
    try {
        const result = await axios.post(`${baseAdminURL}customer`,data, {
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

export const updateCustomer = async (token: string | null, id: number | undefined, data: IUpdateCustomer) => {
    try {
        const result = await axios.post(`${baseAdminURL}customer/${id}`,data, {
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

export const updatePersonal = async (token: string | null, id: number | undefined, data: IUpdateUserDto) => {
    try {
        const result = await axios.patch(`${baseAdminURL}users/${id}`,data, {
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

export const getDetailCustomer = async (token: string | null, id: number) => {
    try {
        const result = await axios.get(`${baseAdminURL}customer/${id}`, {
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
            message = 'Get customer detail unsuccessful'
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

export const getListUserWithRole = async (token: string | null, roleId: number) => {
    try {
        const result = await axios.get(`${baseAdminURL}users/role`, {
            params: {roleId: roleId},
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
            message = 'Get list user with role unsuccessful'
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