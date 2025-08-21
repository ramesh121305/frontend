import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter,FaYoutube  } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          {/* Brand Logo & About */}
          <div className="col-md-4 text-center text-md-start mb-4">
            <img
              src="images/pngtree-restaurant-logo-design-vector-template-png-image_5441058.jpg"
              alt="FoodExpress"
              style={{ width: "70px" }}
              className="footer-logo"
            />
            <p className="mt-3">
              Delicious food delivered fast. Explore our menu and order your
              favorites online.
            </p>
            <div className="footer-social-icons">
              <a
                href="https://facebook.com"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
  href="https://twitter.com"
  className="social-link"
  target="_blank"
  rel="noopener noreferrer"
>
  <FaTwitter />
</a>

<a
  href="https://youtube.com"
  className="social-link"
  target="_blank"
  rel="noopener noreferrer"
>
  <FaYoutube />
</a>

            </div>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4 ">
            <h5>Contact Us</h5>
            <p>
              <strong>Address:</strong> mehidpatnam city classic housing apartment near, Hyderabad, India
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@foodexpress.com"
                className="text-white footer-link"
              >
                support@foodexpress.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a href="tel:+919876543210" className="text-white footer-link">
                +91 98765 43210
              </a>
            </p>
            <p>
              <a
                href="https://foodexpress.com"
                className="text-white footer-link text-decoration-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.foodexpress.com
              </a>
            </p>
          </div>

          {/* App Download Section */}
          <div className="col-md-4 text-center text-md-end">
            <h5>Get Our App</h5>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="images/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                style={{ width: "150px" }}
                className="mb-2 footer-app-btn"
              />
            </a>
            <br />
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="images/Download_on_the_App_Store_Badge.svg.webp"
                alt="App Store"
                style={{ width: "150px" }}
                className="footer-app-btn"
              />
            </a>
          </div>
        </div>

        <hr className="bg-white" />
        <div className="text-center mt-3">
          <small>
            © {new Date().getFullYear()} FoodExpress — Built with ❤️ Freshly prepared meals from local restaurants. Order in just a
                few taps.
          </small>
        </div>
      </div>
    </footer>
  );
}
