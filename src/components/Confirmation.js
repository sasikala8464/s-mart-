import React, { useState, useEffect } from "react";
import { Card, Button, Container, Modal, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import smileImg from "./images/smile.png";
import sound from "./sounds/s.mp3";

const OrderTracking = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showTracking, setShowTracking] = useState(false);

  // Dummy tracking stages
  const stages = ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];
  const currentStage = 3; // 👈 Example: 3 means "Out for Delivery"

  // ✅ Play sound once when component loads
  useEffect(() => {
    const audio = new Audio(sound);
    audio.play().catch((err) => console.error("Audio play error:", err));

    // stop after 2 seconds
    const timer = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 2000);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Show popup after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleYes = () => {
    setShowPopup(false);
    setShowTracking(true);
  };

  const handleNo = () => {
    setShowPopup(false);
    setShowTracking(false);
  };

  return (
    <div className="success-screen">
      {/* Stars Background */}
      <div className="stars-container">
        {[...Array(40)].map((_, i) => (
          <span key={i} className="star"></span>
        ))}
      </div>

      {/* Success message with smile */}
      <img src={smileImg} alt="Happy Smile" className="smile-img" />
      <h1>🎉 Order Placed Successfully!</h1>
      <p>Thank you for shopping with us ❤️</p>

      {/* Show tracking if user chooses Yes */}
      {showTracking && (
        <Container className="d-flex justify-content-center align-items-center mt-3">
          <Card className="tracking-card shadow-lg border-0 rounded-4 p-4 w-100">
            <h4 className="fw-bold text-dark mb-4">📦 Track Your Order</h4>
            <div className="tracking-line">
              {stages.map((stage, index) => (
                <div key={index} className="tracking-stage">
                  <div
                    className={`stage-circle ${
                      index < currentStage
                        ? "completed"
                        : index === currentStage
                        ? "active"
                        : ""
                    }`}
                  >
                    {index < currentStage
                      ? "✔"
                      : index === currentStage
                      ? "⏳"
                      : ""}
                  </div>
                  <span className="stage-label">{stage}</span>
                </div>
              ))}
            </div>

            {/* Main Progress Line */}
            <ProgressBar
              now={(currentStage / (stages.length - 1)) * 100}
              className="mt-4"
              variant="success"
              animated
            />

            <Button
              variant="success"
              className="w-100 fw-bold mt-4 rounded-pill"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>
          </Card>
        </Container>
      )}

      {/* Popup Modal */}
      <Modal
        show={showPopup}
        onHide={handleNo}
        centered
        dialogClassName="custom-modal"
        backdropClassName="custom-backdrop"
      >
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>🚚 Track Your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal-body">
          <p>Would you like to see your order tracking details?</p>
        </Modal.Body>
        <Modal.Footer className="custom-modal-footer">
          <Button
            variant="outline-danger"
            className="fw-bold px-4"
            onClick={handleNo}
          >
            No, Thanks
          </Button>
          <Button
            variant="success"
            className="fw-bold px-4 pulse-button"
            onClick={handleYes}
          >
            Yes, Show Me
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ✅ Full Styles Restored */}
      <style>{`
        .success-screen {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #28a745, #3ecf8e);
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem;
          animation: fadeIn 0.8s ease-in-out;
        }

        .smile-img {
          width: 150px;
          height: 150px;
          margin-bottom: 1.5rem;
          animation: bounce 1.5s infinite;
          border-radius:8rem;
          position: relative;
          z-index: 2;
        }

        .tracking-card {
          max-width: 600px;
          background: #fff;
          color: black;
        }

        .tracking-line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .tracking-stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 20%;
        }

        .stage-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #dee2e6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #6c757d;
        }

        .stage-circle.completed {
          background: #28a745;
          color: white;
        }

        .stage-circle.active {
          background: #fcf805ff;
          color: white;
        }

        .stage-label {
          margin-top: 9px;
          font-size: 0.9rem;
          text-align: center;
          color: #060604ff;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .custom-backdrop {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
        }

        .custom-modal {
          animation: zoomIn 0.6s ease;
          margin-top: 70px;
        }

        .custom-modal-header {
          background: linear-gradient(90deg, #a78128ff, #3ecf8e);
          color: white;
          border-bottom: none;
          height:4rem;
        }

        .custom-modal-body {
          font-size: 1.1rem;
          color: #333;
          text-align: center;
        }

        .custom-modal-footer {
          border-top: none;
          display: flex;
          justify-content: space-around;
        }

        .pulse-button {
          animation: pulse 1.5s infinite;
        }

        @keyframes zoomIn {
          from { transform: scale(0.7); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .stars-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .star {
          position: absolute;
          border-radius: 50%;
          opacity: 0.8;
          animation: floatStar 6s ease-in-out infinite, twinkle 2s infinite;
        }

        .star:nth-child(odd) { width: 10px; height: 10px; }
        .star:nth-child(even) { width: 7px; height: 7px; }

        .star:nth-child(6n+1) { background: radial-gradient(circle, #ff7eb3, #ff65a3); }
        .star:nth-child(6n+2) { background: radial-gradient(circle, #ffd700, #ffa500); }
        .star:nth-child(6n+3) { background: radial-gradient(circle, #00f5d4, #00bbf9); }
        .star:nth-child(6n+4) { background: radial-gradient(circle, #7afcff, #9b5de5); }
        .star:nth-child(6n+5) { background: radial-gradient(circle, #ff9a8b, #ff6a88); }
        .star:nth-child(6n+6) { background: radial-gradient(circle, #38ef7d, #11998e); }

        .star:nth-child(1) { top: 10%; left: 15%; animation-delay: 0s; }
        .star:nth-child(2) { top: 25%; left: 60%; animation-delay: 1s; }
        .star:nth-child(3) { top: 40%; left: 30%; animation-delay: 2s; }
        .star:nth-child(4) { top: 55%; left: 80%; animation-delay: 1.5s; }
        .star:nth-child(5) { top: 70%; left: 20%; animation-delay: 2.5s; }
        .star:nth-child(6) { top: 85%; left: 50%; animation-delay: 3s; }
        .star:nth-child(7) { top: 15%; left: 80%; animation-delay: 0.5s; }
        .star:nth-child(8) { top: 60%; left: 10%; animation-delay: 2.8s; }
        .star:nth-child(9) { top: 45%; left: 70%; animation-delay: 1.2s; }
        .star:nth-child(10) { top: 75%; left: 40%; animation-delay: 2s; }

        @keyframes floatStar {
          0% { transform: translateY(0) scale(1); opacity: 0.7; }
          50% { transform: translateY(-25px) scale(1.3); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 0.7; }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default OrderTracking;
