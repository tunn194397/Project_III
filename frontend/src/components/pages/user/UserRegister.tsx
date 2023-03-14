import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './login.css';
import {appendErrors, Controller, useForm} from 'react-hook-form';
import {AuthContext} from "../../../context/AuthContext";
import {registerUser} from "../../../api/user/auth/request";
import {IMAGES} from "../../../utils/images/images";
import DatePicker from "react-datepicker";
export default function UserLoginPage() {
    const navigate = useNavigate();
    const { setAuthData, clearAuthData } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm();

    useEffect(() => {
        clearAuthData?.();
    });

    const onSubmit = async (data: any) => {
        data.birthday = Number(data.birthday.getTime())
        const createResult = await registerUser({
            newUserDto: {firstName: data.firstName, lastName: data.lastName, phone: data.phone, email: data.email, username: data.username, password: data.password, birthday: data.birthday, status: 'ACTIVE', roleId: 6},
            newCustomerDto: {registerType: 'CUSTOMER', registerStaffId: 0}
        });
        if (createResult.success) {
            toast.success('Register successfully!')
            navigate('/user/login')
        }
        else toast.error(createResult.message)
    };

    const handleClickLogin = () => {
        navigate('/user/login')
    }
    const handleClickBack = () => {
        navigate('/user')
    }
    return (

        <div className='h-screen flex'>
            <div className='flex w-full items-center bg-white space-y-8'>
                <div className='w-full flex flex-rol space-x-5  px-8 md:px-32 lg:px-24'>
                    <form className='bg-white rounded-md shadow-2xl p-5 w-1/3 h-1/3' onSubmit={handleSubmit(onSubmit)}>
                        <h1 className='text-gray-800 font-bold text-2xl mb-5 underline'>REGISTER</h1>
                        <div className='grid grid-cols-3 gape-2'>
                            <div className='mb-3 col-span-2'>
                                <div className='space-y-2 items-center'>
                                    <div className=''> First name </div>
                                    <div className='px-2'>
                                        <input
                                            id='firstName'
                                            className=' w-full pl-2 outline-none text-base text-[#757575] border-2 py-1 px-3 rounded-lg'
                                            type='text'
                                            placeholder='First name'
                                            {...register('firstName', { required: true })}
                                        />
                                    </div>
                                </div>
                                {errors?.firstName?.type === 'required' && <p>⚠ This field is required!</p>}
                            </div>
                            <div className='mb-3 col-span-1'>
                                <div className='space-y-2 items-center'>
                                    <div className=''> Last name </div>
                                    <div className='px-2'>
                                        <input
                                            id='lastName'
                                            className=' w-full pl-2 outline-none text-base text-[#757575] border-2 py-1 px-3 rounded-lg'
                                            type='text'
                                            placeholder='Last name'
                                            {...register('lastName', { required: true })}
                                        />
                                    </div>
                                </div>
                                {errors?.lastName?.type === 'required' && <p>⚠ This field is required!</p>}
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-2'>
                            <div className='mb-3 col-span-1'>
                                <div className='space-y-2 items-center'>
                                    <div className=''> Contact no </div>
                                    <div className='px-2'>
                                        <input
                                            id='phone'
                                            className=' w-full pl-2 outline-none text-base text-[#757575] border-2 py-1 px-3 rounded-lg'
                                            type='text'
                                            placeholder='Contact number'
                                            {...register('phone', { required: true, minLength: 6 })}
                                        />
                                    </div>
                                </div>
                                {errors?.phone?.type === 'required' && <p>⚠ This field is required!</p>}
                            </div>
                            <div className='mb-3 col-span-2'>
                                <div className='space-y-2 items-center'>
                                    <div className=''> Email address </div>
                                    <div className='px-2'>
                                        <input
                                            id='email'
                                            className=' w-full pl-2 outline-none text-base text-[#757575] border-2 py-1 px-3 rounded-lg'
                                            type='text'
                                            placeholder='Email'
                                            {...register('email', { required: true })}
                                        />
                                    </div>
                                </div>
                                {errors?.email?.type === 'required' && <p>⚠ This field is required!</p>}
                            </div>
                        </div>
                        <div className='mb-3'>
                            <div className='space-y-2 items-center'>
                                <div className=''> Birthday </div>
                                <div>
                                    <div className='flex flex-row py-1.5 px-4 border-[1px] border-gray-200 rounded-lg outline-none items-center space-x-3 focus-within:border-blue-400 focus-within:border-2 text-sm' >
                                        <div>
                                            <svg height={22} width={22}>{IMAGES.icon.calendar}</svg>
                                        </div>
                                        <Controller
                                            control={control}
                                            name='birthday'
                                            defaultValue={new Date()}
                                            render={(e: any) => (
                                                <DatePicker
                                                    onChange={(date) => e.field.onChange(date)}
                                                    selected={e.field.value}
                                                    className='outline-none disabled:bg-white'
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            {errors?.birthday?.type === 'required' && <p>⚠ This field is required!</p>}
                        </div>
                        <div className='grid grid-cols-2 gap-2 '>
                            <div className='mb-3'>
                                <div className='space-y-2 items-center'>
                                    <div className=''> Username </div>
                                    <div className='px-2'>
                                        <input
                                            id='username'
                                            className=' w-full pl-2 outline-none text-base text-[#757575] border-2 py-1 px-3 rounded-lg'
                                            type='username'
                                            placeholder='User name'
                                            {...register('username', { required: true, minLength: 6 })}
                                        />
                                    </div>
                                </div>
                                {errors?.username?.type === 'required' && <p>⚠ This field is required!</p>}
                            </div>
                            <div className='mb-3'>
                                <div className='space-y-2 items-center'>
                                    <div className=''> Password </div>
                                    <div className='px-2'>
                                        <input
                                            id='password'
                                            className=' w-full pl-2 outline-none text-base text-[#757575] border-2 py-1 px-3 rounded-lg'
                                            type='password'
                                            placeholder='Password'
                                            {...register('password', { required: true, minLength: 6 })}
                                        />
                                    </div>
                                </div>
                                {errors?.password?.type === 'required' && <p>⚠ This field is required!</p>}
                            </div>
                        </div>
                        <div className='mt-5 w-full flex justify-between'>
                            <div className='flex flex-col justify-between'>
                                <span className='text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all' onClick={handleClickBack}>
                                    Back to home page
                                </span>
                                <span className='text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all' onClick={handleClickLogin}>
                                Have account?
                              </span>
                            </div>
                            <button
                                type='submit'
                                className='block w-1/2 bg-indigo-600 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2'
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <img className='w-2/3' src={"https://media.istockphoto.com/id/1157789866/photo/modern-computer-laptop-with-blank-screen-on-counter-barand-window-view.jpg?s=612x612&w=0&k=20&c=Idggc96ENAdz7R_ANTzvWpMTbaUcTV4JvJYKJHAD71A="}/>
                </div>
            </div>
        </div>
    );
}