import * as React from 'react';
import { createContext, useState, FC, useEffect } from 'react'

interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  fullName: string;
  avatarImage: string;
  passwordHash: string;
  birthday: string;
  nationality: string;
  roleId: number;
  bankName: string;
  bankAccount: string;
  bankOwner: string;
  phone: string;
  address: string;
  createAt: string;
  updateAt: string;
}
interface IAuthContext {
  token: string | null;
  roleId: number | null;
  isLogin: boolean | null;
  user: IUser | null;
  permission: any | null;
  setAuthData?: (token: string, roleId: number, user: IUser, permission: any) => void;
  clearAuthData?: () => void;
  setTokenRefresh?: () => void;
}

const defaultAuthContext: IAuthContext = {
  token: '',
  roleId: -1,
  isLogin: false,
  user: null,
  permission: null
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider: FC<any> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [roleId, setRoleId] = useState<number>(parseInt(localStorage.getItem('roleId') !== null ? localStorage.getItem('roleId')! : '0'));
  const [isLogin, setIsLogin] = useState<boolean | null>(localStorage.getItem('isLogin') === 'true');
  const [user, setUser] = useState<IUser | null>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null);
  const [permission, setPermission] = useState<any | null>(localStorage.getItem('permission') ? JSON.parse(localStorage.getItem('permission')!) : null);

  const setTokenRefresh = () => {
    const roleId = localStorage.getItem('roleId') !== null ? localStorage.getItem('roleId')! : '0';
    setRoleId(parseInt(roleId));
    setToken(localStorage.getItem('token'));
    setIsLogin(localStorage.getItem('isLogin') === 'true');
    setUser(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null);
    setPermission(localStorage.getItem('permission') ? JSON.parse(localStorage.getItem('permission')!) : null)
  };

  useEffect(() => {
    const roleId = localStorage.getItem('roleId') !== null ? localStorage.getItem('roleId')! : '0';
    setToken(localStorage.getItem('token'));
    setRoleId(parseInt(roleId));
    setIsLogin(localStorage.getItem('isLogin') === 'true');
    setUser(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null);
    setPermission(localStorage.getItem('permission') ? JSON.parse(localStorage.getItem('permission')!) : null);
  }, [token]);

  const setAuthData = (token: string, roleId: number, user: any, permission: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('roleId', JSON.stringify(roleId));
    localStorage.setItem('isLogin', JSON.stringify(true));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('permission', JSON.stringify(permission))
    setToken(token);
    setIsLogin(true);
    setRoleId(roleId);
    setUser(user);
    setPermission(permission)
  };
  const clearAuthData = () => {
    localStorage.clear();
    setIsLogin(false);
    setRoleId(-1);
    setToken('');
    setUser(null);
    setPermission(null)
  };

  const contextData = {
    token,
    roleId,
    isLogin,
    user,
    permission,
    setAuthData,
    clearAuthData,
    setTokenRefresh
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
