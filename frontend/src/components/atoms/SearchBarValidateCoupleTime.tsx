import {useState} from "react";
import DatePicker from "react-datepicker";
import {IMAGES} from "../../utils/images/images";

export default function SearchBarValidateCoupleTime(props: any) {
    const {filter} = props;
    const handleFunction = filter.handleFunction

    const [minValue, setMinValue] = useState(filter.minDefaultValue || new Date())
    const [maxValue, setMaxValue] = useState(filter.maxDefaultValue || new Date())
    const handleMinChange = (date: any) => {
        setMinValue(date);
        handleFunction((prevState: any) => ({
            ... prevState,
            [filter.minQueryField] : date.getTime(),
            page: 1
        }))
    };
    const handleMaxChange = (date: any) => {
        date.setDate(date.getDate() +1)
        setMaxValue(date);
        handleFunction((prevState: any) => ({
            ... prevState,
            [filter.maxQueryField] : date.getTime(),
            page: 1
        }))
    };

    return (
        <div className='flex flex-col space-y-1'>
            <div className='text-[12px] font-semibold'>{filter.displayText}</div>
            <div className='flex flex-row space-x-3 items-center'>
                <div className='flex flex-row space-x-1 items-center'>
                    <div className='text-[12px]'>From</div>
                    <div className='py-1.5 px-2 border-[1px] border-gray-200 rounded-lg outline-none items-center text-sm'>
                        <DatePicker
                            selected={minValue}
                            onChange={handleMinChange}
                            className="rounded-lg outline-none w-full"
                        />
                    </div>
                </div>
                <div className='flex flex-row space-x-1 items-center'>
                    <div className='text-[12px]'>To</div>
                    <div className='py-1.5 px-2 border-[1px] border-gray-200 rounded-lg outline-none items-center text-sm'>
                        <DatePicker
                            selected={maxValue}
                            onChange={handleMaxChange}
                            className="rounded-lg outline-none w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}