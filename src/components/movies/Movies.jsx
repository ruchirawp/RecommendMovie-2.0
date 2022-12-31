import {React,useState,useEffect, useContext} from "react";
import { UserContext } from "../../UserContext";
import DisplayRow from "../display/DisplayRow";
import axios from 'axios'
import Spinner from "../UI/Spinner";
import ReplayIcon from '@mui/icons-material/Replay';
import { baseUrl } from "../../services/baseValues";
import Button from '@mui/material/Button';
import "../../styles.css";




const Movies = () => {

    const {user,setUser} = useContext(UserContext);
    const [recMovies, setRecMovies] = useState(null)
    const [upcomingMovies, setUpcomingMovies] = useState(null)
    const [popularMovies, setPopularMovies] = useState(null)
    const [topRated, setTopRated] = useState(null)
    const [allLiked, setAllLiked] = useState(null)
    const [isLoading, setIsLoading] = useState(true)


    const [updatedLiked, setUpdatedLiked] = useState(false)
    const [reloadRec, setReloadRec] = useState(false)

    useEffect(() => {

      //window.localStorage.getItem("loggedUser") RETURNS a string so use JSON.parse to access local storage vars
      let userTemp = user || JSON.parse(window.localStorage.getItem("loggedUser"));

      if(userTemp){
        Promise.all([
          fetch(`${baseUrl}/movies/rec`, {
            method: 'GET', 
            headers:{
              'authorization': `Bearer ${userTemp.token}`,
              'Content-Type': 'application/json'
            }
          }),
          fetch(`${baseUrl}/movies`, {
            method: 'GET', 
          }),
          fetch(`${baseUrl}/movies/getliked`, {
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
          if (dataRec){
            (dataRec.recommendedMovies.length<1? setRecMovies(null):setRecMovies(dataRec.recommendedMovies))
          }
          else{
            setRecMovies(null)
          }
          setTopRated(dataDefault.topRatedMovies)
          setPopularMovies(dataDefault.popularMovies)
          setUpcomingMovies(dataDefault.upcomingMovies) 
          setAllLiked(dataLiked.liked)
        }
      )
    }
    else{

      // console.log("USER: ", userTemp)
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
    }, [reloadRec])

    const handleClick = () => {
      setUpdatedLiked(false)
      setReloadRec(!reloadRec)
    }

  return (
    <div>

        {isLoading?
        <h1>LOADING... </h1>:
        <>
        
      {updatedLiked&&user? <button type="button" className="btn btn-primary btn-sm refreshButton" onClick={handleClick}><i class="fa-solid fa-rotate-right"></i>&nbsp; Reload Recommended</button> :null }

        {user&&recMovies? <DisplayRow setRefresh={setUpdatedLiked} header="Recommended" rowData={recMovies} allLiked={allLiked}/> : null}
        <DisplayRow header="Popular" setRefresh={setUpdatedLiked} rowData={popularMovies} allLiked={allLiked}/>
        <DisplayRow header="Top Rated" setRefresh={setUpdatedLiked} rowData={topRated} allLiked={allLiked}/>
        <DisplayRow header="Upcoming" setRefresh={setUpdatedLiked} rowData={upcomingMovies} allLiked={allLiked}/>
        </>
        }
        </div>
  )
}

export default Movies