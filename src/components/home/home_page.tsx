import React from 'react';
import '../../../public/templatemo_style.css';
import MainContent from './main_content';

const HomePage = () =>
{
  return (
    <>
      <div className="templatemo_content">
        <MainContent books_limit={4} />
        <div className="cleaner_with_height">&nbsp;</div>
      </div>
    </>
  );
};
  
export default HomePage;