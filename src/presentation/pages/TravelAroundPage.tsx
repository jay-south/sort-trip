import { useState } from 'react';
import { Hero } from '../components/ui';
import styles from './TravelAroundPage.module.css';

// Featured destinations for horizontal scroll (only the best ones)
const featuredDestinations = [
  {
    id: 'machu-picchu',
    name: 'Machu Picchu',
    description: 'Wonder of the World. Travel via Ollantaytambo to Aguas Calientes.',
    distance: '210 km',
    imageUrl: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80',
    tag: 'Must Visit',
  },
  {
    id: 'rainbow-mountain',
    name: 'Rainbow Mountain',
    description: 'The famous Vinicunca with its stunning natural colorful stripes.',
    distance: '100 km',
    imageUrl: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=800&q=80',
    tag: 'Trending',
  },
  {
    id: 'humantay',
    name: 'Laguna Humantay',
    description: 'Stunning turquoise glacial lake surrounded by snow-capped peaks.',
    distance: '120 km',
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
    tag: 'Nature',
  },
  {
    id: 'maras',
    name: 'Salt Mines of Maras',
    description: 'Pre-Inca salt mines with thousands of terraced pools.',
    distance: '51 km',
    imageUrl: 'https://images.unsplash.com/photo-1580974928064-f0aeef70895a?w=800&q=80',
    tag: 'Unique',
  },
];

// All distances for the accordion/table
const allDestinations = [
  { name: 'Plaza de Armas & Centro Historico', distance: 'City Center', category: 'city' },
  { name: 'Mercado Central de San Pedro', distance: 'City Center', category: 'city' },
  { name: 'Coricancha - Templo Dorado', distance: '1.7 km', category: 'city' },
  { name: 'Sacsayhuaman & Q\'enco', distance: '4 km', category: 'nearby' },
  { name: 'Puka Pukara', distance: '8.2 km', category: 'nearby' },
  { name: 'Tambomachay', distance: '11 km', category: 'nearby' },
  { name: 'Chinchero', distance: '30.2 km', category: 'sacred-valley' },
  { name: 'Maras Salt Mines', distance: '51 km', category: 'sacred-valley' },
  { name: 'Ollantaytambo', distance: '61 km', category: 'sacred-valley' },
  { name: 'Rainbow Mountain (Vinicunca)', distance: '100 km', category: 'day-trip' },
  { name: 'Laguna Humantay', distance: '120 km', category: 'day-trip' },
  { name: 'Choquequirao', distance: '175 km', category: 'adventure' },
  { name: 'Machu Picchu', distance: '210 km', category: 'day-trip' },
];

