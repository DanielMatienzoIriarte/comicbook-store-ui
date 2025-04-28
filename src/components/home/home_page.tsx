import React from 'react';
import '../../../public/templatemo_style.css';
import MainContent from './main_content';
import Footer from './footer';
import LeftContent from './left_content';

const HomePage = () =>
{
  return (
    <>
      <div className="templatemo_content">
        <MainContent books_limit={4} />
        <div className="cleaner_with_height">&nbsp;</div>
      </div>

      <Footer />
    </>
  );
};
  
export default HomePage;