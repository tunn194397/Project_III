import {IMAGES} from "../utils/images/images";
import { Image } from '../style/styled';
export const userRoute = {
    home: {
        path: '/'
    }

}

export const managerRoute = [
    {
        title: 'Home',
        path: '/manager',
        icon: <Image width="25px" height="25px" src={IMAGES.icon.home} />,
        subRoute: []
    },
    {
        title: 'Employee',
        path: '/manager',
        icon: <Image width="25px" height="25px" src={IMAGES.icon.personal} />,
        subRoute: [
            {
                title: 'Managers',
                path: '/manager',
                icon: ''
            },
            {
                title: 'Staffs',
                path: '/manager',
                icon: ''
            },
        ]
    },
    {
        title: 'Items Management',
        path: '/manager',
        icon: <Image width="25px" height="25px" src={IMAGES.icon.item} />,
        subRoute: [
            {
                title: 'Supply receipts',
                path: '/manager',
                icon: ''
            },
            {
                title: 'Sell receipts',
                path: '/manager',
                icon: ''
            },
        ]
    },
    {
        title: 'Supply',
        path: '/manager',
        icon: <Image width="25px" height="25px" src={IMAGES.icon.supply} />,
        subRoute: []
    },
    {
        title: 'Customers',
        path: '/manager',
        icon: <Image width="25px" height="25px" src={IMAGES.icon.customer} />,
        subRoute: []
    },
    {
        title: 'Warehouse',
        path: '/manager',
        icon: <Image width="25px" height="25px" src={IMAGES.icon.warehouse} />,
        subRoute: []
    },
]

export const managerExtraRoute = [
    {
        title: 'You',
        path: '/manager',
        icon: <Image width="25px" height="25px" src={IMAGES.icon.you} />,
        subRoute: []
    },
    {
        title: 'Settings',
        path: '/manager',
        icon: <Image width="25px" height="25px" src={IMAGES.icon.setting} />,
        subRoute: []
    },
    {
        title: 'Help center',
        path: '/manager',
        icon: <Image width="25px" height="25px" src={IMAGES.icon.help} />,
        subRoute: []
    },
]