import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks';
import styles from './UserMenu.module.css';

interface UserMenuProps {
  isScrolled?: boolean;
}

export const UserMenu = ({ isScrolled = false }: UserMenuProps) => {
  const { isAuthenticated, profile, user, signInWithGoogle, signOut, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Not authenticated - show login button
  if (!isAuthenticated) {
    return (
      <button
        onClick={signInWithGoogle}
        disabled={isLoading}
        className={`${styles.loginButton} ${!isScrolled ? styles.loginButtonTransparent : ''}`}
      >
        {isLoading ? (
          <span className={styles.spinner} />
        ) : (
          <>
            <svg className={styles.googleIcon} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in
          </>
        )}
      </button>
    );
  }

  // Authenticated - show user menu
  const displayName = profile?.fullName || user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  // Try multiple sources for avatar: profile DB, user metadata from Google
  const avatarUrl = profile?.avatarUrl || user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;

  return (
    <div className={styles.container} ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.avatarButton} ${!isScrolled ? styles.avatarButtonTransparent : ''}`}
        aria-label="User menu"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={displayName} className={styles.avatar} />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{displayName}</span>
            <span className={styles.userEmail}>{user?.email}</span>
          </div>
          
          <div className={styles.divider} />
          
          <Link
            to="/profile"
            className={styles.menuItem}
            onClick={() => setIsOpen(false)}
          >
            <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            My Wishlist
          </Link>
          
          <div className={styles.divider} />
          
          <button
            onClick={() => {
              signOut();
              setIsOpen(false);
            }}
            className={styles.menuItem}
          >
            <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};
