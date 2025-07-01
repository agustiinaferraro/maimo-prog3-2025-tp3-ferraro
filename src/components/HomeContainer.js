'use client'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import CharacterGrid from './CharacterGrid'
import Image from 'next/image'
import { useAppContext } from "@/app/context/AppContext"
import Loading from "./Loading"

const BASE_URL = `https://rickandmortyapi.com/api/`

const HomeContainer = () => {
  const [characters, setCharacters] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { searchTerm } = useAppContext()

  const getCharacters = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}character`)
      setCharacters(response.data.results)
      setFiltered(response.data.results)
      setLoading(false)
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getCharacters()
  }, [getCharacters])

  useEffect(() => {
    const filtro = characters.filter((char) =>
      char.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFiltered(filtro)
  }, [searchTerm, characters])

  if (loading) return <Loading />
  if (error) return <div className="text-white text-center mt-20">Error al cargar los personajes</div>

  return (
    <div className="pb-8 items-center md:w-5/5 overflow-x-hidden">
      {searchTerm ? (
        <>
          <h2 className="text-left text-3xl text-white font-bold py-6">
            Resultados para "{searchTerm}"
          </h2>
          {filtered.length > 0 ? (
            <CharacterGrid characters={filtered} />
          ) : (
            <p className="text-white text-xl py-4">No se encontraron resultados.</p>
          )}
        </>
      ) : (
        <>
        <div className="w-full overflow-hidden">
          <Image
            src="/assets/banner.png"
            alt="banner"
            width={1920}
            height={600}
            layout="responsive"
            className="w-full h-auto"
            style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            }}
          />
        </div>
          <h1 className="font-bold text-5xl flex justify-center py-18 text-white">
            Rick and Morty
          </h1>
          <CharacterGrid characters={characters} />
        </>
      )}
    </div>
  )
}

export default HomeContainer
