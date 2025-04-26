import React, { useEffect, useState } from 'react';
import { getCategories } from '../../utils/service_managr';
import { category } from '../../utils/interfaces';
import { Link } from 'react-router-dom';

const LeftContentCategories = () =>
{
  const [categories, setCategories] = useState<category[]|null>(null);

  useEffect(() => {
    const fetchCategories = async() => {
      const categoriesResponse = await getCategories();
      categoriesResponse && setCategories(categoriesResponse);
    };
    
    fetchCategories();
  }, []);

  return (
      <div className="templatemo_content_left_section">
      <h1>Categories</h1>
      <ul>
        {
          categories?.map((category) => {
            const path = `http://127.0.0.1:8000/api/books/by-category/${category.id}`;

            return (
              <li><Link to={`${path}`}>{category.name}</Link></li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default LeftContentCategories;