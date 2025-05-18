import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa"; // Importing icons for social media
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Footer Links */}
        <div className="footer-links">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-list">
            <li>
              <a href="#home" className="footer-link">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="footer-link">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="footer-link">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="footer-link">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="footer-social">
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" className="social-icon">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className="social-icon">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className="social-icon">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" className="social-icon">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="footer-bottom">
        <p>&copy; 2024 LibroSphere. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
