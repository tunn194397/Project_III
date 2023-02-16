import {useForm} from "react-hook-form";
import {useContext, useEffect, useMemo, useState} from "react";
import InputItem from "../../../atoms/InputItem";
import {AuthContext} from "../../../../context/AuthContext";
import {IMAGES} from "../../../../utils/images/images";
import {useNavigate} from "react-router-dom";
import {getListItems} from "../../../../api/manager/item/item/request";
import {toast} from "react-toastify";
import {getList} from "../../../../api/manager/customer/request";
import {createNewSellReceipt} from "../../../../api/manager/item/sell/request";
import {getListVoucher} from "../../../../api/manager/voucher/request";

export default function ManagerCreateSellReceipt() {
    const {token, user} = useContext(AuthContext)
    const [customer, setCustomer] = useState([])
    const [voucher, setVoucher] = useState([])
    const [countReceiptItem, setCountReceiptItem] = useState(1)
    const [deleteArray, setDeleteArray] = useState([-1])
    const [allItems, setAllItems] = useState([])
    const navigate = useNavigate()
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        criteriaMode: "all"
    });

    const changeToCreateCustomerPage = () => {
        const idLength = 17;
        const currentPathLength = String(window.location.href).length
        const length = (process.env.REACT_APP_MANAGER_ROOT_URL)?.length;
        const path = window.location.href.substring(length || 22, currentPathLength - idLength -1)
        navigate(`/${path}/customers`)
    }

    const [fields, setFields] = useState([
        {
            domain: 'receipt', domainTitle: 'Receipt',
            fields: [
                {field: 'content', label: 'Content ', type: 'input', editable: true},
                {field: 'customerId', label: 'Customer', type: 'select', options: customer, editable: true},
                {field: 'note', label: 'Special note ', type: 'input', editable: true},
                {field: 'voucherId', label: 'Voucher', type: 'select', options: voucher, editable: true},
            ]
        }
    ])

    const [receiptItems, setReceiptItems]= useState([
        {
            domain: 'receiptItems[0]', domainTitle: '',
            fields: [
                {field: 'itemId', label: 'Item ', type: 'select', options: allItems, editable: true},
                {field: 'quantity', label: 'Quantity', type: 'input', editable: true},
            ]
        },
    ])


    const handleBack = () =>  {
        const idLength = 6;
        const currentPathLength = String(window.location.href).length
        const length = (process.env.REACT_APP_MANAGER_ROOT_URL)?.length;
        const path = window.location.href.substring(length || 22, currentPathLength - idLength -1)
        navigate(`/${path}`)
    }

    const handleAddNewReceiptItem = () => {
        const count = countReceiptItem;
        setReceiptItems((prevState: any) => ([
            ...prevState , {
                domain: `receiptItems[${count}]`, domainTitle: '',
                fields: [
                    {field: 'itemId', label: 'Item ', type: 'select', options: allItems, editable: true},
                    {field: 'quantity', label: 'Quantity', type: 'input', editable: true},
                ]
            }
        ]))
        setCountReceiptItem((prevState: number) => (prevState + 1))
    }

    const handleDelete = (domain: any) => {
        const receiptItemTmp = receiptItems;
        const newReceiptItem = []; let index = 0;
        const newDeleteArray = deleteArray;
        for (let i = 0; i < receiptItemTmp.length; i ++) {
            if (receiptItemTmp[i].domain === domain) {
                index = i;
                newDeleteArray.push(i)
                break;
            }
        }

        for (let i = 0; i < receiptItemTmp.length; i ++) {
            if (index !== i ) {
                newReceiptItem.push(receiptItemTmp[i])
            }
        }

        setReceiptItems(newReceiptItem)
        setDeleteArray(newDeleteArray)
    }

    const onSubmit = async (body: any) => {
        const lastReceiptItems: any[] =[];
        for (let i = 0; i < body.receiptItems.length; i ++) {
            if (!deleteArray.includes(i)) {
                lastReceiptItems.push(body.receiptItems[i])
            }
        }
        body.receiptItems = lastReceiptItems.map((e: any) => {
            return {itemId: Number(e.itemId), quantity: Number(e.quantity)}
        })
        body.receipt.staffId = user?.id

        console.log(body)

        const createResult = await createNewSellReceipt(token, body)
        if (createResult.meta.message === "Successful") {
            toast.success("Create new sell receipt successfully!")
        }
        else toast.error("Create new sell receipt unsuccessfully!")
        handleBack()
    }

    useMemo(() => {
        (async () => {
            const customers = await getList(token, {page:1, pageSize: 100000000, registerType: null, registerStaffId: null, level: null, minScore: null, maxScore: null, status: null, searchString: '', orderBy: '', orderField: ''})
            const customerOptions = customers.data.result.map((e: any) => {
                return {value: e.id, message: e.name + " - " + e.email + " - " + e.phone, label: e.name + " - " + e.email + " - " + e.phone}
            })
            customerOptions.push({value: 0, message: 'All', label: ''})
            setCustomer(customerOptions)

            const vouchers = await getListVoucher(token, {page: 1, pageSize:10000000, deviceType: null, deviceBranch: null, startedAt: null, finishedAt: null, minOff: null, maxOff: null, status: null, searchString: '', orderBy: '', orderField: ''})
            const voucherOptions = vouchers.data.result.map((e: any) => {
                return {value: e.id, message: e.content + " [ " + e.offString + "]", label: e.content + " [ " + e.offString + "]"}
            })
            setVoucher(voucherOptions)

            const fieldToAddObject = fields;
            (fieldToAddObject[0].fields)[1].options= customerOptions;
            (fieldToAddObject[0].fields)[3].options= voucherOptions;
            setFields(fieldToAddObject)

            const items = await getListItems(token, {page: 1, pageSize: 10000000, searchString: '', orderBy: '', orderField: '', minPrice: null, maxPrice: null, supplyId: null, deviceType: null, branch: null})
            const itemOptions = items.data.result.map((e: any) => {
                return {value: e.id, message: e.name + e.productionCode, label: e.name + e.productionCode}
            })
            setAllItems(itemOptions)
            const receiptItemObject = receiptItems;
            (receiptItemObject[0]).fields[0].options = itemOptions;
            setReceiptItems(receiptItemObject)
        })()
    }, [])

    return (
        <div className='bg-gray-100 space-y-5 '>
            <div className='flex flex-row items-center space-x-4'>
                <button onClick={handleBack}>
                    <svg height={32} width={32} >{IMAGES.icon.backBlackIcon}</svg>
                </button>
                <div className='text-2xl text-black font-bold'>New sell receipt</div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='overflow-y-auto space-y-28 px-3 py-5 bg-white border-2 border-gray-200 rounded-lg'>
                <div className='flex flex-col space-y-5'>
                    {
                        fields.map((domain: any) => {
                            return (
                                <div className='flex flex-col bg-white space-y-5 border-2 border-gray-200 px-10 py-5 rounded-md' key={domain.domain}>
                                    <div className='text-lg font-semibold'>{domain.domainTitle}</div>
                                    <hr/>
                                    <div className='grid grid-cols-3 gap-5'>
                                        {domain.fields.map((e: any ) => {
                                            return (
                                                <div key={e.field} className='space-y-1' >
                                                    <div className='text-sm'>{e.label}</div>
                                                    <InputItem domain={domain.domain} field={e} register={register} control={control} errors={errors} isEdit={true}></InputItem>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <br/>
                                </div>
                            )
                        })
                    }
                    <div className='flex flex-row items-start space-x-6'>
                        <button className="text-white ring-2 hover:ring-4 ring-blue-200 bg-blue-700 font-bold py-2 px-4 rounded-md w-1/12" type="button" onClick={handleAddNewReceiptItem}> Add  </button>
                        <div className='w-11/12 grid grid-cols-2 gap-3'>
                            {
                                receiptItems.map((domain: any) => {
                                    return (
                                        <div className='flex flex-col bg-white space-y-2 border-2 border-gray-200 rounded-md' key={domain.domain}>
                                            <div className='flex flex-row justify-end pr-1 pt-1'>
                                                <button type="button" onClick={() => handleDelete(domain.domain)}>
                                                    <svg height={15} width={15}>{IMAGES.icon.xMark}</svg>
                                                </button>
                                            </div>
                                            <div className= 'grid grid-cols-2 gap-2 px-3 pb-2'>
                                                {domain.fields.map((e: any ) => {
                                                    return (
                                                        <div key={e.field} className='space-y-1' >
                                                            <div className='text-sm'>{e.label}</div>
                                                            <InputItem domain={domain.domain} field={e} register={register} control={control} errors={errors} isEdit={true}></InputItem>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <button className="text-white ring-2 hover:ring-4 ring-blue-200 bg-blue-700 font-bold py-2 px-4 rounded-md" type="submit"> Create new import receipt  </button>
                    <button className="text-white ring-2 hover:ring-4 ring-blue-200 bg-green-500 font-bold py-2 px-4 rounded-md" type="button" onClick={changeToCreateCustomerPage}> Registor for new customer?  </button>
                </div>
            </form>
        </div>
    );
}