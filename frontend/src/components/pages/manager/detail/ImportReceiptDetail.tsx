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
        supply: {name: ""},
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
            <div className='bg-white flex flex-col px-10 py-10 w-full space-y-14 border-2 border-gray-200 rounded-lg'>
                <div className='flex flex-col space-y-5'>
                    <div className="text-lg font-semibold underline"> Receipt Detail </div>
                    <div className='grid grid-cols-3 space-y-2 px-4 items-center w-1/2'>
                        <div className='col-span-1 font-semibold'>Content:</div>
                        <div className='col-span-2'>{data.content}</div>

                        <div className='col-span-1 font-semibold'>Time:</div>
                        <div className='col-span-2'>{new Date(Number(data.createdAt)).toLocaleString()}</div>

                        <div className='col-span-1 font-semibold'>Note:</div>
                        <div className='col-span-2'>{data.note}</div>

                        <div className='col-span-1 font-semibold'>Sale Off:</div>
                        <div className='col-span-2'>{data.saleOff + " %"}</div>

                        <div className='col-span-1 font-semibold'>Total Price:</div>
                        <div className='col-span-2'> {data.totalPrice?.toLocaleString() + " VND"}</div>

                        <div className='col-span-1 font-semibold'>Final Price:</div>
                        <div className='col-span-2'>{data.finalPrice?.toLocaleString() + " VND"}</div>

                        <div className='col-span-1 font-semibold'>Supply:</div>
                        <div className='col-span-2'>{data.supply.name}</div>
                    </div>
                </div>
                <hr/>
                <div className='flex flex-col space-y-5'>
                    <div className="text-lg font-semibold underline"> Item Imported in Receipt </div>
                    <div className='grid grid-cols-3 gap-3'>
                        {
                            data.items.map((e: any) => {
                                return (
                                    <div className='grid grid-cols-4 border-2 border-gray-200 rounded-md space-x-3 px-2 py-2' key={e.id}>
                                        <div className='flex flex-col col-span-3'>
                                            <div> Item </div>
                                            <input
                                                className="border rounded w-full py-2 px-3 text-gray-700 outline-none text-sm focus:border-blue-500 focus:border-2"
                                                type="text"
                                                defaultValue={e.name}
                                                disabled={true}
                                            />
                                        </div>
                                        <div className='flex flex-col col-span-1'>
                                            <div> Quantity </div>
                                            <input
                                                className="border rounded w-full py-2 px-3 text-gray-700 outline-none text-sm focus:border-blue-500 focus:border-2"
                                                type="text"
                                                defaultValue={e.quantity}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}



