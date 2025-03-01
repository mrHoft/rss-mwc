import React from 'react';

import styles from './footer.module.css';

const rssLogoSrc = '/images/rss.svg';
const avatarSrc = '/images/avatar_hex.png';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__author}>
        <span>© 2025 </span>
        <img height={24} src={avatarSrc} alt="avatar" />
        <a href="https://github.com/mrHoft">
          <span> mrHoft</span>
        </a>
      </div>
      <a href="https://rs.school/">
        <img className={styles.footer__rss_logo} src={rssLogoSrc} alt="rss" />
      </a>
    </footer>
  );
}
