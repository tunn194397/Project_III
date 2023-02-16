import {IMAGES} from "../../utils/images/images";
import {useForm, Controller} from "react-hook-form";
import DatePicker from "react-datepicker";
import {useState} from "react";

export default function DetailPopUp(props: any) {
    const {setOpenDetail, title, fields, handleUpdate} = props;
    const [isEdit, setIsEdit] = useState(false)
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        criteriaMode: "all"
    });
    const onSubmit = async (body: any) => {
        console.log("Hello")
    }

    return (
        <div className='fixed mx-auto my-auto inset-0 h-[600px] w-[600px] bg-gray-100 shadow-gray-300 shadow-xl rounded-lg'>
            <div className="relative flex-1 bg-green-300 font-bold text-xl text-black rounded-t-md text-center py-2">
                <div>{title}</div>
                <div className="absolute right-0 top-0 px-2 py-2">
                    <button onClick={() => setOpenDetail(false)}>
                        <svg height={28} width={28}>{IMAGES.icon.close}</svg>
                    </button>
                </div>
            </div>
            <hr className='h-[2px]'/>
            <div className='h-[560px]'>
                <form onSubmit={handleSubmit(onSubmit)} className='h-[540px] overflow-y-auto'>
                    <div  className='flex flex-col px-2 py-2 space-y-4 '>
                        {
                            fields.map((domain: any) => {
                                return (
                                    <div className='flex flex-col bg-white space-y-2 border-2 border-gray-200 px-3 py-2 rounded-md' key={domain.domain}>
                                        <div className='text-lg font-semibold'>{domain.domainTitle}</div>
                                        <hr/>
                                        <div className='grid grid-cols-1 gap-3'>
                                            {domain.fields.map((e: any ) => {
                                                return (
                                                    <div key={e.field}>
                                                        <div className='text-sm'>{e.label}</div>
                                                        {
                                                            (e.type === 'input') ?
                                                                <div>
                                                                    <input
                                                                        className="border rounded w-full py-2 px-3 text-gray-700 outline-none text-sm"
                                                                        type="text"
                                                                        {...register(e.field, {required: true})}/>
                                                                    {errors.name && <span className="text-red-500 text-sm"> ⚠ This field is required!</span>}
                                                                </div>
                                                                :
                                                                <div className='flex flex-row py-1.5 px-4 border-[1px] border-gray-200 rounded-lg outline-none items-center space-x-3'>
                                                                    <div>
                                                                        <svg height={22} width={22}>{IMAGES.icon.calendar}</svg>
                                                                    </div>
                                                                    <Controller
                                                                        control={control}
                                                                        name='birthday'
                                                                        render={({ field }) => (
                                                                            <DatePicker
                                                                                onChange={(date) => field.onChange(date)}
                                                                                selected={field.value}
                                                                                className='outline-none'
                                                                            />
                                                                        )}
                                                                    />
                                                                    {errors.name && <span className="text-red-500 text-sm"> ⚠ This field is required!</span>}
                                                                </div>


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
                        <button
                            className="text-white ring-2 hover:ring-4 ring-blue-200 bg-blue-700 font-bold py-2 px-4 rounded-md"
                            type="submit"
                        >
                            {title}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}