'use client'

import { useEffect, useRef, useState } from "react"
import { useAppContext } from "@/app/context/AppContext"
import axios from "axios"
import Link from "next/link"

const BASE_URL = 'https://rickandmortyapi.com/api/character'

const SpeciesFilter = () => {
  const { favorites, handleAddToFavorites, deleteToFavorites, searchTerm } = useAppContext()
  const [allCharacters, setAllCharacters] = useState([])
  const [groupedSpecies, setGroupedSpecies] = useState({})
  const scrollRefs = useRef({})

  //traigo los personajes de la primera pag de la api solamente una vez cuando carga el componente
  useEffect(() => {
    axios.get(`${BASE_URL}?page=1`)
      .then(res => {
        setAllCharacters(res.data.results) // guardo la lista de personajes para usar dps
      })
      .catch(err => console.error(err))
  }, [])

  // c/vez que cambia la lista de personajes o el texto de busqueda, filtro y agrupo
  useEffect(() => {
    // primero filtro los personajes si hay algo escrito en la barra de búsqueda
    let filtered = allCharacters
    if (searchTerm && searchTerm.trim() !== "") {
      filtered = filtered.filter(char =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    //aca agrupo los personajes por especie
    //creo un objeto vacio donde cada clave es una especie y el valor un array con los personajes de esa especie
    const grouped = {}
    filtered.forEach(char => {
      const specie = char.species || "Desconocida" // Si no tiene especie, pongo "Desconocida"
      if (!grouped[specie]) grouped[specie] = [] // Si no existe esa especie, creo el array
      grouped[specie].push(char) // agrego el personaje a la especie correspondiente
    })

    setGroupedSpecies(grouped) //guardo el resultado agrupado para mostrar en la pag
  }, [allCharacters, searchTerm]) //se ejecuta cuando cambia la lista o la busqueda

  //funcion para mover el scroll de cada grupo hacia izquierda o derecha
  const scroll = (specie, direction) => {
    const container = scrollRefs.current[specie]
    if (container) {
      container.scrollBy({ left: direction * 300, behavior: 'smooth' }) // Mueve 300px para el lado indicado
    }
  }

  return (
    <div className="px-6 py-10 space-y-10">
      {Object.entries(groupedSpecies).map(([specie, characters]) => (
        <div key={specie} className="relative w-full">
          <h2 className="text-white text-2xl mb-4 px-4 font-medium">{specie}</h2>

          {/*bton para scroll a la izquierda, solo visible en pantallas medianas en adelante */}
          <button
            onClick={() => scroll(specie, -1)}
            className="hidden sm:flex absolute left-0 top-10 bottom-0 z-10 w-12 items-center justify-center text-white hover:bg-black/30"
          >
            &#8592;
          </button>

          {/*contenedor horizontal de personajes con scroll */}
          <div
            ref={el => (scrollRefs.current[specie] = el)} // guardo la referencia para poder controlar el scroll
            className="flex gap-4 overflow-x-auto overflow-y-hidden px-4 py-2 no-scrollbar"
            style={{ touchAction: "pan-x", overscrollBehaviorX: "contain" }}
          >
            {characters.map(char => {
              const isFavorite = favorites.some(fav => fav.id === char.id)
              return (
                <Link href={`/character/${char.id}`} key={char.id}>
                  <div className="min-w-[250px] transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer">
                    <img
                      className="h-[200px] w-[250px] object-cover rounded-t-2xl"
                      src={char.image}
                      alt={char.name}
                    />
                    <div className="bg-black/60 p-2 rounded-2xl">
                      <ul>
                        <li className="text-white font-bold py-2 text-center">{char.name}</li>
                      </ul>
                      <div className="flex justify-end">
                        {isFavorite ? (
                          <button
                            onClick={e => {
                              e.preventDefault()
                              deleteToFavorites(char.id) // eliminar favorito si ya esta
                            }}
                            className="flex items-center justify-center gap-2 text-yellow-400 hover:text-yellow-500 text-3xl cursor-pointer select-none mt-4"
                          >
                            ⭐
                          </button>
                        ) : (
                          <button
                            onClick={e => {
                              e.preventDefault()
                              // Agrego fav con sus datos
                              handleAddToFavorites(char.name, char.image, char.id, "character")
                            }}
                            className="flex items-center justify-center gap-2 text-yellow-400 hover:text-yellow-500 text-3xl cursor-pointer select-none mt-4"
                          >
                            ☆
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/*boton scroll a la derecha */}
          <button
            onClick={() => scroll(specie, 1)}
            className="hidden sm:flex absolute right-0 top-10 bottom-0 z-10 w-12 items-center justify-center text-white hover:bg-black/30"
          >
            &#8594;
          </button>
        </div>
      ))}
    </div>
  )
}

export default SpeciesFilter