import React from 'react';
import { Outlet } from 'react-router';
import CharactersList from '~/pages/characterList/List';

import styles from './page.module.css';

const PageHome: React.FC = () => (
  <>
    <CharactersList />
    <section className={styles.selection} aria-label="selection">
      <Outlet />
    </section>
  </>
);

export default PageHome;
