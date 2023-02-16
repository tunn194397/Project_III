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
import ManagerCustomerDetail from "../components/pages/manager/detail/CustomerDetail";
import ManagerManagerDetail from "../components/pages/manager/detail/ManagerDetail";
import ManagerStaffDetail from "../components/pages/manager/detail/StaffDetail";
import ManagerCreateItem from "../components/pages/manager/createPage/CreateItem";
import ManagerSupplyDetail from "../components/pages/manager/detail/SupplyDetail";
import ManagerItemDetail from "../components/pages/manager/detail/ItemDetail";
import ManagerCreateSellReceipt from "../components/pages/manager/createPage/CreateSellReceipt";
import ManagerVoucherDetail from "../components/pages/manager/detail/VoucherDetail";
import ManagerCreateImportReceipt from "../components/pages/manager/createPage/CreateImportReceipt";
import ManagerImportReceiptDetail from "../components/pages/manager/detail/ImportReceiptDetail";
import ManagerSellReceiptDetail from "../components/pages/manager/detail/SellReceiptDetail";
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
        element: <ManagerHome/>,
        permission: 'MANAGER_HOME_VIEW',
        able : 0
    },
    {
        title: 'Employee',
        path: '/manager/employees',
        icon: IMAGES.icon.personal,
        subRoute: [
            {
                title: 'Managers',
                path: '/manager/employees/managers',
                icon: IMAGES.icon.personal,
                element: <ManagerManager/>,
                permission: 'MANAGER_MANAGER_VIEW',
                able : 0
            },
            {
                title: 'Staffs',
                path: '/manager/employees/staffs',
                icon: IMAGES.icon.personal,
                element: <ManagerStaffs/>,
                permission: 'MANAGER_STAFF_VIEW',
                able : 0
            },
        ]
    },
    {
        title: 'Items',
        path: '/manager/items',
        icon: IMAGES.icon.item,
        subRoute: [
            {
                title: 'Supply',
                path: '/manager/items/supply',
                icon: IMAGES.icon.importIcon,
                element: <ManagerSupplyReceipt/>,
                permission: 'MANAGER_SUPPLY_VIEW',
                able : 0
            },
            {
                title: 'Sell',
                path: '/manager/items/sell',
                icon: IMAGES.icon.sellIcon,
                element: <ManagerSellReceipt/>,
                permission: 'MANAGER_SELL_VIEW',
                able : 0
            },
            {
                title: 'Items',
                path: '/manager/items/items',
                icon: IMAGES.icon.itemIcon,
                element:  <ManagerItem/>,
                permission: 'MANAGER_ITEM_VIEW',
                able : 0
            }
        ]
    },
    {
        title: 'Supply',
        path: '/manager/supply',
        icon: IMAGES.icon.supply,
        subRoute: [],
        element: <ManagerSupply/>,
        permission: 'MANAGER_SUPPLY_VIEW',
        able : 0
    },
    {
        title: 'Customers',
        path: '/manager/customers',
        icon: IMAGES.icon.customer,
        subRoute: [],
        element: <ManagerCustomer/>,
        permission: 'MANAGER_CUSTOMER_VIEW',
        able : 0
    },
    {
        title: 'Warehouse',
        path: '/manager/warehouse',
        icon: IMAGES.icon.warehouse,
        subRoute: [],
        element: <ManagerWarehouse/>,
        permission: 'MANAGER_WAREHOUSE_VIEW',
        able : 0
    },
    {
        title: 'Vouchers' ,
        path: '/manager/voucher',
        icon: IMAGES.icon.voucher,
        subRoute: [],
        element: <ManagerVoucher/>,
        permission: 'MANAGER_VOUCHER_VIEW',
        able : 0
    },
    {
        title: 'Permission',
        path: '/manager/permission',
        icon: IMAGES.icon.permission,
        subRoute: [],
        element: <ManagerPermission/>,
        permission: 'MANAGER_PERMISSION_VIEW',
        able : 0
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

export const managerDetailRoute = [
    {
        path: '/manager/customers/:id',
        element: <ManagerCustomerDetail/>
    },
    {
        path: '/manager/employees/managers/:id',
        element: <ManagerManagerDetail/>
    },
    {
        path: '/manager/employees/staffs/:id',
        element: <ManagerStaffDetail/>
    },
    {
        path: '/manager/supply/:id',
        element: <ManagerSupplyDetail/>
    },
    {
        path: '/manager/items/items/:id',
        element: <ManagerItemDetail/>
    },
    {
        path: '/manager/voucher/:id',
        element: <ManagerVoucherDetail/>
    },
    {
        path: '/manager/items/supply/:id',
        element: <ManagerImportReceiptDetail/>
    },
    {
        path: '/manager/items/sell/:id',
        element: <ManagerSellReceiptDetail/>
    },
    {
        path: '/manager/items/items/create',
        element: <ManagerCreateItem/>
    },
    {
        path: '/manager/items/sell/create',
        element: <ManagerCreateSellReceipt/>
    },
    {
        path: '/manager/items/supply/create',
        element: <ManagerCreateImportReceipt/>
    }
]