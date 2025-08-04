import React from "react";
import { FaHome, FaMoneyBill, FaCheckCircle } from "react-icons/fa";

const ProgressTracker = ({ step }) => {
  const steps = [
    { label: "Address", icon: <FaHome /> },
    { label: "Payment", icon: <FaMoneyBill /> },
    { label: "Confirmation", icon: <FaCheckCircle /> },
  ];

  return (
    <div className="d-flex justify-content-center align-items-center my-4 flex-wrap">
      {steps.map((item, index) => {
        const stepNumber = index + 1;
        const isCompleted = step > stepNumber;
        const isActive = step === stepNumber;

        return (
          <div
            key={index}
            className="d-flex align-items-center position-relative"
            style={{ minWidth: "120px" }}
          >
            {/* Step Circle with Icon */}
            <div
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold shadow"
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: isCompleted
                  ? "#28a745" // green for completed
                  : isActive
                  ? "#007bff" // blue for current
                  : "#dee2e6", // gray for pending
                color: isCompleted || isActive ? "#fff" : "#6c757d",
                fontSize: "20px",
                transition: "0.3s",
              }}
            >
              {item.icon}
            </div>

            {/* Label */}
            <div
              className="ms-2 fw-semibold"
              style={{
                color: isCompleted
                  ? "#28a745"
                  : isActive
                  ? "#007bff"
                  : "#6c757d",
                fontSize: "14px",
              }}
            >
              {item.label}
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: "4px",
                  backgroundColor: step > stepNumber ? "#28a745" : "#dee2e6",
                  margin: "0 15px",
                  borderRadius: "2px",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressTracker;
