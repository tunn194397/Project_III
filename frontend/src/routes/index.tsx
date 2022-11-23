import ManagerLoginPage from "../components/pages/manager/Login";
import ManagerLayout from "../components/templates/manager/ManagerLayout";

export const routes = [
    {
        path: '/manager',
        element: <ManagerLayout />,
        children: [
        ]
    },
    {
        path: '/manager/login',
        element:<ManagerLoginPage />
    },
    {
        path: '/',
        children: [
            { path: '*', element: <div>This url is incorrect</div> }
        ]
    },
    {
        path: '/user/login',
    }
];
