import Home from '../pages/Home';
import AdminProfile from '../pages/Admin/profiles';
import Dashboard from '../pages/Admin/dashboard';
import Blogs from '../pages/Blogs';
import BlogManagement from '../pages/Admin/blogs';
import ItemsManagement from '../pages/Admin/items';
import Player from '../pages/Admin/players';
import Ranking from '../pages/Ranking';
import Items from '../pages/Items';
import Heroes from '../pages/Heroes';
import Guide from '../pages/Guide';
import AboutUs from '../pages/AboutUs';
import Login from '../pages/User/login';
import Registration from '../pages/User/registration';
import NotFound404 from '../pages/NotFound404';
import { AdminLayout, MainLayout, UserLayout } from '../components/Layouts';
import Profile from '../pages/User/profile';
import ChangePassword from '../pages/User/password';
import ForgotPassword from '../pages/User/forgot';
import Chart from '../pages/Admin/chart';


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
        path: '/items',
        name: 'Items',
        component: Items,
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
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        layout: AdminLayout
    },
    {
        path: '/chart',
        name: 'Chart-Management',
        component: Chart,
        layout: AdminLayout
    },
    {
        path: '/blogs',
        name: 'Blog-Management',
        component: BlogManagement,
        layout: AdminLayout
    },
    {
        path: '/items',
        name: 'Items-Management',
        component: ItemsManagement,
        layout: AdminLayout
    },
    {
        path: '/player',
        name: 'Players-Management',
        component: Player,
        layout: AdminLayout
    },
    {
        path: '/admin-profile',
        name: 'Admin-Profile',
        component: AdminProfile,
        layout: AdminLayout
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
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        layout: UserLayout
    },
    {
        path: '/change-password',
        name: 'change-password',
        component: ChangePassword,
        layout: UserLayout
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword,
        layout: UserLayout
    }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };