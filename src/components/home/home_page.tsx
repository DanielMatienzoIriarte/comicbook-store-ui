import React from 'react';
import '../../../public/templatemo_style.css';
import Header from './header';
import MainContent from './main_content';
import Footer from './footer';

const HomePage = () =>
{
  return (
    <>
      <Header />

      <div className="templatemo_content">
        <MainContent books_limit={4} />
        <div className="cleaner_with_height">&nbsp;</div>
      </div>

      <Footer />
    </>
  );
};
  
export default HomePage;