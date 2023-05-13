import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';

function Layout({crrUser,clearUserData}) {
    return (
        <>
        <Navbar crrUser={crrUser} clearUserData={clearUserData}/>

        <Outlet/>
        
        </>
    );
}

export default Layout;