import './UserLayout.scss'

function UserLayout({ children }) {
    return(
        <>
            <main className='user-layout-container'> { children } </main>
        </>
    );
}

export default UserLayout;