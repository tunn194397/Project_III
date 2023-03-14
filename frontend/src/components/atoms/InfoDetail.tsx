import {Controller, useForm} from "react-hook-form";
import InputItem from "./InputItem";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";

interface IDefaultValueObject {
    [key: string]: any
}

export default function InfoDetail(props: any) {
    const {token, user, permission} = useContext(AuthContext)
    const {updateFunction, data, buttonPermission} = props;
    const [isEdit, setIsEdit] = useState(false)
    const { control, register, handleSubmit, formState: { errors }, reset } = useForm({
        criteriaMode: "all"
    });
    const onSubmit = async (body: any) => {
        updateFunction(body)
        setIsEdit(false)
    }

    useEffect(() => {
        const newDefaultValueObject :IDefaultValueObject = {};
        data.map((domain: any) => {
            const tmpObject : IDefaultValueObject = {}
            domain.fields.map((e: any) => {
                tmpObject[`${e.field}`] = e.defaultValue?.value?  e.defaultValue?.value:  e.defaultValue;
            })
            newDefaultValueObject[`${domain.domain}`] = tmpObject
        })
        reset(newDefaultValueObject)
    },[data])

    return (
        <div className="bg-white px-5 py-5 border-[1px] border-gray-200 rounded-xl">
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-10'>
                <div className='flex flex-col space-y-20'>
                    {data.map((domain: any) => {
                        let countImage = 0;
                        domain.fields.map((e:  any) => {
                            if (e.type === 'image') countImage++;
                        })
                        return (
                            <div  key={domain.domain} className='flex flex-col space-y-5'>
                                <div className="flex flex-col space-y-5">
                                    <div className="text-xl font-semibold underline">{domain.domainTitle}</div>
                                    <div className='grid grid-cols-3 gap-3'>
                                        <div className='flex flex-col col-span-1'>
                                            {
                                                domain.fields.map((e: any) => {
                                                    return (e.type === 'image') ?
                                                    (
                                                        <div key={e.field} className='space-y-1'>
                                                            <div className='text-sm'>{e.label}</div>
                                                            <InputItem field={e} register={register} control={control} errors={errors} isEdit={isEdit} domain={domain.domain}></InputItem>
                                                        </div>
                                                    ): <></>
                                                })
                                            }
                                        </div>
                                        <div className='grid grid-cols-2 gap-3 col-span-2'>
                                            {
                                                domain.fields.map((e: any) => {
                                                    return (e.type !== 'image') ?
                                                        (
                                                            <div key={e.field} className='space-y-1'>
                                                                <div className='text-sm'>{e.label}</div>
                                                                <InputItem field={e} register={register} control={control} errors={errors} isEdit={isEdit} domain={domain.domain}></InputItem>
                                                            </div>
                                                        ): <></>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='flex flex-row justify-end'>
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
                                        {permission.includes(buttonPermission.submit) ?
                                            <button
                                                className="text-white border-[1px] border-black hover:ring-[3px] ring-blue-400 hover:ring-blue-400 bg-blue-600 font-bold py-1.5 px-5 rounded-md"
                                                type="button"
                                            >
                                                Submit
                                            </button>
                                            : (
                                                permission.includes(buttonPermission.save) ?
                                                    <button
                                                        className="pointer-events-auto text-white border-[1px] border-black hover:ring-[3px] ring-blue-400 hover:ring-blue-400 bg-blue-600 font-bold py-1.5 px-5 rounded-md"
                                                        type="submit"
                                                    >
                                                        Save
                                                    </button>
                                                    :
                                                    (
                                                        permission.includes(buttonPermission.approve) ?
                                                            <div>
                                                                <button
                                                                    className="text-white border-[1px] border-black hover:ring-[3px] ring-blue-400 hover:ring-blue-400 bg-blue-600 font-bold py-1.5 px-5 rounded-md"
                                                                    type="button"
                                                                >
                                                                    Approve
                                                                </button>
                                                                <button
                                                                    className="text-white border-[1px] border-black hover:ring-[3px] ring-blue-400 hover:ring-blue-400 bg-blue-600 font-bold py-1.5 px-5 rounded-md"
                                                                    type="button"
                                                                >
                                                                    Reject
                                                                </button>
                                                            </div>
                                                            :
                                                            <></>
                                                    )
                                            )
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