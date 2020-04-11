import React from "react";

function PokemonCard({ pokemon }) {
  const { id, name, type, base } = pokemon;
  return (
    <div className="pokemon-card">
      <div className="pokemon-name">{name.english}</div>
      <div className="pokemon-img-block">
        <img
          className="pokemon-img"
          src={process.env.PUBLIC_URL + "/pokemonImage/" + id + ".png"}
          alt={name.english}
        />
      </div>
      <div className="pokemon-types">{displayPokemonTypes(type)}</div>
      <div className="pokemon-base">{displayBaseAttributes(base)}</div>
    </div>
  );
}

function displayBaseAttributes(base) {
  return Object.keys(base).map((attribute) => {
    return (
      <span className={`base-attribute base-` + attribute.toLowerCase()}>
        {attribute}: {base[attribute]}
      </span>
    );
  });
}

function displayPokemonTypes(types) {
  return types.map((type) => {
    return (
      <span className={`pokemon-type type-` + type.toLowerCase()}>{type}</span>
    );
  });
}

export default PokemonCard;
