'use client'
import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import CharacterCardSingle from './CharacterCardSingle'

const CharacterContainer = ({ id }) => {
  const [character, setCharacter] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getCharacter = useCallback(async () => {
    const BASE_URL = `https://rickandmortyapi.com/api/`
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}character/${id}`)
      setCharacter(response.data)
    } catch (error) {
      console.log('Hubo un error', error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    getCharacter()
  }, [getCharacter])

  return (
    <>
      {!loading && !error && <CharacterCardSingle character={character} />}
      <div>CharacterContainer {id}</div>
    </>
  )
}

export default CharacterContainer