export const TravelAroundPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredDestinations = activeCategory === 'all' 
    ? allDestinations 
    : allDestinations.filter(d => d.category === activeCategory);

  return (
    <div className={styles.page}>
      <Hero
        title="Travel Around Cusco"
        subtitle="Explore the wonders of Cusco and its magical surroundings"
        backgroundImage="https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1920&q=80"
      />

      {/* Get to Cusco - Editorial Style */}
      <section className={styles.editorialSection}>
        <div className={styles.container}>
          <div className={styles.editorialGrid}>
            <div className={styles.editorialContent}>
              <span className={styles.eyebrow}>Getting There</span>
              <h2 className={styles.editorialTitle}>Fly into Cusco</h2>
              <p className={styles.editorialText}>
                Cusco's <strong>Alejandro Velasco Astete International Airport (CUZ)</strong> connects 
                you directly from Lima and other Peruvian cities. Choose from <strong>LATAM Airlines</strong> for 
                reliability or budget-friendly options like <strong>JetSmart</strong> and <strong>Sky Airlines</strong>.
              </p>
              <p className={styles.editorialText}>
                Once you land, skip the taxi hassle — call an <strong>Uber</strong> right from the terminal 
                or pre-arrange a hotel transfer. Trust us, avoid random street taxis.
              </p>
              <a
                href="https://www.google.com/travel/flights/search?tfs=CBwQAhooEgoyMDI1LTAxLTE1agwIAhIIL20vMDQ5N3lyDAgCEggvbS8wMTI0c0ABGigKCjIwMjUtMDEtMjJqDAgCEggvbS8wMTI0c3IMCAISCi9tLzA0OTd5QAFKAT4%3D"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButton}
              >
                <svg className={styles.ctaIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Search Flights to Cusco
              </a>
            </div>
            <div className={styles.editorialImage}>
              <img 
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80" 
                alt="Flight to Cusco"
              />
              <div className={styles.imageOverlay}>
                <span className={styles.overlayText}>Lima → Cusco</span>
                <span className={styles.overlaySubtext}>~1h 20min flight</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className={styles.mapSection}>
        <div className={styles.container}>
          <div className={styles.mapHeader}>
            <h2 className={styles.mapTitle}>Explore the Region</h2>
            <p className={styles.mapSubtitle}>All distances measured from Cusco city center</p>
          </div>
          <div className={styles.mapContainer}>
            {/* PLACEHOLDER: Replace with Wanderlog iframe */}
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapPlaceholderContent}>
                <svg className={styles.mapPlaceholderIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className={styles.mapPlaceholderText}>Interactive Map Coming Soon</p>
                <span className={styles.mapPlaceholderHint}>Wanderlog embed will go here</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations - Horizontal Scroll */}
      <section className={styles.featuredSection}>
        <div className={styles.containerWide}>
          <div className={styles.featuredHeader}>
            <h2 className={styles.featuredTitle}>Top Day Trips</h2>
            <p className={styles.featuredSubtitle}>The experiences you can't miss</p>
          </div>
          <div className={styles.horizontalScroll}>
            {featuredDestinations.map((dest) => (
              <article key={dest.id} className={styles.featuredCard}>
                <div className={styles.featuredImageWrapper}>
                  <img src={dest.imageUrl} alt={dest.name} className={styles.featuredImage} />
                  <span className={styles.featuredTag}>{dest.tag}</span>
                </div>
                <div className={styles.featuredContent}>
                  <h3 className={styles.featuredName}>{dest.name}</h3>
                  <p className={styles.featuredDescription}>{dest.description}</p>
                  <div className={styles.featuredMeta}>
                    <svg className={styles.featuredMetaIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>{dest.distance} from Cusco</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Distances Table with Filter */}
      <section className={styles.distancesSection}>
        <div className={styles.container}>
          <div className={styles.distancesHeader}>
            <h2 className={styles.distancesTitle}>All Destinations</h2>
            <div className={styles.filterTabs}>
              {[
                { id: 'all', label: 'All' },
                { id: 'city', label: 'City' },
                { id: 'nearby', label: 'Nearby' },
                { id: 'sacred-valley', label: 'Sacred Valley' },
                { id: 'day-trip', label: 'Day Trips' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`${styles.filterTab} ${activeCategory === tab.id ? styles.filterTabActive : ''}`}
                  onClick={() => setActiveCategory(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.distancesList}>
            {filteredDestinations.map((dest, index) => (
              <div key={dest.name} className={styles.distanceItem}>
                <span className={styles.distanceNumber}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.distanceName}>{dest.name}</span>
                <span className={styles.distanceLine} />
                <span className={styles.distanceValue}>{dest.distance}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cusco City - Simple List Style */}
      <section className={styles.citySection}>
        <div className={styles.container}>
          <div className={styles.cityGrid}>
            <div className={styles.cityContent}>
              <span className={styles.eyebrow}>Start Here</span>
              <h2 className={styles.cityTitle}>Cusco City</h2>
              <p className={styles.cityText}>
                Begin your adventure in the historic heart of the Inca Empire. The city itself is a 
                living museum with UNESCO World Heritage status.
              </p>
              <ul className={styles.cityList}>
                <li>
                  <strong>Plaza de Armas</strong> — The main square, surrounded by colonial arcades
                </li>
                <li>
                  <strong>Mercado San Pedro</strong> — Vibrant market with local food and crafts
                </li>
                <li>
                  <strong>Centro Historico</strong> — Cobblestone streets with Inca walls
                </li>
                <li>
                  <strong>Coricancha</strong> — The golden temple of the Incas (1.7 km)
                </li>
              </ul>
            </div>
            <div className={styles.cityImageStack}>
              <img 
                src="https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80" 
                alt="Plaza de Armas"
                className={styles.cityImageMain}
              />
              <img 
                src="https://images.unsplash.com/photo-1580974852861-c381510bc98a?w=400&q=80" 
                alt="Cusco streets"
                className={styles.cityImageSecondary}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Travel Tips - Compact */}
      <section className={styles.tipsSection}>
        <div className={styles.container}>
          <div className={styles.tipsWrapper}>
            <h3 className={styles.tipsTitle}>Quick Tips</h3>
            <div className={styles.tipsRow}>
              <div className={styles.tip}>
                <span className={styles.tipIcon}>🏔️</span>
                <span><strong>Altitude:</strong> 3,400m — take it easy day one</span>
              </div>
              <div className={styles.tip}>
                <span className={styles.tipIcon}>💧</span>
                <span><strong>Hydrate:</strong> Water + coca tea = your friends</span>
              </div>
              <div className={styles.tip}>
                <span className={styles.tipIcon}>🧥</span>
                <span><strong>Layers:</strong> Sunny days, cold nights</span>
              </div>
              <div className={styles.tip}>
                <span className={styles.tipIcon}>💵</span>
                <span><strong>Currency:</strong> Soles (PEN), USD accepted</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
