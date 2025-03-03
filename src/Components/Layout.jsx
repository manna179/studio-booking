import React from 'react';
import Navbar from './Pages/Navbar';
import Footer from './Pages/Footer';

import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <header className='border'>
                <Navbar></Navbar>
            </header>
            <main className="min-h-[calc(100vh-306px)] w-11/12 mx-auto">
             <Outlet></Outlet>
            </main>
            <footer>
               <Footer></Footer>
            </footer>
        </div>
    );
};

export default Layout;