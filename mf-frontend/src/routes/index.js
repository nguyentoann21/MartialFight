import Home from '../pages/Home';
import Admin from '../pages/Admin';
import Login from '../pages/User/login';
import NotFound404 from '../pages/NotFound404';
import { MainLayout } from '../components/Layouts';


const publicRoutes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        layout: MainLayout
    },
    {
        path: '/*',
        name: 'notfound404',
        component: NotFound404,
        layout: MainLayout
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        //layout: LayoutAdmin
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        layout: null
    }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };