import React, { useEffect, useState } from 'react';
import BookPreview from './book_preview';
import { getLatestComicBooks } from '../../utils/service_managr';
import { bookInterface } from '../../utils/interfaces';
import RenderBooks from '../books/render_books';

const MainContent = () =>
{
  return (
    <RenderBooks books_limit={4} />
  )
}

export default MainContent;