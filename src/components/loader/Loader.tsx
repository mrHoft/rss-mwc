import React from 'react';

import styles from './loader.module.css';

const Loader: React.FC<{ flat?: boolean }> = ({ flat }) => {
  return flat ? (
    <div className={styles.loader__spinner} style={{ zIndex: 100 }} data-testid="loader" />
  ) : (
    <div className={styles.loader}>
      <div className={styles.loader__spinner} />
    </div>
  );
};

export default Loader;
