import ManagerLoginPage from "../components/pages/manager/Login";
import ManagerLayout from "../components/templates/manager/ManagerLayout";
import {managerDetailRoute, managerExtraRoute, managerRoute, userRoute} from "./ConstRoute";
import {element} from "prop-types";


const managerChildren: any[] = [], userChildren: any[] = [];
managerRoute.map((e: any) => {
    if (e.subRoute.length) {
        e.subRoute.map((sub: any) => {
            managerChildren.push({path: sub.path, element: sub.element})
        })
    }
    else managerChildren.push({path: e.path, element: e.element})
})

managerExtraRoute.map((e: any) => {
    if (e.subRoute.length) {
        e.subRoute.map((sub: any) => {
            managerChildren.push({path: sub.path, element: sub.element})
        })
    }
    else managerChildren.push({path: e.path, element: e.element})
})


userRoute.map((e: any) => {
    if (e.subRoute.length) {
        e.subRoute.map((sub: any) => {
            userChildren.push({path: sub.path, element: sub.element})
        })
    }
    else userChildren.push({path: e.path, element: e.element})
})
userChildren.push({path: '*', element: <div>This url is incorrect</div>})

managerDetailRoute.map((e: any) => {
    managerChildren.push({path: e.path, element: e.element})
})

export const routes = [
    {
        path: '/manager',
        element: <ManagerLayout />,
        children: managerChildren
    },
    {
        path: '/manager/login',
        element:<ManagerLoginPage />
    },
    {
        path: '/',
        children: userChildren
    },
    {
        path: '/user/login',
    }
];
