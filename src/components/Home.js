import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Badge } from "react-bootstrap";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { toggleWishlist } from "../features/redux/slices.js/wishlistSlice";

const Home = () => {
  const data = useSelector((state) => state.product.demo);
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardClick = (product) => {
    navigate("/im", { state: { product } });
  };

  const handleWishlistClick = (product, e) => {
    e.stopPropagation(); 
    dispatch(toggleWishlist(product));
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  return (
    <>
      <Container className="py-4">
        <Row className="g-4">
          {data.map((ele, id) => (
            <Col key={id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="product-card h-100 shadow-sm"
                onClick={() => handleCardClick(ele)}
              >
                <Badge className="discount-badge">20% OFF</Badge>

                <div
                  className="wishlist-icon"
                  onClick={(e) => handleWishlistClick(ele, e)}
                >
                  {isInWishlist(ele.id) ? (
                    <IoHeart size={26} color="red" />
                  ) : (
                    <IoHeartOutline size={26} color="#444" />
                  )}
                </div>

                <Card.Img
                  variant="top"
                  src={ele.thumbnail}
                  alt={ele.title}
                  className="product-img"
                />

                <Card.Body className="text-center">
                  <Card.Title className="product-title">{ele.title}</Card.Title>

                  <div className="rating-stars mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={16}
                        color={i < 4 ? "#FFD700" : "#ccc"}
                      />
                    ))}
                  </div>

                  <Card.Text>
                    <span className="price-new">₹{ele.price}</span>{" "}
                    <span className="price-old">₹{ele.price + 200}</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style>{`
        .product-card {
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          cursor: pointer;
        }
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        .product-img {
          height: 200px;
          object-fit: cover;
          transition: transform 0.4s;
        }
        .product-card:hover .product-img {
          transform: scale(1.05);
        }
        .discount-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: linear-gradient(45deg, #ff7e5f, #feb47b);
          color: white;
          font-weight: 600;
          border-radius: 12px;
          padding: 5px 10px;
          font-size: 0.75rem;
        }
        .wishlist-icon {
          position: absolute;
          top: 10px;
          right: 10px;
          background: white;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: transform 0.3s;
          z-index: 2;
        }
        .wishlist-icon:hover {
          transform: scale(1.2);
        }
        .product-title {
          font-size: 1rem;
          font-weight: 600;
          color: #333;
          margin-top: 8px;
        }
        .rating-stars {
          color: #FFD700;
        }
        .price-new {
          font-weight: 700;
          font-size: 1rem;
          color: #28a745;
        }
        .price-old {
          font-size: 0.9rem;
          text-decoration: line-through;
          color: #888;
          margin-left: 6px;
        }
      `}</style>
    </>
  );
};

export default Home;
