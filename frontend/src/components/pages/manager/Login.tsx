import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useScrollTo } from 'react-use-window-scroll';
import { userLogin } from '../../../api/user/auth/request';
import { AuthContext } from '../../../context/AuthContext';
import './login.css';
export default function ManagerLoginPage(props: any) {
    const { setToggleLogin, title, setToggleSignUp } = props;
    const navigate = useNavigate();
    const { setAuthData, clearAuthData } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const scrollTo = useScrollTo();
    const onSubmit = async (data: any) => {
        const response = await userLogin(data);
        if (response.success) {
            const { token, user } = response.data;
            setAuthData?.(token, user.roleID, user);
            setToggleLogin(false);
            scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    return (
        <div className='flex w-full lg:w-1/2 justify-center items-center bg-transparent space-y-8 py-4'>
            <div className='w-full px-8 md:px-32 lg:px-24'>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-white rounded-md shadow-2xl p-5'>
                    <div className='flex justify-end'>
                        <i className='bi bi-x-lg hover:cursor-pointer' onClick={() => setToggleLogin(false)}></i>
                    </div>
                    <p className='text-lg font-normal text-gray-600 mb-2'>{title}</p>
                    <h1 className='text-red-500 font-bold text-2xl mb-1'>Login page!</h1>
                    <p className='text-sm font-normal text-gray-600 mb-8'>Welcome to our computer store!</p>
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
                    <div className=' text-red-500 text-xs mb-12'>
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
                    <div className='flex justify-between mt-4'>
                        <div className='form-check'>
                            <input
                                className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                                type='checkbox'
                                value=''
                                id='flexCheckDefault'
                            />
                            <label
                                className=' ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all'
                                htmlFor='flexCheckDefault'
                            >
                                Save password
                            </label>
                        </div>
                        <span className='text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all'>
              Forgot Password ?
            </span>
                    </div>
                    <button
                        type='submit'
                        className='block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2'
                    >
                        Login
                    </button>
                    <div className='flex justify-between mt-4'>
            <span className='text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all'>
              If you don't have account. Please{' '}
                <a
                    className='underline cursor-pointer hover:scale-105'
                    onClick={() => {
                        setToggleLogin(false);
                        setToggleSignUp(true);
                    }}
                >
                sign up
              </a>
            </span>
                    </div>
                </form>
            </div>
        </div>
    );
}
