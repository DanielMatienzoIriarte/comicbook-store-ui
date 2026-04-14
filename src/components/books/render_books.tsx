import { Fragment } from 'react';
import { bookInterface } from '../../interfaces/interfaces';
import BookPreview from './book_preview';

const RenderBooks = (props: { books: bookInterface[] }) =>
{
  return (
    <div className="templatemo_content_right">
      {
        props.books != null && (
          props.books.map((book, index) => {
            const isEven = index % 2 === 0;

            return (
              <Fragment key={book.id}>
                <BookPreview
                  key={book.id}
                  id={book.id}
                  name={book.name}
                  description={book.description}
                />
                <div className={isEven ? "cleaner_with_width" : "cleaner_with_height"}>
                  &nbsp;
                </div>
              </Fragment>
            )
          })
        )
      }
    </div>
  );
}

export default RenderBooks