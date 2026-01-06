import { Link } from 'react-router-dom';
import { Hero } from '../components/ui';
import { useNavigationStore } from '../../store';
import styles from './HomePage.module.css';

export const HomePage = () => {
  const { navigationItems } = useNavigationStore();

  const categories = [
    {
      id: 'travel-around',
      title: 'Travel Around',
      description: 'Explore the wonders of Cuzco',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80',
    },
    {
      id: 'stays',
      title: 'Stays',
      description: 'Find your perfect accommodation',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    },
    {
      id: 'transportation',
      title: 'Transportation',
      description: 'Get around with ease',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80',
    },
    {
      id: 'tours-activities',
      title: 'Tours & Activities',
      description: 'Unforgettable experiences await',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=80',
    },
    {
      id: 'eat-drink',
      title: 'Eat & Drink',
      description: 'Taste the flavors of Peru',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    },
    {
      id: 'flights',
      title: 'Book Flights',
      description: 'Find the best flight deals',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80',
    },
  ];

  return (
    <div className={styles.page}>
      <Hero
        title="Discover Cuzco"
        subtitle="Experience the heart of the Inca Empire. From ancient ruins to vibrant culture, your adventure starts here."
        backgroundImage="/hero-home.jpg"
      />

      {/* Categories Grid */}
      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>What would you like to explore?</h2>
            <p className={styles.sectionDescription}>
              From breathtaking landscapes to authentic culinary experiences, Cuzco has something for everyone.
            </p>
          </div>

          <div className={styles.categoriesGrid}>
            {categories.map((category) => {
              const navItem = navigationItems.find((item) => item.id === category.id);
              return (
                <Link
                  key={category.id}
                  to={navItem?.path || '/'}
                  className={styles.categoryCard}
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    className={styles.categoryImage}
                  />
                  <div className={styles.categoryOverlay} />
                  <div className={styles.categoryContent}>
                    <h3 className={styles.categoryTitle}>{category.title}</h3>
                    <p className={styles.categoryDescription}>{category.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Cuzco Section */}
      <section className={styles.whySection}>
        <div className={styles.whyContainer}>
          <div className={styles.whyHeader}>
            <h2 className={styles.whyTitle}>Why Cuzco?</h2>
          </div>

          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>
                <svg className={styles.whyIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className={styles.whyCardTitle}>Rich History</h3>
              <p className={styles.whyCardDescription}>Former capital of the Inca Empire with UNESCO World Heritage sites.</p>
            </div>

            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>
                <svg className={styles.whyIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={styles.whyCardTitle}>Natural Beauty</h3>
              <p className={styles.whyCardDescription}>Stunning Andean landscapes, from mountains to lush valleys.</p>
            </div>

            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>
                <svg className={styles.whyIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className={styles.whyCardTitle}>Unique Culture</h3>
              <p className={styles.whyCardDescription}>Vibrant traditions, gastronomy, and warm local hospitality.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
