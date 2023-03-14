import {IMAGES} from "../../utils/images/images";
import {useForm, Controller} from "react-hook-form";
import DatePicker from "react-datepicker";
import InputItem from "../atoms/InputItem";
import InputItemForItemCreation from "../atoms/InputItemForItemCreation";
import {useState} from "react";

export default function CreateItemPopUp(props: any) {
    const {setOpenAdd, title, fields, handleCreateNew, setSearchQuery, paramFields} = props;
    const { control, register, handleSubmit, formState: { errors }, watch } = useForm({
        criteriaMode: "all"
    });
    const [addParam, setAddParam] = useState(false)
    const onSubmit = async (body: any) => {
        await handleCreateNew(body);
        setOpenAdd(false)
    }
    return (
        <div className='fixed mx-auto my-auto inset-0 h-[600px] w-[1000px] bg-gray-100 shadow-gray-300 shadow-xl rounded-lg'>
            <div className="relative flex-1 bg-green-300 font-bold text-xl text-black rounded-t-md text-center py-2">
                <div>{title}</div>
                <div className="absolute right-0 top-0 px-2 py-2">
                    <button onClick={() => setOpenAdd(false)}>
                        <svg height={28} width={28}>{IMAGES.icon.close}</svg>
                    </button>
                </div>
            </div>
            <hr className='h-[2px]'/>
            <div className='h-[560px]'>
                <form onSubmit={handleSubmit(onSubmit)} className='h-[540px] overflow-y-auto px-3'>
                    <div  className='flex flex-col py-2 space-y-4 '>
                        {
                            fields.map((domain: any) => {
                                return (
                                    <div className='flex flex-col bg-white space-y-2 border-2 border-gray-200 px-3 py-2 rounded-md' key={domain.domain}>
                                        <div className='text-lg font-semibold'>{domain.domainTitle}</div>
                                        <hr/>
                                        <div className='grid grid-cols-2 gap-3'>
                                            {domain.fields.map((e: any ) => {
                                                return (
                                                    <div key={e.field} className='space-y-1' >
                                                        <div className='text-sm'>{e.label}</div>
                                                        {
                                                            e.label !== 'Type' ?
                                                                <InputItem field={e} register={register} control={control} errors={errors} isEdit={true}></InputItem>
                                                                :
                                                                <InputItemForItemCreation
                                                                    field={e} register={register} control={control} errors={errors} isEdit={true} setSearchQuery={setSearchQuery} setAddParam={setAddParam}
                                                                ></InputItemForItemCreation>
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <br/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {addParam && <div  className='flex flex-col py-2 space-y-4 '>
                        {
                            paramFields.map((domain: any) => {
                                return (
                                    <div className='flex flex-col bg-white space-y-2 border-2 border-gray-200 px-3 py-2 rounded-md' key={domain.domain}>
                                        <div className='text-lg font-semibold'>{domain.domainTitle}</div>
                                        <hr/>
                                        <div className='grid grid-cols-2 gap-3'>
                                            {domain.fields.map((e: any ) => {
                                                return (
                                                    <div key={e.field} className='space-y-1' >
                                                        <div className='text-sm'>{e.label}</div>
                                                        {
                                                            e.label !== 'Type' ?
                                                                <InputItem field={e} register={register} control={control} errors={errors} isEdit={true}></InputItem>
                                                                :
                                                                <InputItemForItemCreation
                                                                    field={e} register={register} control={control} errors={errors} isEdit={true} setSearchQuery={setSearchQuery}
                                                                ></InputItemForItemCreation>
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <br/>
                                    </div>
                                )
                            })
                        }
                    </div>}
                    {addParam? <button className="text-white ring-2 hover:ring-4 ring-blue-200 bg-blue-700 font-bold py-2 px-4 rounded-md w-full" type="submit"> {title}  </button>
                            : <button className="text-white ring-2 hover:ring-4 ring-blue-200 bg-blue-700 font-bold py-2 px-4 rounded-md w-full" type="button" onClick={() => setAddParam(true)}>
                                Next
                            </button>
                    }
                </form>
            </div>
        </div>
    );
}