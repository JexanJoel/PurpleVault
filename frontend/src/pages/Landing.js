import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing-page">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Track Your Investments</h1>
          <p>
            PurpleVault lets you manage stocks, mutual funds, bonds, gold, and more -all in one secure dashboard. Stay on top of your wealth effortlessly.
          </p>
          <Link to="/register" className="cta-btn">Get Started</Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <div className="feature-card">
          <h3>📊 Asset Tracking</h3>
          <p>View all your investments in one clean dashboard.</p>
        </div>
        <div className="feature-card">
          <h3>🔒 Secure</h3>
          <p>JWT-based authentication keeps your data private and safe.</p>
        </div>
        <div className="feature-card">
          <h3>📱 Mobile Ready</h3>
          <p>Optimized for all devices, from phones to desktops.</p>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-section">
        <h2>Ready to take control of your assets?</h2>
        <Link to="/register" className="cta-btn-outline">Create Free Account</Link>
      </section>
    </div>
  );
}
