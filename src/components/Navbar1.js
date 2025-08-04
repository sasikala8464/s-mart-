import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useDispatch, useSelector } from "react-redux";
import { IoHeart } from "react-icons/io5";
import { deletRedux } from "../features/redux/slices.js/uiSlice";

const navbarStyles = `
/* Dropdown menu background white */
.navbar-custom .navbar-collapse {
  background-color: white; 
  border-radius: 10px;
  padding: 10px;
}

/* Make links look white */
.navbar-custom .navbar-collapse .nav-link {
  color: black !important;
}

.navbar-custom .navbar-collapse .nav-link:hover {
  background-color: #f5f5f5;
  color: #ff4d4d !important;
}

.navbar-custom {
  background: linear-gradient(90deg, #ff7e5f, #feb47b);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  transition: background 0.8s ease-in-out;
}

.navbar-custom:hover {
  background: linear-gradient(90deg, #feb47b, #ff7e5f);
}

.navbar-custom .nav-link {
  font-weight: 600;
  margin-right: 18px;
  position: relative;
  transition: all 0.3s ease-in-out;
  font-family: 'Segoe UI', sans-serif;
  text-transform: capitalize;
  color: white !important; /* white text */
}

.navbar-custom .nav-link:hover {
  opacity: 0.85;
  color: #f5f5f5 !important; /* light white hover */
}

.navbar-custom .nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 2px;
  width: 0%;
  background-color: white; /* underline in white */
  transition: width 0.4s;
}

.navbar-custom .nav-link:hover::after {
  width: 100%;
}

.navbar-custom .brand-style {
  font-size: 1.6rem;
  font-weight: bold;
  color: white !important; /* brand white */
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  font-family: 'Segoe UI', sans-serif;
}

/* Buttons */
.login-btn,
.signup-btn {
  border-radius: 20px;
  padding: 6px 14px;
  font-weight: 500;
  font-size: 0.9rem;
  margin-left: 10px;
  transition: all 0.3s ease-in-out;
}

.login-btn {
  background-color: #ffffff;
  color: #070707ff;
  border: none;
}

.login-btn:hover {
  background-color: #ffe0b2;
  color: #d84315;
}

.signup-btn {
  background-color: transparent;
  color: white !important; /* button text white */
  border: 1px solid white;
}

.signup-btn:hover {
  background-color: white;
  color: black !important;
}

/* Cart Badge */
.navbar-custom .custom-badge {
  background-color: #ff4b2b !important;
  color: #fff;
  font-weight: 600;
  font-size: 0.7rem;
  border-radius: 999px;
  padding: 3px 8px;
  position: relative;
  top: -10px;
  left: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  animation: pop 0.5s ease;
}

@keyframes pop {
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

/* Wishlist link */
.wishlist-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  color: black !important; /* wishlist text black */
  transition: color 0.3s ease;
  margin-left: 12px;
}

.wishlist-link:hover {
  color: #ff4d4d !important;
}

.wishlist-icon {
  font-size: 22px;
  color: black !important; /* icon black */
  transition: transform 0.3s ease, color 0.3s ease;
}

.wishlist-link:hover .wishlist-icon {
  color: #ff1a1a !important;
  transform: scale(1.15);
}

/* Buttons */
.login-btn {
  background-color: #ffffff;
  color: black !important; /* text black */
  border: none;
}

.login-btn:hover {
  background-color: #ffe0b2;
  color: #d84315 !important;
}

.signup-btn {
  background-color: transparent;
  color: black !important; /* text black */
  border: 1px solid black;
}

.signup-btn:hover {
  background-color: black;
  color: white !important;
}

`;

const Navbar1 = () => {
  const data = useSelector((state) => state.product.cartItems);
  const data1 = useSelector((state) => state.wishlist.items);
  const demo = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fun = () => {
    dispatch(deletRedux());
    navigate("/login");
  };

  return (
    <>
      <style>{navbarStyles}</style>

      <Navbar expand="lg" className="navbar-custom sticky-top" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-style">
            Creativo
            {demo.username && (
              <Button
                variant="outline-light"
                className="profile-btn ms-2"
                size="sm"
              >
                {demo.firstName}
              </Button>
            )}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" className="bg-light" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto text-center">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/services">Services</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              <Nav.Link as={Link} to="/cart">
                Cart
                <Badge className="custom-badge">{data.length}</Badge>
              </Nav.Link>
            </Nav>

            <Nav className="ms-auto text-center">
              <Nav.Link as={Link} to="/whishlist" className="wishlist-link">
                <Badge className="custom-badge">{data1.length}</Badge>
                <IoHeart className="wishlist-icon" />
              </Nav.Link>
              {demo.username ? (
                <Button className="login-btn" onClick={fun}>
                  Logout
                </Button>
              ) : (
                <Button as={Link} to="/login" className="signup-btn">
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbar1;
