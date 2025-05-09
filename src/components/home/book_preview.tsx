import React from "react";
import { Link } from "react-router-dom";
import { bookInterface } from "../../utils/interfaces";

const BookPreview = (book:bookInterface) => {
  const path = `book/${book.id}`;
  
  return (
    <div className="templatemo_product_box">
      <h1>{book.name}  <span>(by Best Author)</span></h1>
      <img src="images/templatemo_image_01.jpg" alt="image" />
      <div className="product_info">
        <p>{book.description}</p>
        <div className="buy_now_button"><a href="subpage.html">Buy Now</a></div>
        <div className="detail_button"><Link to={`${path}`}>Details</Link></div>
      </div>
      <div className="cleaner">&nbsp;</div>
    </div>
  );
}

export default BookPreview;