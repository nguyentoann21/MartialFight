import Header from './Header';
import Footer from './Footer';
import './main.scss';

function MainLayout({ children }) {
    return(
        <>
            <Header />
            <main className='main-container'> { children } </main>
            <Footer />
        </>
    );
}

export default MainLayout;