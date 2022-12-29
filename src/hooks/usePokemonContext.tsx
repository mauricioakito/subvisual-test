import React, { useContext, useEffect, useState } from 'react';
import { initialAllStore, PokemonContext, IPokemonContextProvider, TPokemonStoreProps, TPokemonCardProps, TPaginationParams, TPokemonResultsProps, TPokemonCardQuery } from '../context/pokemonContext';

export const usePokemonContext = () => useContext(PokemonContext);

export const PokemonContextProvider = ({ children }: IPokemonContextProvider) => {

    const [store, setStore] = useState(initialAllStore);
    
    const initialFetch = async (results: TPokemonResultsProps[]) => {

        const array: TPokemonCardProps[] = [];

        for (const { url } of results) {
            const response = await apiFetch(url);

            if(response.data) {
                const item = build(response.data);
                array.push(item);
            }
        }

        return array;
    };

    const build = (data: TPokemonCardQuery) => ({
        name: data?.name,
        number: data?.id,
        sprite: data?.sprites.other['official-artwork'].front_default
    });

    const handlePagination = async (params: TPaginationParams) => {

        setData({ ...store, isLoading: true,});

        let newStore = {...store};

        
        const {limit, offset, page} = params;
        const query = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        const response = await apiFetch(query);

        if(response){
            const {count, results} = response.data;
            const items = await initialFetch(results);

            newStore = {
                ...newStore,
                pokemons: items,
                page: { count, currentPage: page },
            };
        }

        setData({ ...newStore, isLoading: false, error: response.error});
    };

    const apiFetch = async (url: string) => {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return { data, error: ''};
        } 
        return {data: null, error: 'Unable to process the request' };
    };

    useEffect(() => {
        load();
    }, []);

    const setData = (newStore: TPokemonStoreProps) => {
        setStore(newStore);
    };

    const load = async () => {
        handlePagination({page: 1, limit: 20, offset: 0});
    };

    return (
        <PokemonContext.Provider value={{ store, setData, handlePagination }}>
            {children}
        </PokemonContext.Provider>
    );
};
