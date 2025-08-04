import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartItemRedux } from "../features/redux/slices.js/productSlice";
import { Container, Row, Col, Card, Button, Image, Modal } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { IoHeartOutline, IoHeart, IoArrowBack } from "react-icons/io5";
import { toggleWishlist } from "../features/redux/slices.js/wishlistSlice";
import sound from "./sounds/dd.mp3";

const Im = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = location.state?.product;

  const user = useSelector((state) => state.user);
  const wishlist = useSelector((state) => state.wishlist.items || []);
  const cartItems = useSelector((state) => state.product.cartItems || []); // ✅ Get cart items

  const poses = product ? [product.thumbnail, ...product.images?.filter(Boolean)] : [];
  const [mainImage, setMainImage] = useState(product?.thumbnail || "");

  const [showPopup, setShowPopup] = useState(null); // null | "added" | "already"
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [animateImage, setAnimateImage] = useState(false);

  // ✅ Create single audio instance
  const audioRef = useRef(new Audio(sound));

  if (!product) {
    return <h2 style={{ textAlign: "center", marginTop: "2rem" }}>No product found.</h2>;
  }

  const handleAddToCart = () => {
    if (!user || !user.username) {
      setShowLoginPopup(true);
      return;
    }

    // ✅ Check if already in cart
    const alreadyInCart = cartItems.some((item) => item.id === product.id);
    if (alreadyInCart) {
      setShowPopup("already");
      setTimeout(() => setShowPopup(null), 3000);
      return;
    }

    // ✅ Add new product
    dispatch(cartItemRedux(product));
    setAnimateImage(true);

    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play().catch((err) => console.error("Audio play error:", err));

    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 2000);

    setTimeout(() => setAnimateImage(false), 1000);
    setShowPopup("added");
    setTimeout(() => setShowPopup(null), 3500);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (!user || !user.username) {
      setShowLoginPopup(true);
      return;
    }
    dispatch(toggleWishlist(product));
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  return (
    <Container className="py-4">
      <Row className="align-items-start g-4">
        <Col md={6} sm={12}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "400px",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              backgroundColor: "#f9f9f9",
              marginBottom: "15px",
            }}
          >
            <img
              src={mainImage}
              alt="Main Product"
              className={animateImage ? "bounce-image" : ""}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            <div
              onClick={() => navigate(-1)}
              style={{
                position: "absolute",
                top: "15px",
                left: "15px",
                background: "#fff",
                borderRadius: "50%",
                padding: "10px",
                cursor: "pointer",
                boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
              }}
            >
              <IoArrowBack size={20} color="#28a745" />
            </div>

            <div
              onClick={handleWishlistClick}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "#fff",
                borderRadius: "50%",
                padding: "10px",
                cursor: "pointer",
                boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
              }}
            >
              {isInWishlist(product.id) ? (
                <IoHeart size={28} color="red" />
              ) : (
                <IoHeartOutline size={28} color="red" />
              )}
            </div>
          </div>

          <div style={{ display: "flex", overflowX: "auto", gap: "12px", padding: "8px 4px" }}>
            {poses.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                onClick={() => setMainImage(img)}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  cursor: "pointer",
                  border: mainImage === img ? "3px solid #28a745" : "2px solid transparent",
                  borderRadius: "15px",
                  flexShrink: 0,
                }}
                thumbnail
              />
            ))}
          </div>
        </Col>

        <Col md={6} sm={12}>
          <Card style={{ border: "none", borderRadius: "20px" }}>
            <Card.Body>
              <Card.Title className="fw-bold">{product.title}</Card.Title>
              <Card.Text className="text-muted mb-3">{product.description}</Card.Text>
              <h4 style={{ color: "#28a745", fontWeight: "600" }}>₹{product.price}</h4>

              {product.rating && (
                <p style={{ color: "#f39c12" }}>
                  <FaStar size={16} color="#FFD700" /> {product.rating} / 5
                </p>
              )}

              <Button
                onClick={handleAddToCart}
                variant="success"
                className="mt-3"
                style={{
                  borderRadius: "30px",
                  padding: "14px",
                  fontWeight: "600",
                  fontSize: "16px",
                  width: "100%",
                  backgroundColor: "#c7cd24ff",
                  border: "none",
                }}
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ✅ Added or Already in Cart Popup */}
      <Modal show={showPopup !== null} centered className="popup-modal">
        <Modal.Body>
          <div className="sound-popup">
            {showPopup === "added" && (
              <>
                <div className="sound-icon">
                  🔊
                  <span className="wave"></span>
                  <span className="wave"></span>
                  <span className="wave"></span>
                </div>
                <h4>🎉 Added to Cart!</h4>
                <p>{product.title} has been successfully added.</p>
                {[...Array(8)].map((_, i) => (
                  <span
                    key={i}
                    className="confetti"
                    style={{
                      left: `${Math.random() * 90}%`,
                      background: ["#FFD700", "#FF69B4", "#00C9FF", "#FF4500"][i % 4],
                      top: "50%",
                    }}
                  >
                    {["⭐", "💖", "✨", "🌸"][i % 4]}
                  </span>
                ))}
              </>
            )}
            {showPopup === "already" && (
              <>
                <div className="sound-icon">⚠️</div>
                <h4>Already in Cart</h4>
                <p>{product.title} is already in your cart.</p>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>

      {/* Login Required Popup */}
      <Modal show={showLoginPopup} onHide={() => setShowLoginPopup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>🔒 Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please login to add items to cart or wishlist.</p>
        </Modal.Body>
      </Modal>

      <style>{`
        .popup-modal .modal-content {
          background: linear-gradient(135deg, #43cea2, #185a9d);
          color: #fff;
          text-align: center;
          border-radius: 25px;
          padding: 30px;
          animation: slideUp 0.8s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          overflow: hidden;
          position: relative;
        }

        .sound-popup {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .sound-icon {
          position: relative;
          font-size: 45px;
          margin-bottom: 15px;
          color: #fff;
        }

        .wave {
          position: absolute;
          border: 2px solid #fff;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          animation: wavePulse 2s infinite;
        }

        .wave:nth-child(2) { animation-delay: 0.5s; }
        .wave:nth-child(3) { animation-delay: 1s; }

        @keyframes wavePulse {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.4; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }

        .confetti {
          position: absolute;
          width: 15px;
          height: 15px;
          opacity: 0.8;
          animation: floatUp 2.5s ease forwards;
        }

        @keyframes floatUp {
          0% { transform: translateY(50px) scale(0.5); opacity: 1; }
          100% { transform: translateY(-150px) scale(1.2); opacity: 0; }
        }

        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .bounce-image {
          animation: bounceImage 1s ease;
        }
        @keyframes bounceImage {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.15); }
          50%  { transform: scale(0.9); }
          70%  { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </Container>
  );
};

export default Im;
