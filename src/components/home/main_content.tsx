import React, { useEffect, useState } from 'react';
import BookPreview from './book_preview';
import { getLatestComicBooks } from '../../utils/service_managr';
import { bookInterface } from '../../utils/interfaces';

const MainContent = () =>
{
  const books_limit = 4;

  const [books, setBooks] = useState<bookInterface[]|null>(null);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const response = await getLatestComicBooks(books_limit);
        response && setBooks(response.books);
      } catch (error) {
        console.log('666', error);
      }
    };

    fetchLatestBooks();
  },[]);

  return (
    <div className="templatemo_content_right">
      {
        books && (
          books.map((book, index) => {
            if (index % 2 === 0) {
              return (
                <>
                  <BookPreview key={book.id} id={book.id} name={book.name} description={book.description} />
                  <div className="cleaner_with_width">&nbsp;</div>
                </>
              )
            } else {
              <div className="cleaner_with_height">&nbsp;</div>
            }
          })
        )
      }

      {/* <a href="subpage.html"><img src="images/templatemo_ads.jpg" alt="ads" /></a> */}
      </div>
  );
}

export default MainContent;