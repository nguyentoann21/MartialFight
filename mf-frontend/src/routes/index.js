import Home from '../pages/Home';
import AdminProfile from '../pages/Admin/adminProfile';
import Dashboard from '../pages/Admin/dashboard';
import News from '../pages/News';
import AdminNews from '../pages/Admin/adminNews';
import AdminItem from '../pages/Admin/adminItem';
import AdminPlayer from '../pages/Admin/adminPlayer';
import AdminMap from '../pages/Admin/adminMap';
import AdminSect from '../pages/Admin/adminSect';
import Ranking from '../pages/Ranking';
import Items from '../pages/Items';
import Character from '../pages/Character';
import Guide from '../pages/Guide';
import AboutUs from '../pages/AboutUs';
import Login from '../pages/User/login';
import Registration from '../pages/User/registration';
import NotFound404 from '../pages/NotFound404';
import {
  AdminLayout,
  MainLayout,
  RuleLayout,
  UserLayout,
} from '../components/Layouts';
import Profile from '../pages/User/profile';
import ChangePassword from '../pages/User/password';
import ForgotPassword from '../pages/User/forgot';
import AdminCategory from '../pages/Admin/adminCategory';
import Policy from '../pages/Rules/policy';
import TermsAndConditions from '../pages/Rules/conditions';
import AdminCharacter from '../pages/Admin/adminCharacter';
import UpdateProfile from '../pages/User/updateProfile';
import AdminSkill from '../pages/Admin/adminSkill';

const publicRoutes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/*',
    name: 'notfound404',
    component: NotFound404,
    layout: MainLayout,
  },
  {
    path: '/news',
    name: 'News',
    component: News,
    layout: MainLayout,
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: Ranking,
    layout: MainLayout,
  },
  {
    path: '/items',
    name: 'Items',
    component: Items,
    layout: MainLayout,
  },
  {
    path: '/character',
    name: 'Character',
    component: Character,
    layout: MainLayout,
  },
  {
    path: '/guide',
    name: 'Guide',
    component: Guide,
    layout: MainLayout,
  },
  {
    path: '/about-us',
    name: 'About Us',
    component: AboutUs,
    layout: MainLayout,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    layout: AdminLayout,
  },
  {
    path: '/admin-categories',
    name: 'Admin Category',
    component: AdminCategory,
    layout: AdminLayout,
  },
  {
    path: '/admin-news',
    name: 'Admin News',
    component: AdminNews,
    layout: AdminLayout,
  },
  {
    path: '/admin-items',
    name: 'Admin Item',
    component: AdminItem,
    layout: AdminLayout,
  },
  {
    path: '/admin-players',
    name: 'Admin Player',
    component: AdminPlayer,
    layout: AdminLayout,
  },
  {
    path: '/admin-profile',
    name: 'Admin Profile',
    component: AdminProfile,
    layout: AdminLayout,
  },
  {
    path: '/admin-character',
    name: 'Admin Character',
    component: AdminCharacter,
    layout: AdminLayout,
  },
  {
    path: '/admin-maps',
    name: 'Admin Maps',
    component: AdminMap,
    layout: AdminLayout,
  },
  {
    path: '/admin-sects',
    name: 'Admin Sects',
    component: AdminSect,
    layout: AdminLayout,
  },
  {
    path: '/admin-skills',
    name: 'Admin Skills',
    component: AdminSkill,
    layout: AdminLayout,
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: Login,
    layout: UserLayout,
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: Registration,
    layout: UserLayout,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    layout: UserLayout,
  },
  {
    path: '/change-password',
    name: 'change-password',
    component: ChangePassword,
    layout: UserLayout,
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
    layout: UserLayout,
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: Policy,
    layout: RuleLayout,
  },
  {
    path: '/terms-condition',
    name: 'terms-condition',
    component: TermsAndConditions,
    layout: RuleLayout,
  },
  {
    path: '/update-profile',
    name: 'update-profile',
    component: UpdateProfile,
    layout: UserLayout,
  }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
