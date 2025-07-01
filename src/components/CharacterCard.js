'use client'

import Image from "next/image"
import Link from "next/link"
import { useAppContext } from "@/app/context/AppContext"

const CharacterCard = ({ character }) => {
  const { favorites, handleAddToFavorites, deleteToFavorites } = useAppContext()
  const isFavorite = favorites.some(fav => fav.id === character.id)

  return (
  <article className="bg-[#0b0c10]/50 backdrop-blur-md rounded-2xl p-5 w-full max-w-sm mx-auto flex flex-col h-full transform transition duration-300 hover:scale-105 shadow-2xl">
      <div className="mb-2 mx-auto">
        <Image
          className="rounded-t-2xl" 
          src={character.image}
          width={400}
          height={300}
          alt={character.name}
        />
      </div>
      <h2 className="text-2xl mb-2 text-[#E0E0E0]">{character.name}</h2>
      <p className="text-[#8B5CF6]">{character.status}</p>
      <p className="text-[#bcbcbc] py-3 mb-2">{character.origin.name}</p>

      {/* Espaciador que empuja los botones hacia abajo */}
      <div className="flex-grow" />

      <Link
        className="bg-[#00CC80] flex justify-center rounded-2xl p-4 hover:bg-[#00FF9F] cursor-pointer mb-3"
        href={`character/${character.id}`}
      >
        View more
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault()
          if (isFavorite) {
            deleteToFavorites(character.id)
          } else {
            handleAddToFavorites(character.name, character.image, character.id, "character")
          }
        }}
        className="flex items-center justify-center gap-2 text-yellow-400 hover:text-yellow-500 text-3xl cursor-pointer select-none"
        aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        {isFavorite ? "⭐" : "☆"}
      </button>
    </article>
  )
}

export default CharacterCard