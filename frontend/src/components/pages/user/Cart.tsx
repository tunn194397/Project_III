import {useContext, useEffect, useMemo, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {deleteOneItemInCart, getListCart, updateBankInformation} from "../../../api/user/cart/request";
import {useForm} from "react-hook-form";
import CreatePopUp from "../../molecules/CreatePopUp";
import {IMAGES} from "../../../utils/images/images";
import {createNewSellReceipt} from "../../../api/manager/item/sell/request";
import {toast} from "react-toastify";
import {getDetailUser} from "../../../api/user/auth/request";
import {useNavigate} from "react-router-dom";

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

const headers = [
    {title: 'image', width: 'col-span-1'},
    {title: 'product code ', width: 'col-span-2'},
    {title: 'name', width: 'col-span-3'},
    {title: 'price', width: 'col-span-2'},
    {title: 'quantity', width: 'col-span-1'},
    {title: '', width: 'col-span-1'},
]

export default function UserCart() {
    const {token, user, permission} = useContext(AuthContext)
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const initData : any[] = []
    const [pushData, setPushData] = useState(initData)
    const [needReload, setNeedReload] = useState(false)
    const [isBuy, setIsBuy] = useState(false)
    const [userObject, setUserObject] = useState({bankName: '', bankAccount: '', bankOwner: '', phone: '', address: ''})
    const [fieldToAdd, setFieldToAdd] = useState([
        {
            domain: 'bankInformation', domainTitle: 'Bank Information',
            fields: [
                {field: 'bankName', label: 'Bank name ', type: 'input', editable: true, defaultValue: user?.bankName || ''},
                {field: 'bankAccount', label: 'Bank account', type: 'input', editable: true, defaultValue: user?.bankAccount || ''},
                {field: 'bankOwner', label: 'Bank owner', type: 'input', editable: true, defaultValue: user?.bankOwner || ''},
                {field: 'phone', label: 'Your phone ', type: 'input', editable: true, defaultValue: user?.phone || ''},
                {field: 'address', label: 'Address ', type: 'input', editable: true, defaultValue: user?.address || ''}
            ]
        }
    ])

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        criteriaMode: "all"
    });

    const onSubmit =  (body: any) => {
        const pushDataObject : any[] = []

        const itemIdArray = data.map((e: any) => {return e.itemId})
        Object.keys(body).map((e: any) => {
            if (e !== 'undefined' && itemIdArray.includes(Number(e))) pushDataObject.push({itemId: Number(e), quantity: Number(body[e].quantity)})
        })

        let newPrice = 0;
        pushDataObject.map((push: any) => {
            data.map((e: any) => {
                if (e.item.id === push.itemId) {
                    newPrice += e.item.price * push.quantity
                    push.image = e.item.image
                    push.name = e.item.name
                    push.productionCode = e.item.productionCode
                    push.price = e.item.price
                    push.remainQuantity = e.remainQuantity
                }
            })
        })

        setPushData(pushDataObject)
        setTotalPrice(newPrice)
        setIsBuy(true)
    }

    const handleAddBankAccount = async (body: any) => {
        const updateBankResult = await updateBankInformation(token, {...body.bankInformation, customerId: user?.id})
        if (updateBankResult.meta.message === "Successful") {
            toast.success("Update bank information successfully!")
        }
        else toast.error("Update bank information unsuccessfully!")

        setIsBuy(false)
    }

    const handleAgreeBuy = async () => {
        const receiptItems = pushData.map((e: any) => {
            return {itemId: e.itemId, quantity: e.quantity}
        })
        const bodyToCreateSellReceipt = {
            receipt: {
                customerId: user?.id || 0,
                staffId: 0,
                content: '',
                note: '',
                voucherId: 0
            },
            receiptItems: receiptItems
        }
        const createResult = await createNewSellReceipt(token, bodyToCreateSellReceipt)
        if (createResult.meta.message === "Successful") {
            toast.success("Buy items successfully!")
        }
        else toast.error("Buy items unsuccessfully!")

        setIsBuy(false)
    }

    const handleDeleteCart = async (id: number) => {
        const result = await deleteOneItemInCart(token, {cartId: Number(id), customerId: Number(user?.id)})
        setNeedReload(!needReload)
    }

    useEffect(() => {
        (async () => {
            const result = await getListCart(token, {customerId: user?.id});
            setData(result.data.carts)

            const currentUser = await getDetailUser(token, {id: Number(user?.id)})
            setUserObject(currentUser.data.data)
        })()
    }, [isBuy, needReload])

    return (
        <div className='w-full px-3 py-3'>
            <div className='w-full px-8 py-5 overflow-y-auto bg-cover bg-center transition-all ease-in-out duration-1000 transform translate-x-0 slide'>
                <form onSubmit={handleSubmit(onSubmit)} className='border-2 border-gray-200 rounded-lg bg-white'>
                    {!data.length ?
                        <div className='bg-white w-full text-lg font-semibold text-center py-20'>
                            You have no item in cart. Just add some items!
                        </div>
                        :
                        <table className='w-full rounded-md '>
                            <thead className='capitalize bg-gray-100 '>
                            <tr>
                                {
                                    headers.map((header: any, index: number) => {
                                        return (
                                            <th className={`py-2 px-4 border-y border-gray-300 text-black grid-cols-12`} key={'header-'+ index}>
                                                <div className={`items-center ${header.width}`}>
                                                    {header.title}
                                                </div>
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data.map((e: any) => {
                                    return (
                                        <tr className='border-gray-200 border-b-2 px-5 py-3 rounded-lg bg-white w-full grid-cols-12 hover:bg-blue-50' key={e.id} onClick={()=> {navigate(`/user/items/${e.item.id}`)}}>
                                            <td className='col-span-1 items-center text-center px-2'>
                                                <img src={e.item?.image} className='w-[150px]'/>
                                            </td>
                                            <td className='text-sm font-semibold items-center text-center  col-span-3 px-2' >
                                                {e.item?.productionCode}
                                            </td>
                                            <td className='text-sm font-semibold items-center text-center  col-span-3 px-2' >
                                                {e.item?.name}
                                            </td>
                                            <td className='text-sm font-semibold items-center text-center  col-span-2 px-2'>
                                                {e.item?.price.toLocaleString() + " VND"}
                                            </td>
                                            <td className='text-sm font-semibold items-center text-center col-span-1 px-2'>
                                                <div>
                                                    <input
                                                        className="border rounded py-1 px-3 w-[70px] text-gray-700 outline-none text-sm"
                                                        type="number"
                                                        min={0}
                                                        defaultValue= {e.quantity || 1}
                                                        {...register(`${e.item?.id}.quantity`, {required: true})}
                                                    />
                                                    <div>
                                                        (Remain: {e?.remainQuantity || 0 } item)
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-sm font-semibold items-center text-center  col-span-1 px-2'>
                                                <button type='button' onClick={()=>handleDeleteCart(e.cartId)} className=' px-3 border-2 border-gray-100 rounded-full bg-orange-400 text-white'>
                                                    -
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    }
                    { data.length !== 0 && <div className='px-10 py-3 flex flex-row justify-end items-center space-x-5'>
                        <div className="space-x-2">
                            <button
                                className="text-white border-[1px] border-black hover:ring-[3px] ring-gray-400 hover:ring-blue-400 bg-blue-500 font-bold py-1.5 px-5 rounded-md"
                                type="submit"
                            >
                                Buy now!
                            </button>
                        </div>
                    </div>}
                </form>
            </div>

            {
                (isBuy) &&
                (
                    (!userObject?.bankName || !userObject?.bankAccount || !userObject?.bankOwner || !userObject?.address || !userObject?.phone)
                        ?
                        <CreatePopUp
                            setOpenAdd={setIsBuy}
                            title={'Add your bank information'}
                            fields={fieldToAdd}
                            handleCreateNew={handleAddBankAccount}
                        ></CreatePopUp>
                        :
                        <div className='fixed mx-auto my-auto inset-0 py-3 overflow-y-auto w-2/5 bg-gray-100 shadow-gray-300 shadow-xl rounded-lg'>
                            <div className="flex flex-col px-5 py-3 space-y-2">
                                <div className='flex flex-col space-y-5'>
                                    <div className='font-semibold text-lg underline'> Items </div>
                                    {
                                        pushData.map((e: any) => {
                                            return <div className='grid grid-cols-12 gap-2 items-center' key={e.itemId}>
                                                <div className='text-sm col-span-2'><img src={e.image}/></div>
                                                <div className='text-sm col-span-5'>{e.name}</div>
                                                <div className='text-sm col-span-3'>{(e.price * e.quantity).toLocaleString() + "VND"}</div>
                                                <div className={`text-sm col-span-2 ${e.quantity > e.remainQuantity ? 'text-red-500' : ''}`}>{e.quantity + (e.quantity > e.remainQuantity ? ' (Out of item) ': '') }</div>
                                            </div>
                                        })
                                    }
                                    <hr className='border-2 border-gray-200'/>
                                </div>
                            </div>
                            <div className="flex flex-col px-5 py-3 space-y-2">
                                <div className='flex flex-col space-y-5'>
                                    <div className='font-semibold text-lg underline'> Bank Information</div>
                                    <div className='grid grid-cols-2 gap-1 text-sm'>
                                        <div className='font-semibold'>Bank:</div>
                                        <div> {userObject?.bankName} </div>
                                        <div className='font-semibold'>Account:</div>
                                        <div> {userObject?.bankAccount} </div>
                                        <div className='font-semibold'>Bank Owner:</div>
                                        <div> {userObject?.bankOwner} </div>
                                        <div className='font-semibold'>Contact Number:</div>
                                        <div> {userObject?.phone} </div>
                                        <div className='font-semibold'>Address for received:</div>
                                        <div> {userObject?.address} </div>
                                    </div>
                                    <hr className='border-2 border-gray-200'/>
                                </div>
                            </div>
                            <div className="flex flex-col px-5 py-3 space-y-2 mt-8">
                                <div className='flex flex-col space-y-2'>
                                    <div className='font-semibold'> Are you really want to buy these items?</div>
                                    <div className='text-sm'> If you click yes button, you will pay for the receipt by your bank account!</div>
                                    <div className='text-sm'> Are you sure to about that?</div>
                                    <div className='text-blue-500 font-semibold text-right'>
                                        Price: {totalPrice.toLocaleString() + " VND"}
                                    </div>
                                </div>
                                <div className='flex flex-row justify-end space-x-2 items-center'>
                                    <button
                                        className="text-white border-[1px] border-black hover:ring-[3px] ring-gray-400 hover:ring-blue-400 bg-green-500 font-bold py-1.5 px-5 rounded-md disabled:bg-green-300 disabled:hover:ring-0"
                                        type="button"
                                        onClick={handleAgreeBuy}
                                        disabled = {pushData.map((e: any) => {if (e.quantity > e.remainQuantity) return true}).includes(true)}
                                    >
                                        Yes, I agree!
                                    </button>
                                    <button
                                        className="text-white border-[1px] border-black hover:ring-[3px] ring-gray-400 hover:ring-blue-400 bg-orange-500 font-bold py-1.5 px-5 rounded-md"
                                        type="button"
                                        onClick={()=>setIsBuy(false)}
                                    >
                                        Let me check it again
                                    </button>
                                </div>
                            </div>
                        </div>
                )
            }
        </div>
    );
}



