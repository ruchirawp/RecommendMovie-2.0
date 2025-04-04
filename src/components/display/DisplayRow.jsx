import React from "react";
import MovieCard from "./DisplayCard";
import "../../styles.css";
import Spinner from "../UI/Spinner";
// import Carousel from 'react-grid-carousel'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

// const DisplayRow = ({ header, rowData, allLiked, setRefresh}) => {
//   return (

//     <div className="displayRow">
//       <h2 className="displayRowTitle page-header">{header}</h2>

//       <Carousel gap={5} cols={5} rows={1} loop={true}>
//       {rowData? rowData.map((item, index) => {
//               return (
//                 <Carousel.Item key={index}>
//                     <MovieCard setRefresh={setRefresh} cardData={item} cardType={item.first_air_date? "show": "movie"} allLiked={allLiked}/>     
//                   </Carousel.Item>
//               )   
//             }): <Spinner/>}
//       </Carousel>
//     </div>
//   );
// };

// export default DisplayRow;

const DisplayRow = ({ header, rowData, allLiked, setRefresh }) => {
  return (
    <div className="displayRow">
      <h2 className="displayRowTitle page-header">{header}</h2>

      {rowData ? (
        <Swiper
          modules={[Navigation]}
          spaceBetween={1}
          slidesPerView={5}
          navigation
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1200: { slidesPerView: 5 },
          }}
        >
          {rowData.map((item, index) => (
            <SwiperSlide key={index}>
              <MovieCard
                setRefresh={setRefresh}
                cardData={item}
                cardType={item.first_air_date ? "show" : "movie"}
                allLiked={allLiked}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default DisplayRow;