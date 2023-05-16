import React from 'react';
import './admin.scss';
import NavbarAdmin from './navbar';

const AdminLayout = ( { children } ) => {
    return(
        <div className='admin-page'>
            <div className='admin-navbar'>
                <NavbarAdmin />
            </div>
            <main className='admin-container'> {children} </main>
        </div>
    )
}

export default AdminLayout;