import type { Experience } from '../../../core/entities';
import { WishlistButton } from './WishlistButton';
import styles from './Card.module.css';

interface CardProps {
  experience: Experience;
  onClick?: () => void;
  showWishlistButton?: boolean;
}

export const Card = ({ experience, onClick, showWishlistButton = true }: CardProps) => {
  return (
    <article onClick={onClick} className={styles.card}>
      {/* Image */}
      <div className={styles.imageContainer}>
        <img
          src={experience.imageUrl}
          alt={experience.title}
          className={styles.cardImage}
        />
        {showWishlistButton && (
          <WishlistButton
            experienceId={experience.id}
            className={styles.wishlistButton}
          />
        )}
        <div className={styles.priceBadge}>
          <span className={styles.priceText}>
            {experience.currency} {experience.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.location}>
          <svg className={styles.locationIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{experience.location}</span>
        </div>

        <h3 className={styles.title}>{experience.title}</h3>

        <p className={styles.description}>{experience.description}</p>

        {/* Rating */}
        <div className={styles.ratingContainer}>
          <div className={styles.rating}>
            <svg className={styles.starIcon} fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className={styles.ratingValue}>{experience.rating}</span>
          </div>
          <span className={styles.reviewCount}>({experience.reviewCount} reviews)</span>
        </div>
      </div>
    </article>
  );
};
