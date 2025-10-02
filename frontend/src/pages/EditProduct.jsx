import { useEffect, useState } from "react";
import { Package, DollarSign, Image, Save, X, Sparkles } from "lucide-react";

function EditProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [darkMode] = useState(false);
  const [error, setError] = useState("");

  // Extract product ID from URL
  const getProductId = () => {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
  };

  const id = getProductId();

  useEffect(() => {
    if (!id || id === 'edit-product') {
      setError("Invalid product ID");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Product not found');
        }
        return res.json();
      })
      .then((data) => {
        setProduct({
          name: data.name,
          price: String(data.price),
          image: data.image
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load product. Please check if the backend is running.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!product.name || !product.price || !product.image) {
      setError("Please fill in all fields");
      return;
    }

    if (isNaN(product.price) || Number(product.price) <= 0) {
      setError("Please enter a valid price");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: product.name,
          price: Number(product.price),
          image: product.image,
        }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        alert("Product updated successfully!");
        window.location.href = "/products";
      } else {
        setError(data.message || "Failed to update product");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Server error. Please check if backend is running on port 5000.");
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    window.location.href = "/products";
  };

  const bgGradient = darkMode
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)';

  const cardBg = darkMode ? '#1e293b' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#0f172a';
  const inputBg = darkMode ? '#334155' : '#ffffff';
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

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: bgGradient,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          backgroundColor: cardBg,
          padding: '3rem',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #6366f1',
            borderRadius: '50%',
            margin: '0 auto 1.5rem',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ fontSize: '1.125rem', fontWeight: 600, color: textColor }}>
            Loading product...
          </p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error && !product.name) {
    return (
      <div style={{
        minHeight: '100vh',
        background: bgGradient,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}>
        <div style={{
          backgroundColor: cardBg,
          padding: '3rem',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#fee2e2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <X style={{ width: '32px', height: '32px', color: '#dc2626' }} />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: textColor, marginBottom: '1rem' }}>
            Error Loading Product
          </h3>
          <p style={{ color: labelColor, marginBottom: '2rem' }}>{error}</p>
          <button
            onClick={() => window.location.href = "/products"}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer'
            }}
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: bgGradient,
      position: 'relative',
      overflow: 'hidden',
      padding: '4rem 1rem'
    }}>
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '15%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 8s ease-in-out infinite'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 10s ease-in-out infinite reverse'
      }}></div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-40px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .input-field:focus {
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
        }
        .btn-secondary:hover:not(:disabled) {
          transform: translateY(-2px);
          background-color: ${darkMode ? '#475569' : '#e2e8f0'};
        }
        .btn-primary:disabled, .btn-secondary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>

      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        animation: 'fadeIn 0.8s ease-out'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            backdropFilter: 'blur(10px)',
            padding: '0.5rem 1.5rem',
            borderRadius: '50px',
            border: '1px solid rgba(99, 102, 241, 0.3)'
          }}>
            <Sparkles style={{ width: '16px', height: '16px', color: '#6366f1' }} />
            <span style={{ color: textColor, fontSize: '0.875rem', fontWeight: 600 }}>
              Edit Product
            </span>
          </div>
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: textColor,
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Update Product Details
        </h1>

        <div style={{
          backgroundColor: cardBg,
          borderRadius: '24px',
          padding: '2.5rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.1)'
        }}>
          {product.image && (
            <div style={{
              marginBottom: '2rem',
              padding: '1rem',
              backgroundColor: inputBg,
              borderRadius: '16px',
              border: `2px solid ${inputBorder}`,
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
              <div style={{ flex: 1, minWidth: '200px' }}>
                <p style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: labelColor,
                  marginBottom: '0.5rem'
                }}>
                  Current Product
                </p>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: textColor,
                  marginBottom: '0.25rem'
                }}>
                  {product.name}
                </h3>
                <p style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: '#6366f1'
                }}>
                  ₹ {product.price}
                </p>
              </div>
            </div>
          )}

          {error && (
            <div style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              backgroundColor: '#fee2e2',
              border: '2px solid #fca5a5',
              borderRadius: '12px',
              color: '#991b1b',
              fontSize: '0.95rem',
              fontWeight: 500
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                  color: '#6366f1',
                  pointerEvents: 'none',
                  zIndex: 1
                }} />
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="input-field"
                  style={inputFieldStyle}
                  required
                />
              </div>
            </div>

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
                  color: '#6366f1',
                  pointerEvents: 'none',
                  zIndex: 1
                }} />
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  className="input-field"
                  style={inputFieldStyle}
                  required
                />
              </div>
            </div>

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
                  color: '#6366f1',
                  pointerEvents: 'none',
                  zIndex: 1
                }} />
                <input
                  type="url"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="input-field"
                  style={inputFieldStyle}
                  required
                />
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1rem',
              flexWrap: 'wrap'
            }}>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  flex: 1,
                  minWidth: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '1rem',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
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
                    Updating...
                  </>
                ) : (
                  <>
                    <Save style={{ width: '20px', height: '20px' }} />
                    Update Product
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="btn-secondary"
                style={{
                  flex: 1,
                  minWidth: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '1rem',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: textColor,
                  backgroundColor: darkMode ? '#334155' : '#f1f5f9',
                  border: `2px solid ${inputBorder}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                <X style={{ width: '20px', height: '20px' }} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;