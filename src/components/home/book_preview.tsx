import React from "react";
import { bookInterface } from "../../utils/interfaces";

const BookPreview = (book:bookInterface) => {
  
  return (
    <div className="templatemo_product_box">
      <h1>{book.name}  <span>(by Best Author)</span></h1>
      <img src="images/templatemo_image_01.jpg" alt="image" />
      <div className="product_info">
        <p>{book.description}</p>
        <h3>$55</h3>
        <div className="buy_now_button"><a href="subpage.html">Buy Now</a></div>
        <div className="detail_button"><a href="subpage.html">Detail</a></div>
      </div>
      <div className="cleaner">&nbsp;</div>
    </div>
  );
}

export default BookPreview;