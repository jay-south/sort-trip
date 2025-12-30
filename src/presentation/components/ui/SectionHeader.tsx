import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  title: string;
  description?: string;
}

export const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  return (
    <div className={styles.sectionHeader}>
      <h2 className={styles.title}>{title}</h2>
      {description && (
        <p className={styles.description}>{description}</p>
      )}
    </div>
  );
};
