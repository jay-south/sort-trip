import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserMenu } from '../ui';
import styles from './Header.module.css';

// Navigation structure with dropdowns
const navigationStructure = [
  {
    id: 'travel-around',
    label: 'Travel around',
    path: '/travel-around',
    submenu: [
      { label: 'Places to visit', path: '/travel-around' },
      { label: 'Tours & Activities', path: '/tours-activities' },
    ],
  },
  {
    id: 'transportation',
    label: 'Transportation',
    path: '/transportation',
    submenu: [
      { label: 'To Cusco', path: '#', isModal: true },
      { label: 'To Machu Pichu', path: '/transportation' },
    ],
  },
  {
    id: 'stays',
    label: 'Stays',
    path: '/stays',
    submenu: [
      { label: 'Booking', path: '/stays' },
      { label: 'Airbnb', path: '/stays' },
      { label: 'Hosteltheworld', path: '/stays' },
    ],
  },
  {
    id: 'tours-activities',
    label: 'Tours & Activities',
    path: '/tours-activities',
    submenu: [
      { label: 'See tours options', path: '/tours-activities' },
    ],
  },
  {
    id: 'eat-drink',
    label: 'Eat & Drink',
    path: '/eat-drink',
    submenu: [
      { label: 'Where to eat', path: '/eat-drink' },
      { label: 'Where to drink', path: '/eat-drink' },
    ],
  },
];

