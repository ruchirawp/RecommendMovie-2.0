import React from "react";
import MovieCard from "./DisplayCard";
import Carousel from 'react-grid-carousel'
import "../../styles.css";
import Spinner from "../UI/Spinner";

const DisplayRow = ({ header, rowData, allLiked, setRefresh}) => {
  return (

    <div className="displayRow">
      <h2 className="displayRowTitle page-header">{header}</h2>

      <Carousel gap={5} cols={5} rows={1} loop={true}>
      {rowData? rowData.map((item, index) => {
              return (
                <Carousel.Item key={index}>
                    <MovieCard setRefresh={setRefresh} cardData={item} cardType={item.first_air_date? "show": "movie"} allLiked={allLiked}/>     
                  </Carousel.Item>
              )   
            }): <Spinner/>}
      </Carousel>
    </div>
  );
};

export default DisplayRow;
