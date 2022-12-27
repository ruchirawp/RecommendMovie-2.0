import {React,useState,useEffect, useContext} from "react";
import { UserContext } from "../../UserContext";
import DisplayRow from "../display/DisplayRow";
import axios from 'axios'
import { baseUrl } from "../../services/baseValues";

const Shows = () => {

    const {user,setUser} = useContext(UserContext);
    const [recShows, setRecShows] = useState(null)
    const [topRatedShows, setTopRatedShows] = useState(null)
    const [popularShows, setPopularShows] = useState(null)
    const [allLiked, setAllLiked] = useState(null)


    useEffect(() => {

      //window.localStorage.getItem("loggedUser") RETURNS a string so use JSON.parse to access local storage vars
      let userTemp = user || JSON.parse(window.localStorage.getItem("loggedUser"));

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
    }
    else{
      const fetchData = async () => {
        const dataDefault = await axios(
          // `http://localhost:3001/shows`
          `${baseUrl}/shows`
        );
        setTopRatedShows(dataDefault.data.topRatedShows)
        setPopularShows(dataDefault.data.popularShows)
        // setGitData({ data: respGlobal.data, repos: respGlobal.data });
      };
      fetchData();
    }
    }, [])

  return (
    <div>
        {user&&recShows? <DisplayRow header="Recommended" rowData={recShows} allLiked={allLiked}/> : null}
        <DisplayRow header="Popular" rowData={popularShows} allLiked={allLiked}/>
        <DisplayRow header="Top Rated" rowData={topRatedShows} allLiked={allLiked}/>
        </div>
  )
}

export default Shows