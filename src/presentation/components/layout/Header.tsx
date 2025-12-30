import { Link, useLocation } from 'react-router-dom';
import { useNavigationStore } from '../../../store';
import { UserMenu } from '../ui';
import styles from './Header.module.css';

export const Header = () => {
  const { navigationItems } = useNavigationStore();
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerInner}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <span className={styles.logoText}>
              Sort<span className={styles.logoAccent}>Trip</span>
            </span>
            <span className={styles.logoLocation}>Cuzco</span>
          </Link>

          {/* Navigation */}
          <nav className={styles.nav}>
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                >
                  {item.label}
                </Link>
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
  );
};
