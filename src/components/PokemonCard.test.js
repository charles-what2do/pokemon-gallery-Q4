import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import PokemonCard from "./PokemonCard";
import PokemonGallery from "./PokemonGallery";

it("test", () => {
  expect(1).toBe(1);
});

// describe("PokemonCard", () => {
//   it("should render pokemon card", () => {
//     const { getByTestId } = render(<PokemonCard />);
//     const pokmoncard = getByTestId("pokemon-card");
//     expect(pokmoncard).toBeInTheDocument();
//   });
// });
