import {IMAGES} from "../../../utils/images/images";
import {UserHeaderWrapper, Image} from "../../../style/styled";

export default function UserNavbar() {
    return (
        <UserHeaderWrapper className="w-full top-0">
            <nav className='border-[1px] border-b-black flex top-0 w-screen justify-end px-[20px] py-0 items-center bg-blue-800 z-10 space-x-1'>
                <div className='flex items-center ml-10'>
                    <button className='w-[150px] h-[40px] flex items-center hover:bg-blue-700 rounded-md px-5'>
                        <svg height={16} width={16}>{IMAGES.icon.item}</svg>
                        <h1 className=' text-white ' style={{marginLeft : 7}}>Sale off</h1>
                    </button>
                </div>
                <div className='flex items-center ml-10'>
                    <button className='w-[150px] h-[40px] flex items-center hover:bg-blue-700 rounded-md px-5'>
                        <svg height={16} width={16}>{IMAGES.icon.item}</svg>
                        <h1 className=' text-white' style={{marginLeft : 5}}>Show room</h1>
                    </button>
                </div>
                <div className='flex items-center ml-10'>
                    <button className='w-[150px] h-[40px] flex items-center hover:bg-blue-700 rounded-md px-5'>
                        <svg height={16} width={16}>{IMAGES.icon.item}</svg>
                        <h1 className=' text-white ' style={{marginLeft : 5}}>Hot line</h1>
                    </button>
                </div>
                <div className='flex items-center ml-10'>
                    <button className='w-[150px] h-[40px] flex items-center hover:bg-blue-700 rounded-md px-5'>
                        <svg height={16} width={16}>{IMAGES.icon.item}</svg>
                        <h1 className=' text-white ' style={{marginLeft : 5}}>News</h1>
                    </button>
                </div>
                <div className='flex items-center ml-10'>
                    <button className='w-[180px] h-[40px] flex items-center hover:bg-blue-700 rounded-md px-5'>
                        <svg height={16} width={16}>{IMAGES.icon.item}</svg>
                        <h1 className=' text-white ' style={{marginLeft : 5}}>Build Computer</h1>
                    </button>
                </div>
                <div className='flex items-center ml-10'>
                    <button className='w-[180px] h-[40px] flex items-center hover:bg-blue-700 rounded-md px-5'>
                        <svg height={16} width={16}>{IMAGES.icon.item}</svg>
                        <h1 className=' text-white ' style={{marginLeft : 5}}>Customer Care</h1>
                    </button>
                </div>

            </nav>
        </UserHeaderWrapper>
    );
}
