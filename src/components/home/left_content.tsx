import React, { useEffect, useState } from 'react';
import { getCategories } from '../../utils/service_managr';
import { setDefaultAutoSelectFamilyAttemptTimeout } from 'net';
import { category } from '../../utils/interfaces';
import LeftContentCategories from './left_content_categories';

const LeftContent = () =>
{

  return (
    <div className="templatemo_content_left">
      <LeftContentCategories />

      <div className="templatemo_content_left_section">
        <h1>Bestsellers</h1>
        <ul>
          <li><a href="#">Vestibulum ullamcorper</a></li>
          <li><a href="#">Maece nas metus</a></li>
          <li><a href="#">In sed risus ac feli</a></li>
          <li><a href="#">Praesent mattis varius</a></li>
          <li><a href="#">Maece nas metus</a></li>
          <li><a href="#">In sed risus ac feli</a></li>
          <li><a href="#">Flash Templates</a></li>
          <li><a href="#">CSS Templates</a></li>
          <li><a href="#">Web Design</a></li>
          <li><a href="http://www.photovaco.com" target="_parent">Free Photos</a></li>
        </ul>
      </div>

      <div className="templatemo_content_left_section">                
        <a href="http://validator.w3.org/check?uri=referer">
          <img style={{ border:"0", width:"88px", height:"31px", marginTop: "8", marginBottom: "8" }} src="http://www.w3.org/Icons/valid-xhtml10" alt="Valid XHTML 1.0 Transitional" width="88" height="31" />
        </a>
        <a href="http://jigsaw.w3.org/css-validator/check/referer">
          <img style={{ border:"0", width:"88px", height: "31px", marginTop: "8", marginBottom: "8" }}  src="http://jigsaw.w3.org/css-validator/images/vcss-blue" alt="Valid CSS!" />
        </a>
      </div>
    </div>
  );
}

export default LeftContent;