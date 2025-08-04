import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoHeart } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { removeFromWishlist } from "../features/redux/slices.js/wishlistSlice";
import { cartItemRedux } from "../features/redux/slices.js/productSlice";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardClick = (product) => {
    navigate("/im", { state: { product } });
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    dispatch(cartItemRedux(product)); // ✅ Add to Cart
  };

  const handleRemoveFromWishlist = (productId, e) => {
    e.stopPropagation();
    dispatch(removeFromWishlist(productId)); // ✅ Remove from wishlist
  };

  if (wishlist.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "18px", color: "#666" }}>
        Your Wishlist is empty!
      </p>
    );
  }

  return (
    <Container className="py-4">
      <Row className="g-4">
        {wishlist.map((product, id) => (
          <Col key={id} sm={12} md={6} lg={4}>
            <Card
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                border: "none",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                cursor: "pointer",
              }}
              onClick={() => handleCardClick(product)}
            >
              <div style={{ position: "relative" }}>
                <Card.Img
                  variant="top"
                  src={product.thumbnail}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <IoHeart
                  size={26}
                  color="red"
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "#fff",
                    borderRadius: "50%",
                    padding: "4px",
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
                    cursor: "pointer",
                  }}
                  onClick={(e) => handleRemoveFromWishlist(product.id, e)}
                />
              </div>

              <Card.Body style={{ backgroundColor: "#fff" }}>
                <Card.Title style={{ fontWeight: "600", fontSize: "18px", color: "#333" }}>
                  {product.title}
                </Card.Title>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <FaStar size={14} color="#FFD700" />
                  <span style={{ fontSize: "14px", fontWeight: "500" }}>{product.rating || "4.5"}</span>
                  <span style={{ fontSize: "13px", color: "#666" }}>
                    {product.time || "20 min"}
                  </span>
                </div>
                <Card.Text style={{ fontSize: "16px", fontWeight: "600", color: "#28a745" }}>
                  ₹{product.price}
                </Card.Text>
                <Button
                  variant="success"
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    backgroundColor: "#28a745",
                    fontWeight: "500",
                  }}
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Wishlist;
