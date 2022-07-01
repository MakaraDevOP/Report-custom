export default [
    {
        name: "Master",
        component: import ('./../pages/layout/master.vue'),
        path: "/",
        redirect: "/home",
        children: [
            {
                name: "Home",
                component: import ('./../pages/home'),
                path: "/home",
            },
        ]
    },
]