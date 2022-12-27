import {React, useContext, useState, useEffect} from 'react'
import { SearchContext } from "../../UserContext";
import axios from 'axios';
import DisplayRow from '../display/DisplayRow';
import SearchGrid from './SearchGrid';
import "../../styles.css";


const Search = () => {
    const {searchQuery, setSearchQuery} = useContext(SearchContext);

    const [searchResults, setSearchResults] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const dataDefault = await axios(
              `http://localhost:3001/search/${searchQuery}`
            );
            setSearchResults(dataDefault.data)
          };
          fetchData();
      }, [searchQuery]);

  return (

    <div>
        <h2 className="displayGridTitle"> Search for: {searchQuery}</h2>
        <SearchGrid items={searchResults}/>
    </div>
  )
}

export default Search