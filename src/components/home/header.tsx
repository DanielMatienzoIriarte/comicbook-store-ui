import React from 'react';

const Header = () =>
{
  return (
    <div className="templatemo_header">
      <div className="templatemo_special_offers">
        <p>
          <span>25%</span> discounts for purchase over $80
        </p>
        <a href="subpage.html" style={{ marginLeft:"50px" }}>Read more...</a>
      </div>

      <div className="templatemo_new_books">
        <ul>
          <li>Suspen disse</li>
          <li>Maece nas metus</li>
          <li>In sed risus ac feli</li>
        </ul>
        <a href="subpage.html" style={{ marginLeft: "50px" }}>Read more...</a>
      </div>
    </div>
  );
}

export default Header;