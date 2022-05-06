const { createContext, useState, useContext } = require('react');

const CategoriesContext = createContext({ categories: null });

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

const useCategories = () => useContext(CategoriesContext);

export { CategoriesProvider, useCategories };
