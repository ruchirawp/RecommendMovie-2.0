import {React,useState,useEffect, useContext} from "react";
import { UserContext } from "../UserContext";
import { useDispatch } from 'react-redux';
import { setTier } from '../redux/slices/tierSlice'; // adjust the path if needed


const Home = () => {

  const {user,setUser} = useContext(UserContext);
  const dispatch = useDispatch();

  //effect hook to check if user is already logged in by checking the local storage for a user object 
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      dispatch(setTier(user.user.tier));
    }
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