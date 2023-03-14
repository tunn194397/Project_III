import UserNavbar from "../../organisms/user/Navbar";
import UserMainNavbar from "../../organisms/user/MainNavbar";
import GridItems from "../../atoms/GridItems";
import {Outlet, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserMainContext} from "../../../context/UserMainContext";

export default function UserHome() {
    const {searchQuery, setUserMainData, setUserMainContext} = useContext(UserMainContext)
    const navigate = useNavigate();
    const list = [
        { label: 'Laptop', id: 1},
        { label: 'Personal Computer', id: 2},
        { label: 'PC Monitor', id: 10},
        { label: 'PC Accessory', id: 3},
        { label: 'PC Device', id: 4},
        { label: 'Sound Device', id: 5},
    ]

    if (!searchQuery) setUserMainContext?.()

    return (
        <div className='top-0 flex-row '>
            <UserNavbar/>
            <UserMainNavbar/>
            <div className='w-full h-full flex flex-col py-3 space-y-4'>
                <div className='w-full bg-cover bg-center transition-all ease-in-out duration-1000 transform translate-x-0 slide'>
                    <div className='w-full flex justify-between px-8 py-10 space-x-10'>
                        <div className='flex flex-col w-1/6 space-y-3'>
                            <div className="text-xl font-bold underline"> List Device</div>
                            <div className = 'flex flex-col bg-white rounded-md'>
                                {list.map((e: any, index: number) => {
                                    const activeButtonClass = 'bg-gray-200 py-2 px-10 border-gray-200 border-b-2 font-semibold rounded-md text-left '
                                    const inactiveButtonClass = 'hover:bg-gray-200 py-2 px-10 border-gray-200 border-b-2 font-semibold rounded-md text-left '
                                    return (
                                        <button className={searchQuery?.deviceType === e.id ? activeButtonClass: inactiveButtonClass} key = {index}
                                                onClick={() => {
                                                    setUserMainData?.({
                                                        page: 1,
                                                        pageSize: 20,
                                                        minPrice: 0,
                                                        maxPrice: 1000000000000000,
                                                        supplyId: 0,
                                                        deviceType: e.id,
                                                        branch: '',
                                                        searchString: '',
                                                        orderBy: 'ASC',
                                                        orderField: 'name'
                                                    })
                                                    navigate('/user')
                                                }}>
                                            {e.label}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='w-5/6 overscroll-y-auto bg-gray-100 rounded-lg border-2 border-gray-200'>
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
