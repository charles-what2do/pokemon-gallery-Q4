import React from "react";
import "./PokemonCard.css";
import PokemonType from "./PokemonType";

function PokemonCard({ pokemon }) {
  const { id, name, type, base } = pokemon;
  return (
    <div data-testid="pokemon" className="pokemon-card">
      <div data-testid="pokemon-name" className="pokemon-name">
        {name.english}
      </div>
      <div data-testid="pokemon-image" className="pokemon-img-block">
        <img
          className="pokemon-img"
          src={process.env.PUBLIC_URL + "/pokemonImage/" + id + ".png"}
          alt={name.english}
        />
      </div>
      {/* <div className="pokemon-types">{displayPokemonTypes(type)}</div> */}
      <div data-testid="pokemon-type" className="pokemon-types">
        {type.map((curType) => (
          <PokemonType key={curType} type={curType} />
        ))}
      </div>
      <div data-testid="pokemon-type" className="pokemon-base">
        {displayBaseAttributes(base)}
      </div>
    </div>
  );
}

function displayBaseAttributes(base) {
  return Object.keys(base).map((attribute) => {
    return (
      <span
        key={attribute}
        className={`base-attribute base-` + attribute.toLowerCase()}
      >
        {attribute}: {base[attribute]}
      </span>
    );
  });
}

// function displayPokemonTypes(types) {
//   return types.map((type) => {
//     return (
//       <span key={type} className={`pokemon-type type-` + type.toLowerCase()}>
//         {type}
//       </span>
//     );
//   });
// }

export default PokemonCard;
