'use client'

import Image from "next/image"
import Link from "next/link"
import { useAppContext } from "@/app/context/AppContext"

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useAppContext()

  return (
    <div className="flex items-center text-white px-4 py-2 bg-gradient-to-r from-black to-transparent">
      <Link href="/">
        <div>
          <Image 
            src="/assets/logo.png" 
            alt="logo" 
            width={50} 
            height={50} 
            className="h-[50px] object-cover rounded-full" 
          />
        </div>
      </Link>

      <nav className="flex flex-1 justify-between items-center px-10">
        <div className="flex-1" /> 

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Buscar personajes..."
          className="w-64 max-w-full p-2 rounded-md border border-gray-300 bg-transparent text-white placeholder-gray-400"
        />

        <ul className="flex gap-6 text-gray-300 justify-end px-10">
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