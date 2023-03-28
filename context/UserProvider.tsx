import { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
export const useTheme = () => useContext(ThemeContext);
