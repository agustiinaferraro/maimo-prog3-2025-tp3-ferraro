'use client'

import { useState, useEffect, useContext, createContext } from 'react';
const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // barra global
  const [searchTerm, setSearchTerm] = useState("");

  // filtro por especie
  const [speciesFilter, setSpeciesFilter] = useState("")

  useEffect(() => {
    console.log(favorites) 
  }, [favorites])

  const handleAddToFavorites = (title, image, id, type) => {
    setFavorites([...favorites, { title, image, id, type }])
  };

  const deleteToFavorites = (borrar) => {
    const newFavorites = favorites.filter(movie => movie.id !== borrar);
    setFavorites(newFavorites)
  };

  const favoritesQty = () => favorites.length

  return (
    <AppContext.Provider
      value={{
        favorites,
        handleAddToFavorites,
        deleteToFavorites, 
        favoritesQty,
        searchTerm,       
        setSearchTerm,
        speciesFilter,
        setSpeciesFilter
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('error')
  }
  return context;
}

export default AppContext