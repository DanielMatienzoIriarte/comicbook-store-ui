import React from 'react';
import Header from './header';
import LeftContent from './left_content';
import MainContent from './main_content';
import Footer from './footer';

const HomePage = () =>
{
  return (
    <>
      <Header />

      <div className="templatemo_content">
        <LeftContent />
        <MainContent />
        <div className="cleaner_with_height">&nbsp;</div>
      </div>

      <Footer />
    </>
  );
};
  
export default HomePage;