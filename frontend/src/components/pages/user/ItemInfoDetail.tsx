import {Controller, useForm} from "react-hook-form";
import InputItem from "../../atoms/InputItem";
import {useContext, useEffect, useState} from "react";
import UserInputItem from "./UserInputItem";
import {AuthContext} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {addNewItemToCart} from "../../../api/user/cart/request";

export default function UserInfoItemDetail(props: any) {
    const {data, buttonPermission, detail} = props;
    const navigate = useNavigate();
    const {token, user} = useContext(AuthContext)
    const [openParam, setOpenParam] = useState(false)

    const handleAddCart = async () => {
        const addResult = await addNewItemToCart(token, {itemId: detail?.id, customerId: user?.id});
        if (addResult.meta.message === 'Successful') {
            toast.success('Add new item to your cart successfully!')
        }
        else toast.error(addResult.message)
        navigate('/user/cart')
    }

    return (
        <div className="bg-white px-5 py-5 border-[1px] border-gray-200 rounded-xl space-y-14">
            <div className='grid grid-cols-2 gap-10'>
                {data.map((domain: any) => {
                    return (
                        (domain.domain !== 'Parameters Detail') ?
                            (
                                <div key={domain.domain} className={`flex flex-col space-y-5`}>
                                    <div className="flex flex-col space-y-5 ">
                                        <div className="text-xl font-semibold underline">{domain.domain}</div>
                                        <div className='grid grid-cols-1 space-y-1'>
                                            {
                                                domain.fields.map((e: any) => {
                                                    return (
                                                        (e.type === 'image') ?
                                                            <UserInputItem field={e}></UserInputItem>
                                                        :
                                                            <div key={e.field} className='grid grid-cols-3 items-center'>
                                                                <div className={`text-sm font-semibold pl-10 col-span-1}`}>{e.label}:</div>
                                                                <div className={'col-span-2'} >
                                                                    <UserInputItem field={e}></UserInputItem>
                                                                </div>
                                                            </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            ) : <></>
                    )
                })}
            </div>
            {openParam ? (
                <div className=''>
                    {data.map((domain: any) => {
                        return (
                            (domain.domain === 'Parameters Detail') ?
                                (
                                    <div key={domain.domain} className={`flex flex-col space-y-8`}>
                                        <div className="text-xl font-semibold underline">{domain.domain}</div>
                                        <div className="flex flex-col space-y-2 w-3/5">
                                            {
                                                domain.fields.map((e: any) => {
                                                    return (
                                                        <div key={e.field} className='px-10'>
                                                            <div className='grid grid-cols-2 gap-x-2 items-center'>
                                                                <div className={`text-sm font-semibold col-span-1}`}>{e.label}:</div>
                                                                <div className={'col-span-1'} >
                                                                    <UserInputItem field={e}></UserInputItem>
                                                                </div>
                                                            </div>
                                                            <hr className="border-[1.5px] border-gray-200"/>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                ) : <></>
                        )
                    })}
                </div>
            ) : <></>}
            <div className='space-y-3'>
                <div className="flex flex-row justify-end text-xl font-bold text-blue-700">
                    Price: {detail.price?.toLocaleString() + " VND"}
                </div>
                <div className='flex flex-row justify-between'>
                    {
                        !openParam ? <button
                            className="text-gray-800 border-[1px] border-black hover:ring-[3px] ring-gray-400 hover:ring-blue-400 font-bold py-1.5 px-5 rounded-md"
                            onClick={() => {setOpenParam(true)}}
                            type="button"
                        >
                            See many parameter
                        </button> : <button
                            className="text-gray-800 border-[1px] border-black hover:ring-[3px] ring-gray-400 hover:ring-blue-400 font-bold py-1.5 px-5 rounded-md"
                            onClick={() => {setOpenParam(false)}}
                            type="button"
                        >
                            Collapse
                        </button>
                    }
                    {
                        (!token) ?
                            <div>
                                <div className="space-x-2">
                                    You need to <a onClick={()=> {navigate('/user/login')}} className='text-blue-500 font-bold underline'> login </a> for buy this item! Or just<a onClick={()=> {navigate('/user/register')}} className='text-orange-500 font-bold underline'>register</a>!
                                </div>
                            </div>
                            :
                            <div className="space-x-2">
                                <button
                                    className="text-white border-[1px] border-black hover:ring-[3px] ring-blue-400 hover:ring-blue-400 bg-orange-400 font-bold py-1.5 px-5 rounded-md"
                                    type="button"
                                    onClick={handleAddCart}
                                >
                                    Add to your cart
                                </button>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}