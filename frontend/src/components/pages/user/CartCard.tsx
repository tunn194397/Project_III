import {useContext, useEffect, useMemo, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {getListCart} from "../../../api/user/cart/request";

const buttonPermission = {
    total: 'MANAGER_CUSTOMER_VIEW',
    edit: 'MANAGER_CUSTOMER_UPDATE',
    save: 'MANAGER_CUSTOMER_UPDATE',
    submit: 'MANAGER_CUSTOMER_SUBMIT',
    approve: 'MANAGER_CUSTOMER_APPROVE'
}
const statusOptions = [
    {value: 'NEW', label: 'New'},
    {value: 'OUT_DATED', label: 'Out of date'},
    {value: 'DELETED', label: 'Deleted'},
]

export default function CartCard(props: any) {

    const {cartDetail} = props;

    return (
        <div className='grid grid-cols-4 border-gray-200 w-4/5 px-5 py-3 rounded-lg bg-white'>
            <div className='col-span-1 items-center text-center'>
                <img src={cartDetail.item.image} className=''/>
            </div>
            <div className='text-sm font-semibold col-span-3'>
                {cartDetail.item.name}
            </div>
        </div>
    );
}



