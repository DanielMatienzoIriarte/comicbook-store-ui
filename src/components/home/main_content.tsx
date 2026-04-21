import { useEffect, useState } from 'react';
import { getLatestComicBooks } from '../../services/books/book';
import { bookInterface } from '../../interfaces/interfaces';
import RenderBooks from '../books/render_books';

const MainContent = (props: { books_limit: Number; }) =>
{
  const [books, setBooks] = useState<bookInterface[]|null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        setIsLoading(true);

        const response:bookInterface[] = await getLatestComicBooks(props.books_limit);
        setBooks(response);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestBooks();
  },[]);

  if (isLoading) {
    return (
      <div className="loading-spinner">Loading books...</div>
    );
  }

  if (error) {
    return (
      <div className="error-banner">{error}</div>
    );
  }

  return (
    books && 
      <RenderBooks books={books} />
  )
}

export default MainContent;