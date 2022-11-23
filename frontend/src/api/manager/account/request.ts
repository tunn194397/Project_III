import axios from 'axios';
import { ILoginRequest, IRegisterRequest } from './types';
const baseAdminURL = `${process.env.REACT_APP_BE_HOST}`;
export const adminLogin = async (props: ILoginRequest) => {
  try {
    const result = await axios.post(`${baseAdminURL}auth/manager/login`, props);
    return {
      success: true,
      data: result.data,
      message: 'Login successfully!'
    };
  } catch (error: unknown) {
    let message = '';
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 423) {
        message = 'Your account is not available!';
      } else if (error.response?.status === 424) {
        message = 'Your password is incorrect!';
      } else {
        message = 'Please complete the all input!';
      }
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


