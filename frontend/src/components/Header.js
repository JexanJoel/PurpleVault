import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("token");

  // ✅ state properly defined
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-inner">
        {/* Brand */}
        <div className="brand">PurpleVault 💜</div>

        {/* Hamburger */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </div>

        {/* Nav */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {!isAuth && (
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          )}

          {!isAuth && (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}

          {!isAuth && (
            <Link to="/register" onClick={() => setMenuOpen(false)}>
              Register
            </Link>
          )}

          {isAuth && (
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          )}

          {isAuth && (
            <button className="header-btn" onClick={logout}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
