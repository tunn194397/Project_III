export const routes = [
    {
        path: '/admin',
        children: [
        ]
    },
    {
        path: '/admin/login',
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
