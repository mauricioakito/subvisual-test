import { Header } from './components/Header';
import React from 'react';
import './App.scss';
import { Wrapper } from 'components/Wrapper/Index';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { PokemonContextProvider } from 'hooks/usePokemonContext';
import { Card } from 'components/Card/Card';
import { Footer } from 'components/Footer/Footer';
import { Pagination } from 'components/Pagination/Pagination';

export const App = (props: object) => {
    
    return (
        <PokemonContextProvider props={props}>
            <Wrapper classname={'App'}>
                <Header />

                <div className="topbar">
                    <SearchForm />
                </div>

                <Card />
                <Pagination />
                <Footer />
            </Wrapper>
        </PokemonContextProvider>
    );
};