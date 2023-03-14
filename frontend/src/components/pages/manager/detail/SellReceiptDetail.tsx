import {useContext, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {IMAGES} from "../../../../utils/images/images";
import {AuthContext} from "../../../../context/AuthContext";
import {getDetailSellReceipt} from "../../../../api/manager/item/sell/request";
import InputItem from "../../../atoms/InputItem";
import {Controller} from "react-hook-form";
import Select from "react-select";


export default function ManagerSellReceiptDetail() {
    const {token, user, permission} = useContext(AuthContext)
    const {id} = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState({
        content: '',
        createdAt: 0,
        finalPrice: 0,
        items: [],
        note: '',
        customer: {fullName: '', email: '', address: '', avatarImage: '', bankName: '', bankAccount: '', bankOwner: ''},
        staff: {fullName: '', id: 0},
        totalPrice: 0,
        updatedAt: 0,
        saleOff: 0
    })

    const handleBack = () =>  {
        const idLength = String(id).length;
        const currentPathLength = String(window.location.href).length
        const length = (process.env.REACT_APP_MANAGER_ROOT_URL)?.length;
        const path = window.location.href.substring(length || 22, currentPathLength - idLength -1)
        navigate(`/${path}`)
    }

    useEffect(() => {
        (async () => {
            const idNumber = Number(id)
            const result = await getDetailSellReceipt(token, idNumber);
            setData(result.data)
        })()
    }, [])

    return (
        <div className='flex flex-col space-y-5'>
            <div className='flex flex-row items-center space-x-4'>
                <button onClick={handleBack}>
                    <svg height={32} width={32} >{IMAGES.icon.backBlackIcon}</svg>
                </button>
                <div className='text-2xl text-black font-bold'>Sell Receipt Information</div>
            </div>
            <div className='overflow-y-auto space-y-28 px-14 py-10 bg-white border-2 border-gray-200 rounded-lg'>
                <div className='flex flex-col space-y-5'>
                    <div className='flex flex-col bg-white space-y-5 '>
                        <div className='grid grid-cols-4'>
                            <div className='flex flex-col space-y-2 col-span-3'>
                                <div className='text-xl underline font-bold mb-5 '>Receipt main information</div>
                                <div className='w-full grid grid-cols-6 items-center' >
                                    <div className='font-semibold col-span-1'>Content: </div>
                                    <div className='col-span-5'> {data.content}</div>
                                </div>
                                <div className='w-full grid grid-cols-6 items-center' >
                                    <div className='font-semibold col-span-1'>Customer: </div>
                                    <div className='col-span-5'> {data.customer.fullName} ({data.customer.email})</div>
                                </div>
                                <div className='w-full grid grid-cols-6 items-center' >
                                    <div className='font-semibold col-span-1'>Customer addr: </div>
                                    <div className='col-span-5'> {data.customer.address}</div>
                                </div>
                                <div className='w-full grid grid-cols-6 items-center' >
                                    <div className='font-semibold col-span-1'>Bank account: </div>
                                    <div className='col-span-5'>
                                        <div className='font-semibold'>
                                            {data.customer.bankOwner}
                                        </div>
                                        <div >
                                            {data.customer.bankAccount} {data.customer.bankName? (' (' + data.customer.bankAccount + ')'): ''}
                                        </div>

                                    </div>
                                </div>
                                <div className='w-full grid grid-cols-6 items-center' >
                                    <div className='font-semibold col-span-1'>Time: </div>
                                    <div className='col-span-5'> {new Date(Number(data.createdAt)).toLocaleString()}</div>
                                </div>
                                <div className='w-full grid grid-cols-6 items-center' >
                                    <div className='font-semibold col-span-1'>Note: </div>
                                    <div className='col-span-5'> {data.note}</div>
                                </div>
                                <div className='w-full grid grid-cols-6 items-center' >
                                    <div className='font-semibold col-span-1'>Total price: </div>
                                    <div className='col-span-5'> {data.totalPrice.toLocaleString() + " VND"}</div>
                                </div>
                                <div className='w-full grid grid-cols-6 items-center' >
                                    <div className='font-semibold col-span-1'>Staff: </div>
                                    <div className='col-span-5'> {data.staff?.id === user?.id ? (data.staff?.fullName + ' (You)') : data.staff?.fullName}</div>
                                </div>
                            </div>
                            <div className='col-span-1'>
                                <img src={data.customer.avatarImage}/>
                            </div>
                        </div>
                        <br/>
                    </div>

                    <div className='text-xl underline font-bold'>Items</div>
                    <div className='flex flex-row items-start space-x-3'>
                        <div className='w-full grid grid-cols-1'>
                            {
                                <div className=" text-lg font-bold text-white bg-blue-400 grid grid-cols-12 gap-2 px-3 py-1.5">
                                    <div className='col-span-1'> Image </div>
                                    <div className='col-span-3'> Items </div>
                                    <div className='col-span-2'> Price </div>
                                    <div className='col-span-1'> Quantity </div>
                                    <div className='col-span-3'> Voucher </div>
                                    <div className='col-span-2'> Final price </div>
                                </div>
                            }
                            {
                                data.items.map((item: any) => {
                                    return (
                                        <div className='grid grid-cols-12 bg-white space-y-2 border-2 border-gray-200 items-center' key={item.itemId}>
                                            <div className='col-span-1 px-2 py-2'>
                                                <div className="">
                                                    <img
                                                         src={item.item.image}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-span-3 px-2 py-2'>
                                                {item.item.name}
                                            </div>
                                            <div className='col-span-2 px-2 py-2 text-blue-500 font-semibold'>
                                                {item.item.price.toLocaleString() + "VND"}
                                            </div>
                                            <div className='col-span-1 px-2 py-2'>
                                                {item.quantity}
                                            </div>
                                            <div className='col-span-3 px-2 py-2'>
                                            <div className='flex flex-col'>
                                                    <div> {item.voucher?.content || ''}</div>
                                                    <div> {item.voucher?.offString || ''}</div>
                                                </div>
                                            </div>
                                            <div className='col-span-2 px-2 py-2 text-blue-500 font-semibold'>
                                                {(item.item.price * item.quantity* (1-(item.voucher?.offValue/100 || 0))).toLocaleString() + "VND"}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='flex flex-row px-5 justify-end text-xl font-bold text-blue-600'>
                        Total price of all receipt: {data.finalPrice.toLocaleString() + " VND"}
                    </div>
                </div>
            </div>

        </div>
    );
}



