import { useEffect, useState } from "react";
import { Edit, Trash2, ShoppingBag, TrendingUp, Package, Search, Filter } from "lucide-react";

function Products() {
  const [products, setProducts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/edit-product/${id}`;
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const bgGradient = darkMode
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)';

  const cardBg = darkMode ? '#1e293b' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#0f172a';
  const subTextColor = darkMode ? '#94a3b8' : '#64748b';
  const inputBg = darkMode ? '#334155' : '#ffffff';
  const inputBorder = darkMode ? '#475569' : '#e2e8f0';

  return (
    <div style={{
      minHeight: '100vh',
      background: bgGradient,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
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
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .product-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
        }
        .btn-danger:hover {
          transform: translateY(-2px);
          background-color: #dc2626;
        }
      `}</style>

      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          animation: 'fadeIn 0.8s ease-out'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <ShoppingBag style={{ width: '32px', height: '32px', color: '#6366f1' }} />
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: textColor,
              margin: 0
            }}>
              Our Products
            </h1>
          </div>
          <p style={{
            fontSize: '1.125rem',
            color: subTextColor,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Discover our amazing collection of products
          </p>

          {/* Stats Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              padding: '1rem 2rem',
              backgroundColor: cardBg,
              borderRadius: '16px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              minWidth: '150px'
            }}>
              <Package style={{ width: '24px', height: '24px', color: '#6366f1', marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '2rem', fontWeight: 700, color: textColor }}>
                {products.length}
              </div>
              <div style={{ fontSize: '0.875rem', color: subTextColor }}>Total Products</div>
            </div>
            <div style={{
              padding: '1rem 2rem',
              backgroundColor: cardBg,
              borderRadius: '16px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              minWidth: '150px'
            }}>
              <TrendingUp style={{ width: '24px', height: '24px', color: '#10b981', marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '2rem', fontWeight: 700, color: textColor }}>
                {filteredProducts.length}
              </div>
              <div style={{ fontSize: '0.875rem', color: subTextColor }}>Showing</div>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{
            maxWidth: '500px',
            margin: '2rem auto 0',
            position: 'relative'
          }}>
            <Search style={{
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
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3rem',
                fontSize: '1rem',
                color: textColor,
                backgroundColor: inputBg,
                border: `2px solid ${inputBorder}`,
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.3s',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{
                backgroundColor: cardBg,
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  height: '240px',
                  background: 'linear-gradient(90deg, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s infinite'
                }}></div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    height: '24px',
                    background: '#e2e8f0',
                    borderRadius: '4px',
                    marginBottom: '1rem'
                  }}></div>
                  <div style={{
                    height: '32px',
                    background: '#e2e8f0',
                    borderRadius: '4px',
                    width: '60%'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem',
            animation: 'fadeIn 0.8s ease-out'
          }}>
            {filteredProducts.map((product, index) => (
              <div
                key={product._id}
                className="product-card"
                style={{
                  backgroundColor: cardBg,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(99, 102, 241, 0.1)',
                  animation: `fadeIn 0.8s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Product Image */}
                <div style={{
                  position: 'relative',
                  height: '240px',
                  overflow: 'hidden'
                }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(99, 102, 241, 0.9)',
                    color: '#ffffff',
                    padding: '0.5rem 1rem',
                    borderRadius: '50px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)'
                  }}>
                    ₹ {product.price}
                  </div>
                </div>

                {/* Product Details */}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: textColor,
                    marginBottom: '0.75rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {product.name}
                  </h3>
                  
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '1.5rem'
                  }}>
                    ₹ {product.price}
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '0.75rem'
                  }}>
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="btn-primary"
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: '#ffffff',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      <Edit style={{ width: '18px', height: '18px' }} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn-danger"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.75rem',
                        backgroundColor: '#ef4444',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      <Trash2 style={{ width: '18px', height: '18px', color: '#ffffff' }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            animation: 'fadeIn 0.8s ease-out'
          }}>
            <Package style={{ width: '64px', height: '64px', color: subTextColor, marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: textColor, marginBottom: '0.5rem' }}>
              No products found
            </h3>
            <p style={{ color: subTextColor }}>
              {searchTerm ? 'Try adjusting your search' : 'Start by adding your first product'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;