import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  fireEvent,
  within,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SearchablePokemonGallery from "./SearchablePokemonGallery";
import mockPokemonData from "../pokemon/pokemon";

const mockAxios = new MockAdapter(axios);

const renderAndWaitForPokemonGalleryToLoad = async () => {
  const pokemonGallery = render(<SearchablePokemonGallery />);
  await waitForElementToBeRemoved(() =>
    pokemonGallery.getByLabelText("audio-loading")
  );
  return pokemonGallery;
};

describe("SearchablePokemonGallery", () => {
  beforeEach(() => {
    mockAxios
      .onGet(
        "https://us-central1-pokedex-23fb6.cloudfunctions.net/app/pokemonData"
      )
      .replyOnce(200, mockPokemonData);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it("should render loader", () => {
    const { getByLabelText } = render(<SearchablePokemonGallery />);
    const loader = getByLabelText("audio-loading");
    expect(loader).toBeInTheDocument();
  });

  it.only("should render pokemon gallery component", async () => {
    const { getByTestId, getByLabelText } = render(
      <SearchablePokemonGallery />
    );
    await waitForElementToBeRemoved(() => getByLabelText("audio-loading"));

    const pokemonGallery = getByTestId("pokemon-gallery");
    expect(pokemonGallery).toBeInTheDocument();
  });

  it("should render input box", async () => {
    const { getByLabelText } = await renderAndWaitForPokemonGalleryToLoad();
    const getPokemonFilterInput = getByLabelText("pokemon-filter");
    expect(getPokemonFilterInput).toBeInTheDocument();
  });

  it("should render search button", () => {
    const { getByLabelText } = render(<SearchablePokemonGallery />);
    const getSearchButton = getByLabelText("search-button");
    expect(getSearchButton).toBeInTheDocument();
  });

  it("should render 51 pokemons", () => {
    const { getAllByTestId } = render(<SearchablePokemonGallery />);
    const pokemonCards = getAllByTestId("pokemon");
    expect(pokemonCards).toHaveLength(51);
  });

  it("should filter ans show the correct cards", () => {
    const { getByLabelText, getByTestId, getByText } = render(
      <SearchablePokemonGallery />
    );
    const getPokemonFilterInput = getByLabelText("pokemon-filter");
    fireEvent.change(getPokemonFilterInput, {
      target: {
        value: "Bulbasaur",
      },
    });
    const getSearchButton = getByLabelText("search-button");
    fireEvent.click(getSearchButton);
    const bulbasurCard = getByTestId("pokemon");
    expect(bulbasurCard).toBeInTheDocument();
    expect(getByText("Bulbasaur")).toBeInTheDocument();
  });

  it("should filter ans show the correct cards even if input is all uppercase", () => {
    const { getByLabelText, getByTestId, getByText } = render(
      <SearchablePokemonGallery />
    );
    const getPokemonFilterInput = getByLabelText("pokemon-filter");
    fireEvent.change(getPokemonFilterInput, {
      target: {
        value: "BULBASAUR",
      },
    });
    const getSearchButton = getByLabelText("search-button");
    fireEvent.click(getSearchButton);
    const bulbasurCard = getByTestId("pokemon");
    expect(bulbasurCard).toBeInTheDocument();
    expect(getByText("Bulbasaur")).toBeInTheDocument();
  });

  it("should container 7 stats per pokemon", () => {
    const { getAllByTestId } = render(<SearchablePokemonGallery />);
    const bulbasurCard = getAllByTestId("pokemon")[0];
    const getBulbasaurText = within(bulbasurCard).getByText;

    const stats = [
      "HP: 45",
      "Attack: 49",
      "Defence: 49",
      "Speed: 45",
      "SpAttack: 65",
      "SpDefence: 65",
    ];

    stats.forEach((stat) => {
      expect(getBulbasaurText(stat)).toBeInTheDocument();
    });
  });

  it("should show correct number of types", () => {
    const { getAllByTestId } = render(<SearchablePokemonGallery />);
    const bulbasurCard = getAllByTestId("pokemon")[0];
    const getBulbasaurText = within(bulbasurCard).getByText;

    const types = ["Grass", "Poison"];

    types.forEach((stat) => {
      expect(getBulbasaurText(stat)).toBeInTheDocument();
    });
  });
});
