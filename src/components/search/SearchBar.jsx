import {React, useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import { SearchContext } from "../../UserContext";


const SearchBar = () => {

  let navigate = useNavigate();
  const {searchQuery, setSearchQuery} = useContext(SearchContext);

  return (
    <div>
      <form className="d-flex" role="search" >
        <input
          className="form-control me-2 searchBar"
          type="search"
          placeholder="Search"
          aria-label="Search"
          name="searchBar"
          onChange={(e) => {
            setSearchQuery(e.target.value) 
            return navigate("/search") 
          }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
