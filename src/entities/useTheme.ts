'use client';

import React from 'react';
import Storage from '~/utils/storage';

const storage = new Storage();
export type TThemeName = 'light' | 'dark';
const defaultTheme = 'light';

export const useTheme = () => {
  const [theme, setThemeName] = React.useState(defaultTheme);

  const setTheme = (value: TThemeName) => {
    setThemeName(value);
    storage.set('theme', value);
    document.body.className = value;
  };

  React.useEffect(() => {
    setTheme(storage.get<TThemeName>('theme') ?? defaultTheme);
  }, []);

  return { theme, setTheme };
};
