import React from 'react';
import Storage from '~/utils/storage';

const storage = new Storage();
export type TThemeName = 'light' | 'dark';
const defaultTheme = 'light';

export const useTheme = () => {
  const [theme, setTheme] = React.useState(defaultTheme);

  const changeTheme = (value: TThemeName) => {
    setTheme(value);
    storage.set('theme', value);
    document.body.className = value;
  };

  React.useEffect(() => {
    changeTheme(storage.get<TThemeName>('theme') ?? defaultTheme);
  }, []);

  return { theme, setTheme: changeTheme };
};