export const Header = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'flights' | 'weather' | 'machu'>('flights');
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Detect scroll to add background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const ref = dropdownRefs.current[openDropdown];
        if (ref && !ref.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
        <div className={styles.headerContainer}>
          <div className={styles.headerInner}>
            {/* Logo */}
            <Link to="/" className={styles.logo}>
              <img 
                src="/logos/logo.svg" 
                alt="SortTrip Cuzco" 
                className={styles.logoImage}
              />
            </Link>

          {/* Navigation */}
          <nav className={styles.nav}>
            {navigationStructure.map((item) => {
              const isActive = location.pathname === item.path || 
                item.submenu.some(sub => sub.path === location.pathname);
              const isOpen = openDropdown === item.id;

              const handleMainClick = (e: React.MouseEvent) => {
                if (item.submenu.length > 0) {
                  e.preventDefault();
                  setOpenDropdown(isOpen ? null : item.id);
                }
              };

              const handleSubmenuClick = (subItem: typeof item.submenu[0]) => {
                if (subItem.isModal) {
                  setIsModalOpen(true);
                  setOpenDropdown(null);
                } else {
                  setOpenDropdown(null);
                }
              };

              return (
                <div
                  key={item.id}
                  className={styles.navItem}
                  ref={(el) => {
                    dropdownRefs.current[item.id] = el;
                  }}
                >
                  <Link
                    to={item.path}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                    onClick={handleMainClick}
                  >
                    {item.label}
                    {item.submenu.length > 0 && (
                      <svg
                        className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {isOpen && item.submenu.length > 0 && (
                    <div className={styles.dropdown}>
                      {item.submenu.map((subItem, index) => {
                        if (subItem.isModal) {
                          return (
                            <button
                              key={index}
                              className={styles.dropdownItem}
                              onClick={() => handleSubmenuClick(subItem)}
                            >
                              {subItem.label}
                            </button>
                          );
                        }
                        return (
                          <Link
                            key={index}
                            to={subItem.path}
                            className={styles.dropdownItem}
                            onClick={() => handleSubmenuClick(subItem)}
                          >
                            {subItem.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* User Menu & Mobile menu */}
          <div className={styles.headerActions}>
            <UserMenu />
              
              {/* Mobile menu button */}
              <button className={styles.mobileMenuButton}>
                <svg
                  className={styles.mobileMenuIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Get to Cusco Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Get to Cusco</h2>
              <button className={styles.modalClose} onClick={() => setIsModalOpen(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className={styles.modalTabs}>
              <button 
                className={`${styles.modalTab} ${activeTab === 'flights' ? styles.modalTabActive : ''}`}
                onClick={() => setActiveTab('flights')}
              >
                Flights
              </button>
              <button 
                className={`${styles.modalTab} ${activeTab === 'weather' ? styles.modalTabActive : ''}`}
                onClick={() => setActiveTab('weather')}
              >
                Best Time to Visit
              </button>
              <button 
                className={`${styles.modalTab} ${activeTab === 'machu' ? styles.modalTabActive : ''}`}
                onClick={() => setActiveTab('machu')}
              >
                Get to Machu Picchu
              </button>
            </div>

            {/* Modal Content */}
            <div className={styles.modalContent}>
              {/* Flights Tab */}
              {activeTab === 'flights' && (
                <div className={styles.modalSection}>
                  <div className={styles.modalSectionHeader}>
                    <span className={styles.modalEyebrow}>International Airport</span>
                    <h3>Alejandro Velasco Astete (CUZ)</h3>
                  </div>
                  
                  <p className={styles.modalText}>
                    Cusco has an international airport with direct flights from Lima and other Peruvian cities.
                  </p>

                  <div className={styles.modalHighlight}>
                    <h4>Airlines</h4>
                    <div className={styles.modalTags}>
                      <span className={styles.modalTag}>LATAM Airlines</span>
                      <span className={styles.modalTag}>JetSmart</span>
                      <span className={styles.modalTag}>Sky Airlines</span>
                    </div>
                  </div>

                  <div className={styles.modalTip}>
                    <span className={styles.modalTipIcon}>💡</span>
                    <p>Call an <strong>Uber</strong> as soon as you step out of the airport, or pre-arrange a hotel transfer. Avoid picking up random taxis off the street.</p>
                  </div>

                  <a 
                    href="https://www.google.com/travel/flights/search?tfs=CBwQAhooEgoyMDI1LTAxLTE1agwIAhIIL20vMDQ5N3lyDAgCEggvbS8wMTI0c0ABGigKCjIwMjUtMDEtMjJqDAgCEggvbS8wMTI0c3IMCAISCi9tLzA0OTd5QAFKAT4%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modalCTA}
                  >
                    Search Flights to Cusco →
                  </a>
                </div>
              )}

              {/* Weather Tab */}
              {activeTab === 'weather' && (
                <div className={styles.modalSection}>
                  <div className={styles.modalSectionHeader}>
                    <span className={styles.modalEyebrow}>When to go</span>
                    <h3>Best Times to Visit</h3>
                  </div>

                  <div className={styles.modalGrid}>
                    <div className={styles.modalCard}>
                      <span className={styles.modalCardLabel}>Best Weather</span>
                      <h4>May – September</h4>
                      <p>Dry season with predictable weather, easier travel logistics, and attractions operating without interruption.</p>
                    </div>

                    <div className={styles.modalCard}>
                      <span className={styles.modalCardLabel}>Fewer Crowds</span>
                      <h4>April, October, November</h4>
                      <p>Shoulder season offers better prices without sacrificing weather quality.</p>
                    </div>

                    <div className={styles.modalCard}>
                      <span className={styles.modalCardLabel}>Best for Budget</span>
                      <h4>November – March</h4>
                      <p>Rainy season with lower prices. Many hotels and tours offer discounts. Note: Some attractions close in February.</p>
                    </div>

                    <div className={styles.modalCard}>
                      <span className={styles.modalCardLabel}>Outdoor Activities</span>
                      <h4>April – October</h4>
                      <p>Best for hiking Machu Picchu, Rainbow Mountain, and Sacred Valley. Lower chance of rain, cooler temperatures.</p>
                    </div>
                  </div>

                  <div className={styles.modalWeather}>
                    <h4>Current Weather</h4>
                    <p className={styles.modalWeatherNote}>Check real-time conditions before your trip</p>
                    <a 
                      href="https://www.accuweather.com/en/pe/cusco/259008/weather-forecast/259008"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.modalWeatherLink}
                    >
                      View on AccuWeather →
                    </a>
                  </div>
                </div>
              )}

              {/* Machu Picchu Tab */}
              {activeTab === 'machu' && (
                <div className={styles.modalSection}>
                  <div className={styles.modalSectionHeader}>
                    <span className={styles.modalEyebrow}>From Cusco</span>
                    <h3>Get to Machu Picchu</h3>
                  </div>

                  <p className={styles.modalText}>
                    There are 3 main ways to get from Cusco to Machu Picchu. The easiest is by train. There is no direct public bus — only shuttles run between Aguas Calientes and the citadel gate.
                  </p>

                  <div className={styles.modalOptions}>
                    <div className={styles.modalOption}>
                      <div className={styles.modalOptionHeader}>
                        <span className={styles.modalOptionNumber}>01</span>
                        <div>
                          <h4>By Train</h4>
                          <span className={styles.modalOptionTag}>Easiest</span>
                        </div>
                      </div>
                      <p>From Cusco or Sacred Valley. Two operators: <strong>Inca Rail</strong> and <strong>PeruRail</strong>. Multiple service levels from budget to luxury.</p>
                      <Link 
                        to="/transportation" 
                        className={styles.modalOptionLink}
                        onClick={() => setIsModalOpen(false)}
                      >
                        View Train Options →
                      </Link>
                    </div>

                    <div className={styles.modalOption}>
                      <div className={styles.modalOptionHeader}>
                        <span className={styles.modalOptionNumber}>02</span>
                        <div>
                          <h4>Inca Trail Hike</h4>
                          <span className={styles.modalOptionTag}>Adventure</span>
                        </div>
                      </div>
                      <p>A 4-day or 2-day hiking journey. The most challenging but rewarding option. Requires permits booked months in advance.</p>
                    </div>

                    <div className={styles.modalOption}>
                      <div className={styles.modalOptionHeader}>
                        <span className={styles.modalOptionNumber}>03</span>
                        <div>
                          <h4>Bus + Walk via Hidroeléctrica</h4>
                          <span className={styles.modalOptionTag}>Budget</span>
                        </div>
                      </div>
                      <p>Take a bus to Hidroeléctrica, then walk along the train tracks to Aguas Calientes. The cheapest option but takes longer.</p>
                    </div>
                  </div>

                  <div className={styles.modalTip}>
                    <span className={styles.modalTipIcon}>⚠️</span>
                    <p>Secure train tickets and Machu Picchu entrance tickets <strong>weeks or months in advance</strong>, especially during peak season (May-October).</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
