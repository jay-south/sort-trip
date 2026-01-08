import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          {/* Brand */}
          <div className={styles.footerBrand}>
            <div className={styles.footerLogoWrapper}>
              <Link to="/" className={styles.footerLogo}>
                <img 
                  src="/logo-sort.svg" 
                  alt="SortTrip Cuzco" 
                  className={styles.footerLogoImage}
                />
              </Link>
            </div>
            <p className={styles.footerDescription}>
              Your gateway to authentic Cuzco experiences. Discover the magic of the ancient Inca Empire.
            </p>
          </div>

          {/* Explore */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerSectionTitle}>Explore</h4>
            <ul className={styles.footerList}>
              <li><Link to="/travel-around" className={styles.footerLink}>Travel Around</Link></li>
              <li><Link to="/stays" className={styles.footerLink}>Stays</Link></li>
              <li><Link to="/tours-activities" className={styles.footerLink}>Tours & Activities</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerSectionTitle}>Services</h4>
            <ul className={styles.footerList}>
              <li><Link to="/transportation" className={styles.footerLink}>Transportation</Link></li>
              <li><Link to="/eat-drink" className={styles.footerLink}>Eat & Drink</Link></li>
              <li><Link to="/flights" className={styles.footerLink}>Book Flights</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerSectionTitle}>Contact</h4>
            <ul className={styles.footerList}>
              <li className={styles.footerText}>Cuzco, Peru</li>
              <li className={styles.footerText}>info@sorttrip.com</li>
            </ul>
          </div>
        </div>

        <div className={styles.footerDivider}>
          <p className={styles.footerCopyright}>
            &copy; {new Date().getFullYear()} SortTrip. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
