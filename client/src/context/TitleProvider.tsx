import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Create the context with a default value
const TitleContext = createContext<{ title: string; setTitle: React.Dispatch<React.SetStateAction<string>> }>({
  title: 'Default Title',
  setTitle: () => {},
});

export const TitleProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState('Default Title');

  // Update the document title whenever the state changes
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};

// Custom hook to use the TitleContext
export const useTitle = () => {
  return useContext(TitleContext);
};
