import {useState} from "react";
export default function SearchBarInput(props: any) {
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
            <div className='md:flex items-center border px-2 py-1.5 border-gray-200 rounded-md bg-white hover:border-gray-300 border-2 w-full'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 pt-0.5 text-gray-500'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='black'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='5' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                </svg>
                <input className='ml-2 bg-white border-none outline-none text-[13px]' type='text' placeholder={filter.placeholder} onChange={handleChange} value={value}/>
            </div>
        </div>
    );
}