import { useState } from "react";
import { Package, DollarSign, Image, CheckCircle, AlertCircle, Sparkles } from "lucide-react";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [message, setMessage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message) setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          price: Number(formData.price),
          image: formData.image,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Product added successfully!" });
        setFormData({ name: "", price: "", image: "" });
      } else {
        setMessage({ type: "error", text: data.message || "Error adding product" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Server error, try again later" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const bgGradient = darkMode
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

  const cardBg = darkMode ? '#1e293b' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#0f172a';
  const inputBg = darkMode ? '#334155' : '#f8fafc';
  const inputBorder = darkMode ? '#475569' : '#e2e8f0';
  const labelColor = darkMode ? '#94a3b8' : '#64748b';

  const inputFieldStyle = {
    width: '100%',
    padding: '1rem 1rem 1rem 3rem',
    fontSize: '1rem',
    color: textColor,
    backgroundColor: inputBg,
    border: `2px solid ${inputBorder}`,
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.3s',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: bgGradient,
      position: 'relative',
      overflow: 'hidden',
      padding: '4rem 1rem'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 6s ease-in-out infinite'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .input-field:focus {
          border-color: #8b5cf6 !important;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
        }
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>

      {/* Main Container */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        animation: 'fadeIn 0.8s ease-out'
      }}>
        {/* Header Badge */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            padding: '0.5rem 1.5rem',
            borderRadius: '50px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Sparkles style={{ width: '16px', height: '16px', color: '#fbbf24' }} />
            <span style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: 600 }}>
              Add New Product
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: '3rem',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          Create Your Product
        </h1>

        {/* Form Card */}
        <div style={{
          backgroundColor: cardBg,
          borderRadius: '24px',
          padding: '2.5rem',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Product Name Field */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: labelColor,
                marginBottom: '0.5rem'
              }}>
                Product Name
              </label>
              <div style={{ position: 'relative' }}>
                <Package style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  color: '#8b5cf6',
                  pointerEvents: 'none',
                  zIndex: 1
                }} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="input-field"
                  style={inputFieldStyle}
                />
              </div>
            </div>

            {/* Price Field */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: labelColor,
                marginBottom: '0.5rem'
              }}>
                Price
              </label>
              <div style={{ position: 'relative' }}>
                <DollarSign style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  color: '#8b5cf6',
                  pointerEvents: 'none',
                  zIndex: 1
                }} />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  className="input-field"
                  style={inputFieldStyle}
                />
              </div>
            </div>

            {/* Image URL Field */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: labelColor,
                marginBottom: '0.5rem'
              }}>
                Image URL
              </label>
              <div style={{ position: 'relative' }}>
                <Image style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  color: '#8b5cf6',
                  pointerEvents: 'none',
                  zIndex: 1
                }} />
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="input-field"
                  style={inputFieldStyle}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="submit-btn"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#ffffff',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {isSubmitting ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '3px solid #ffffff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Processing...
                </>
              ) : (
                <>
                  <Package style={{ width: '20px', height: '20px' }} />
                  Add Product
                </>
              )}
            </button>
          </div>

          {/* Message Alert */}
          {message && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem 1.25rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: message.type === 'success' ? '#dcfce7' : '#fee2e2',
              border: `2px solid ${message.type === 'success' ? '#86efac' : '#fca5a5'}`,
              animation: 'fadeIn 0.3s ease-out'
            }}>
              {message.type === 'success' ? (
                <CheckCircle style={{ width: '24px', height: '24px', color: '#16a34a', flexShrink: 0 }} />
              ) : (
                <AlertCircle style={{ width: '24px', height: '24px', color: '#dc2626', flexShrink: 0 }} />
              )}
              <span style={{
                fontSize: '0.95rem',
                fontWeight: 500,
                color: message.type === 'success' ? '#166534' : '#991b1b'
              }}>
                {message.text}
              </span>
            </div>
          )}

          {/* Image Preview */}
          {formData.image && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: inputBg,
              borderRadius: '12px',
              border: `2px solid ${inputBorder}`
            }}>
              <p style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: labelColor,
                marginBottom: '0.75rem'
              }}>
                Image Preview
              </p>
              <img
                src={formData.image}
                alt="Preview"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProduct;