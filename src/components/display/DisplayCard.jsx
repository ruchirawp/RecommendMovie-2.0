import { React, useState, useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";
import noPosterImg from "../../assets/noPosterImage.jpg";
import "../../styles.css";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import Rating from '@mui/material/Rating';
import { baseUrl } from "../../services/baseValues";



const DisplayCard = ({ cardData, cardType, allLiked, setRefresh }) => {
  const [liked, setLiked] = useState(false);
  const { user, setUser } = useContext(UserContext);

    //effect hook to set the liked state of the card 
    useEffect(() => {
      (allLiked? 
        allLiked.includes(cardData.id) ? setLiked(true): setLiked(false)
        : setLiked(false))
    }, [])

  const handleLike = () => {
    var postData = {
      id: cardData.id,
      cardType: cardType,
    };

    let axiosConfig = {
      headers: {
        'authorization': `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    const toggleLike = async () => {

      if (cardType== "movie"){
              (!liked
        ? await axios.post(
            // `http://localhost:3001/movies/add/${cardData.id}`,
            // `${baseUrl}/movies/add/${cardData.id}`,
            // `${baseUrl}/addLikedMovie/${cardData.id}`,
            `${baseUrl}/addLikedMovie/${cardData.id}`,
            postData,
            axiosConfig
          )
        : await axios.put(
            // `http://localhost:3001/movies/remove/${cardData.id}`,
            // `${baseUrl}/movies/remove/${cardData.id}`,
            `${baseUrl}/removeLikedMovie/${cardData.id}`,
            postData,
            axiosConfig
          )
      )
      }
      else{
        (!liked
          ? await axios.post(
              // `${baseUrl}/shows/add/${cardData.id}`,
              `${baseUrl}/addLikedShow/${cardData.id}`,
              postData,
              axiosConfig
            )
          : await axios.put(
              // `${baseUrl}/shows/remove/${cardData.id}`,
              `${baseUrl}/removeLikedShow/${cardData.id}`,
              postData,
              axiosConfig
            )
        )
      }

    };

    toggleLike();
    setLiked(!liked);
    setRefresh(true)

  };

  return (
    <div className="itemCard">
      {cardType === "movie" ? (
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img
                src={ cardData.poster_path ? `https://image.tmdb.org/t/p/original/${cardData.poster_path}`: noPosterImg }
                alt=""
                className="movieCard"
              />{" "}
            </div>
            <div className="flip-card-back">
              <h2>{cardData.title}</h2>
              <Rating name="read-only" value={cardData.vote_average/2}  defaultValue={2.5} precision={0.25} readOnly />
              <p className="itemOverview">{cardData.overview}</p>
              <p className="releaseDate">Released: {cardData.release_date}</p>


              <div className="heartSection">
              {user &&
                (liked ? (
                  <MDBIcon
                    fas
                    className="likedColor fa-3x"
                    icon="heart"
                    onClick={handleLike}
                  />
                ) : (
                  <MDBIcon
                    far
                    icon="heart"
                    className="fa-3x"
                    onClick={handleLike}
                  />
                ))}
              </div>


              {/* <MDBIcon fas icon="heart" /> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img
                src={ cardData.poster_path ? `https://image.tmdb.org/t/p/original/${cardData.poster_path}`: noPosterImg }
                alt=""
                className="movieCard"
              />
            </div>
            <div className="flip-card-back">
              <h2>{cardData.name}</h2>
              {/* <h1>{cardData.id}</h1> */}

              {/* <p>Rating: {cardData.vote_average}</p> */}
              <Rating name="read-only" value={cardData.vote_average/2}  defaultValue={2.5} precision={0.25} readOnly />
              <p className="itemOverview">{cardData.overview}</p>
              <p className="releaseDate">First Aired: {cardData.first_air_date}</p>

              {/* <p>{cardData.overview}</p> */}
              {/* <p>First Aired: {cardData.first_air_date}</p> */}
              
              
              <div className="heartSection">
              {user &&
                (liked ? (
                  <MDBIcon
                    fas
                    className="likedColor fa-3x"
                    icon="heart"
                    onClick={handleLike}
                  />
                ) : (
                  <MDBIcon
                    far
                    icon="heart"
                    className="fa-3x"
                    onClick={handleLike}
                  />
                ))}

                
              </div>


              {/* <MDBIcon fas icon="heart" /> */}
            </div>
          </div>
        </div>
      )}



      {/* ) : (
        <p>LOADING...</p>
      )} */}
    </div>
  );
};

export default DisplayCard;

//card info needed:

// title, rating, summary, revenue, runtime, liked status
