import {React,useState,useEffect, useContext} from "react";
import { UserContext } from "../../UserContext";
import DisplayRow from "../display/DisplayRow";
import axios from 'axios'
import { baseUrl } from "../../services/baseValues";
import Spinner from "../UI/Spinner";


const Shows = () => {

    const {user,setUser} = useContext(UserContext);
    const [recShows, setRecShows] = useState(null)
    const [topRatedShows, setTopRatedShows] = useState(null)
    const [popularShows, setPopularShows] = useState(null)
    const [allLiked, setAllLiked] = useState(null)
    const [updatedLiked, setUpdatedLiked] = useState(false)
    const [reloadRec, setReloadRec] = useState(false)
    
    const [isLoading, setIsLoading] = useState(true)
    

    useEffect(() => {

      //window.localStorage.getItem("loggedUser") RETURNS a string so use JSON.parse to access local storage vars
      let userTemp = user || JSON.parse(window.localStorage.getItem("loggedUser"));

      setIsLoading(true);
      if(userTemp){
        Promise.all([
          fetch(`${baseUrl}/shows/rec`, {
            method: 'GET', 
            headers:{
              'authorization': `Bearer ${userTemp.token}`,
              'Content-Type': 'application/json'
            }
          }),
          fetch(`${baseUrl}/shows`, {
            method: 'GET', 
          }),
          fetch(`${baseUrl}/shows/getliked`, {
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
        .then (([dataRec, dataDefault, dataLiked]) => {
          (dataRec.recommendedShows.length<1? setRecShows(null):setRecShows(dataRec.recommendedShows))
          setTopRatedShows(dataDefault.topRatedShows)
          setPopularShows(dataDefault.popularShows)
          setAllLiked(dataLiked.liked)
        }
      )
      .finally(() => setIsLoading(false)); // Stop loading once data is fetched
    }
    else{
      const fetchData = async () => {
        try {
          const dataDefault = await axios.get(`${baseUrl}/shows`);
          setTopRatedShows(dataDefault.data.topRatedShows)
          setPopularShows(dataDefault.data.popularShows)
        } catch (error) {
          console.error("Error fetching shows:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
    }, [reloadRec])

    const handleClick = () => {
      setUpdatedLiked(false)
      setReloadRec(!reloadRec)
    }

  return (

<div>
  {isLoading ? (
    <div className="spinner-container">
      <Spinner />
    </div>
  ) : (
    <>
  {updatedLiked&&user? <button type="button" className="btn btn-primary btn-sm refreshButton" onClick={handleClick}><i class="fa-solid fa-rotate-right"></i>&nbsp; Reload Recommended</button> :null }

    {user&&recShows? <DisplayRow setRefresh={setUpdatedLiked} header="Recommended" rowData={recShows} allLiked={allLiked}/> : null}
        <DisplayRow header="Popular" setRefresh={setUpdatedLiked} rowData={popularShows} allLiked={allLiked}/>
        <DisplayRow header="Top Rated" setRefresh={setUpdatedLiked} rowData={topRatedShows} allLiked={allLiked}/>
        
    </>
  )}
</div>



  )
}

export default Shows