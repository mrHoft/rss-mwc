import React, { createContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import useStorage from './useStorage';

interface ContextValue {
  query?: string;
  setSearch: (value?: string) => void;
}

export const Context = createContext<ContextValue>({ query: '', setSearch: () => undefined });

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { initialStoredSearch, setLastSearch } = useStorage();
  const [query, setQuery] = useState<string | undefined>(searchParams.get('search') ?? initialStoredSearch);

  const setSearch = (value?: string) => {
    setQuery(value);
    setLastSearch(value);
    navigate(value ? `/?search=${value}` : '/');
  };

  return <Context.Provider value={{ query, setSearch }}>{children}</Context.Provider>;
}
