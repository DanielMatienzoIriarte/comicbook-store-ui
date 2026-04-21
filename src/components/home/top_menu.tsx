import React, { useState } from 'react';
import { Link } from "react-router-dom";
import SearchModal from '../search/search_modal';

const TopMenu = () =>
{
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const openSearch = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to /search
    setIsSearchOpen(true);
  };

  return (
    <>
      <div className="templatemo_menu">
        <nav>
          <ul>
            <li>
              <Link to="/" className="current">Home</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
            <li>
              <Link to="/search" onClick={openSearch}>Search</Link>
            </li>
            <li className="last_menu_item">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>

      {isSearchOpen && (
        <SearchModal onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  );
}

export default TopMenu;
