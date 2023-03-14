import {Controller, useForm} from "react-hook-form";
import {useContext, useEffect, useMemo, useState} from "react";
import InputItem from "../../../atoms/InputItem";
import {AuthContext} from "../../../../context/AuthContext";
import {IMAGES} from "../../../../utils/images/images";
import {useNavigate} from "react-router-dom";
import {getListItems} from "../../../../api/manager/item/item/request";
import {getList} from "../../../../api/manager/customer/request";
import {getListVoucher} from "../../../../api/manager/voucher/request";
import Select from "react-select";
import {createNewSellReceipt} from "../../../../api/manager/item/sell/request";
import {toast} from "react-toastify";

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
            ]
        }
    ])

    const [receiptItems, setReceiptItems]= useState([
        {
            domain: 'receiptItems[0]', domainTitle: '',
            fields: [
                {field: 'itemId', label: 'Item ', type: 'select', options: allItems, editable: true},
                {field: 'quantity', label: 'Quantity', type: 'input', editable: true},
                {field: 'voucherId', label: 'Voucher', type: 'select', options: voucher, editable: true},
            ]
        },
    ])

    const [itemDetails, setItemDetails] = useState([
        {
            domain: 'receiptItems[0]',
            image: "data:image/png;base64,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",
            price: 0,
            vouchers: []
        }
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
                    {field: 'voucherId', label: 'Voucher', type: 'select', options: voucher, editable: true},
                ]
            }
        ]))

        setItemDetails((prevState: any) => ([
            ...prevState , {
                domain: `receiptItems[${count}]`,
                image: "data:image/png;base64,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",
                price: 0,
                vouchers: []
            }
        ]))
        setCountReceiptItem((prevState: number) => (prevState + 1))
    }

    const handleDelete = (domain: any) => {
        const receiptItemTmp = receiptItems;
        const newItemDetails = [];
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
                newItemDetails.push(itemDetails[i])
            }
        }
        setReceiptItems(newReceiptItem)
        setItemDetails(newItemDetails)
        setDeleteArray(newDeleteArray)
    }

    const handleChangeItemId = (index: number, val: any) => {
        const tmpItemDetails = itemDetails;
        tmpItemDetails[index].price = val.price;
        tmpItemDetails[index].image = val.image;
        tmpItemDetails[index].vouchers = val.vouchers.map((e: any) => {
            return {
                value: e.id,
                message: e.content + " [" + e.offString +"]",
                label: e.content + " [" + e.offString +"]",
            }
        })
        setItemDetails(tmpItemDetails)
        return 0;
    }

    const onSubmit = async (body: any) => {
        const lastReceiptItems: any[] =[];
        for (let i = 0; i < body.receiptItems.length; i ++) {
            if (!deleteArray.includes(i) && body.receiptItems[i].itemId) {
                lastReceiptItems.push(body.receiptItems[i])
            }
        }
        body.receiptItems = lastReceiptItems.map((e: any) => {
            return {itemId: Number(e.itemId), quantity: Number(e.quantity), voucherId: Number(e.voucherId)}
        })
        body.receipt.staffId = user?.id

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

            const fieldToAddObject = fields;
            (fieldToAddObject[0].fields)[1].options= customerOptions;
            setFields(fieldToAddObject)

            const items = await getListItems(token, {page: 1, pageSize: 10000000, searchString: '', orderBy: '', orderField: '', minPrice: null, maxPrice: null, supplyId: null, deviceType: null, branch: null})
            const itemOptions = items.data.result.map((e: any) => {
                return {value: e.id, message: e.name + e.productionCode, label: e.name + e.productionCode, image: e.image, price: e.price, vouchers: e.vouchers }
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
            <form onSubmit={handleSubmit(onSubmit)} className='overflow-y-auto space-y-28 px-14 py-5 bg-white border-2 border-gray-200 rounded-lg'>
                <div className='flex flex-col space-y-5'>
                    {
                        fields.map((domain: any) => {
                            return (
                                <div className='flex flex-col bg-white space-y-5 py-5' key={domain.domain}>
                                    <div className='text-xl underline font-bold'>{domain.domainTitle}</div>
                                    <div className='grid grid-cols-1 gap-5'>
                                        {domain.fields.map((e: any ) => {
                                            return (
                                                <div key={e.field} className='w-full space-y-1 flex flex-row space-x-5 items-center' >
                                                    <div className='text-sm font-semibold'>{e.label}</div>
                                                    <div className='w-1/2'>
                                                        <InputItem domain={domain.domain} field={e} register={register} control={control} errors={errors} isEdit={true}></InputItem>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <br/>
                                </div>
                            )
                        })
                    }
                    <div className='text-xl underline font-bold'>Items</div>
                    <div className='flex flex-row items-start space-x-3'>
                        <button className="text-white ring-2 hover:ring-4 ring-blue-200 bg-blue-700 font-bold py-2 px-4 rounded-md w-1/12" type="button" onClick={handleAddNewReceiptItem}> Add  </button>
                        <div className='w-11/12 grid grid-cols-1'>
                            {
                                <div className=" text-lg font-bold text-white bg-blue-400 grid grid-cols-12 gap-2 px-3 py-1.5">
                                    <div className='col-span-1'> Image </div>
                                    <div className='col-span-3'> Items </div>
                                    <div className='col-span-2'> Price </div>
                                    <div className='col-span-2'> Quantity </div>
                                    <div className='col-span-3'> Voucher </div>
                                    <div className='col-span-1'>  </div>
                                </div>
                            }
                            {
                                receiptItems.map((domain: any, index: number) => {
                                    return (
                                        <div className='grid grid-cols-12 bg-white space-y-2 border-2 border-gray-200 items-center' key={domain.domain}>
                                            <div className='col-span-1 px-2 py-2'>
                                                <div className="">
                                                    <img id={`image_${index}`}
                                                        src={itemDetails.find((c: any) => c.domain === domain.domain)?.image}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-span-3 px-2 py-2'>
                                                <div>
                                                    <div className='flex flex-row border-[1px] border-gray-200 rounded-lg outline-none items-center space-x-3'>
                                                        <Controller
                                                            control={control}
                                                            name={`${domain.domain}.${domain.fields[0].field}`}
                                                            defaultValue={domain.fields[0].defaultValue?.value || ''}
                                                            render={({ field: { onChange, value, ref }}) => (
                                                                <Select
                                                                    defaultValue={domain.fields[0].defaultValue}
                                                                    value={domain.fields[0].options.find((c: any) => c.value === value)}
                                                                    onChange={val => {
                                                                        onChange(val.value);
                                                                        handleChangeItemId(index, val);
                                                                        handleAddNewReceiptItem()
                                                                    }}
                                                                    options={domain.fields[0].options}
                                                                    className='w-full'
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-span-2 px-2 py-2 text-blue-500 font-semibold'>
                                                {itemDetails.find((c: any) => c.domain === domain.domain)?.price?.toLocaleString() + " VND"}
                                            </div>
                                            <div className='col-span-2 px-2 py-2'>
                                                <div>
                                                    <input
                                                        className="border rounded w-1/2 py-2 px-3 text-gray-700 outline-none text-sm focus:border-blue-500 focus:border-2"
                                                        type="number"
                                                        min={0}
                                                        defaultValue={domain.fields[1].defaultValue || 1}
                                                        {...register(`${domain.domain}.${domain.fields[1].field}`, {required: true})}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-span-3 px-2 py-2'>
                                                <Controller
                                                    control={control}
                                                    name={`${domain.domain}.${domain.fields[2].field}`}
                                                    defaultValue={domain.fields[2].defaultValue?.value || ''}
                                                    render={({ field: { onChange, value, ref }}) => (
                                                        <Select
                                                            defaultValue={domain.fields[0].defaultValue}
                                                            value={itemDetails.find((c: any) => c.domain === domain.domain)?.vouchers?.find((c: any) => c.value === value)}
                                                            onChange={val => {
                                                                onChange(val.value);
                                                            }}
                                                            options={itemDetails.find((c: any) => c.domain === domain.domain)?.vouchers}
                                                            className='w-full'
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className='col-span-1 px-2 py-2'>
                                                <div className='flex flex-row justify-center items-center'>
                                                    <button type="button" onClick={() => handleDelete(domain.domain)}>
                                                        <svg height={15} width={15}>{IMAGES.icon.xMark}</svg>
                                                    </button>
                                                </div>
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