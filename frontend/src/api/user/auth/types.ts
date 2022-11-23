export interface IRegisterRequest {
    username: string;
    email: string;
    fullName: string;
    password: string;
    roleID: number;
}
export interface IRegisterResponse {
    email: string;
}
export interface ILoginRequest {
    username: string;
    password: string;
}
export interface ILoginResponse {
    id: number;
    username: string;
    email: string;
    avatarUrl: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    isActive2fa: number;
    wallet: string;
    status: string;
    data: any;
    token: string;
    isActiveKyc: number;
    type: string;
}
export interface IGetAllUser {
    id: number;
    username: string;
    fullName: string;
    email: string;
}

export interface IResendEmailRequest {
    email: string;
}
export interface IResendEmailResponse {
    email: string;
}
export interface IResetPasswordRequest {
    token: string;
    password: string;
}
export interface IResetPasswordResponse {
    id: number;
    username: string;
    email: string;
    avatarUrl: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    isActive2fa: number;
    wallet: string;
    status: string;
    data: any;
}
export interface IUserInfoResponse {
    id: number;
    username: string;
    email: string;
    avatarUrl: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    isActive2fa: number;
    wallet: string;
    status: string;
    data: any;
    token: string;
    isActiveKyc: number;
    type: string;
    isActiveEmailCode: number;
    brandId: null | number;
    group: string | number;
    brandIds: any;
}
export interface IUpdateProfileRequest {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    phone?: string;
}

export interface IUpdatePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface IRegisterExternalWalletRequest {
    email: string;
    username: string;
    address: any;
    signature: any;
}

export interface ILoginExternalWalletRequest {
    signature: any;
    address: any;
}

export interface IUpdateSendEmailCode {
    emailCode: string;
    status: boolean;
}
