import React, { useEffect, useState } from 'react';
import { bookInterface } from '../../utils/interfaces';
import BookPreview from '../home/book_preview';

const RenderBooks = (props: { books: bookInterface[] }) =>
{
  return (
    <div className="templatemo_content_right">
      {
        props.books != null && (
          props.books.map((book, index) => {
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