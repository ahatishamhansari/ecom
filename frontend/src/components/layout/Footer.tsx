import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="container grid-cols-4 footer-grid">
        <div className="footer-brand">
          <h3 className="navbar-logo">StyleForge</h3>
          <p>The AI-Native Fashion Commerce OS.</p>
        </div>
        <div className="footer-links">
          <h4>Shop</h4>
          <Link href="/men">Men</Link>
          <Link href="/women">Women</Link>
          <Link href="/collections">Collections</Link>
        </div>
        <div className="footer-links">
          <h4>Company</h4>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/careers">Careers</Link>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Twitter">🐦</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} StyleForge. All rights reserved.</p>
      </div>
    </footer>
  );
}
