import { useState, useEffect } from "react";
import { Package, Zap, Shield, TrendingUp, ArrowRight, Sparkles } from "lucide-react";

function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Package,
      title: "Easy Management",
      description: "Organize and manage your products effortlessly with our intuitive interface"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience blazing fast performance with optimized workflows"
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: TrendingUp,
      title: "Growth Focused",
      description: "Scale your product catalog as your business grows"
    }
  ];

  const bgGradient = darkMode 
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';

  const cardBg = darkMode ? '#1e293b' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#0f172a';
  const subTextColor = darkMode ? '#94a3b8' : '#64748b';

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
        right: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
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
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          animation: isVisible ? 'fadeInUp 1s ease-out' : 'none'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            padding: '0.5rem 1.5rem',
            borderRadius: '50px',
            marginBottom: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <Sparkles style={{ width: '16px', height: '16px', color: '#fbbf24' }} />
            <span style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: 600 }}>
              Welcome to the Future of Product Management
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '1.5rem',
            lineHeight: 1.2,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}>
            Manage Your Products
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #fbbf24, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              With Confidence
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.8
          }}>
            Your centralized hub to organize, track, and scale your product catalog with ease and efficiency.
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              fontSize: '1.125rem',
              fontWeight: 600,
              color: '#0f172a',
              backgroundColor: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}>
              Get Started
              <ArrowRight style={{ width: '20px', height: '20px' }} />
            </button>
            
            <button style={{
              padding: '1rem 2rem',
              fontSize: '1.125rem',
              fontWeight: 600,
              color: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>
              Learn More
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div style={{
          marginBottom: '5rem',
          animation: isVisible ? 'slideInRight 1s ease-out 0.3s both' : 'none'
        }}>
          <div style={{
            position: 'relative',
            maxWidth: '1100px',
            margin: '0 auto',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15, 23, 42, 0.6), transparent)',
              pointerEvents: 'none'
            }}></div>
          </div>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginTop: '4rem'
        }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="feature-card"
                style={{
                  backgroundColor: cardBg,
                  padding: '2rem',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  animation: isVisible ? `fadeInUp 1s ease-out ${0.5 + index * 0.1}s both` : 'none'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <Icon style={{ width: '28px', height: '28px', color: '#ffffff' }} />
                </div>
                
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: textColor,
                  marginBottom: '0.75rem'
                }}>
                  {feature.title}
                </h3>
                
                <p style={{
                  fontSize: '1rem',
                  color: subTextColor,
                  lineHeight: 1.6
                }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;