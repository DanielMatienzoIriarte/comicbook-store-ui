import { Fragment } from 'react';
import { bookInterface } from '../../interfaces/interfaces';
import BookPreview from './book_preview';

const RenderBooks = (props: { books: bookInterface[], onBookClick?: () => void }) => {
  console.log('13', props.books);
  return (
    <div className="templatemo_content_right">
      {props.books?.map((book, index) => (
        <Fragment key={book.id}>
          <BookPreview 
            {...book} 
            onDetailClick={props.onBookClick} // Pass it down
          />
          <div className={index % 2 === 0 ? "cleaner_with_width" : "cleaner_with_height"}>&nbsp;</div>
        </Fragment>
      ))}
    </div>
  );
}

export default RenderBooks