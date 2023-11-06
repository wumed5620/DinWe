import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";



const Comments = () => {
  
  const [reviews, setReviews] = useState([
    { id: 1, name: "John", star: 4, comment: "Great product!" },
    { id: 2, name: "Mary", star: 5, comment: "Excellent service!" },
    { id: 3, name: "Tom", star: 3, comment: "Average quality." },
    { id: 4, name: "Jane", star: 5, comment: "Highly recommend!" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedStar, setSelectedStar] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleStarFilter = (star) => {
    setSelectedStar(star);
  };

  const filteredReviews = selectedStar
    ? reviews.filter((review) => review.star === selectedStar)
    : reviews;

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        改成你要點擊的地方
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>評價</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="btn-group d-flex">
              <button
                type="button"
                className={`btn ${
                  selectedStar === null
                    ? "btn-primary active"
                    : "btn-outline-primary"
                }`}
                onClick={() => handleStarFilter(null)}
              >
                All
              </button>
              {[5, 4, 3, 2, 1].map((_, index) => {
                const star = _;
                return (
                  <button
                    key={index}
                    type="button"
                    className={`btn ${
                      selectedStar === star
                        ? "btn-primary active"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => handleStarFilter(star)}
                  >
                    {star} {star === 1 ? "star" : "stars"}
                  </button>
                );
              })}
            </div>
          </div>
          <hr />
          {/* 以下是使用者留言區 */}
          <div className="overflow-scroll" style={{ maxHeight: "70vh" }}>
            {filteredReviews.map((review) => (
              <div className="card mb-3" key={review.id}>
                <h5>
                  {review.name} - {review.star} stars
                </h5>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Comments;