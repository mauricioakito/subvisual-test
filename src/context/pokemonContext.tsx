import { createContext } from 'react';

export interface TPokemonStoreProps {
  pokemons: TPokemonCardProps[],
  isLoading: boolean;
  page: {
    currentPage: number,
    count: number,
  },
  error: string
}

export type TPokemonResultsProps = {
  name: string,
  url: string
}

export type TPokemonCardProps = {
    name: string,
    number: number,
    sprite: string,
}

export type TPaginationParams = {
  offset: number,
  limit: number,
  page: number
}

export type TPokemonCardQuery = {
  name: string,
  id: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      }
    }
  }
}

export interface IStoreContext {
  store: TPokemonStoreProps;
  setData: (query: TPokemonStoreProps) => void;
  handlePagination: (params: TPaginationParams) => void;
}

export interface IPokemonContextProvider {
    children: JSX.Element;
    props: object;
  }

export const PokemonContext = createContext({
    store: {},
} as IStoreContext);

export const initialAllStore: TPokemonStoreProps = {
    pokemons: [
        {
            name: 'Charizard',
            number: 6,
            sprite: '/src/assets/charizard.png'
        },
        {
            name: 'Blastoise',
            number: 9,
            sprite: '/src/assets/blastoise.png'
        },
        {
            name: 'Venusaur',
            number: 3,
            sprite: '/src/assets/venusaur.png'
        },
        {
            name: 'Pikachu',
            number: 25,
            sprite: '/src/assets/pikachu.png'
        },
    ],
    isLoading: true,
    page: {
        currentPage: 1,
        count: 0
    },
    error: ''
};