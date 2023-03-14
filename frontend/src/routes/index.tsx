import ManagerLoginPage from "../components/pages/manager/Login";
import ManagerLayout from "../components/templates/manager/ManagerLayout";
import {managerDetailRoute, managerExtraRoute, managerRoute, userDetailRoute, userRoute} from "./ConstRoute";
import UserRegisterPage from "../components/pages/user/UserRegister";
import UserLoginPage from "../components/pages/user/UserLogin";
import UserHome from "../components/pages/user/UserHome";


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
managerDetailRoute.map((e: any) => {
    managerChildren.push({path: e.path, element: e.element})
})

userRoute.map((e: any) => {
    userChildren.push({path: e.path, element: e.element})
})
userDetailRoute.map((e: any) => {
    userChildren.push({path: e.path, element: e.element})
})
userChildren.push({path: '*', element: <div>This url is incorrect</div>})

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
        path: '/user',
        element: <UserHome/>,
        children: userChildren
    },
    {
        title: 'Login',
        path: '/user/login',
        element: <UserLoginPage/>,
        subRoute: []
    },
    {
        title: 'Register',
        path: '/user/register',
        element: <UserRegisterPage/>,
        subRoute: []
    },

];
