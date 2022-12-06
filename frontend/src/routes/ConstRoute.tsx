import {IMAGES} from "../utils/images/images";
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
import ManagerItem from "../components/pages/manager/items/Item";
import ManagerPermission from "../components/pages/manager/Permission";
import ManagerVoucher from "../components/pages/manager/Voucher";
export const userRoute = [
    {
        title: 'Home',
        path: '/user/',
        subRoute: [],
        element: <UserHome/>
    },
]
export const managerRoute = [
    {
        title: 'Home',
        path: '/manager',
        icon: IMAGES.icon.home,
        subRoute: [],
        element: <ManagerHome/>
    },
    {
        title: 'Employee',
        path: '/manager/employees',
        icon: IMAGES.icon.personal,
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
        icon: IMAGES.icon.item,
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
            {
                title: 'Items',
                path: '/manager/items/items',
                icon: '',
                element:  <ManagerItem/>
            }
        ]
    },
    {
        title: 'Supply',
        path: '/manager/supply',
        icon: IMAGES.icon.supply,
        subRoute: [],
        element: <ManagerSupply/>
    },
    {
        title: 'Customers',
        path: '/manager/customers',
        icon: IMAGES.icon.customer,
        subRoute: [],
        element: <ManagerCustomer/>
    },
    {
        title: 'Warehouse',
        path: '/manager/warehouse',
        icon: IMAGES.icon.warehouse,
        subRoute: [],
        element: <ManagerWarehouse/>
    },
    {
        title: 'Sale off and Voucher' ,
        path: '/manager/voucher',
        icon: IMAGES.icon.warehouse,
        subRoute: [],
        element: <ManagerVoucher/>
    },
    {
        title: 'Permission',
        path: '/manager/permission',
        icon: IMAGES.icon.warehouse,
        subRoute: [],
        element: <ManagerPermission/>
    },
]

export const managerExtraRoute = [
    {
        title: 'You',
        path: '/manager/personal',
        icon: IMAGES.icon.you,
        subRoute: [],
        element: <ManagerPersonal/>
    },
    {
        title: 'Settings',
        path: '/manager/setting',
        icon: IMAGES.icon.setting,
        subRoute: [],
        element: <ManagerSetting/>
    },
    {
        title: 'Help center',
        path: '/manager/help',
        icon: IMAGES.icon.help,
        subRoute: [],
        element: <ManagerHelp/>
    },
]