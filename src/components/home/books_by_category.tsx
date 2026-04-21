import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookInterface } from "../../utils/interfaces";
import { getComicBooksByCategory } from "../../utils/service_managr";
import RenderBooks from "../books/render_books";

const ComicBooksByCategory = () => {
  const [books, setBooks] = useState<bookInterface[]|null>(null);

  const { id } = useParams();

  useEffect(() => {
      const fetchBooksByCategory = async () => {
        try {
          const response = await getComicBooksByCategory(id!);
          response && setBooks(response.books);
        } catch (error) {
          console.log('666', error);
        }
      };
  
      fetchBooksByCategory();
    },[id]);
  
  return (
    books && 
    <>
      <div className="templatemo_content">
        <RenderBooks books={books} />
        <div className="cleaner_with_height">&nbsp;</div>
      </div>
    </>
  );
}

export default ComicBooksByCategory;