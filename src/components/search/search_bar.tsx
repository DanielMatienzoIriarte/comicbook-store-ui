export const SearchBar = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => (
  <div className="search_container">
    <input
      type="text"
      placeholder="Search for comics..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="search_input"
    />
  </div>
);