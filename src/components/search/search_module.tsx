// src/components/search/SearchModule.tsx
import { useState } from 'react';
import { useBookSearch } from '../../hooks/search/use_book_search';
import { SearchBar } from './search_bar';
import RenderBooks from '../books/render_books';

interface SearchModuleProps {
  onItemClick?: () => void; // Optional callback to close modal
}

const SearchModule = ({ onItemClick }: SearchModuleProps) => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const { data, loading } = useBookSearch(query, page);

  const handleSearchChange = (val: string) => {
    setQuery(val);
    setPage(1); // Reset to first page on new search
  };

  return (
    <div className="search_internal_container">
      <SearchBar value={query} onChange={handleSearchChange} />

      {loading && <div className="spinner">Searching...</div>}

      {!loading && data && (
        <>
          <p className="results_count">Showing {data.from}-{data.to} of {data.total} results</p>
          
          {/* We pass the callback down to the renderer */}
          <RenderBooks books={data.data} onBookClick={onItemClick} />

          {/* Pagination Controls */}
          <div className="pagination_controls">
            <button
              disabled={!data.prev_page_url} 
              onClick={() => setPage(prev => prev - 1)}
            >
              Previous
            </button>

            <span>Page {data.current_page} of {data.last_page}</span>

            <button 
              disabled={!data.next_page_url} 
              onClick={() => setPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchModule;