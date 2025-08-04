import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Form, Carousel, Image } from "react-bootstrap";
import ProgressTracker from "./ProgressTracker";
import image from "./images/j.jpg";
import image1 from "./images/sasi.avif";
import image2 from "./images/girl.webp";
import image3 from "./images/women.jpg";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;
  const [paymentMethod, setPaymentMethod] = useState("upi");

  if (!formData) {
    return (
      <h3 style={{ textAlign: "center", marginTop: "2rem" }}>
        No address data found.
      </h3>
    );
  }

  const handlePayment = () => {
    navigate("/confirm", { state: { formData, paymentMethod } });
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#e6f7ff", // ✅ Solid background color instead of image
      }}
    >
      <div className="container mt-5">
        <ProgressTracker step={2} />

        {/* Main Square Box */}
        <Card className="shadow-lg border-0 rounded-4 p-4 mt-4 bg-white bg-opacity-75">
          <Row className="g-4">
            {/* Carousel Column */}
            <Col md={4}>
              <h4 className="text-dark mb-3 text-center">🌍 Travel Memories</h4>
              <Carousel indicators={false} controls={true} interval={2000}>
                {[image, image1, image2, image3].map((img, idx) => (
                  <Carousel.Item key={idx}>
                    <Image
                      src={img}
                      className="d-block w-100 rounded-3"
                      height="200px"
                      style={{ objectFit: "cover" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>

            {/* Address Column */}
            <Col md={4}>
              <h4 className="text-dark mb-3">📍 Delivery Address</h4>
              <div className="p-3 bg-light rounded-3 shadow-sm">
                <p><strong>Name:</strong> {formData.fullName}</p>
                <p><strong>Mobile:</strong> {formData.mobile}</p>
                <p><strong>Pincode:</strong> {formData.pincode}</p>
                <p><strong>City:</strong> {formData.city}</p>
                <p><strong>State:</strong> {formData.state}</p>
                <p><strong>Address:</strong> {formData.addressLine}</p>
                <p><strong>Latitude:</strong> {formData.location.lat.toFixed(5)}</p>
                <p><strong>Longitude:</strong> {formData.location.lng.toFixed(5)}</p>
              </div>
            </Col>

            {/* Payment Column */}
            <Col md={4}>
              <h4 className="text-dark mb-4">💳 Choose Payment Method</h4>
              <Form>
                <Form.Check
                  type="radio"
                  label="UPI"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mb-3"
                />
                <Form.Check
                  type="radio"
                  label="PhonePe"
                  name="paymentMethod"
                  value="phonepe"
                  checked={paymentMethod === "phonepe"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mb-3"
                />
                <Form.Check
                  type="radio"
                  label="Cash on Delivery"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mb-4"
                />

                <Button
                  variant="success"
                  className="w-100 py-3 fw-bold rounded-pill"
                  onClick={handlePayment}
                >
                  Proceed with {paymentMethod.toUpperCase()}
                </Button>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
