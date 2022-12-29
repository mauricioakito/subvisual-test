import { TPokemonCardProps } from 'context/pokemonContext';
import { usePokemonContext } from 'hooks/usePokemonContext';
import React from 'react';
import './Card.scss';

export const Card = () => {

    const {store} = usePokemonContext();

    const {pokemons, isLoading, error} = store;
    
    const PokemonsArray = () => {
        const arr = (
            pokemons && pokemons.map((e: TPokemonCardProps, key: number) => (
                <div key={key} className="cardContainer">
                    <img className="image" src={e.sprite} alt={e.name} />
                    <div className="infoContainer">
                        <span className="id"> #00{e.number} </span>
                        <span className="name"> {e.name} </span>
                    </div>
                </div>
            ))
        );
        return <div className="container">{arr}</div>;
    };

    return (
        !error ? (
            <div className="cardsOuterContainer">
                {!isLoading ? <PokemonsArray /> : <div className="">Loading pokemons, please wait...</div>}
            </div>
        ) : (
            <div>{error}</div>
        )
    );
};
