import { Navigate } from 'react-router-dom';
import { useAuth, useWishlist } from '../hooks';
import { Card } from '../components/ui';
import styles from './ProfilePage.module.css';

// Category icons mapping
const categoryIcons: Record<string, string> = {
  'travel-around': 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  'stays': 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  'transportation': 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
  'tours-activities': 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z',
  'eat-drink': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  'flights': 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
};

export const ProfilePage = () => {
  const { isAuthenticated, isInitialized, profile, user, signOut, isLoading: authLoading } = useAuth();
  const { folders, isLoading: wishlistLoading, totalItems } = useWishlist();

  // Show loading while auth is initializing
  if (!isInitialized) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect to home if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const displayName = profile?.fullName || user?.email?.split('@')[0] || 'User';
  const avatarUrl = profile?.avatarUrl || null;

  return (
    <div className={styles.container}>
      {/* Profile Header */}
      <div className={styles.header}>
        <div className={styles.profileInfo}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={displayName} className={styles.avatar} />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className={styles.userDetails}>
            <h1 className={styles.userName}>{displayName}</h1>
            <p className={styles.userEmail}>{user?.email}</p>
            <p className={styles.stats}>
              <span className={styles.statNumber}>{totalItems}</span> saved items in{' '}
              <span className={styles.statNumber}>{folders.length}</span> categories
            </p>
          </div>
        </div>
        <button onClick={signOut} disabled={authLoading} className={styles.signOutButton}>
          Sign out
        </button>
      </div>

      {/* Wishlist Content */}
      <div className={styles.content}>
        <h2 className={styles.sectionTitle}>My Wishlist</h2>

        {wishlistLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner} />
          </div>
        ) : folders.length === 0 ? (
          <div className={styles.emptyState}>
            <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h3 className={styles.emptyTitle}>Your wishlist is empty</h3>
            <p className={styles.emptyText}>
              Start exploring and save your favorite experiences by clicking the heart icon!
            </p>
          </div>
        ) : (
          <div className={styles.foldersContainer}>
            {folders.map((folder) => (
              <div key={folder.categorySlug} className={styles.folder}>
                <div className={styles.folderHeader}>
                  <div className={styles.folderIcon}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={categoryIcons[folder.categorySlug] || categoryIcons['travel-around']}
                      />
                    </svg>
                  </div>
                  <div className={styles.folderInfo}>
                    <h3 className={styles.folderName}>{folder.categoryName}</h3>
                    <span className={styles.folderCount}>
                      {folder.items.length} {folder.items.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                </div>

                <div className={styles.cardsGrid}>
                  {folder.items.map((item) => (
                    <Card
                      key={item.wishlistItemId}
                      experience={{
                        id: item.experienceId,
                        title: item.title,
                        description: item.description,
                        price: item.price,
                        currency: item.currency,
                        imageUrl: item.imageUrl,
                        rating: item.rating,
                        reviewCount: item.reviewCount,
                        location: item.location,
                        category: folder.categorySlug,
                        isFeatured: false,
                        isActive: true,
                        createdAt: '',
                        updatedAt: '',
                      }}
                      showWishlistButton={true}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
