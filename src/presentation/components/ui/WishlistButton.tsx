import { useAuth, useWishlist } from '../../hooks';
import styles from './WishlistButton.module.css';

interface WishlistButtonProps {
  experienceId: string;
  className?: string;
}

export const WishlistButton = ({ experienceId, className = '' }: WishlistButtonProps) => {
  const { isAuthenticated, signInWithGoogle } = useAuth();
  const { isInWishlist, toggleWishlist, isLoading } = useWishlist();
  
  const isWishlisted = isInWishlist(experienceId);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    
    if (!isAuthenticated) {
      // Redirect to Google login
      signInWithGoogle();
      return;
    }
    
    await toggleWishlist(experienceId);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`${styles.button} ${isWishlisted ? styles.active : ''} ${className}`}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      title={!isAuthenticated ? 'Sign in to save' : isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg
        className={styles.icon}
        fill={isWishlisted ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
};
