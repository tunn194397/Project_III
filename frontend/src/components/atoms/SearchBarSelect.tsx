import {useState} from "react";
export default function SearchBarSelect(props: any) {
    const {filter} = props;
    const handleFunction = filter.handleFunction

    const [value, setValue] = useState('')
    const handleChange = (event: any) => {
        setValue(event.target.value);
        handleFunction((prevState: any) => ({
            ... prevState,
            [filter.queryField] : event.target.value,
            page: 1
        }))
    };

    return (
        <div className='flex flex-col space-y-1'>
            <div className='text-[12px] font-semibold'>{filter.displayText}</div>
            <select value = {value} onChange={handleChange} className="bg-white border-gray-200 border-[1px] px-4 py-1.5 pr-8 rounded-md outline-none text-sm">
                {filter.options.map((e: any) => {
                    return <option value={e.value} key={e.value}>{e.message}</option>
                })}
            </select>
        </div>
    );
}