import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getComicBookById } from '../../services/books/book';
import { bookInterface } from '../../interfaces/interfaces';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const [book, setBook] = useState<bookInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookData = async () => {
      if (!id) {
        return;
      }

      try {
        setIsLoading(true);
        const data = await getComicBookById(id);
        setBook(data);
      } catch (err: any) {
        setError(err.message || "Could not load book details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookData();
  }, [id]);

  if (isLoading) {
    return <div className="loading-spinner">Loading book details...</div>;
  }

  if (error || !book) {
    return (
      <div className="error-container">
        <p className="error-banner">{error || "Book not found"}</p>
        <Link to="/" className="back-link">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="templatemo_product_box_detail">
      <h1>{book.name}</h1>
      
      <div className="image_panel">
        <img src="/images/templatemo_image_01.jpg" alt={book.name} />
      </div>

      <div className="book_meta">
        <h3>Author</h3>
        <p>{book.author}</p>
      </div>

      <div className="product_info_full">
        <h3>Description</h3>
        <p>{book.description}</p>
        
        <div className="book_meta">
          <p><strong>Category:</strong> category666</p>
        </div>
        
        <div className="book_meta">
          <p><strong>Price:</strong> {book.price}</p>
        </div>

        <div className="action_buttons">
          <div className="buy_now_button">
            <a href="subpage.html">Add to Cart</a>
          </div>
        </div>
      </div>
      <div className="cleaner">&nbsp;</div>

      <div className="back_button">
        <Link to="/">Back to Catalog</Link>
      </div>
    </div>
  );
};

export default BookDetail;