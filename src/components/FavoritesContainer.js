'use client'

import { useAppContext } from "@/app/context/AppContext"
import Image from "next/image"
import Link from "next/link"

const FavoritesContainer = () => {
  const { favorites, deleteToFavorites, searchTerm } = useAppContext()

  //filtrar favoritos 
  const filteredFavorites = favorites.filter(fav =>
    fav.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (filteredFavorites.length === 0) {
    return <p className="text-white text-center mt-10">No hay favoritos para mostrar</p>
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-4xl text-white font-semibold mb-6">Favoritos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredFavorites.map((fav) => (
          <Link
            key={fav.id}
            href={`/character/${fav.id}`}
            className="cursor-pointer group"
          >
            <div className="bg-[#0b0c10]/50 backdrop-blur-md rounded-2xl p-5 w-full max-w-full mx-auto transform transition duration-300 hover:scale-105 shadow-5xl gap-6">
              {fav.image ? (
                <Image
                  src={fav.image}
                  alt={fav.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48 group-hover:brightness-75 transition rounded-t-2xl"
                />
              ) : (
                <div className="bg-gray-700 text-white flex items-center justify-center h-48">
                  Imagen no disponible
                </div>
              )}
              <div className="p-4">
                <h3 className="text-white text-xl font-semibold">{fav.title}</h3>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    deleteToFavorites(fav.id)
                  }}
                  className="flex items-center justify-center gap-2 text-yellow-400 hover:text-yellow-500 text-3xl cursor-pointer select-none mt-4"
                >
                  ⭐
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FavoritesContainer
