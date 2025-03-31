import React from 'react';
import { Link } from "react-router-dom";

const TopMenu = () =>
{
  return (
    <div className="templatemo_menu">
      <nav>
        <ul>
          <li><a href="index.html" className="current">Home</a></li>
          <li><a href="subpage.html">Search</a></li>
          <li><a href="subpage.html">Books</a></li>            
          <li><a href="subpage.html">New Releases</a></li> 
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TopMenu;