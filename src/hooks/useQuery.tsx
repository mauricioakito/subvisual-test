import { TPokemonStoreProps, TPokemonCardQuery } from 'context/pokemonContext';

export const useQuery = async (queryParam: string, setData: (query: TPokemonStoreProps) => void, store: TPokemonStoreProps) => {

    const getPokemon = async () => {
        setData({ ...store, isLoading: true });

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${queryParam}`);

        setData({ ...store, isLoading: false });

        return await response.json();
    };
    
    const data: TPokemonCardQuery = await getPokemon();
    
    
    const newStore: TPokemonStoreProps = {
        pokemons: [
            {
                name: data.name,
                number: data.id,
                sprite: data.sprites?.other['official-artwork'].front_default
            },
        ],
        isLoading: false,
        page: {
            currentPage: 1,
            count: 0
        },
        error: ''
    };

    newStore && setData(newStore);

    return null;
};
