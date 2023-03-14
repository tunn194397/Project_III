import {Controller} from "react-hook-form";
import {IMAGES} from "../../utils/images/images";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import {useEffect} from "react";

export default function InputItem(props: any) {
    const {field, isEdit, register, errors, control, domain} = props;
    switch (field.type) {
        case 'input':{
            return (
                <div>
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 outline-none text-sm focus:border-blue-500 focus:border-2"
                        type="text"
                        defaultValue={field.defaultValue || ''}
                        {...register(`${domain}.${field.field}`, {required: false})}
                        disabled={!isEdit || !field.editable}
                    />
                </div>
            );
        }
        case 'inputTime':
            {
                return (
                    <div>
                        <div className='flex flex-row py-1.5 px-4 border-[1px] border-gray-200 rounded-lg outline-none items-center space-x-3 focus-within:border-blue-400 focus-within:border-2 text-sm' >
                            <div>
                                <svg height={22} width={22}>{IMAGES.icon.calendar}</svg>
                            </div>
                            <Controller
                                control={control}
                                name={`${domain}.${field.field}`}
                                defaultValue={field.defaultValue || new Date()}
                                render={(e: any) => (
                                    <DatePicker
                                        onChange={(date) => e.field.onChange(date)}
                                        selected={e.field.value}
                                        className='outline-none disabled:bg-white'
                                        disabled={!isEdit || !field.editable}
                                    />
                                )}
                            />
                        </div>
                        {((errors[`${domain}.${field.field}`] !== undefined) && (String(errors[field.field]?.ref?.value)).length === 0) && <span className="text-red-500 text-sm"> ⚠ This field is required!</span>}
                    </div>
                );
            }
        case 'image': {
            return (<div className='px-5 py-2'>
                <img
                    src={field.defaultValue}
                    className="rounded-xl border-2 border-gray-200 w-[100%]"
                />
            </div>)
        }
        case 'select': {
            return (
                <div>
                    <div className='flex flex-row border-[1px] border-gray-200 rounded-lg outline-none items-center space-x-3'>
                        <Controller
                            control={control}
                            name={`${domain}.${field.field}`}
                            defaultValue={field.defaultValue?.value || ''}
                            render={({ field: { onChange, value, ref }}) => (
                                <Select
                                    defaultValue={field.defaultValue}
                                    value={field.options.find((c: any) => c.value === value)}
                                    onChange={val => onChange(val.value)}
                                    options={field.options}
                                    isDisabled={!isEdit || !field.editable}
                                    className='w-full'
                                />
                            )}
                        />
                    </div>
                    {((errors[`${domain}.${field.field}`] !== undefined) && (String(errors[field.field]?.ref?.value)).length === 0) && <span className="text-red-500 text-sm"> ⚠ This field is required!</span>}
                </div>
            );
        }
        case 'multiSelect': {
            return (
                <div>
                    <div className='flex flex-row border-[1px] border-gray-200 rounded-lg outline-none items-center space-x-3'>
                        <Controller
                            control={control}
                            name={`${domain}.${field.field}`}
                            defaultValue={field.defaultValue?.value || ''}
                            render={({ field: { onChange, value, ref }}) => (
                                <Select
                                    defaultValue={field.defaultValue}
                                    value={field.options.find((c: any) => c.value === value)}
                                    onChange={onChange}
                                    options={field.options}
                                    isDisabled={!isEdit || !field.editable}
                                    className='w-full basis-multi-select'
                                    isMulti
                                    classNamePrefix='select'
                                />
                            )}
                        />
                    </div>
                    {((errors[`${domain}.${field.field}`] !== undefined) && (String(errors[field.field]?.ref?.value)).length === 0) && <span className="text-red-500 text-sm"> ⚠ This field is required!</span>}
                </div>
            );
        }
        default:
            return <></>;
    }
}