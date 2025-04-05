import React from 'react';
import { Link } from "react-router-dom";

const TopMenu = () =>
{
  return (
    <div className="templatemo_menu">
      <nav>
        <ul>
          <li><Link to="/home" className="current">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li>
            <Link to="/books">Books</Link>
          </li>
          <li><Link to="/home">XXX</Link></li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TopMenu;