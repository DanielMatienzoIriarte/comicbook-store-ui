import React, { useEffect, useState } from 'react';
import { getLatestComicBooks } from '../../utils/service_managr';
import { bookInterface } from '../../utils/interfaces';
import RenderBooks from '../books/render_books';

const MainContent = (props: { books_limit: Number; }) =>
{
  const [books, setBooks] = useState<bookInterface[]|null>(null);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const response = await getLatestComicBooks(props.books_limit);
        console.log(response);
        response && setBooks(response.books);
      } catch (error) {
        console.log('666', error);
      }
    };

    fetchLatestBooks();
  },[]);

  return (
    books && 
      <RenderBooks books={books} />
  )
}

export default MainContent;