import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Layout = () =>
{
  return (
    <>
      <nav>
        <ul>
          <li>
            Home
          </li>
          <li>
            search
          </li>
          <li>
            my comic books
          </li>
          <li>
            logout
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
  
export default Layout;