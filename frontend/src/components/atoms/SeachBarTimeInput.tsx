import {useRef, useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {IMAGES} from "../../utils/images/images";
export default function SearchBarTimeInput(props: any) {
    const {filter, handleFunction} = props;
    const [date, setDate]  = useState(new Date())

    const handleChange = (date: any) => {
        setDate(date);
        handleFunction((prevState: any) => ({
            ... prevState,
            page: 1
        }))
    };

    return (
        <div className='flex flex-col w-[230px] space-y-1'>
            <div className='text-[12px] font-semibold'>{filter.displayText}</div>
            <div className='flex flex-row py-1.5 px-4 border-[1px] border-gray-200 rounded-lg outline-none items-center text-sm'>
                <DatePicker
                    selected={date}
                    onChange={handleChange}
                    className="rounded-lg outline-none"
                />
                <div>
                    <svg height={22} width={22}>{IMAGES.icon.calendar}</svg>
                </div>
            </div>
        </div>
    );
}