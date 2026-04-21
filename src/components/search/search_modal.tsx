import ReactDOM from 'react-dom';
import SearchModule from './search_module';

interface SearchModalProps {
  onClose: () => void;
}

const SearchModal = ({ onClose }: { onClose: () => void }) => {
  return ReactDOM.createPortal(
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_header">
          <h2>Search Catalog</h2>
          <button className="close_btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal_body">
          {/* Pass the onClose function here */}
          <SearchModule onItemClick={onClose} />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SearchModal;