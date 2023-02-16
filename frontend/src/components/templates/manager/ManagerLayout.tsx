import Navbar from '../../organisms/manager/Navbar';
import Sidebar from '../../organisms/manager/Sidebar';
import {useState} from "react";
import { WrapperAll, WrapperContent, Content} from '../../../style/styled';
import {Outlet} from "react-router-dom";

export default function ManagerLayout() {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const handleCollapsedChange = () => {
        setCollapsed(!collapsed);
    };
    return (
        <WrapperAll>
            <div className=''>
                <Navbar />
                <WrapperContent className='fixed top-[8%]'>
                    <Sidebar  menuCollapse = {collapsed} setMenuCollapse = {handleCollapsedChange} />
                </WrapperContent>
                <div className='fixed top-[8%] left-[200px] h-[92%] w-[87%] py-[30px] px-[20px] bg-gray-100 overflow-auto' >
                    <Outlet />
                </div>
            </div>
        </WrapperAll>
    );
}
