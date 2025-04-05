import React, { useEffect, useState } from 'react';
import { bookInterface } from '../../utils/interfaces';
import { getLatestComicBooks } from '../../utils/service_managr';
import BookPreview from '../home/book_preview';

const RenderBooks = (props: { books_limit: Number; }) =>
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
              return (
                <>
                  <BookPreview key={book.id} id={book.id} name={book.name} description={book.description} />
                  <div className="cleaner_with_height">&nbsp;</div>
                </>
              )
            }
          })
        )
      }

      {/* <a href="subpage.html"><img src="images/templatemo_ads.jpg" alt="ads" /></a> */}
      </div>
  );
}

export default RenderBooks