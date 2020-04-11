import React from "react";
import PokemonCard from "./PokemonCard";
import pokemonData from "../pokemon/pokemon";

function displayPokemonCards(pokemons) {
  return pokemons.map((pokemon) => {
    return <PokemonCard pokemon={pokemon} />;
  });
}

function PokemonGallery() {
  return (
    <div>
      <img
        className="header"
        src={process.env.PUBLIC_URL + "pokemon-750.jpg"}
        alt="Pokemon Header"
      />
      <div className="pokemon-cards">{displayPokemonCards(pokemonData)}</div>
    </div>
  );
}

export default PokemonGallery;
