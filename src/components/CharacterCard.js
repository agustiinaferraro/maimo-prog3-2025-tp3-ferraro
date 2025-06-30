'use client'

import Image from "next/image"
import Link from "next/link"
import { useAppContext } from "@/app/context/AppContext"

const CharacterCard = ({ character }) => {
  const { favorites, handleAddToFavorites, deleteToFavorites } = useAppContext()
  const isFavorite = favorites.some(fav => fav.id === character.id)

  return (
    <article className="bg-[#14b0c5] rounded-3xl p-5 w-full max-w-sm mx-auto flex flex-col">
      <div className="mb-2 mx-auto">
        <Image
          className="rounded-t-3xl" 
          src={character.image}
          width={400}
          height={300}
          alt={character.name}
        />
      </div>
      <h2 className="text-2xl mb-2">{character.name}</h2>
      <p>{character.status}</p>
      <p className="mb-2">{character.origin.name}</p>

      <Link
        className="bg-[#dae74b] flex justify-center rounded-2xl p-4 hover:bg-orange-300 cursor-pointer mb-3"
        href={`character/${character.id}`}
      >
        View more
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault() // evitar que el click navegue al link
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