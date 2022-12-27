import React from "react";
import SearchItem from "./SearchItem";
import DisplayCard from "../display/DisplayCard";
import Spinner from "../UI/Spinner";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const SearchGrid = ({ items }) => {
  
  return (
    <div className="searchResults">
      {items ? (
        <Grid container spacing={1} rowSpacing={1}>
          {items.map((item, index) => (
            <Grid item xs>
              <DisplayCard
                key={index}
                cardType={item.first_air_date ? "show" : "movie"}
                cardData={item}
              ></DisplayCard>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>
          <Spinner />
        </p>
      )}
    </div>
  );
};

export default SearchGrid;
