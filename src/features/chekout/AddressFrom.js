import React, { useState } from "react";
import { Form, Button, Row, Col, Card, Modal } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import L from "leaflet";

// Fix Leaflet marker icon path
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const AddressForm = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
  });
  const [location, setLocation] = useState({ lat: 17.385044, lng: 78.486671 });
  const [showMap, setShowMap] = useState(false);

  const handleChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { ...address, location };
    navigate("/payment", { state: { formData } });
  };

  const LocationPicker = () => {
    useMapEvents({
      click(e) {
        setLocation(e.latlng);
      },
    });
    return <Marker position={location} />;
  };

  return (
    <Card className="shadow-lg border-0 rounded-4">
      <Card.Body className="p-4">
        <h4 className="mb-4 text-dark fw-bold border-bottom pb-2">
          🚚 Delivery Address
        </h4>

        <Form onSubmit={handleSubmit}>
          {["fullName", "mobile", "pincode", "city", "state"].map((field) => (
            <Form.Group className="mb-3" key={field}>
              <Form.Label className="fw-semibold">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Form.Label>
              <Form.Control
                type={
                  field === "mobile" || field === "pincode" ? "tel" : "text"
                }
                name={field}
                placeholder={`Enter your ${field}`}
                value={address[field]}
                onChange={handleChange}
                className="rounded-3 shadow-sm"
                required
              />
            </Form.Group>
          ))}

          {/* Address Line */}
          <Form.Group className="mb-4 position-relative">
            <Form.Label className="fw-semibold">Address Line</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                as="textarea"
                rows={3}
                name="addressLine"
                placeholder="House number, street, area..."
                value={address.addressLine}
                onChange={handleChange}
                className="rounded-3 shadow-sm"
                required
              />
              <Button
                variant="outline-primary"
                className="ms-2 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "45px", height: "45px" }}
                onClick={() => setShowMap(true)}
              >
                <FaMapMarkerAlt size={20} />
              </Button>
            </div>
            <small className="text-muted">
              Selected Location:{" "}
              <span className="fw-bold text-dark">
                {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
              </span>
            </small>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-100 py-3 fw-bold rounded-pill shadow"
          >
            Proceed to Payment
          </Button>
        </Form>
      </Card.Body>

      {/* Map Modal */}
      <Modal show={showMap} onHide={() => setShowMap(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Your Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: "400px", width: "100%" }}>
            <MapContainer
              center={location}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              />
              <LocationPicker />
            </MapContainer>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMap(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowMap(false)}>
            Save Location
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default AddressForm;
