import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decRedux, delredux, incRedux } from "../features/redux/slices.js/productSlice";
import { Card, Button, Container, Row, Col, Badge, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import imag from "./images/p.jpg";

const Cart = () => {
  const cartItems = useSelector((state) => state.product.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((acc, item) => acc + item.total, 0);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <Container className="py-5 cart-page">
      <style>{`
        .banner-container {
          position: relative;
          text-align: center;
          margin-bottom: 30px;
          border-radius: 15px;
          overflow: hidden;
        }
        .banner-img {
          width: 100%;
          height: 240px;
          object-fit: cover;
          filter: brightness(65%);
          animation: zoomEffect 12s ease-in-out infinite alternate;
        }
        .banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .banner-text {
          font-size: 2.2rem;
          font-weight: bold;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.9);
        }
        .banner-summary {
          margin-top: 10px;
          font-size: 1.2rem;
          font-weight: 500;
        }
        .cart-card {
          border-radius: 15px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cart-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

  .banner-container {
    position: relative;
    text-align: center;
    margin-bottom: 30px;
    border-radius: 15px;
    overflow: hidden;
  }
  .banner-img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    filter: brightness(65%);
    transition: transform 6s ease-in-out; /* smooth zoom effect */
    transform: scale(1);
  }
  .banner-container:hover .banner-img {
    transform: scale(1.1); /* zoom in slightly on hover */
  }
  .banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .banner-text {
    font-size: 2.2rem;
    font-weight: bold;
    text-shadow: 2px 2px 8px rgba(0,0,0,0.9);
  }
  .banner-summary {
    margin-top: 10px;
    font-size: 1.2rem;
    font-weight: 500;
  }
  .cart-card {
    border-radius: 15px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .cart-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  }
  @keyframes zoomEffect {
  from { transform: scale(2); }
  to { transform: scale(1.15); }
}

      `}</style>

      {/* 🔥 Banner with Total Info */}
      <div className="banner-container">
        <Image src={imag} alt="Shopping Banner" className="banner-img" />
        <div className="banner-overlay">
          <h2 className="banner-text">🛒 Your Shopping Cart</h2>
          <div className="banner-summary">
            <span>Total Items: <Badge bg="light" text="dark">{totalQty}</Badge></span>{" "}
            <span>Total: <Badge bg="success"><FaRupeeSign /> {totalAmount.toFixed(2)}</Badge></span>
          </div>
        </div>
      </div>

      {cartItems.length > 0 ? (
        <Row>
          {cartItems.map((item) => (
            <Col md={6} lg={4} key={item.id} className="mb-4">
              <Card className="shadow-sm h-100 cart-card">
                <Card.Body className="d-flex flex-column">
                  <div className="text-center mb-3">
                    <Image
                      src={item.thumbnail || "https://via.placeholder.com/150"}
                      alt={item.title}
                      className="cart-thumbnail"
                      rounded
                    />
                  </div>

                  <Card.Title className="fw-bold text-truncate">
                    {item.title}
                  </Card.Title>
                  <Card.Text className="text-muted small mb-2">
                    {item.description?.slice(0, 50)}...
                  </Card.Text>
                  <h5 className="text-success fw-bold">
                    <FaRupeeSign /> {item.price}
                  </h5>

                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <div className="d-flex gap-2 align-items-center">
                      <Button
                        variant="outline-dark"
                        className="qty-btn"
                        onClick={() => dispatch(incRedux(item.id))}
                      >
                        +
                      </Button>
                      <span><strong>{item.qty}</strong></span>
                      <Button
                        variant="outline-secondary"
                        className="qty-btn"
                        onClick={() => dispatch(decRedux(item.id))}
                        disabled={item.qty <= 1}
                      >
                        -
                      </Button>
                    </div>
                    <Card.Text className="fw-bold text-dark mb-0">
                      <FaRupeeSign /> {item.total}
                    </Card.Text>
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => dispatch(delredux(item.id))}
                    >
                      <IoTrashOutline /> Remove
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate("/checkoutPage")}
                    >
                      🚀 Checkout
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center mt-5">
          <h4 className="fw-bold mb-3">Your cart is empty 🛍️</h4>
          <Button variant="primary" onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Cart;
