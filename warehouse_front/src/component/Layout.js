import React from 'react';
import { Outlet } from 'react-router-dom';
import "../Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <header>        
        <nav className='navbar'>
        <ul>
            <li><a href='/items'>Items</a></li>
            <li><a href='/requests'>Requests</a></li>
        </ul>
        </nav>
      </header>
      <main>
        <div className='column'>
            <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;