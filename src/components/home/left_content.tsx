import React from 'react';
import LeftContentCategories from './left_content_categories';
import LeftContentCertifications from './left_content_certifications';

const LeftContent = () =>
{
  return (
    <div className="templatemo_content_left">
      <LeftContentCategories />
      <LeftContentCertifications />
    </div>
  );
}

export default LeftContent;