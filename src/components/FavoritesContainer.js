'use client'  // Muy importante para que sea client component y pueda usar useAppContext

import { useAppContext } from '@/app/context/AppContext'
import Image from 'next/image'
import Link from 'next/link'

const FavoritesContainer = () => {
  const { favorites, deleteToFavorites } = useAppContext();

  return (
    <div className='p-20'>
      <h2 className='text-amber-50 text-4xl font-semibold mt-2'>Favoritos</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-10'>
        {favorites.length === 0 && (
          <p className="text-white text-xl">No hay favoritos agregados.</p>
        )}
        {favorites.map((item) => {
          const title = item.title || "Sin título";
          const image = item.image;

          return (
            <Link
              href={`/character/${item.id}`}
              key={item.id}
              className="block"
            >
              <div className='py-5 cursor-pointer bg-[#222] rounded-lg hover:bg-[#333] transition-colors'>
                {image ? (
                  <Image
                    src={image} 
                    alt={title}
                    width={400}
                    height={300}
                    style={{ borderRadius: '12px' }}
                    unoptimized={true} // para permitir imgs externas sin config en next.config.js, ya lo hic igual pero por las dudas
                  />
                ) : (
                  <div className="bg-gray-700 text-white p-10 rounded-md w-[400px] h-[200px] flex items-center justify-center">
                    Imagen no disponible
                  </div>
                )}

                <h2 className='text-white mt-2'>{title}</h2>

                <div className="flex justify-end">
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // hace que el Link no navegue cuando clickean aca
                      deleteToFavorites(item.id);
                    }}
                    className="text-2xl text-yellow-400 px-2 py-1 cursor-pointer"
                    aria-label="Eliminar de favoritos"
                  >
                    ⭐
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritesContainer;