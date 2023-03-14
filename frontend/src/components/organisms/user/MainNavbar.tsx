import {IMAGES} from "../../../utils/images/images";
import {UserMainHeaderWrapper, Image} from "../../../style/styled";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {toast} from "react-toastify";

export default function UserMainNavbar() {
    const {isLogin, clearAuthData} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleClickLogin = () => {
        navigate('/user/login')
    }

    const handleClickRegister = () => {
        navigate('/user/register')
    }

    const handleClickLogout = () => {
        clearAuthData?.()
        toast.success("Logout successful!")
    }

    const handleClickCart = () => {
        navigate('/user/cart')
    }
    return (
        <UserMainHeaderWrapper className="w-full sticky top-0">
            <nav className='border-[1px] border-b-gray-400 flex w-screen h-[75px] justify-between px-[30px] py-2 items-center bg-gray-300 z-10'>
                <div className='flex items-center w-2/3'>
                    <h1 className='text-xl font-bold ml-10 mr-20'> NGOCTU COMPUTER </h1>
                    <div className='md:flex items-center border px-2 py-1 border-white rounded-md bg-white hover:border-b-black hover:border-2 hidden w-2/3'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 pt-0.5 text-gray-500'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='5' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                        </svg>
                        <input className='ml-2 w-full  bg-white font- ' type='text' name='search' id='search' placeholder='Search...' />
                    </div>
                </div>
                <div className='flex items-center'>
                    <ul className='flex items-center justify-end space-x-10 ml-6'>
                        <li>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8 text-white hover:fill-blue-900' fill='none' viewBox='0 0 24 24' stroke='black' >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='1.5'
                                    d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                                />
                            </svg>
                        </li>
                        {
                            isLogin &&
                            <li>
                                <div className = 'flex space-x-1 items-center' onClick={handleClickCart}>
                                    <div className={'flex flex-col'}>
                                        <h4 className='text-xs font-bold'> Your cart </h4>
                                        <h4 className='text-xs'> (0) items</h4>
                                    </div>
                                    <svg className='h-8 w-8'>
                                        {IMAGES.icon.blackSupply}
                                    </svg>
                                </div>
                            </li>
                        }
                        {
                            !isLogin &&
                            <li>
                                <div className={'flex flex-col space-y-0.5'}>
                                    <button className="bg-green-600 hover:bg-green-900 py-1 text-white text-xs font-bold px-5 border-b-black border-2 rounded-md" onClick={handleClickRegister}>
                                        Register
                                    </button>
                                    <button className="bg-green-600 hover:bg-green-900 py-1 text-white text-xs font-bold px-5 border-b-black border-2 rounded-md" onClick={handleClickLogin}>
                                        Login
                                    </button>
                                </div>
                            </li>
                        }
                        {
                            isLogin &&
                            <li>
                                <div className={'flex flex-col space-y-0.5'}>
                                    <button className="bg-green-600 hover:bg-green-900 py-1 text-white text-xs font-bold px-5 border-b-black border-2 rounded-md" onClick={handleClickLogout}>
                                        Logout
                                    </button>
                                </div>
                            </li>
                        }
                    </ul>
                </div>

            </nav>
        </UserMainHeaderWrapper>
    );
}
