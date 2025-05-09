import React, { useEffect, useState } from "react";
import { bookDetailsInterface } from "../../utils/interfaces";
import { Link, useParams } from "react-router-dom";
import path from "path";
import { getComicBook } from "../../utils/service_managr";

const BookDetails = () => {
  const { id } = useParams();

  const defaultBook: bookDetailsInterface = {
    id: 0,
    name: '',
    description: '',
    format: '',
    category: '',
    price: 0,
  };

  const [book, setBook] = useState<bookDetailsInterface>(defaultBook);

  useEffect(() => {
    const fetchBooksById = async () => {
      try {
        const response = await getComicBook(id!);

        response && setBook(response.data);
      } catch (error) {
        console.log('666', error);
      }
    };

    fetchBooksById();
  }, [id]);

  return (
    <div className="templatemo_product_box">
      <h1>{book.name}  <span>(by Best Author)</span></h1>
      <img src="images/templatemo_image_01.jpg" alt="image" />
      <div className="product_info">
        <p>
          {book.description}
          {book.format}
        </p>
        <h3>{book.price}</h3>
        <div className="buy_now_button"><a href="subpage.html">Buy Now</a></div>
      </div>
      <div className="cleaner">&nbsp;</div>
    </div>
  );
}

export default BookDetails;