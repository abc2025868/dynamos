import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageContext } from "../LanguageContext";
import { FaGlobe } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const { lang, setLang } = useContext(LanguageContext);
  const [dropdown, setDropdown] = useState(false);

  const handleLanguage = (code) => {
    setLang(code);
    setDropdown(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="logo">
            <img src="/logo.jpg" alt="AgriAssist Logo" width={50} height={50} />
          </Link>
          <div className="navbar-menu">
            <Link to="/" className={`menu-item ${location.pathname === "/" ? "active" : ""}`}>
              <i className="fas fa-home" /> {lang === "en" ? "Home" : "முகப்பு"}
            </Link>
            <Link to="/crop-disease" className={`menu-item ${location.pathname === "/crop-disease" ? "active" : ""}`}>
              <i className="fas fa-leaf" /> {lang === "en" ? "Crop Disease" : "பயிர் நோய்"}
            </Link>
            <Link to="/market-prices" className={`menu-item ${location.pathname === "/market-prices" ? "active" : ""}`}>
              <i className="fas fa-chart-line" /> {lang === "en" ? "Market Prices" : "சந்தை விலை"}
            </Link>
            <Link to="/weather" className={`menu-item ${location.pathname === "/weather" ? "active" : ""}`}>
              <i className="fas fa-cloud-sun" /> {lang === "en" ? "Weather" : "வானிலை"}
            </Link>
            <Link to="/schemes" className={`menu-item ${location.pathname === "/schemes" ? "active" : ""}`}>
              <i className="fas fa-handshake" /> {lang === "en" ? "Schemes" : "திட்டங்கள்"}
            </Link>
            <Link to="/youtube-refs" className={`menu-item ${location.pathname === "/youtube-refs" ? "active" : ""}`}>
              <i className="fab fa-youtube" /> {lang === "en" ? "Videos" : "வீடியோக்கள்"}
            </Link>

            <div className="language-dropdown" style={{ position: "relative" }}>
              <span
                className="menu-item"
                style={{ cursor: "pointer" }}
                onClick={() => setDropdown(!dropdown)}
                tabIndex={0}
                role="button"
                aria-label="Toggle Language Dropdown"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setDropdown(!dropdown);
                }}
              >
                <FaGlobe style={{ marginRight: 5 }} /> {lang === "en" ? "English" : "தமிழ்"}
              </span>
              {dropdown && (
                <div
                  className="dropdown-content"
                  style={{
                    position: "absolute",
                    background: "#fff",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.14)",
                    borderRadius: 6,
                    marginTop: 6,
                    minWidth: 80,
                    zIndex: 30,
                  }}
                >
                  <div className="lang-option" onClick={() => handleLanguage("en")} style={{ padding: "6px 15px", cursor: "pointer" }}>
                    English
                  </div>
                  <div className="lang-option" onClick={() => handleLanguage("ta")} style={{ padding: "6px 15px", cursor: "pointer" }}>
                    தமிழ்
                  </div>
                </div>
              )}
            </div>

            <div className="account-icon">
              <Link to="/login">
                <i className="fas fa-user-circle" />
              </Link>
              <div className="tooltip">{lang === "en" ? "Login" : "உள்நுழையவும்"}</div>
            </div>
          </div>
        </div>
      </nav>

      <div className="cultural-icon">
        <div className="icon-container">
          <img src="/agri-icon.png" alt={lang === "en" ? "Tamil Nadu Agriculture" : "தமிழ்நாடு வேளாண்மை"} />
          <div className="icon-text">TN</div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
