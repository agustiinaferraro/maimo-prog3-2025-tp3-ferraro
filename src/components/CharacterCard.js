import Image from "next/image"
import Link from "next/link"

const CharacterCard = ({ character }) => {

  return (
    <article className="col-span-3 bg-[#14b0c5] rounded-3xl p-5"> 
      <div className="mb-2">
        <Image
          className="rounded-t-3xl" 
          src={character.image}
          width={300}
          height={300}
          alt={character.name}
        />
      </div>
      <h2 className="text-3xl mb-2">{character.name}</h2>
      <p>{character.status}</p>
      <p className="mb-2">{character.origin.name}</p>
      <Link
        className="bg-[#dae74b] flex justify-center rounded-2xl p-4 hover:bg-orange-300 cursor-pointer"
        href={`character/${character.id}`}
      >
        View more
      </Link>
    </article>
  )
}

export default CharacterCard
