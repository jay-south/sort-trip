import styles from './Hero.module.css';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

export const Hero = ({ title, subtitle, backgroundImage }: HeroProps) => {
  return (
    <section className={styles.hero}>
      {/* Background Image */}
      {backgroundImage && (
        <div
          className={styles.heroBackground}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      {/* Overlay */}
      <div className={styles.heroOverlay} />

      {/* Content */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroSubtitle}>{subtitle}</p>

        {/* Search bar */}
        <div className={styles.searchContainer}>
          <div className={styles.searchBar}>
            <div className={styles.searchInputWrapper}>
              <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="What are you looking for?"
                className={styles.searchInput}
              />
            </div>
            <button className={styles.searchButton}>Search</button>
          </div>
        </div>
      </div>
    </section>
  );
};
