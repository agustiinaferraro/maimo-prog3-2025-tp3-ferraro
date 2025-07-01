'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useAppContext } from "@/app/context/AppContext"

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useAppContext()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex items-center justify-between flex-wrap text-white px-10 py-6 bg-[#000000]">
      {/* logo a la izquierda */}
      <Link href="/">
        <Image 
          src="/assets/logo.png" 
          alt="logo" 
          width={180} 
          height={30} 
          className="h-[50px] object-cover" 
        />
      </Link>

      {/* Botón hamburguesa */}
      <button 
        className="md:hidden text-white ml-auto" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Contenido del nav alineado a la derecha */}
      <nav className={`w-full md:w-auto ${menuOpen ? 'block' : 'hidden'} md:flex md:items-center md:gap-6 md:ml-auto mt-2 md:mt-0`}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Buscar personajes..."
          className="w-full md:w-64 p-2 rounded-md border border-gray-300 bg-transparent text-white placeholder-gray-400 mb-2 md:mb-0"
        />

        <ul className="flex flex-col md:flex-row gap-4 md:gap-6 text-gray-300 px-10">
          <li className="hover:text-white transition-colors duration-200">
            <Link href="/favorites">Favoritos</Link>
          </li>
          <li className="hover:text-white transition-colors duration-200">
            <Link href="/species">Especies</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar