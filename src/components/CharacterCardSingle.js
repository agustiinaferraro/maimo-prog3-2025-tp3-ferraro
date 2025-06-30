'use client'

import Link from "next/link"
import { useAppContext } from "@/app/context/AppContext"

const CharacterCardSingle = ({ character }) => {
  const { favorites, handleAddToFavorites, deleteToFavorites } = useAppContext()

  const isFavorite = favorites.some(fav => fav.id === character.id)

  return (
    <div className="relative max-w-4xl mx-auto p-6">
      <Link href="/">
        <button className="absolute left-0 text-7xl text-white hover:text-blue-500 active:text-blue-600 cursor-pointer">
          ‹
        </button>
      </Link>

      <div className="w-80 md:w-[600px] mx-auto bg-[#14b0c5] rounded-3xl flex flex-col md:flex-row gap-6 items-center p-6 relative">
        <img
          src={character.image}
          alt={character.name}
          className="w-60 h-auto rounded-xl"
        />

        <div className="text-white text-lg space-y-2 flex-1">
          <h2 className="text-3xl font-bold">{character.name}</h2>
          <p><span className="font-bold">Status:</span> {character.status}</p>
          <p><span className="font-bold">Species:</span> {character.species}</p>
          <p><span className="font-bold">Gender:</span> {character.gender}</p>
          <p><span className="font-bold">Origin:</span> {character.origin?.name}</p>
          <p><span className="font-bold">Location:</span> {character.location?.name}</p>
          <p><span className="font-bold">Total de episodios:</span> {character.episode?.length}</p>
        </div>

        <button
          onClick={() => {
            if (isFavorite) {
              deleteToFavorites(character.id)
            } else {
              handleAddToFavorites(character.name, character.image, character.id, "character")
            }
          }}
          className="absolute top-4 right-4 text-4xl text-yellow-400 hover:text-yellow-500 cursor-pointer select-none"
          aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFavorite ? "⭐" : "☆"}
        </button>
      </div>
    </div>
  )
}

export default CharacterCardSingle
