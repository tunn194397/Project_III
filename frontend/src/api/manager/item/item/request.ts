import axios from 'axios';
import {IGetListItem, ICreateItem} from "./types";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;

export const getListItems = async (token: string | null, props: IGetListItem) => {
    try {
        const result = await axios.get(`${baseAdminURL}items`, {
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
            message = 'Get list items unsuccessful'
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

export const getAllDeviceType = async (token: string | null) => {
    try {
        const result = await axios.get(`${baseAdminURL}items/devices`, {
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
            message = 'Get list devices unsuccessful'
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

export const getAllDeviceTypeHaveParameter = async (token: string | null) => {
    try {
        const result = await axios.get(`${baseAdminURL}device/type-have-parameter`, {
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
            message = 'Get list devices unsuccessful'
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

export const getAllDeviceParameter = async (token: string | null, deviceTypeId: number) => {
    try {
        const result = await axios.get(`${baseAdminURL}device/parameter`, {
            params: {typeId: deviceTypeId},
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
            message = 'Get list devices unsuccessful'
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

export const createNewItem = async (token: string | null, data: ICreateItem) => {
    try {
        const result = await axios.post(`${baseAdminURL}items`,data, {
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

export const getDetailItem = async (token: string | null, id: number) => {
    try {
        const result = await axios.get(`${baseAdminURL}items/${id}`, {
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
            message = 'Get item detail unsuccessful'
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
