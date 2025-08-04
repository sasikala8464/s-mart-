import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { userRedux } from "../features/redux/slices.js/uiSlice";
import { FaUser } from "react-icons/fa";
import { BiHide } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import image from "./images/sheets.jpg"; // ✅ Background image

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);
  const changeHandler = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res2) => {
        if (res2.message) {
          alert(res2.message);
        } else {
          setTimeout(() => {
            dispatch(userRedux(res2));
            navigate("/");
          }, 1000);
        }
      });
  };

  return (
    <div className="water-layout">
      {/* Animated Water Overlay */}
      <div className="water"></div>
      <div className="water water2"></div>

      {/* Login Card */}
      <Card className="login-card">
        <h3 className="text-center mb-4 text-light">Login</h3>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label className="form-label text-light">Username</Form.Label>
            <div style={{ position: "relative" }}>
              <FaUser className="input-icon text-light" />
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={user.username}
                onChange={changeHandler}
                className="form-control custom-input"
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="form-label text-light">Password</Form.Label>
            <div style={{ position: "relative" }}>
              {showPassword ? (
                <FaRegEye
                  onClick={togglePassword}
                  className="input-icon toggle-icon text-light"
                />
              ) : (
                <BiHide
                  onClick={togglePassword}
                  className="input-icon toggle-icon text-light"
                />
              )}
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                value={user.password}
                onChange={changeHandler}
                className="form-control custom-input"
              />
            </div>
          </Form.Group>

          <Button type="submit" className="submit-btn">
            Submit
          </Button>
        </Form>
      </Card>

      {/* Styles */}
      <style>{`
        .water-layout {
          position: relative;
          height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: url(${image}) no-repeat center center/cover;
          animation: zoomBg 15s infinite alternate ease-in-out;
          overflow: hidden;
        }

        /* Background zoom animation */
        @keyframes zoomBg {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }

        /* Water effect layers */
        .water, .water2 {
          position: absolute;
          top: 0; left: 0;
          width: 200%;
          height: 200%;
          background: rgba(0, 119, 190, 0.25);
          border-radius: 45%;
          animation: wave 10s infinite linear;
          z-index: 0;
        }

        .water2 {
          animation: wave 15s infinite linear reverse;
          opacity: 0.4;
        }

        @keyframes wave {
          0% { transform: translateX(0) translateY(0) rotate(0deg); }
          50% { transform: translateX(-25%) translateY(-10%) rotate(180deg); }
          100% { transform: translateX(0) translateY(0) rotate(360deg); }
        }

        /* Login Card */
        .login-card {
          width: 32rem; /* increased size */
          background: rgba(0, 0, 0, 0.85);
          border-radius: 25px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.7);
          padding: 3rem;
          z-index: 1;
          backdrop-filter: blur(15px);
          animation: float 4s ease-in-out infinite, fadeIn 1.5s ease;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .form-label {
          font-weight: 600;
          color: #fff;
        }

        .input-icon {
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translateY(-50%);
          color: #ccc;
        }

        .toggle-icon {
          left: unset;
          right: 10px;
          cursor: pointer;
          color: #ccc;
        }

        .custom-input {
          padding-left: 2.5rem;
          border-radius: 12px;
          border: 1px solid #555;
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
        .custom-input::placeholder {
          color: #bbb;
        }

        .submit-btn {
          background: linear-gradient(135deg, #42e695, #3bb2b8);
          border: none;
          color: #fff;
          font-weight: bold;
          border-radius: 25px;
          width: 100%;
          margin-top: 1.5rem;
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          background: linear-gradient(135deg, #3bb2b8, #42e695);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Login;
