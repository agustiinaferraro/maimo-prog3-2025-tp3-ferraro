'use client'

import Link from "next/link"
import { useAppContext } from "@/app/context/AppContext"
import { useState, useEffect } from "react"
import axios from "axios"
import CharacterCard from "./CharacterCard" // para mostrar resultados de búsqueda

const BASE_URL = 'https://rickandmortyapi.com/api/'

const CharacterCardSingle = ({ character }) => {
  const { favorites, handleAddToFavorites, deleteToFavorites, searchTerm } = useAppContext()
  const [isFavorite, setIsFavorite] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  // controla favsss 
  useEffect(() => {
    const exists = favorites.some(fav => fav.id === character.id)
    setIsFavorite(exists)
  }, [favorites, character.id])

  // busca personajes cuando cambia searchTerm
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    axios.get(`${BASE_URL}character/?name=${searchTerm}`)
      .then(res => {
        setSearchResults(res.data.results)
        setLoading(false)
      })
      .catch(() => {
        setSearchResults([])
        setLoading(false)
      })
  }, [searchTerm])

  const handleFavoriteClick = () => {
    if (isFavorite) {
      deleteToFavorites(character.id)
    } else {
      handleAddToFavorites(character.name, character.image, character.id, "character")
    }
  }

  if (loading) return <p className="text-white text-center mt-10">Cargando resultados...</p>

  return (
    <div className="px-6 py-8">
      {searchTerm && searchResults.length > 0 ? (
        <>
          <h2 className="text-white text-3xl mb-6">Resultados para "{searchTerm}"</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {searchResults.map(char => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </div>
        </>
      ) : (
        <div className="relative max-w-4xl mx-auto p-6">
          <Link href="/">
            <button className="absolute left-0 text-7xl text-white hover:text-blue-500 active:text-blue-600 cursor-pointer">
              ‹
            </button>
          </Link>

          <div className="w-80 md:w-[600px] mx-auto bg-[#14b0c5] rounded-3xl flex flex-col md:flex-row gap-6 items-center p-6">
            <img
              src={character.image}
              alt={character.name}
              className="w-60 h-auto rounded-xl"
            />
            <div className="text-white text-lg space-y-2 flex-grow">
              <h2 className="text-3xl font-bold">{character.name}</h2>
              <p><span className="font-bold">Status:</span> {character.status}</p>
              <p><span className="font-bold">Species:</span> {character.species}</p>
              <p><span className="font-bold">Gender:</span> {character.gender}</p>
              <p><span className="font-bold">Origin:</span> {character.origin?.name}</p>
              <p><span className="font-bold">Location:</span> {character.location?.name}</p>
              <p><span className="font-bold">Total de episodios:</span> {character.episode?.length}</p>

              <button
                onClick={handleFavoriteClick}
                className={`mt-4 px-6 py-3 rounded-full text-white ${
                  isFavorite ? "⭐" : "☆"
                }`}
              >
                {isFavorite ? "⭐" : "☆"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CharacterCardSingle