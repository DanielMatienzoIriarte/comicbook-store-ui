// src/hooks/useBookSearch.ts
import { useState, useEffect } from 'react';
import { searchBooks } from '../../services/books/book';
import { BookResponseInterface } from '../../interfaces/interfaces';

export const useBookSearch = (query: string, page: number = 1) => {
  const [data, setData] = useState<BookResponseInterface | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setData(null);
      return;
    }

    const handler = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await searchBooks(query, page);
        setData(response);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [query, page]);

  return { data, loading };
};