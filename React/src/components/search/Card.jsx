import React from "react";
import { FaStar, FaRegHeart, FaHandPointLeft, FaHeart } from "react-icons/fa";
import { Modal } from "react-bootstrap";

const Card = ({
  filteredItems,
  showModal,
  selectedStar,
  handleClose,
  handleShow,
  handleStarFilter,
  storeIid,
  handleClick,
  isLiked,
}) => {
  return (
    <div id="cardBox" className="p-3 rounded fw-bold">
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="titlecolor fw-bold">評價</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="btn-group d-flex">
              {[5, 4, 3, 2, 1].map((_, index) => {
                const star = _;
                return (
                  <button
                    key={index}
                    type="button"
                    className={`btn ${
                      selectedStar === star
                        ? "searchindexbtn fw-bold active"
                        : "searchindexbtn fw-bold"
                    }`}
                    onClick={() => handleStarFilter(star)}
                  >
                    {star} <FaStar />
                  </button>
                );
              })}
            </div>
          </div>
          <hr />
          {/* 以下是使用者留言區 */}
          <div className="overflow-scroll" style={{ maxHeight: "70vh" }}>
            {filteredItems.map((filteredItem) =>
              filteredItem.reviews
                .filter(
                  (review) =>
                    review.storeId === storeIid &&
                    (selectedStar === "ALL" || review.star === selectedStar)
                )
                .map((review, index) => (
                  <div className="card p-2 mb-3" key={index}>
                    <h5 className="titlecolor">
                      {review.name} - {review.star} <FaStar />
                    </h5>
                    <p>{review.comment}</p>
                  </div>
                ))
            )}
          </div>
        </Modal.Body>
      </Modal>
      {filteredItems.map((filteredItems, index) => {
        return (
          <div className="card mb-3" key={index}>
            <div className="row g-0">
              <div className="col-4">
                <img
                  className="card-img img-fluid img-style"
                  src={filteredItems.image}
                  alt=""
                />
              </div>
              <div className="col-8">
                <div className="card-body">
                  <div className="h-100">
                    <button
                      className="btn btn-danger position-absolute top-0 end-0 m-3"
                      onClick={() => handleClick(filteredItems.id)}
                    >
                      {isLiked.filter(
                        (isLike) => isLike.resturant_id === filteredItems.id
                      ).length > 0 ? (
                        <div>
                          <span className="fw-bold">取消標籤</span>
                          <FaHeart className="ms-2" />
                        </div>
                      ) : (
                        <div>
                          <span className="fw-bold">收藏標籤</span>
                          <FaRegHeart className="ms-2" />
                        </div>
                      )}
                    </button>
                    <a href={`/storeinformation/${filteredItems.id}`}>
                      <h3 className="card-title fw-bold d-inline-block titlecolor mb-3">
                        {filteredItems.name}
                        <span className="fs-6 ms-2 pointleft">
                          <FaHandPointLeft />
                          點擊前往
                        </span>
                      </h3>
                    </a>

                    <div className="mb-3">
                      {filteredItems.star === 0 ? (
                        <button
                          className="btn searchindexbtn fw-bold"
                          onClick={() => handleShow(filteredItems.id, true)}
                          disabled
                        >
                          尚未有評價
                        </button>
                      ) : (
                        <button
                          className="btn searchindexbtn fw-bold"
                          onClick={() => handleShow(filteredItems.id, true)}
                        >
                          {filteredItems.star}
                          <FaStar />
                        </button>
                      )}
                      <span href="/" className="ms-3 fw-bold titlecolor">
                        {filteredItems.tel}
                      </span>
                      {filteredItems.price === null ? (
                        ""
                      ) : (
                        <span className=" titlecolor fs-6 ms-3">
                          <span className="d-inline-block">平均消費</span>
                          <span className="ms-1">
                            ({filteredItems.price}元)
                          </span>
                        </span>
                      )}
                    </div>
                    <span
                      className="d-flex flex-nowrap overflow-auto titlecolor fw-bold mb-3"
                      style={{
                        maxWidth: "100vw",
                        maxHeight: "8vh",
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {filteredItems.text}
                    </span>
                    <div
                      className="col-12 d-flex flex-nowrap overflow-auto mb-3"
                      style={{
                        maxWidth: "100vw",
                        maxHeight: "8vh",
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {filteredItems.filters.map((filters, index) => (
                        <span
                          className="border border-2 rounded-pill filter me-2 p-1"
                          key={index}
                        >
                          {filters}
                        </span>
                      ))}
                    </div>
                    <div
                      className="d-flex flex-nowrap overflow-auto"
                      style={{
                        maxWidth: "100vw",
                        maxHeight: "10vh",
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {filteredItems.time.map((time, index) => (
                        <a
                          href={`/storeinformation/${filteredItems.id}`}
                          className="btn time me-2 mb-0"
                          key={index}
                        >
                          {time}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
