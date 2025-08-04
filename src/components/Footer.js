import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookMessenger, FaTwitterSquare, FaInstagram,
  FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal
} from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";
import { MdOutlineProductionQuantityLimits, MdAccountCircle } from "react-icons/md";
import { IoMdReturnRight } from "react-icons/io";
import { GoGift } from "react-icons/go";
import { LuTentTree } from "react-icons/lu";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <Container>
        <Row className="text-center text-md-start">
          <Col md={3} className="mb-4">
            <h5 className="footer-heading">Get to Know Us</h5>
            {["About Amazon", "Careers", "Press Releases", "Amazon Science"].map((item, i) => (
              <p className="footer-item" key={i}>{item}</p>
            ))}
          </Col>

          <Col md={3} className="mb-4">
            <h5 className="footer-heading">Connect with Us</h5>
            <p className="footer-item"><FaFacebookMessenger className="icon facebook" /> Facebook</p>
            <p className="footer-item"><FaTwitterSquare className="icon twitter" /> Twitter</p>
            <p className="footer-item"><FaInstagram className="icon instagram" /> Instagram</p>
          </Col>

          <Col md={3} className="mb-4">
            <h5 className="footer-heading">Let Us Help You</h5>
            <p className="footer-item"><MdAccountCircle className="icon" /> Your Account</p>
            <p className="footer-item"><IoMdReturnRight className="icon" /> Returns Centre</p>
            <p className="footer-item"><MdOutlineProductionQuantityLimits className="icon" /> 100% Protection</p>
            <p className="footer-item"><IoIosHelpCircle className="icon" /> Help</p>
          </Col>

          <Col md={3} className="mb-4 text-center">
            <h5 className="footer-heading">Debit Cards Accepted</h5>
            <div className="card-icons">
              <FaCcVisa className="card-icon visa" />
              <FaCcMastercard className="card-icon mc" />
              <FaCcAmex className="card-icon amex" />
              <FaCcPaypal className="card-icon paypal" />
            </div>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <div className="footer-bottom text-center">
          <p className="copyright">© 2025 Amazon Clone by SasiKala</p>
          <div className="bottom-links">
            <p className="footer-item seller"><LuTentTree /> Become a Seller</p>
            <p className="footer-item gift"><GoGift /> Gift Cards</p>
          </div>
        </div>
      </Container>

      {/* Styles */}
      <style>{`
        .footer-wrapper {
          background: linear-gradient(90deg, #ff7e5f, #feb47b); 
          color: black; /* default text black */
          padding: 40px 0;
          font-family: 'Segoe UI', sans-serif;
          box-shadow: 0 -4px 15px rgba(0,0,0,0.2);
        }

        .footer-heading {
          font-weight: bold;
          margin-bottom: 20px;
          color: black; /* headings black */
        }

        .footer-item {
          transition: all 0.3s ease-in-out;
          margin-bottom: 10px;
          cursor: pointer;
          font-size: 0.95rem;
          color: black; /* items black */
        }

        .footer-item:hover {
          color: #333; /* darker on hover */
          transform: translateX(6px);
        }

        .footer-divider {
          border-color: rgba(0, 0, 0, 0.2);
        }

        .card-icons {
          font-size: 2rem;
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .card-icon {
          transition: transform 0.3s, color 0.3s;
          color: black;
        }

        .card-icon:hover {
          transform: scale(1.2);
          color: #444;
        }

        /* Social Icon Colors (unchanged for brand look) */
        .facebook { color: #4267B2; }
        .twitter { color: #1DA1F2; }
        .instagram { color: #E1306C; }

        .footer-bottom {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .bottom-links {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 10px;
        }

        .bottom-links .footer-item {
          font-weight: 600;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.6);
          padding: 6px 12px;
          border-radius: 20px;
          transition: background 0.3s ease;
          color: black;
        }

        .bottom-links .footer-item:hover {
          background: rgba(255,255,255,0.9);
          color: #000;
        }

        @media (max-width: 576px) {
          .bottom-links {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Footer;
