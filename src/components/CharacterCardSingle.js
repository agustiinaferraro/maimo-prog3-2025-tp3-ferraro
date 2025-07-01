'use client'

import Link from "next/link"
import { useAppContext } from "@/app/context/AppContext"
import { useState, useEffect } from "react"
import axios from "axios"
import CharacterCard from "./CharacterCard"
import Loading from "./Loading"

const BASE_URL = 'https://rickandmortyapi.com/api/'

const CharacterCardSingle = ({ character }) => {
  const { favorites, handleAddToFavorites, deleteToFavorites, searchTerm } = useAppContext()
  const [isFavorite, setIsFavorite] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  // Chequea si es favorito
  useEffect(() => {
    const exists = favorites.some(fav => fav.id === character.id)
    setIsFavorite(exists)
  }, [favorites, character.id])

  // muestra loading al entrar directo al personaje
  useEffect(() => {
    if (!searchTerm) {
      setLoading(true)
      const timeout = setTimeout(() => setLoading(false), 500)
      return () => clearTimeout(timeout)
    }
  }, [searchTerm])

  // Buscar personajes cuando cambia searchTerm
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([])
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
    isFavorite
      ? deleteToFavorites(character.id)
      : handleAddToFavorites(character.name, character.image, character.id, "character")
  }

  if (loading) return <Loading />

  return (
    <div className="px-6 py-8 relative max-w-4xl mx-auto md:p-10">
      <Link href="/">
        <button className="text-7xl text-white hover:text-blue-500 active:text-blue-600 cursor-pointer mb-6">
          ‹
        </button>
      </Link>

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
        <div className="bg-[#0b0c10]/50 backdrop-blur-md rounded-2xl p-5 w-full max-w-full mx-auto flex flex-col md:flex-row h-full transform transition duration-300 hover:scale-105 shadow-5xl gap-6">
          {/* imagen */}
          <img
            src={character.image}
            alt={character.name}
            className="w-full max-w-[240px] md:max-w-[300px] h-auto rounded-xl mx-auto md:mx-0"
          />

          {/* texto */}
          <div className="text-white text-lg space-y-2 flex-grow">
            <h2 className="text-3xl font-bold">{character.name}</h2>
            <p className="text-[#8B5CF6]"><span className="font-bold text-[#E0E0E0]">Status:</span> {character.status}</p>
            <p className="text-[#30EFFF]"><span className="font-bold text-[#E0E0E0]">Species:</span> {character.species}</p>
            <p className="text-[#F6F930]"><span className="font-bold text-[#E0E0E0]">Gender:</span> {character.gender}</p>
            <p className="text-[#00FF9F]"><span className="font-bold text-[#E0E0E0]">Origin:</span> {character.origin?.name}</p>
            <p className="text-[#FF61A6]"><span className="font-bold text-[#E0E0E0]">Location:</span> {character.location?.name}</p>
            <p className="text-[#00CC80]"><span className="font-bold text-[#E0E0E0]">Total de episodios:</span> {character.episode?.length}</p>

            <button
              onClick={(e) => {
                e.preventDefault()
                handleFavoriteClick()
              }}
              className="flex items-center justify-center gap-2 text-yellow-400 hover:text-yellow-500 text-3xl cursor-pointer select-none mt-4"
              aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
              title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              {isFavorite ? "⭐" : "☆"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CharacterCardSingle