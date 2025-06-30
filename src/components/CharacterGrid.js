import CharacterCard from "./CharacterCard"

const CharacterGrid = ({characters}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 py-8">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}       
    </div>
  );
};

export default CharacterGrid;