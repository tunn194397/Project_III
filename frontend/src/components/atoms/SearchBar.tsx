import {useState} from "react";
import {IMAGES} from "../../utils/images/images";
import SearchBarInput from "./SeachBarInput";
import SearchBarSelect from "./SearchBarSelect";
import SearchBarTimeInput from "./SeachBarTimeInput";
import SearchBarValidateCoupleInput from "./SearchBarValidateCoupleInput";
import SearchBarValidateCoupleTime from "./SearchBarValidateCoupleTime";

export default function SearchBar(props: any) {
    const {filterArray, setOpenAdd, addPermission} = props;

    return (
        <div className='flex space-x-5 mx-6'>
            <div className='grid grid-cols-4 gap-7 items-center w-[90%]'>
                {filterArray.map((filter: any) => {
                    return (filter.type === 'input') ?
                        <SearchBarInput filter={filter}></SearchBarInput>
                        :
                        (filter.type === 'select') ?
                            <SearchBarSelect filter={filter}></SearchBarSelect>
                            :
                            (filter.type === 'timeInput') ?
                                <SearchBarTimeInput filter={filter}></SearchBarTimeInput>
                                :
                                (filter.type === 'coupleInput') ?
                                <SearchBarValidateCoupleInput filter={filter}></SearchBarValidateCoupleInput>
                                    :
                                    <SearchBarValidateCoupleTime filter={filter}></SearchBarValidateCoupleTime>
                })}
            </div>
            {addPermission && <div className='flex flex-col-reverse space-y-2'>
                <button className='flex flex-row space-x-2 items-center bg-green-500 hover:ring-4 hover:ring-green-300 px-2 py-2 rounded-lg text-white font-bold' onClick={() => setOpenAdd(true)}>
                    <svg height={20} width={20}>{IMAGES.icon.addButton}</svg>
                    Add new
                </button>
            </div>}
        </div>
    );
}