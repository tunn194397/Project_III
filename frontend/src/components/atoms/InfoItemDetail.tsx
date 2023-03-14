import {Controller, useForm} from "react-hook-form";
import InputItem from "./InputItem";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {updateItem} from "../../api/manager/item/item/request";
import {toast} from "react-toastify";

interface IDefaultValueObject {
    [key: string]: any
}
export default function InfoItemDetail(props: any) {
    const {token, user, permission} = useContext(AuthContext)
    const {updateFunction, data, buttonPermission, isEdit, setIsEdit, id} = props;
    const [openParam, setOpenParam] = useState(false)
    const { control, register, handleSubmit, formState: { errors }, reset } = useForm({
        criteriaMode: "all"
    });
    const onSubmit = async (body: any) => {
        const itemParameters: any[] = [];
        Object.keys(body.itemParams).map((key: any) => {
            itemParameters.push({deviceParameterId: Number(key), detail: body.itemParams[key], value: ""})
        })
        Object.keys(body.itemIntros).map((key: any) => {
            itemParameters.map((c: any) => {
                if (c.deviceParameterId === Number(key)) c.value = body.itemIntros[key]
            })
        })
        body.itemParameters = itemParameters
        body.item.price = Number(body.item.price)
        body.item.importPrice = Number(body.item.importPrice)
        body.item.productionTime = (body.item.productionTime).getTime()

        const updateResult = await updateItem(token, id, {item: body.item, itemParameters: body.itemParameters})
        if (updateResult.meta.code === 200) {
            toast.success("Update item successfully!")
        }
        else toast.error("Update item unsuccessfully!")

        setIsEdit(false)
    }

    useEffect(() => {
        const newDefaultValueObject :IDefaultValueObject = {};
        data.map((domain: any) => {
            const tmpObject : IDefaultValueObject = {}
            domain.fields.map((e: any) => {
                tmpObject[`${e.field}`] = e.defaultValue;
            })
            newDefaultValueObject[`${domain.domain}`] = tmpObject
            newDefaultValueObject.item.status = newDefaultValueObject?.item?.status?.value;
        })
        reset(newDefaultValueObject)
    },[data])
    return (
        <div className="bg-white px-5 py-5 border-[1px] border-gray-200 rounded-xl space-y-14">
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-10'>
                <div className='grid grid-cols-2 gap-10'>
                    {data.map((domain: any) => {
                        return (
                            (domain.domainTitle !== 'Parameters Detail') ?
                                (
                                    <div key={domain.domain} className={`flex flex-col space-y-5`}>
                                        <div className="flex flex-col space-y-5 ">
                                            <div className="text-xl font-semibold underline">{domain.domainTitle}</div>
                                            <div className='grid grid-cols-1 space-y-3'>
                                                {
                                                    domain.fields.map((e: any) => {
                                                        return (
                                                            <div key={e.field} className='space-y-1'>
                                                                <div className='text-sm'>{e.label}</div>
                                                                <InputItem field={e} register={register} control={control} errors={errors} isEdit={isEdit} domain={domain.domain}></InputItem>
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
                                (domain.domainTitle === 'Parameters Detail') ?
                                    (
                                        <div key={domain.domain} className={`flex flex-col space-y-5`}>
                                            <div className="flex flex-col space-y-5 ">
                                                <div className="text-xl font-semibold underline">{domain.domainTitle}</div>
                                                <div className='grid grid-cols-3 gap-10' >
                                                    {
                                                        domain.fields.map((e: any) => {
                                                            return (
                                                                <div key={e.field} className='grid grid-cols-4 gap-1 items-center'>
                                                                    <div className='text-sm col-span-1'>{e.label}</div>
                                                                    <div className='col-span-3'>
                                                                        <InputItem field={e} register={register} control={control} errors={errors} isEdit={isEdit} domain={domain.domain}></InputItem>
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
                ) : <></>}
                <div className='flex flex-row justify-between pt-10 pb-5'>
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
                        permission.includes(buttonPermission.total) ?
                            <div>
                                { !isEdit? (
                                    permission.includes(buttonPermission.edit) ?
                                        <div>
                                            <button
                                                className="text-gray-800 border-[1px] border-black hover:ring-[3px] ring-gray-400 hover:ring-blue-400 font-bold py-1.5 px-5 rounded-md"
                                                onClick={(event)=>{event.preventDefault(); setIsEdit(true)}}
                                                type="button"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                        :<></>
                                ): (
                                    <div className='flex flex-row space-x-3'>
                                        {
                                            (permission.includes(buttonPermission.save)) &&
                                            <button
                                                className="pointer-events-auto text-white border-[1px] border-black hover:ring-[3px] ring-blue-400 hover:ring-blue-400 bg-blue-600 font-bold py-1.5 px-5 rounded-md"
                                                type="submit"
                                            >
                                                Save
                                            </button>
                                        }

                                        <button
                                            className="text-gray-800 border-[1px] border-black hover:ring-[3px] ring-gray-400 hover:ring-blue-400 font-bold py-1.5 px-5 rounded-md"
                                            onClick={(event)=>{event.preventDefault(); setIsEdit(false)}}
                                            type="button"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                            : <></>
                    }
                </div>
            </form>
        </div>
    );
}