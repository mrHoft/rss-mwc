import React from 'react';
import Search from '../search/Search';
import ThemeSwitcher from '../theme/Theme';

import styles from './header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <img height="100" src="/images/logo.png" alt="logo" />
        <h3>Characters</h3>
      </div>
      <div className={styles.header__right}>
        <Search />
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
