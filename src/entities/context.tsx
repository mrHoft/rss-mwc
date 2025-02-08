import React, { createContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import useStorage from './useStorage';

interface ContextValue {
  query?: string;
  setSearch: (value?: string) => void;
  searchParams: Record<string, string>;
  setParams: (value?: Record<string, string>) => void;
}

export const Context = createContext<ContextValue>({
  query: '',
  setSearch: () => undefined,
  searchParams: {},
  setParams: () => undefined,
});

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const { setLastSearch, getLastSearch } = useStorage();
  const [query, setQuery] = useState<string | undefined>(URLSearchParams.get('search') || getLastSearch());
  const [searchParams, setSearchParams] = useState<Record<string, string>>({});

  const setSearch = (value?: string) => {
    setQuery(value);
    setLastSearch(value);
    navigate(value ? `/?search=${value}` : '/');
  };

  const setParams = (value?: Record<string, string>) => {
    setSearchParams(value ?? {});
    setURLSearchParams(value);
  };

  return <Context.Provider value={{ query, setSearch, searchParams, setParams }}>{children}</Context.Provider>;
}
