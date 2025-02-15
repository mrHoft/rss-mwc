import React from 'react';
import { Context } from '~/entities/context';

import styles from './theme.module.css';

export default function ThemeSwitcher() {
  const { theme, setTheme } = React.useContext(Context);

  const handleChange = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div className={styles.theme}>
      <input className={styles.theme__switcher} type="checkbox" checked={theme === 'dark'} onChange={handleChange} />
    </div>
  );
}
