import React, { createContext, useState } from 'react';

type Theme = 'light' | 'dark';

interface ContextValue {
  theme: Theme;
  setTheme: (value: Theme) => void;
}

export const Context = createContext<ContextValue>({
  theme: 'dark',
  setTheme: () => undefined,
});

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  return <Context.Provider value={{ theme, setTheme }}>{children}</Context.Provider>;
}
