export default function SearchBox({ search, onChange ,placeholder}) {
  return (
    <>
      <div className="search-box">
        <div className="searchBar me-3">
          <input
            type="text"
            autoComplete="current-password"
            placeholder={placeholder}
            className={`searchInput form-control`}
            value={search ?? ""}
            onChange={onChange}
          />
          <i className="bi bi-search text-muted searchIcon"></i>
        </div>
      </div>
    </>
  );
}
