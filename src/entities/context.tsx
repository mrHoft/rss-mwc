import React, { createContext, useState } from 'react';
import useStorage from './useStorage';

interface ContextValue {
  query?: string;
  setSearch: (value?: string) => void;
}

export const Context = createContext<ContextValue>({ query: '', setSearch: () => undefined });

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const { initialStoredSearch, setLastSearch } = useStorage();
  const [query, setQuery] = useState<string | undefined>(initialStoredSearch);

  const setSearch = (value?: string) => {
    setQuery(value);
    setLastSearch(value);
  };

  return <Context.Provider value={{ query, setSearch }}>{children}</Context.Provider>;
}
