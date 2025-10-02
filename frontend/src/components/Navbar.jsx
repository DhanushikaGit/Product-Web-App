import { useState } from "react";
// FIX 1: Import Link and useLocation for routing
import { Link, useLocation } from "react-router-dom"; 
import { Menu, X, Sun, Moon, ShoppingBag, Home, Package, Plus } from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Products", path: "/products", icon: ShoppingBag },
  { name: "Add Product", path: "/add-product", icon: Plus }, 
];

export default function ModernNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation(); 
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  const navStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    backgroundColor: darkMode ? '#0f172a' : '#ffffff',
    borderBottom: `1px solid ${darkMode ? '#1e293b' : '#e2e8f0'}`,
    transition: 'all 0.3s',
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem',
  };

  const toolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    textDecoration: 'none', 
  };

  const logoTextStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: darkMode ? '#ffffff' : '#0f172a',
  };

  const accentTextStyle = {
    color: '#4f46e5',
  };

  const desktopMenuStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  };

  const getNavButtonStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: 500,
    color: isActive ? '#4f46e5' : (darkMode ? '#ffffff' : '#0f172a'),
    backgroundColor: isActive ? (darkMode ? '#312e81' : '#eef2ff') : 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
  });

  const iconButtonStyle = {
    padding: '0.5rem',
    borderRadius: '0.5rem',
    color: darkMode ? '#ffffff' : '#0f172a',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  };

  const rightActionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const mobileMenuStyle = {
    maxHeight: mobileOpen ? '400px' : '0',
    opacity: mobileOpen ? 1 : 0,
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    backgroundColor: darkMode ? '#1e293b' : '#f8fafc',
  };

  const mobileMenuInnerStyle = {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  };

  const getMobileNavButtonStyle = (isActive) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: 500,
    color: isActive ? '#4f46e5' : (darkMode ? '#ffffff' : '#0f172a'),
    backgroundColor: isActive ? (darkMode ? '#312e81' : '#eef2ff') : 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textDecoration: 'none',
  });

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
        .nav-btn:hover {
          background-color: ${darkMode ? '#1e293b' : '#f1f5f9'} !important;
        }
        .icon-btn:hover {
          background-color: ${darkMode ? '#1e293b' : '#f1f5f9'} !important;
        }
      `}</style>
      
      <nav style={navStyle}>
        <div style={containerStyle}>
          <div style={toolbarStyle}>
            <Link to="/" style={logoContainerStyle}>
              <div style={{ position: 'relative' }}>
                <Package 
                  style={{ width: '32px', height: '32px', color: '#4f46e5' }} 
                />
              </div>
              <span style={logoTextStyle}>
                Product<span style={accentTextStyle}>Hub</span>
              </span>
            </Link>

            <div style={desktopMenuStyle} className="desktop-menu">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    style={getNavButtonStyle(isActive)}
                    className="nav-btn"
                  >
                    <Icon style={{ width: '16px', height: '16px' }} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <div style={rightActionsStyle}>
              <button
                onClick={toggleDarkMode}
                style={iconButtonStyle}
                className="icon-btn"
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <Sun style={{ width: '20px', height: '20px' }} />
                ) : (
                  <Moon style={{ width: '20px', height: '20px' }} />
                )}
              </button>

              <button
                onClick={toggleMobile}
                style={iconButtonStyle}
                className="mobile-menu-btn icon-btn"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X style={{ width: '24px', height: '24px' }} />
                ) : (
                  <Menu style={{ width: '24px', height: '24px' }} />
                )}
              </button>
            </div>
          </div>
        </div>

        <div style={mobileMenuStyle} className="mobile-menu">
          <div style={mobileMenuInnerStyle}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => {
                    setMobileOpen(false);
                  }}
                  style={getMobileNavButtonStyle(isActive)}
                  className="nav-btn"
                >
                  <Icon style={{ width: '20px', height: '20px' }} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}