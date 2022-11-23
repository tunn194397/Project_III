export interface ISuccessResponse {
    meta: {
        code: number;
        message: string;
        pagination: any;
    };
    data: any;
}

export interface IError {
    meta: {
        code: number;
        message: string[] | string;
    };
}

export interface IPaginationRequest {
    page: number;
    limit: number;
}
export interface IPaginationResponse {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface IOffersRequest {
    owner?: any;
    bidder?: any;
    tokenId?: any;
    page: number;
    limit: number;
}

export interface IOffersResponse {
    bid_id?: number;
    bidder?: string;
    block_timestamp?: string;
    contract_address?: string;
    created_at?: string;
    exp_time?: string;
    human_owner?: string;
    id?: number;
    meta_data?: null;
    owner?: string;
    payment_token?: string;
    price?: string;
    is_active?: number;
    token_address?: string;
    token_id?: 182;
    token_uri?: string;
    updated_at?: string;
    expTime?: string;
    createdAt?: string;
    updatedAt?: string;
    isActive?: number;
    paymentToken?: string;
    bidId?: number;
    blockTimestamp?: string;
    owner_name?: string | null;
    bidder_name?: string | null;
    owner_email?: string | null;
    bidder_email?: string | null;
}
