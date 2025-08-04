import React from "react";
import Carousel from "react-bootstrap/Carousel";
import img1 from "./images/gg.jpg";
import img2 from "./images/h.jpg";
import img3 from "./images/oo.jpg";
import img4 from "./images/m.jpg";

const styles = `
.carousel-container {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  position: relative;

}

.carousel-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 0;
  filter: brightness(75%); /* darken image for better text visibility */
}

.carousel-caption-custom {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,0.4); /* semi-transparent bg */
  padding: 20px 25px;
  border-radius: 12px;
  text-align: center;
  color: white;
  max-width: 80%;
}

.carousel-caption-custom h3 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 10px;
  background: linear-gradient(90deg, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.carousel-caption-custom p {
  font-size: 1rem;
  font-style: italic;
  margin: 0;
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .carousel-image {
    height: 200px;
  }
  .carousel-caption-custom h3 {
    font-size: 1.2rem;
  }
  .carousel-caption-custom p {
    font-size: 0.9rem;
  }
}
`;

const Carosel = () => {
  return (
    <div className="carousel-container">
      <style>{styles}</style>

      <Carousel interval={3500} controls={true} indicators={true}>
        <Carousel.Item>
          <img src={img1} className="carousel-image" alt="First slide" />
          <div className="carousel-caption-custom">
            <h3>Fresh Vegetables</h3>
            <p>Pure and healthy farm vegetables delivered to your door.</p>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <img src={img2} className="carousel-image" alt="Second slide" />
          <div className="carousel-caption-custom">
            <h3>Organic Groceries</h3>
            <p>Buy natural, chemical-free groceries for your family.</p>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <img src={img3} className="carousel-image" alt="Third slide" />
          <div className="carousel-caption-custom">
            <h3>Haircare Essentials</h3>
            <p>Nourish your hair with our premium herbal products.</p>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <img src={img4} className="carousel-image" alt="Fourth slide" />
          <div className="carousel-caption-custom">
            <h3>Fresh From Nature</h3>
            <p>Natural ingredients straight from the earth.</p>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Carosel;
