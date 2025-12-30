import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Hero, Card, SectionHeader } from '../components/ui';
import { getExperiencesByCategory } from '../../infrastructure/data/mock-experiences';
import type { ExperienceCategory } from '../../core/entities';
import styles from './CategoryPage.module.css';

const categoryConfig: Record<ExperienceCategory, { title: string; subtitle: string; image: string }> = {
  'travel-around': {
    title: 'Travel Around',
    subtitle: 'Explore the wonders of Cuzco and its magical surroundings',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1920&q=80',
  },
  stays: {
    title: 'Stays',
    subtitle: 'Find your perfect home away from home in the heart of Peru',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
  },
  transportation: {
    title: 'Transportation',
    subtitle: 'Travel comfortably between destinations with our trusted partners',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1920&q=80',
  },
  'tours-activities': {
    title: 'Tours & Activities',
    subtitle: 'Unforgettable experiences that will stay with you forever',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1920&q=80',
  },
  'eat-drink': {
    title: 'Eat & Drink',
    subtitle: 'Savor the incredible flavors of Peruvian cuisine',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80',
  },
  flights: {
    title: 'Book Flights',
    subtitle: 'Find the best deals for your journey to Cuzco',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80',
  },
};

export const CategoryPage = () => {
  const { category } = useParams<{ category: ExperienceCategory }>();

  const config = categoryConfig[category as ExperienceCategory] || {
    title: 'Explore',
    subtitle: 'Discover amazing experiences in Cuzco',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1920&q=80',
  };

  const experiences = useMemo(() => {
    return getExperiencesByCategory(category || '');
  }, [category]);

  return (
    <div className={styles.page}>
      <Hero title={config.title} subtitle={config.subtitle} backgroundImage={config.image} />

      <section className={styles.section}>
        <div className={styles.sectionContainer}>
          <SectionHeader
            title={`${experiences.length} options available`}
            description="Browse our curated selection and find the perfect experience for you."
          />

          {experiences.length > 0 ? (
            <div className={styles.grid}>
              {experiences.map((experience) => (
                <Card key={experience.id} experience={experience} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyStateText}>No experiences available in this category yet.</p>
              <p className={styles.emptyStateSubtext}>Check back soon for updates!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
