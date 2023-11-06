import React from "react";
import { FaStar } from "react-icons/fa";

const Filter = ({
  filterTag,
  toggleChecked,
  handleStar,
  starTag,
  minPrice,
  handleMinPriceChange,
  maxPrice,
  handleMaxPriceChange,
}) => {
  return (
    <div
      id="filters"
      className="col-4 overflow-auto"
      style={{ height: "83vh" }}
    >
      {/* range price */}
      <div className="text-center titlecolor mb-3">
        <h1>價格區間</h1>
      </div>
      <div id="price" className="row card mb-3 text-center">
        <div className="col-12 fs-5">
          <div className="row my-3 text-light fw-bold">
            <div className="col-6">
              <label className="mb-2" htmlFor="min-price-input">
                Min Price:
              </label>
              <input
                className="fs-6"
                id="min-price-input"
                type="number"
                step="100"
                value={minPrice}
                onChange={(e) => handleMinPriceChange(e, 100)}
              />
            </div>
            <div className="col-6">
              <label className="mb-2" htmlFor="max-price-input">
                Max Price:
              </label>
              <input
                className="fs-6"
                id="max-price-input"
                type="number"
                step="100"
                max={9999}
                value={maxPrice}
                onChange={(e) => handleMaxPriceChange(e, 100)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* filter */}
      <div className="row justify-content-center fw-bold">
        <div className="col-12 text-center">
          <h1 className="mb-3 titlecolor">設施與服務</h1>
        </div>
        <div className="accordion p-0" id="accordionPanelsStayOpenExample">
          {starTag.map((starTag, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="searchindex-accordion-header">
                <button
                  className="accordion-button fs-5"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#s${index}`}
                  aria-expanded="true"
                  aria-controls={`s${index}`}
                >
                  {starTag.title}
                </button>
                <div
                  id={`s${index}`}
                  className="accordion-collapse collapse show"
                >
                  {starTag.starBox.map((starBox, innerIndex) => (
                    <div
                      className="accordion-body d-inline-block ms-4"
                      key={innerIndex}
                    >
                      <div>
                        <input
                          type="radio"
                          name="starFilter"
                          value={starBox.star}
                          onChange={handleStar}
                          id={`si${index}${innerIndex}`}
                        />
                        {starBox.btnName === "ALL" ? (
                          <label
                            className="btn searchindexbtn fw-bold ms-1"
                            htmlFor={`si${index}${innerIndex}`}
                          >
                            {starBox.btnName}
                          </label>
                        ) : (
                          <label
                            className="btn searchindexbtn fw-bold ms-1"
                            htmlFor={`si${index}${innerIndex}`}
                          >
                            {starBox.btnName}
                            <FaStar />
                          </label>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </h2>
            </div>
          ))}
          {filterTag.map((filterTag, index) => {
            return (
              <div className="accordion-item" key={`#fi${index}`}>
                <h2 className="searchindex-accordion-header">
                  <button
                    className="accordion-button fs-5"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#f${index}`}
                    aria-expanded="true"
                    aria-controls={`f${index}`}
                  >
                    {filterTag.title}
                  </button>
                </h2>
                <div
                  id={`f${index}`}
                  className="accordion-collapse collapse show row"
                >
                  {filterTag.filterBox.map((filterBox, innerIndex) => (
                    <div className="accordion-body col-6 p-0 my-1">
                      <div className="form-check ms-3">
                        <input
                          className="form-check-input ms-1"
                          type="checkbox"
                          id={`fi${index}${innerIndex}`}
                          value=""
                          checked={filterBox.checked}
                          onChange={() => toggleChecked(index, innerIndex)}
                        />
                        <label
                          className="form-check-label ms-1 titlecolor fs-5"
                          htmlFor={`fi${index}${innerIndex}`}
                        >
                          {filterBox.filters}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filter;
