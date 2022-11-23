import {IMAGES} from "../utils/images/images";
import { Image } from '../style/styled';
import ManagerHome from "../components/pages/manager/Home";
import UserHome from "../components/pages/user/UserHome";
import ManagerManager from "../components/pages/manager/employee/Managers";
import ManagerSupplyReceipt from "../components/pages/manager/items/SupplyReceipt";
import ManagerStaffs from "../components/pages/manager/employee/Staffs";
import ManagerSellReceipt from "../components/pages/manager/items/SellReceipt";
import ManagerSupply from "../components/pages/manager/Supply";
import ManagerCustomer from "../components/pages/manager/Customer";
import ManagerWarehouse from "../components/pages/manager/Warehouse";
import ManagerPersonal from "../components/pages/manager/Personal";
import ManagerSetting from "../components/pages/manager/Setting";
import ManagerHelp from "../components/pages/manager/Help";
export const userRoute = [
    {
        title: 'Home',
        path: '/',
        subRoute: [],
        element: <UserHome/>
    },
]
export const managerRoute = [
    {
        title: 'Home',
        path: '/manager',
        icon: <Image width="25px" height="25px" src={IMAGES.icon.home} />,
        subRoute: [],
        element: <ManagerHome/>
    },
    {
        title: 'Employee',
        path: '/manager/employees',
        icon: <Image width="25px" height="25px" src={IMAGES.icon.personal} />,
        subRoute: [
            {
                title: 'Managers',
                path: '/manager/employees/managers',
                icon: '',
                element: <ManagerManager/>
            },
            {
                title: 'Staffs',
                path: '/manager/employees/staffs',
                icon: '',
                element: <ManagerStaffs/>
            },
        ]
    },
    {
        title: 'Items Management',
        path: '/manager/items',
        icon: <Image width="25px" height="25px" src={IMAGES.icon.item} />,
        subRoute: [
            {
                title: 'Supply receipts',
                path: '/manager/items/supply',
                icon: '',
                element: <ManagerSupplyReceipt/>
            },
            {
                title: 'Sell receipts',
                path: '/manager/items/sell',
                icon: '',
                element: <ManagerSellReceipt/>
            },
        ]
    },
    {
        title: 'Supply',
        path: '/manager/supply',
        icon: <Image width="25px" height="25px" src={IMAGES.icon.supply} />,
        subRoute: [],
        element: <ManagerSupply/>
    },
    {
        title: 'Customers',
        path: '/manager/customers',
        icon: <Image width="25px" height="25px" src={IMAGES.icon.customer} />,
        subRoute: [],
        element: <ManagerCustomer/>
    },
    {
        title: 'Warehouse',
        path: '/manager/warehouse',
        icon: <Image width="25px" height="25px" src={IMAGES.icon.warehouse} />,
        subRoute: [],
        element: <ManagerWarehouse/>
    },
]

export const managerExtraRoute = [
    {
        title: 'You',
        path: '/manager/personal',
        icon: <Image width="25px" height="25px" src={IMAGES.icon.you} />,
        subRoute: [],
        element: <ManagerPersonal/>
    },
    {
        title: 'Settings',
        path: '/manager/setting',
        icon: <Image width="25px" height="25px" src={IMAGES.icon.setting} />,
        subRoute: [],
        element: <ManagerSetting/>
    },
    {
        title: 'Help center',
        path: '/manager/help',
        icon: <Image width="25px" height="25px" src={IMAGES.icon.help} />,
        subRoute: [],
        element: <ManagerHelp/>
    },
]