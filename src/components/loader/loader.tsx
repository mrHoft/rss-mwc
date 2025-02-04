import React from 'react';

import styles from './loader.module.css';

export default class Loader extends React.Component {
  render() {
    return (
      <div className={styles.loader}>
        <div className={styles.loader__spinner} />
      </div>
    );
  }
}
