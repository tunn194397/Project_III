import {useState} from "react";

export default function SearchBarValidateCoupleInput(props: any) {
    const {filter} = props;
    const handleFunction = filter.handleFunction

    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(0)
    const handleMinChange = (event: any) => {
        setMinValue(event.target.value);
        handleFunction((prevState: any) => ({
            ... prevState,
            [filter.minQueryField] : event.target.value,
            page: 1
        }))
    };
    const handleMaxChange = (event: any) => {
        setMaxValue(event.target.value);
        handleFunction((prevState: any) => ({
            ... prevState,
            [filter.maxQueryField] : event.target.value,
            page: 1
        }))
    };

    return (
        <div className='flex flex-col space-y-1'>
            <div className='text-[12px] font-semibold'>{filter.displayText}</div>
            <div className='flex flex-row space-x-3 items-center'>
                <div className='flex flex-row space-x-0.5 items-center'>
                    <div className='text-[11px]'>From</div>
                    <input className='bg-white border-[1px] rounded-md px-2 py-1.5 outline-none text-sm w-[130px] text-right' type='text' placeholder='Min value' onChange={handleMinChange} value={minValue}/>
                </div>
                <div className='flex flex-row space-x-0.5 items-center'>
                    <div className='text-[11px]'>To</div>
                    <input className='bg-white border-[1px] rounded-md px-2 py-1.5 outline-none text-sm w-[130px] text-right' type='text' placeholder='Max value' onChange={handleMaxChange} value={maxValue}/>
                </div>
            </div>
        </div>
    );
}