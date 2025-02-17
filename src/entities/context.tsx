import React, { createContext, useState } from 'react';
import getSystemColorScheme from '~/utils/getSystemColorScheme';
import Storage from '~/utils/storage';

const storage = new Storage();

type Theme = 'light' | 'dark';

interface ContextValue {
  theme: Theme;
  setTheme: (value: Theme) => void;
}

export const Context = createContext<ContextValue>({
  theme: 'light',
  setTheme: () => undefined,
});

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(storage.get('theme') || getSystemColorScheme());

  const handleSetTheme = (value: Theme) => {
    storage.set('theme', value);
    setTheme(value);
  };

  return <Context.Provider value={{ theme, setTheme: handleSetTheme }}>{children}</Context.Provider>;
}
