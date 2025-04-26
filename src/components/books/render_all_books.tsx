import React, { useEffect, useState } from 'react';
import { getComicBooks } from '../../utils/service_managr';
import { booksResponse, bookInterface } from '../../utils/interfaces';
import RenderBooks from '../books/render_books';
import Header from '../home/header';
import LeftContent from '../home/left_content';
import Footer from '../home/footer';

const RenderAllBooks = () =>
{
  const [books, setBooks] = useState<bookInterface[]|null>(null);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const response = await getComicBooks(0, 1);
        console.log(response);
        response && setBooks(response.data);
      } catch (error) {
        console.log('666', error);
      }
    };

    fetchLatestBooks();
  },[]);

  return (
    books && 
    <>
      <div className="templatemo_content">
        <LeftContent />
        <RenderBooks books={books} />
        <div className="cleaner_with_height">&nbsp;</div>
      </div>

      <Footer />
    </>
  )
}

export default RenderAllBooks