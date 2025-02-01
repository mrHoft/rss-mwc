import React from 'react';

import styles from './header.module.css';

export default class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <img height="100" src="/images/logo.png" alt="logo" />
        <h3>Characters</h3>
      </header>
    );
  }
}
