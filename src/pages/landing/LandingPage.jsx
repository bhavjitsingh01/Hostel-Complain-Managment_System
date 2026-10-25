import { Link } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export function LandingPage() {
  return (
    <div className="index-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <Navbar variant="landing" />

      <main id="main-content" style={{ flex: 1 }}>
        <section className="hero" aria-labelledby="hero-title" style={{
          position: 'relative',
          maxWidth: 'var(--content)',
          minHeight: '640px',
          margin: 'var(--space-4) auto 0',
          padding: 'var(--space-10) var(--space-5) var(--space-8)',
          display: 'grid',
          alignItems: 'center',
          gap: 'var(--space-8)',
          overflow: 'hidden',
          background: `
            radial-gradient(ellipse 60% 50% at 20% 20%, var(--accent-muted), transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 80%, var(--success-muted), transparent 55%),
            linear-gradient(155deg, var(--surface-secondary) 0%, var(--bg-elevated) 50%, var(--surface-tertiary) 100%)
          `,
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--border)',
        }}>
          <div className="hero-orb hero-orb-one" aria-hidden="true" style={{
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            opacity: 0.35,
            width: '300px',
            height: '300px',
            top: '-50px',
            right: '-80px',
            background: 'var(--accent)',
          }} />
          <div className="hero-orb hero-orb-two" aria-hidden="true" style={{
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            opacity: 0.2,
            width: '220px',
            height: '220px',
            left: '-60px',
            bottom: '-40px',
            background: 'var(--success)',
          }} />

          <div className="hero-copy" style={{ position: 'relative', zIndex: 1 }}>
            <p className="eyebrow" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-4)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              <span className="eyebrow-dot" aria-hidden="true" style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--accent)',
                flexShrink: 0,
              }}></span>
              SMART HOSTEL MANAGEMENT
            </p>

            <h1 id="hero-title" style={{
              maxWidth: '720px',
              fontSize: 'clamp(44px, 10vw, 96px)',
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}>
              Hostel complaints shouldn&rsquo;t get <em>lost.</em>
            </h1>

            <p className="hero-description" style={{
              maxWidth: '580px',
              marginTop: 'var(--space-6)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-relaxed)',
            }}>
              Report, track and resolve hostel issues through one connected platform.
              Built for students and wardens.
            </p>

            <div className="hero-actions" style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-6)',
            }}>
              <Link 
                className="button button-primary button-lg" 
                to="/role-selection/signup"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-2)',
                  padding: '0 var(--space-7)',
                  height: '50px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
                  color: 'var(--text-inverse)',
                  background: 'var(--accent)',
                  boxShadow: '0 2px 8px rgba(196, 82, 24, 0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                Get Started
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
              <a 
                className="text-link" 
                href="#workflow"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-1)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  borderBottom: '1px solid var(--text-primary)',
                  paddingBottom: '2px',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                }}
              >
                How it works
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </a>
            </div>

            <div className="hero-meta" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-5)',
              marginTop: 'var(--space-8)',
              paddingTop: 'var(--space-6)',
              borderTop: '1px solid var(--border)',
            }}>
              <div className="meta-item" style={{ display: 'grid', gap: '2px' }}>
                <strong style={{ fontSize: 'var(--text-2xl)', letterSpacing: '-0.03em', fontWeight: 700 }}>3</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Connected roles</span>
              </div>
              <div className="meta-divider" aria-hidden="true" style={{ width: '1px', height: '40px', background: 'var(--border)' }}></div>
              <div className="meta-item" style={{ display: 'grid', gap: '2px' }}>
                <strong style={{ fontSize: 'var(--text-2xl)', letterSpacing: '-0.03em', fontWeight: 700 }}>1</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Unified platform</span>
              </div>
              <div className="meta-divider" aria-hidden="true" style={{ width: '1px', height: '40px', background: 'var(--border)' }}></div>
              <div className="meta-item" style={{ display: 'grid', gap: '2px' }}>
                <strong style={{ fontSize: 'var(--text-2xl)', letterSpacing: '-0.03em', fontWeight: 700 }}>24/7</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Complaint visibility</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-label="HostelHub dashboard preview" style={{ position: 'relative', zIndex: 1, minHeight: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="visual-window" style={{
              width: 'min(100%, 560px)',
              overflow: 'hidden',
              background: 'var(--glass-bg-strong)',
              border: '1px solid var(--glass-border-strong)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--glass-shadow-strong)',
              backdropFilter: 'var(--glass-blur-strong)',
              WebkitBackdropFilter: 'var(--glass-blur-strong)',
            }}>
              <div className="visual-topbar" style={{
                height: '48px',
                padding: '0 var(--space-4)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                borderBottom: '1px solid var(--border)',
                color: 'var(--text-muted)',
                fontSize: 'var(--text-xs)',
              }}>
                <div className="window-dots" style={{ display: 'flex', gap: '4px' }} aria-hidden="true">
                  <i style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--text-muted)', opacity: 0.5 }}></i>
                  <i style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--text-muted)', opacity: 0.5 }}></i>
                  <i style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--text-muted)', opacity: 0.5 }}></i>
                </div>
                <span>HostelHub / Overview</span>
                <span className="visual-status" style={{ marginLeft: 'auto', color: 'var(--success)', fontSize: 'var(--text-xs)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)' }}></span>
                  ● Live
                </span>
              </div>

              <div className="visual-content" style={{ padding: 'var(--space-5)' }}>
                <div className="visual-heading" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>Block B</p>
                    <h2 style={{ marginTop: '2px', fontSize: 'var(--text-xl)', letterSpacing: '-0.02em', fontWeight: 600 }}>Complaint overview</h2>
                  </div>
                  <span className="mini-avatar" style={{
                    width: '36px',
                    height: '36px',
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: '50%',
                    color: 'var(--text-inverse)',
                    background: 'var(--text-primary)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                  }}>RS</span>
                </div>

                <div className="stat-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 'var(--space-3)',
                  marginTop: 'var(--space-5)',
                }}>
                  <div className="mini-stat" style={{
                    padding: 'var(--space-4)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-secondary)',
                  }}>
                    <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Total</span>
                    <strong style={{ display: 'block', marginTop: '4px', fontSize: 'var(--text-3xl)', letterSpacing: '-0.04em', fontWeight: 700 }}>124</strong>
                  </div>
                  <div className="mini-stat accent-stat" style={{
                    padding: 'var(--space-4)',
                    border: '1px solid var(--accent-light)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--accent-light)',
                    color: 'var(--accent)',
                  }}>
                    <span style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Pending</span>
                    <strong style={{ display: 'block', marginTop: '4px', fontSize: 'var(--text-3xl)', letterSpacing: '-0.04em', fontWeight: 700 }}>18</strong>
                  </div>
                  <div className="mini-stat" style={{
                    padding: 'var(--space-4)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-secondary)',
                  }}>
                    <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Resolved</span>
                    <strong style={{ display: 'block', marginTop: '4px', fontSize: 'var(--text-3xl)', letterSpacing: '-0.04em', fontWeight: 700 }}>74</strong>
                  </div>
                </div>

                <div className="complaint-preview" style={{
                  marginTop: 'var(--space-4)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  background: 'var(--surface)',
                }}>
                  <div className="preview-header" style={{
                    padding: 'var(--space-3) var(--space-4)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    borderBottom: '1px solid var(--border)',
                    background: 'var(--surface-secondary)',
                  }}>
                    <span>Recent complaints</span>
                    <span style={{ color: 'var(--accent)' }}>View all →</span>
                  </div>

                  <div className="preview-row" style={{
                    minWidth: 0,
                    padding: 'var(--space-3) var(--space-4)',
                    display: 'grid',
                    gridTemplateColumns: '38px minmax(0, 1fr)',
                    gap: 'var(--space-3)',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}>
                    <span className="preview-icon accent" style={{
                      width: '38px',
                      height: '38px',
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      background: 'var(--accent-light)',
                      color: 'var(--accent)',
                    }}>Wi</span>
                    <div>
                      <strong style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 'var(--text-sm)' }}>Wi-Fi not working</strong>
                      <small style={{ display: 'block', marginTop: '2px', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>Room B-204 · High priority</small>
                    </div>
                    <b className="status status-progress" style={{
                      gridColumn: 2,
                      justifySelf: 'start',
                      padding: 'var(--space-1) var(--space-2)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      color: 'var(--accent)',
                      background: 'var(--accent-light)',
                      borderColor: 'var(--accent-light)',
                    }}>In progress</b>
                  </div>

                  <div className="preview-row" style={{
                    minWidth: 0,
                    padding: 'var(--space-3) var(--space-4)',
                    display: 'grid',
                    gridTemplateColumns: '38px minmax(0, 1fr)',
                    gap: 'var(--space-3)',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}>
                    <span className="preview-icon" style={{
                      width: '38px',
                      height: '38px',
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      background: 'var(--surface-tertiary)',
                      color: 'var(--text-secondary)',
                    }}>Wa</span>
                    <div>
                      <strong style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 'var(--text-sm)' }}>Water leakage</strong>
                      <small style={{ display: 'block', marginTop: '2px', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>Room B-110 · Medium priority</small>
                    </div>
                    <b className="status status-pending" style={{
                      gridColumn: 2,
                      justifySelf: 'start',
                      padding: 'var(--space-1) var(--space-2)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      color: 'var(--warning)',
                      background: 'var(--warning-light)',
                      borderColor: 'var(--warning-light)',
                    }}>Pending</b>
                  </div>

                  <div className="preview-row" style={{
                    minWidth: 0,
                    padding: 'var(--space-3) var(--space-4)',
                    display: 'grid',
                    gridTemplateColumns: '38px minmax(0, 1fr)',
                    gap: 'var(--space-3)',
                    alignItems: 'center',
                  }}>
                    <span className="preview-icon success" style={{
                      width: '38px',
                      height: '38px',
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      background: 'var(--success-light)',
                      color: 'var(--success)',
                    }}>Fa</span>
                    <div>
                      <strong style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 'var(--text-sm)' }}>Broken ceiling fan</strong>
                      <small style={{ display: 'block', marginTop: '2px', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>Room B-302 · Low priority</small>
                    </div>
                    <b className="status status-resolved" style={{
                      gridColumn: 2,
                      justifySelf: 'start',
                      padding: 'var(--space-1) var(--space-2)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      color: 'var(--success)',
                      background: 'var(--success-light)',
                      borderColor: 'var(--success-light)',
                    }}>Resolved</b>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-card floating-card-top" style={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-3)',
              background: 'var(--glass-bg-strong)',
              border: '1px solid var(--glass-border-strong)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--glass-shadow-strong)',
              backdropFilter: 'var(--glass-blur-strong)',
              WebkitBackdropFilter: 'var(--glass-blur-strong)',
              top: 'var(--space-4)',
              right: 0,
            }}>
              <span className="floating-icon" style={{
                width: '30px',
                height: '30px',
                display: 'grid',
                placeItems: 'center',
                borderRadius: '50%',
                color: 'var(--text-inverse)',
                background: 'var(--accent)',
                fontSize: 'var(--text-xs)',
              }}>✓</span>
              <div>
                <strong style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>Complaint resolved</strong>
                <small style={{ marginTop: '2px', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>CMP-1021 · 2 min ago</small>
              </div>
            </div>

            <div className="floating-card floating-card-bottom" style={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-3)',
              background: 'var(--glass-bg-strong)',
              border: '1px solid var(--glass-border-strong)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--glass-shadow-strong)',
              backdropFilter: 'var(--glass-blur-strong)',
              WebkitBackdropFilter: 'var(--glass-blur-strong)',
              bottom: 'var(--space-4)',
              left: 0,
            }}>
              <span className="floating-number" style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
              }}>91%</span>
              <div>
                <strong style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>Resolution rate</strong>
                <small style={{ marginTop: '2px', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>Across all hostels</small>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="workflow" aria-labelledby="workflow-title" style={{
          maxWidth: 'var(--content)',
          margin: '0 auto',
          padding: 'var(--space-16) var(--space-5)',
        }}>
          <div className="section-intro" style={{ maxWidth: '720px' }}>
            <p className="eyebrow" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-4)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              <span className="eyebrow-dot" aria-hidden="true" style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--accent)',
                flexShrink: 0,
              }}></span>
              THE WORKFLOW
            </p>
            <h2 id="workflow-title" style={{
              fontSize: 'clamp(38px, 8vw, 68px)',
              lineHeight: 'var(--leading-tight)',
              letterSpacing: '-0.035em',
              fontWeight: 600,
            }}>
              Four steps from <em>report to resolution.</em>
            </h2>
            <p style={{
              maxWidth: '580px',
              marginTop: 'var(--space-5)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-relaxed)',
            }}>
              Every complaint follows a clear, structured path so nothing falls through the cracks.
            </p>
          </div>

          <div className="workflow-visual" style={{
            marginTop: 'var(--space-6)',
            padding: 'var(--space-5)',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-xl)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
          }}>
            <div className="workflow-steps" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-5)',
              flexWrap: 'wrap',
            }}>
              <article className="workflow-step" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-2)',
                textAlign: 'center',
              }}>
                <div className="workflow-step-icon" aria-hidden="true" style={{
                  width: '52px',
                  height: '52px',
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-light)',
                  color: 'var(--accent)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                }}>📝</div>
                <span className="workflow-step-label" style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                }}>Report</span>
              </article>
              <span className="workflow-arrow" aria-hidden="true" style={{
                color: 'var(--text-muted)',
                fontSize: 'var(--text-2xl)',
                flexShrink: 0,
              }}>→</span>
              <article className="workflow-step" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-2)',
                textAlign: 'center',
              }}>
                <div className="workflow-step-icon" aria-hidden="true" style={{
                  width: '52px',
                  height: '52px',
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-light)',
                  color: 'var(--accent)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                }}>📋</div>
                <span className="workflow-step-label" style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                }}>Assign</span>
              </article>
              <span className="workflow-arrow" aria-hidden="true" style={{
                color: 'var(--text-muted)',
                fontSize: 'var(--text-2xl)',
                flexShrink: 0,
              }}>→</span>
              <article className="workflow-step" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-2)',
                textAlign: 'center',
              }}>
                <div className="workflow-step-icon" aria-hidden="true" style={{
                  width: '52px',
                  height: '52px',
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-light)',
                  color: 'var(--accent)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                }}>🔧</div>
                <span className="workflow-step-label" style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                }}>Resolve</span>
              </article>
              <span className="workflow-arrow" aria-hidden="true" style={{
                color: 'var(--text-muted)',
                fontSize: 'var(--text-2xl)',
                flexShrink: 0,
              }}>→</span>
              <article className="workflow-step" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-2)',
                textAlign: 'center',
              }}>
                <div className="workflow-step-icon" aria-hidden="true" style={{
                  width: '52px',
                  height: '52px',
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-light)',
                  color: 'var(--accent)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                }}>📊</div>
                <span className="workflow-step-label" style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                }}>Track</span>
              </article>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Platform highlights" style={{
          maxWidth: 'var(--content)',
          margin: '0 auto',
          padding: 'var(--space-5) var(--space-5)',
          display: 'grid',
          gap: 'var(--space-4)',
          color: 'var(--text-muted)',
          fontSize: 'var(--text-xs)',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          <span>BUILT FOR MODERN RESIDENCES</span>
          <div className="trust-items" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--space-3)',
            color: 'var(--text-primary)',
            fontSize: 'var(--text-sm)',
            letterSpacing: '-0.01em',
            fontWeight: 500,
          }}>
            <span>STUDENTS</span>
            <span>WARDENS</span>
            <span>MAINTENANCE</span>
          </div>
        </section>

        <section className="section" id="features" style={{
          maxWidth: 'var(--content)',
          margin: '0 auto',
          padding: 'var(--space-16) var(--space-5)',
        }}>
          <div className="section-intro" style={{ maxWidth: '720px' }}>
            <p className="eyebrow" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-4)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              <span className="eyebrow-dot" aria-hidden="true" style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--accent)',
                flexShrink: 0,
              }}></span>
              ONE PLATFORM
            </p>
            <h2 style={{
              fontSize: 'clamp(38px, 8vw, 68px)',
              lineHeight: 'var(--leading-tight)',
              letterSpacing: '-0.035em',
              fontWeight: 600,
            }}>
              Everything your hostel needs to stay <em>connected.</em>
            </h2>
            <p style={{
              maxWidth: '580px',
              marginTop: 'var(--space-5)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-relaxed)',
            }}>
              Simple workflows for reporting problems, managing residents, and keeping the entire hostel operation visible.
            </p>
          </div>

          <div className="feature-grid" style={{
            display: 'grid',
            gap: 'var(--space-4)',
            marginTop: 'var(--space-8)',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}>
            <article className="feature-card feature-card-large" style={{
              minHeight: '280px',
              padding: 'var(--space-6)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              background: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
            }}>
              <span className="feature-number" style={{
                position: 'absolute',
                top: 'var(--space-5)',
                right: 'var(--space-6)',
                color: 'var(--text-muted)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
              }}>01</span>
              <div className="feature-icon" style={{
                position: 'absolute',
                top: 'var(--space-5)',
                left: 'var(--space-5)',
                width: '48px',
                height: '48px',
                display: 'grid',
                placeItems: 'center',
                borderRadius: 'var(--radius-md)',
                color: 'var(--accent)',
                background: 'var(--accent-light)',
                fontSize: 'var(--text-2xl)',
                fontWeight: 500,
              }}>+</div>
              <h3 style={{
                maxWidth: '440px',
                fontSize: 'var(--text-3xl)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                fontWeight: 600,
              }}>Report problems in seconds.</h3>
              <p style={{
                maxWidth: '480px',
                marginTop: 'var(--space-3)',
                color: 'var(--text-secondary)',
                fontSize: 'var(--text-base)',
                lineHeight: 'var(--leading-relaxed)',
              }}>
                Students can submit categorized complaints with room details, priority, descriptions, and attachments.
              </p>
            </article>

            <article className="feature-card" style={{
              minHeight: '280px',
              padding: 'var(--space-6)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
            }}>
              <span className="feature-number" style={{
                position: 'absolute',
                top: 'var(--space-5)',
                right: 'var(--space-6)',
                color: 'var(--text-muted)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
              }}>02</span>
              <div className="feature-icon" style={{
                position: 'absolute',
                top: 'var(--space-5)',
                left: 'var(--space-5)',
                width: '48px',
                height: '48px',
                display: 'grid',
                placeItems: 'center',
                borderRadius: 'var(--radius-md)',
                color: 'var(--accent)',
                background: 'var(--accent-light)',
                fontSize: 'var(--text-2xl)',
                fontWeight: 500,
              }}>↗</div>
              <h3 style={{
                maxWidth: '440px',
                fontSize: 'var(--text-3xl)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                fontWeight: 600,
              }}>Track every resolution.</h3>
              <p style={{
                maxWidth: '480px',
                marginTop: 'var(--space-3)',
                color: 'var(--text-secondary)',
                fontSize: 'var(--text-base)',
                lineHeight: 'var(--leading-relaxed)',
              }}>
                A clear complaint timeline keeps everyone informed from submission to closure.
              </p>
            </article>

            <article className="feature-card" style={{
              minHeight: '280px',
              padding: 'var(--space-6)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
            }}>
              <span className="feature-number" style={{
                position: 'absolute',
                top: 'var(--space-5)',
                right: 'var(--space-6)',
                color: 'var(--text-muted)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
              }}>03</span>
              <div className="feature-icon" style={{
                position: 'absolute',
                top: 'var(--space-5)',
                left: 'var(--space-5)',
                width: '48px',
                height: '48px',
                display: 'grid',
                placeItems: 'center',
                borderRadius: 'var(--radius-md)',
                color: 'var(--accent)',
                background: 'var(--accent-light)',
                fontSize: 'var(--text-2xl)',
                fontWeight: 500,
              }}>◌</div>
              <h3 style={{
                maxWidth: '440px',
                fontSize: 'var(--text-3xl)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                fontWeight: 600,
              }}>See the bigger picture.</h3>
              <p style={{
                maxWidth: '480px',
                marginTop: 'var(--space-3)',
                color: 'var(--text-secondary)',
                fontSize: 'var(--text-base)',
                lineHeight: 'var(--leading-relaxed)',
              }}>
                Wardens get structured overviews of complaints, residents, hostels, and performance.
              </p>
            </article>
          </div>
        </section>

        <section className="roles-section section" id="roles" style={{
          maxWidth: 'var(--content)',
          margin: '0 auto',
          padding: 'var(--space-16) var(--space-5)',
          paddingTop: 'var(--space-4)',
        }}>
          <div className="section-intro" style={{ maxWidth: '720px' }}>
            <p className="eyebrow" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-4)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              <span className="eyebrow-dot" aria-hidden="true" style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--accent)',
                flexShrink: 0,
              }}></span>
              BUILT AROUND PEOPLE
            </p>
            <h2 style={{
              fontSize: 'clamp(38px, 8vw, 68px)',
              lineHeight: 'var(--leading-tight)',
              letterSpacing: '-0.035em',
              fontWeight: 600,
            }}>
              One system. <em>Two perspectives.</em>
            </h2>
          </div>

          <div className="role-grid" style={{
            display: 'grid',
            gap: 'var(--space-4)',
            marginTop: 'var(--space-8)',
            gridTemplateColumns: 'repeat(2, 1fr)',
            maxWidth: '720px',
            margin: 'var(--space-8) auto 0',
          }}>
            <article className="role-card" style={{
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              padding: 'var(--space-8)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--surface)',
            }}>
              <span className="role-index" style={{
                color: 'var(--text-muted)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
              }}>01</span>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{
                  fontSize: 'var(--text-4xl)',
                  lineHeight: 'var(--leading-tight)',
                  letterSpacing: '-0.03em',
                  fontWeight: 600,
                }}>Student</h3>
                <p style={{
                  marginTop: 'var(--space-4)',
                  color: 'var(--text-secondary)',
                  fontSize: 'var(--text-base)',
                  lineHeight: 'var(--leading-relaxed)',
                }}>
                  Report issues, follow progress, view announcements, and stay informed about your room and hostel.
                </p>
              </div>
            </article>

            <article className="role-card role-card-accent" style={{
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              padding: 'var(--space-8)',
              background: 'var(--accent)',
              color: 'var(--text-inverse)',
              borderColor: 'var(--accent)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
            }}>
              <span className="role-index" style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
              }}>02</span>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{
                  fontSize: 'var(--text-4xl)',
                  lineHeight: 'var(--leading-tight)',
                  letterSpacing: '-0.03em',
                  fontWeight: 600,
                }}>Warden</h3>
                <p style={{
                  marginTop: 'var(--space-4)',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: 'var(--text-base)',
                  lineHeight: 'var(--leading-relaxed)',
                }}>
                  Manage complaints, monitor rooms, view students, and keep your hostel running smoothly.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="cta-section section" id="about" style={{
          maxWidth: 'var(--content)',
          margin: '0 auto',
          minHeight: '400px',
          marginBottom: 'var(--space-16)',
          padding: 'var(--space-10) var(--space-8)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 'var(--space-8)',
          background: 'var(--text-primary)',
          color: 'var(--text-inverse)',
          borderRadius: 'var(--radius-2xl)',
        }}>
          <div>
            <p className="eyebrow" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-4)',
              color: 'rgba(255,255,255,0.45)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              <span className="eyebrow-dot" aria-hidden="true" style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--accent)',
                flexShrink: 0,
              }}></span>
              HOSTELHUB
            </p>
            <h2 style={{
              maxWidth: '780px',
              fontSize: 'clamp(42px, 8vw, 80px)',
              lineHeight: 'var(--leading-tight)',
              letterSpacing: '-0.04em',
              fontWeight: 600,
            }}>
              Make hostel management feel <em>simple.</em>
            </h2>
            <p style={{
              maxWidth: '520px',
              marginTop: 'var(--space-5)',
              color: 'rgba(255,255,255,0.6)',
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-relaxed)',
            }}>
              A focused frontend experience designed for a modern university residence.
            </p>
          </div>
          <Link 
            className="button button-secondary button-lg" 
            to="/role-selection/signup"
            style={{
              alignSelf: 'flex-start',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              padding: '0 var(--space-7)',
              height: '50px',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-base)',
              fontWeight: 600,
              letterSpacing: '0.01em',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              color: 'var(--text-primary)',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              boxShadow: 'var(--shadow-xs), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
          >
            Get Started
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </section>
      </main>

      <Footer variant="landing" />
    </div>
  );
}