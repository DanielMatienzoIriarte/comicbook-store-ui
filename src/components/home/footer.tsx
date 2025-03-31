import React from 'react';
import Header from './header';
import LeftContent from './left_content';
import MainContent from './main_content';

const Footer = () =>
{
  return (
    <div className="templatemo_footer">
      <a href="subpage.html">Home</a> | <a href="subpage.html">Search</a> | <a href="subpage.html">Books</a> | <a href="#">New Releases</a> | <a href="#">FAQs</a> | <a href="#">Contact Us</a><br />
      Copyright © 2024 <a href="#"><strong>Your Company Name</strong></a> 
    </div>
  );
}

export default Footer;