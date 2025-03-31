import React from 'react';
import { Outlet, Link } from "react-router-dom";
import TopMenu from './top_menu';

const Layout = () =>
{
  return (
    <div className="templatemo_container">
      <TopMenu />
      
      <Outlet />
    </div>
  );
};
  
export default Layout;