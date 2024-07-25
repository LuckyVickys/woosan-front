import React, { createContext, useState } from 'react';

export const PathContext = createContext();

export const PathProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('/');

  return (
    <PathContext.Provider value={{ currentPath, setCurrentPath }}>
      {children}
    </PathContext.Provider>
  );
};