import axios from 'axios';
import { ILoginRequest, IRegisterRequest } from './types';
const baseManagerURL = `${process.env.REACT_APP_MANAGER_BE_HOST}`;
export const userLogin = async (props: ILoginRequest) => {
  try {
    const result = await axios.post(`${baseManagerURL}auth/login`, props);
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

export const registerUser = async (props: IRegisterRequest) => {
  try {
    const result = await axios.post(`${baseManagerURL}auth/register`, props);
    return {
      success: true,
      data: result.data,
      message: 'Sign up successfully!'
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: null,
        message: error.message
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
export const getAllUser = async (token: string | null, page: number, limit: number) => {
  try {
    const result = await axios.get(`${baseManagerURL}users?page=${page}&limit=${limit}`, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
        'content-type': 'application/json'
      }
    });
    return {
      success: true,
      data: result.data,
      message: 'Get list user successful!'
    };
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
          message: 'Failed to get data!'
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
};

export const deleteUserByID = async (token: string | null, id: number) => {
  try {
    const result = await axios.delete(`${baseManagerURL}users/${id}`, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
        'content-type': 'application/json'
      }
    });
    return {
      success: true,
      data: result.data,
      message: 'Delete user successful!'
    };
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
          message: 'Failed to delete user!'
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
};

export const updateUserByID = async (token: string | null, id: number, data: any) => {
  try {
    const result = await axios.patch(`${baseManagerURL}users/${id}`, data, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
        'content-type': 'application/json'
      }
    });
    return {
      success: true,
      data: result.data,
      message: 'Update user successful!'
    };
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
          message: 'Failed to update user!'
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
};

export const ChangePasswordByUserID = async (token: string | null, id: number, data: any) => {
  try {
    const result = await axios.post(`${baseManagerURL}auth/${id}/change-password`, data, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
        'content-type': 'application/json'
      }
    });
    return {
      success: true,
      data: result.data,
      message: 'Change password successful!'
    };
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
          message: error.message
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
};
