import {IMAGES} from "../../../utils/images/images";
import {UserHeaderWrapper, Image} from "../../../style/styled";
import {useState} from "react";

export default function UserMainPage() {
    const imageArray = [
        "https://lh3.googleusercontent.com/9mTXqBko4UuPbuZyyhwXWV3vsejqDNV1T-06t_eKO7_2KBoZ6nyFUALxpV_rahR5v5vemOqtA93nXOVsHfaxAMjJNRREnYdGvQ=w1920-rw",
        "https://lh3.googleusercontent.com/xZqj_ngVsA_wxY-H9SHp8AJIpmzSSgX4CFfYVTm_wS3Shaq1wP5WqdYSV-sK3pkuJpxQB3RhNWObbQNFzbLG1sd9xoQpZvHo=w1920-rw",
        "https://lh3.googleusercontent.com/rGnTSC3G5CP62nWQWzOZ_QMiwajN6ojFKi2-0LiMJid8dXTW6hlYvah_DYQLH8_Ug_73qSWYMOGQfoh_oqO3YjjYnEdkeAs=w1920-rw",
        "https://lh3.googleusercontent.com/SZAopWBNOIJ5-Jq7PlQ5RHFD4tTiSetl_xcgJyNKuhpSdi44XsT2TvAz1x8pEJ3CpoK1p-3TiZvFyNnMNgIC8dUAac2fQVuH=w1920-rw"
    ]
    const [index, setIndex] = useState(0);
    const upIndex = () => {
        setIndex(index + 1);
    }
    const downIndex = () => {
        setIndex(index + imageArray.length - 1)
    }
    const list = ['Laptop', 'Personal Computer', 'PC Monitor', 'PC Accessory', 'PC Device', 'Sound Device']

    return (
        <div className='w-full h-full flex flex-col px-3 py-3 space-y-4'>
            <div className='w-full h-[500px] bg-cover bg-center transition-all ease-in-out duration-1000 transform translate-x-0 slide'  style={{backgroundImage: `url(${imageArray[index % imageArray.length]})`}}>
                <div className='w-full h-[500px] flex justify-between items-center px-10 py-5 space-x-10'>
                    <div className='flex flex-row'>
                        <div className = 'w-[250px] flex flex-col bg-white rounded-md'>
                            {list.map((e: any, index: number) => {
                                return (
                                    <button className='hover:bg-gray-200 py-2 px-10 border-gray-200 border-b-2 font-semibold rounded-md text-left ' key = {index}>
                                        {e}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    <div className='w-full flex justify-between items-center'>
                        <button onClick={downIndex} className='hover:bg-gray-400 rounded-md'> <svg className='h-[40px] w-[40px]'>{IMAGES.icon.backIcon}</svg> </button>
                        <button onClick={upIndex} className='hover:bg-gray-400 rounded-md'><svg className='h-[40px] w-[40px]'>{IMAGES.icon.goIcon}</svg></button>
                    </div>
                </div>
            </div>
            <div className='w-full h-[500px] bg-cover bg-center transition-all ease-in-out duration-1000 transform translate-x-0 slide' style={{backgroundImage: `url(${imageArray[(index+ 2) % imageArray.length]})`}}>
                <div className='w-full h-[500px] flex justify-between items-center'>
                    <button onClick={downIndex} className='hover:bg-gray-400 rounded-md'> <svg className='h-[40px] w-[40px]'>{IMAGES.icon.backIcon}</svg> </button>
                    <button onClick={upIndex} className='hover:bg-gray-400 rounded-md'><svg className='h-[40px] w-[40px]'>{IMAGES.icon.goIcon}</svg></button>
                </div>
            </div>
        </div>
    );
}
