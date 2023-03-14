import {Controller} from "react-hook-form";
import {IMAGES} from "../../utils/images/images";
import DatePicker from "react-datepicker";
import Select from 'react-select';

export default function InputItemForItemCreation(props: any) {
    const {field, isEdit, register, errors, control, setSearchQuery, setAddParam, domain} = props;

    const handleChange = (value: any) => {
        setSearchQuery((prevState: any) => ({
            ... prevState, deviceType: value,
        }))
        setAddParam(false)
    }
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
                            onChange={val => {onChange(val.value); handleChange(val.value)}}
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