import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../../api/manager/account/request';
import './login.css';
import { appendErrors, useForm } from 'react-hook-form';
import {AuthContext} from "../../../context/AuthContext";
export default function ManagerLoginPage() {
    const navigate = useNavigate();
    const { setAuthData, clearAuthData } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        clearAuthData?.();
    });

    const onSubmit = async (data: any) => {
        const response = await adminLogin(data);
        if (response.success) {
            const { token, user, permission } = response.data.data
            console.log("Login: ", token, user, permission)
            toast.success(response.message);
            setAuthData?.(token, user.roleId, user, permission);
            navigate('/manager');
        } else {
            toast.error(response.message);
        }
    };

    return (
        <div className='h-screen flex'>
            <div className='hidden lg:flex w-full login_img_section items-center'>
                <div
                    className='
                  bg-black
                  opacity-20
                  inset-0
                  z-0'
                ></div>
                <div className='w-full mx-auto px-20 flex-col items-center space-y-6'>
                    <h1 className='text-white font-bold text-4xl font-sans'>NGOCTU COMPUTER</h1>
                </div>
            </div>
            <div className='flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8 login_img_section'>
                <div className='w-full px-8 md:px-32 lg:px-24'>
                    <form className='bg-white rounded-md shadow-2xl p-5' onSubmit={handleSubmit(onSubmit)}>
                        <h1 className='text-gray-800 font-bold text-2xl mb-1'>LOGIN</h1>
                        <p className='text-sm font-normal text-gray-600 mb-8'></p>
                        <div className='mb-5 text-red-500 text-xs'>
                            <div className='flex items-center border-2 mb-1 py-2 px-3 rounded-2xl'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5 text-gray-400'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                                    />
                                </svg>
                                <input
                                    id='username'
                                    className=' pl-2 w-full outline-none border-none text-base text-[#757575]'
                                    type='username'
                                    placeholder='User name'
                                    {...register('username', { required: true, minLength: 6 })}
                                />
                            </div>
                            {errors?.username?.type === 'required' && <p>⚠ This field is required!</p>}
                            {errors?.username?.type === 'minLength' && <p>⚠ Username cannot be less than 6 characters!</p>}
                        </div>
                        <div className=' text-red-500 text-xs mb-9'>
                            <div className='flex items-center border-2 mb-1 py-2 px-3 rounded-2xl '>
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-gray-400' viewBox='0 0 20 20' fill='currentColor'>
                                    <path
                                        fillRule='evenodd'
                                        d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                                <input
                                    className='pl-2 w-full outline-none border-none text-base text-[#757575]'
                                    type='password'
                                    id='password'
                                    placeholder='Password'
                                    {...register('password', { required: true })}
                                />
                            </div>
                            {errors?.password?.type === 'required' && <p>⚠ This field is required!</p>}
                            {errors?.password?.type === 'minLength' && <p>⚠ Password cannot be less than 6 characters!</p>}
                        </div>
                        <div className='w-full flex justify-between'>
                            <div className='flex justify-between'>
                              <span className='text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all'>
                                Forgot Password ?
                              </span>
                            </div>
                            <button
                                type='submit'
                                className='block w-1/2 bg-indigo-600 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2'
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}