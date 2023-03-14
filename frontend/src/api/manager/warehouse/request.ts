import axios from 'axios';
import {IGetListWarehouse} from "./types";
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;
export const getListWarehouse = async (token: string | null, props: IGetListWarehouse) => {
    try {
        const result = await axios.get(`${baseAdminURL}warehouse`, {
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
            message = 'Get list warehouse unsuccessful'
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
