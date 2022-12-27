import {React,useState,useEffect, useContext} from "react";
import { UserContext } from "../UserContext";


const Home = () => {

  const {user,setUser} = useContext(UserContext);

  //effect hook to check if user is already logged in by checking the local storage for a user object 
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
    console.log("CHECKING IF USER IN")

  }, [])

  return (
    <div>

      {user? 
      <p>User Logged In</p>:<p>User Not Logged In</p>
      }
      
      </div>
  )
}

export default Home