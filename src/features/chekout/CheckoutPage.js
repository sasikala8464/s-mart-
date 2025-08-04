import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Container, Button, Modal, Row, Col, Image } from "react-bootstrap";
import AddressForm from "./AddressFrom";
import ProgressTracker from "../../components/ProgressTracker";
import { FaShoppingCart, FaRupeeSign, FaStar } from "react-icons/fa";

import image1 from "./imagess/e.avif";
import image2 from "./imagess/f.jpg";
import image3 from "./imagess/g.jpg";
import image4 from "./imagess/m.jpeg";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.product.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.total, 0);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const [showSummary, setShowSummary] = useState(true);
  const carouselImages = [image1, image2, image3, image4];

  return (
    <div>
      <Container className="py-4">
        <Row className="mt-4">
          {/* Left Fixed 4 Images */}
          <Col lg={4} className="mb-4">
            <div className="fixed-images">
              {carouselImages.map((img, idx) => (
                <div key={idx} className="image-box">
                  <Image
                    src={img}
                    alt={`fixed-${idx}`}
                    className="image-hover rounded-3"
                  />
                </div>
              ))}
            </div>
          </Col>

          {/* Middle Address Form */}
          <Col lg={5}>
            <h4 className="mb-3">🏠 Delivery Address</h4>
            <AddressForm />
          </Col>

          {/* Right Progress Tracker */}
          <Col lg={3} className="d-none d-lg-block">
            <div className="progress-fixed shadow-sm p-3 bg-white rounded-3">
              <ProgressTracker step={1} />
              <Button
                variant="info"
                className="fw-bold mt-4 px-4 py-2 custom-btn w-100"
                onClick={() => setShowSummary(true)}
              >
                <FaShoppingCart className="me-2" />
                View Checkout Summary
              </Button>
            </div>
          </Col>
        </Row>

        {/* Checkout Summary Modal */}
        <Modal
          show={showSummary}
          onHide={() => setShowSummary(false)}
          centered
          animation={true}
          size="lg"
        >
          <Modal.Header closeButton className="bg-gradient text-white">
            <Modal.Title>🧾 Checkout Summary</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {cartItems.length > 0 ? (
              <Card className="glass-card p-4 shadow border-0">
                <h5 className="fw-bold text-dark mb-4">Your Products</h5>
                {cartItems.map((item, idx) => (
                  <Card key={idx} className="mb-4 border-0 shadow-sm rounded-4">
                    <Row className="g-3">
                      <Col xs={3} className="text-center">
                        <Image
                          src={item.image || item.thumbnail}
                          alt={item.name}
                          fluid
                          rounded
                          className="product-thumb"
                        />
                      </Col>
                      <Col xs={9}>
                        <h6 className="fw-bold text-dark">{item.name}</h6>
                        <div className="d-flex align-items-center mb-2">
                          {[...Array(5)].map((_, starIndex) => (
                            <FaStar
                              key={starIndex}
                              size={16}
                              color={
                                starIndex < item.rating ? "#ffc107" : "#e4e5e9"
                              }
                              className="me-1"
                            />
                          ))}
                          <small className="text-muted ms-2">
                            ({item.rating || 0} / 5)
                          </small>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                          <small className="fw-semibold text-secondary">
                            Qty: {item.qty}
                          </small>
                          <h6 className="text-danger fw-bold">
                            <FaRupeeSign size={14} /> {item.total}
                          </h6>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                ))}

                <div className="d-flex justify-content-between border-top pt-3 mt-3">
                  <h6 className="fw-bold text-secondary">Total Quantity:</h6>
                  <h6 className="fw-bold text-dark">{totalQty}</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold text-secondary">Total Price:</h5>
                  <h5 className="fw-bold text-success">
                    <FaRupeeSign /> {totalPrice}
                  </h5>
                </div>
              </Card>
            ) : (
              <h5 className="text-danger text-center">No items in cart</h5>
            )}
          </Modal.Body>
        </Modal>

        {/* Styles */}
        <style>{`
          .progress-fixed {
            position: sticky;
            top: 100px;
          }
          .fixed-images {
            display: grid;
            grid-template-rows: repeat(4, 1fr);
            gap: 20px;
          }
          .image-box {
            height: 200px;
            overflow: hidden;
            border-radius: 12px;
          }
          .image-hover {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
          }
          .image-hover:hover {
            transform: scale(1.1);
          }
        `}</style>
      </Container>
    </div>
  );
};

export default CheckoutPage;
