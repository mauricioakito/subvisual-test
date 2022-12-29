import { usePokemonContext } from 'hooks/usePokemonContext';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useQuery } from '../../hooks/useQuery';
import './SearchForm.scss';

export const SearchForm = () => {

    const {store, setData} = usePokemonContext();

    const [queryString, setQueryString] = useState<string>('');
    
    const inputRef = useRef<HTMLInputElement>(null);
  
    const handleClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        inputRef.current && setQueryString(inputRef.current.value.toLocaleLowerCase());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const QueryFunction = () => {
        useQuery(queryString, setData, store);
    }

    useEffect(() => {
        QueryFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryString]);
    
    return (
        <div>
            <form onSubmit={handleClick}>
                <div className="inputBox">
                    <h2>Pokemon Name:</h2>
                    <input type="text" name="name" ref={inputRef} />
                    <span>Please input a name to search for a pokemon.</span>
                </div>
                <input className="inputButton" type="submit" value="Submit" onClick={(e) => e?.preventDefault}/>
            </form>
        </div>
    );
};