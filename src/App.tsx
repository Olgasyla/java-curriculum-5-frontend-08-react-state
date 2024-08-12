import './App.css'
import CharacterGallery from "./components/CharacterGallery.tsx";
import {useEffect, useState} from "react";
import {characters} from "./Characters.ts";
import axios from "axios";
import {Character} from "./types/RickAndMortyCharacter.ts";

export default function App() {

    const [characters, setCharacters] = useState<Character[]>([]);
    const [searchText, setSearchText] = useState("");

    const filteredCharacters = characters
        .filter((character) => character.name.toLowerCase().includes(searchText.toLowerCase()));

    useEffect(() => {
        loadCharacters()}, [])


    const loadCharacters = () => {
        axios.get("https://rickandmortyapi.com/api/character")
            .then((response) => {
                    setCharacters(response.data.results)
                }
            );
    }

    return (
        <>
            <input type="text" onChange={(e) => setSearchText(e.target.value)} placeholder="Search for a character"/>
            {
                filteredCharacters.length > 0
                    ? <CharacterGallery characters={filteredCharacters}/>
                    : <p>No characters found</p>
            }
        </>
    );
}
