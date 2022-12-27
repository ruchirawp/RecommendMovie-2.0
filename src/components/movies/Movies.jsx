import {React,useState,useEffect, useContext} from "react";
import { UserContext } from "../../UserContext";
import DisplayRow from "../display/DisplayRow";
import axios from 'axios'
import Spinner from "../UI/Spinner";
import { baseUrl } from "../../services/baseValues";


const Movies = () => {

    const {user,setUser} = useContext(UserContext);
    const [recMovies, setRecMovies] = useState(null)
    const [upcomingMovies, setUpcomingMovies] = useState(null)
    const [popularMovies, setPopularMovies] = useState(null)
    const [topRated, setTopRated] = useState(null)
    const [allLiked, setAllLiked] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

      //window.localStorage.getItem("loggedUser") RETURNS a string so use JSON.parse to access local storage vars
      let userTemp = user || JSON.parse(window.localStorage.getItem("loggedUser"));

      if(userTemp){
        Promise.all([
          fetch("/movies/rec", {
            method: 'GET', 
            headers:{
              'authorization': `Bearer ${userTemp.token}`,
              'Content-Type': 'application/json'
            }
          }),
          fetch("/movies", {
            method: 'GET', 
          }),
          fetch("/movies/getliked", {
            method: 'GET', 
            headers:{
              'authorization': `Bearer ${userTemp.token}`,
              'Content-Type': 'application/json'
            }
          }),

        ])
        .then (([resRec, resDefault, resLiked])=>
          Promise.all([resRec.json(), resDefault.json(), resLiked.json()])
        )
        .then (([dataRec, dataDefault,dataLiked]) => {
          (dataRec.recommendedMovies.length<1? setRecMovies(null):setRecMovies(dataRec.recommendedMovies))
          setTopRated(dataDefault.topRatedMovies)
          setPopularMovies(dataDefault.popularMovies)
          setUpcomingMovies(dataDefault.upcomingMovies) 
          setAllLiked(dataLiked.liked)
        }
      )
    }
    else{

      console.log("USER: ", userTemp)
      const fetchData = async () => {
        const dataDefault = await axios(
          // `http://localhost:3001/movies`
          `${baseUrl}/movies`
        );
        setTopRated(dataDefault.data.topRatedMovies)
        setPopularMovies(dataDefault.data.popularMovies)
        setUpcomingMovies(dataDefault.data.upcomingMovies) 
      };
      fetchData();
    }
    setIsLoading(false)
    }, [])

  return (
    <div>

        {isLoading?
        <h1>LOADING... </h1>:
        <>
        {user&&recMovies? <DisplayRow header="Recommended" rowData={recMovies} allLiked={allLiked}/> : null}
        <DisplayRow header="Popular" rowData={popularMovies} allLiked={allLiked}/>
        <DisplayRow header="Top Rated" rowData={topRated} allLiked={allLiked}/>
        <DisplayRow header="Upcoming" rowData={upcomingMovies} allLiked={allLiked}/>
        </>
        }
        </div>
  )
}

export default Movies