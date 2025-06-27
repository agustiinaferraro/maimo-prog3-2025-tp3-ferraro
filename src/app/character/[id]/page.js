import React from 'react'
import CharacterContainer from '@/components/CharacterContainer'

const CharacterPage = ({ params }) => {
  const { id } = params; //no se si va await antes de params
  return (
    <div>
        <CharacterContainer id={id} />
    </div>
  );
};

export default CharacterPage;