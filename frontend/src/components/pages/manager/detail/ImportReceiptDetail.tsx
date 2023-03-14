import {useContext, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {IMAGES} from "../../../../utils/images/images";
import {AuthContext} from "../../../../context/AuthContext";
import {getDetailImportReceipt} from "../../../../api/manager/item/supply/request";

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


export default function ManagerImportReceiptDetail() {
    const {token, user, permission} = useContext(AuthContext)
    const {id} = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState({
        content: '',
        createdAt: 0,
        finalPrice: 0,
        items: [],
        note: '',
        supplyId: 0,
        supply: {name: "", imageUrl: ''},
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
            const result = await getDetailImportReceipt(token, idNumber);
            setData(result.data)
        })()
    }, [])

    return (
        <div className='flex flex-col space-y-5'>
            <div className='flex flex-row items-center space-x-4'>
                <button onClick={handleBack}>
                    <svg height={32} width={32} >{IMAGES.icon.backBlackIcon}</svg>
                </button>
                <div className='text-2xl text-black font-bold'>Import Receipt Information</div>
            </div>
            <div className='overflow-y-auto space-y-28 px-14 py-10 bg-white border-2 border-gray-200 rounded-lg'>
                <div className='flex flex-col space-y-5'>
                    <div className='flex flex-col bg-white space-y-4 '>
                        <div className='grid grid-cols-3'>
                            <div className='flex flex-col space-y-2 col-span-2'>
                                <div className="text-lg font-semibold underline">Receipt main information </div>
                                <div className='grid grid-cols-4 gap-2 px-4 items-center '>
                                    <div className='col-span-1 font-semibold'>Content:</div>
                                    <div className='col-span-3'>{data.content}</div>

                                    <div className='col-span-1 font-semibold'>Time:</div>
                                    <div className='col-span-3'>{new Date(Number(data.createdAt)).toLocaleString()}</div>

                                    <div className='col-span-1 font-semibold'>Note:</div>
                                    <div className='col-span-3'>{data.note}</div>

                                    <div className='col-span-1 font-semibold'>Sale Off:</div>
                                    <div className='col-span-3'>{data.saleOff + " %"}</div>

                                    <div className='col-span-1 font-semibold'>Total Price:</div>
                                    <div className='col-span-3'> {data.totalPrice?.toLocaleString() + " VND"}</div>

                                    <div className='col-span-1 font-semibold'>Final Price:</div>
                                    <div className='col-span-3'>{data.finalPrice?.toLocaleString() + " VND"}</div>

                                    <div className='col-span-1 font-semibold'>Supply:</div>
                                    <div className='col-span-3'>{data.supply.name}</div>
                                </div>
                            </div>
                            <div className='col-span-1 w-full'>
                                <img className='w-full' src={data.supply.imageUrl}/>
                            </div>
                        </div>
                        <br/>
                    </div>

                    <div className='text-xl underline font-bold'>Items</div>
                    <div className='flex flex-row items-start space-x-3'>
                        <div className='w-full grid grid-cols-1'>
                            {
                                <div className=" text-lg font-bold text-white bg-blue-400 grid grid-cols-12 gap-2 px-3 py-1.5">
                                    <div className='col-span-2'> Image </div>
                                    <div className='col-span-4'> Items </div>
                                    <div className='col-span-2'> Price </div>
                                    <div className='col-span-2'> Quantity </div>
                                    <div className='col-span-2'> Final price </div>
                                </div>
                            }
                            {
                                data.items.map((item: any) => {
                                    return (
                                        <div className='grid grid-cols-12 bg-white space-y-2 border-2 border-gray-200 items-center' key={item.itemId}>
                                            <div className='col-span-2 px-2 py-2'>
                                                <div className="">
                                                    <img
                                                        src={item.item.image}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-span-4 px-2 py-2'>
                                                {item.item.name}
                                            </div>
                                            <div className='col-span-2 px-2 py-2 text-blue-500 font-semibold'>
                                                {item.item.price.toLocaleString() + "VND"}
                                            </div>
                                            <div className='col-span-2 px-2 py-2'>
                                                {item.quantity}
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



