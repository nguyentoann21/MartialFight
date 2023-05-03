import Home from '../pages/Home';
import Admin from '../pages/Admin';
import Blogs from '../pages/Blogs';
import Ranking from '../pages/Ranking';
import Shop from '../pages/Shop';
import Heroes from '../pages/Heroes';
import Guide from '../pages/Guide';
import AboutUs from '../pages/AboutUs';
import Login from '../pages/User/login';
import Registration from '../pages/User/registration';
import NotFound404 from '../pages/NotFound404';
import { MainLayout, UserLayout } from '../components/Layouts';


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
        path: '/blog',
        name: 'Blogs',
        component: Blogs,
        layout: MainLayout
    },
    {
        path: '/ranking',
        name: 'Ranking',
        component: Ranking,
        layout: MainLayout
    },
    {
        path: '/shop',
        name: 'Shop',
        component: Shop,
        layout: MainLayout
    },
    {
        path: '/heroes',
        name: 'Heroes',
        component: Heroes,
        layout: MainLayout
    },
    {
        path: '/guide',
        name: 'Guide',
        component: Guide,
        layout: MainLayout
    },
    {
        path: '/about-us',
        name: 'About Us',
        component: AboutUs,
        layout: MainLayout
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        //layout: LayoutAdmin
    },
    {
        path: '/sign-in',
        name: 'sign-in',
        component: Login,
        layout: UserLayout
    },
    {
        path: '/sign-up',
        name: 'sign-up',
        component: Registration,
        layout: UserLayout
    }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };