import Home from '../pages/Home';
import AdminProfile from '../pages/Admin/adminprofile';
import Dashboard from '../pages/Admin/dashboard';
import Blogs from '../pages/Blogs';
import AdminBlog from '../pages/Admin/adminblog';
import AdminItem from '../pages/Admin/adminitem';
import AdminPlayer from '../pages/Admin/adminplayer';
import Ranking from '../pages/Ranking';
import Items from '../pages/Items';
import Character from '../pages/Character';
import Guide from '../pages/Guide';
import AboutUs from '../pages/AboutUs';
import Login from '../pages/User/login';
import Registration from '../pages/User/registration';
import NotFound404 from '../pages/NotFound404';
import { AdminLayout, MainLayout, RuleLayout, UserLayout } from '../components/Layouts';
import Profile from '../pages/User/profile';
import ChangePassword from '../pages/User/password';
import ForgotPassword from '../pages/User/forgot';
import AdminChart from '../pages/Admin/adminchart';
import Policy from '../pages/Rules/policy';
import TermsAndConditions from '../pages/Rules/conditions';


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
        path: '/character',
        name: 'Character',
        component: Character,
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
        name: 'Admin Chart',
        component: AdminChart,
        layout: AdminLayout
    },
    {
        path: '/admin-blogs',
        name: 'Admin Blog',
        component: AdminBlog,
        layout: AdminLayout
    },
    {
        path: '/admin-items',
        name: 'Admin Item',
        component: AdminItem,
        layout: AdminLayout
    },
    {
        path: '/player',
        name: 'Admin Player',
        component: AdminPlayer,
        layout: AdminLayout
    },
    {
        path: '/admin-profile',
        name: 'Admin Profile',
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
    },
    {
        path: '/privacy-policy',
        name: 'privacy-policy',
        component: Policy,
        layout: RuleLayout
    },
    {
        path: '/terms-condition',
        name: 'terms-condition',
        component: TermsAndConditions,
        layout: RuleLayout
    }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };