'use client'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import CharacterGrid from './CharacterGrid'

const BASE_URL = `https://rickandmortyapi.com/api/`

const HomeContainer = () => {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getCharacters = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}character`)
      setCharacters(response.data.results)
      setLoading(false)
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getCharacters()
  }, [getCharacters])

  return (
    <div>
      <h1 className='text-5xl flex justify-center py-5'>
        Rick and Morty Maimo app
      </h1>

      {!loading && <CharacterGrid characters={characters}/>}
      {loading && (
        <div className='flex justify-center items-center min-h-[300px]'>
          Cargando...
        </div>
      )}
    </div>
  )
}

export default HomeContainer