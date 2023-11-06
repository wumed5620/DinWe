import React from "react";

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control text-center border "
              placeholder="餐廳名(ex.大樹先生)、電話(ex.0426301234)、標籤(ex.兒童座椅)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
