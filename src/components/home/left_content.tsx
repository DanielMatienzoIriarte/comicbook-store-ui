import React from 'react';
import BooksCategories from './books_categories';
import LeftContentCertifications from './left_content_certifications';

const LeftContent = () =>
{
  return (
    <div className="templatemo_content_left">
      <BooksCategories />
      <LeftContentCertifications />
    </div>
  );
}

export default LeftContent;