import Home from '../pages/Home';
import Admin from '../pages/Admin';
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
    }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };