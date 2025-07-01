'use client'

import SpeciesFilter from '@/components/SpeciesFilter'

const SpeciesPage = () => {
  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl text-white font-bold mb-6 px-8">Explorar por Especie</h1>
      <SpeciesFilter />
    </div>
  )
}

export default SpeciesPage
