import React from 'react';

import styles from './loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__spinner} />
    </div>
  );
};

export default Loader;
