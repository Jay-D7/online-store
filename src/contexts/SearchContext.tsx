import type { ReactNode } from 'react';
import { useState } from 'react';

import { SearchContext } from './SearchContextDefinition';

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState('');

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
