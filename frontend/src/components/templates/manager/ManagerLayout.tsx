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
            <div>
                <Navbar />
                <WrapperContent>
                    <Sidebar  menuCollapse = {collapsed} setMenuCollapse = {handleCollapsedChange} />
                </WrapperContent>
                <div className='ml-[290px] h-full py-[40px] px-[15px]' >
                    <Outlet />
                </div>
            </div>
        </WrapperAll>
    );
}
