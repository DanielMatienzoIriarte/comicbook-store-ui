import { useEffect, useState } from 'react';
import { getCategories } from '../../services/books/category';
import { categoryInterface } from '../../interfaces/interfaces';
import { Link } from 'react-router-dom';

const BooksCategories = () =>
{
  const [categories, setCategories] = useState<categoryInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const fetchCategories = async() => {
      try {
        setIsLoading(true);

        const categoriesResponse:categoryInterface[] = await getCategories();
        setCategories(categoriesResponse);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-spinner">Loading categories...</div>
    );
  }

  if (error) {
    return (
      <div className="error-banner">{error}</div>
    );
  }

  return (
    <div className="templatemo_content_left_section">
      <h1>Categories</h1>
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <ul>
          {
            categories?.map((category) => {
              const path = `by-category/${category.id}`;

              return (
                <li key={`"${category.id}"`}><Link to={`${path}`}>{category.name}</Link></li>
              );
            })
          }
        </ul>
      )}
    </div>
  );
}

export default BooksCategories;
