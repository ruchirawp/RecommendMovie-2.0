import {React, useEffect, useContext, useState} from "react";
import Logo from "../public/images/logo.png";
import {Link} from "react-router-dom";
import "../styles.css";
import { UserContext } from "../UserContext";
import Search from "./search/SearchBar";
import emptySearch from "./search/Search";
import { Navigate } from 'react-router-dom';
import SearchBar from "./search/SearchBar";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setTier } from '../redux/slices/tierSlice'; 
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'; // Ticket
import StarIcon from '@mui/icons-material/Star'; // For Cinema Plus
import MovieFilterIcon from '@mui/icons-material/MovieFilter'; // For Director's Club


const Navbar = () => {

  const dispatch = useDispatch(); 
    const {user, setUser} = useContext(UserContext)
    const [active, setActive] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          dispatch(setTier(user.user.tier));
        }
      }, []);

      const handleLogout = () => {
          localStorage.clear();
          setUser(null);
          dispatch(setTier(""));
      };

        const tierStyles = {
          'Free Ticket': {
            background: '#393939',
            icon: "",
          },
          'Cinema Plus': {
            background: '#204585',
            icon: <StarIcon style={{ fontSize: 20, color: '#f1f3f6' }} />,
          },
          "Directors Cut": {
            background: '#ad3434',
            icon: <MovieFilterIcon style={{ fontSize: 20, color: '#f1f3f6' }} />,
          },
        };
        
        const userTier = user?.user?.tier || 'Free Ticket'; // Default to 'Free Ticket' if user is null or tier is undefined

        const { background, icon } = tierStyles[userTier] || {
          background: '#393939',
          icon: "",
        };
        
    return (
        
    <div className="siteNav">
        <nav className="navbar navbar-expand-lg navbar-dark navBarStyling" >
            <div className="container-fluid">

            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className={`nav-link`} to="/movies"> <img src={Logo} className="logo" /></Link>
                </li>
            </ul>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className={`nav-link link ${active==="movie"?`activeLink`:"inactiveLink"}`} to="/movies" 
                        onChange={()=> {
                            setActive("movie")
                            // console.log(active)
                    
                    }}>Movies</Link>

                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link link ${active==="show"?"activeLink":"inactiveLink"}`} to="/shows" onChange={()=> setActive("show")}>TV Shows</Link>
                    </li>

                    {/* {
                      user &&
                    <li className="nav-item">
                        <Link className={`nav-link link ${active==="about"?"activeLink":"inactiveLink"}`} to="/account" onChange={()=> setActive("account")}>Account</Link>
                    </li>

                    } */}

                </ul>
                <SearchBar/>
                <ul className="navbar-nav" style={{marginLeft: "20px"}}>
                {
                user?                    
                <li className="nav-item d-flex align-items-center" style={{ display: "flex", gap: "10px" }}>
                <span
                  style={{
                    backgroundColor: background,
                    padding: "4px 5px",
                    borderRadius: "10px",
                    fontWeight: 500,
                    color: "#f1f3f6",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span                  
                   style={{
                    marginBottom: "4px",
                    marginLeft: "2px",
                  }}
                  >{icon}</span>
                  <Link className="nav-link link" to="/account" style={{ color: "#f1f3f6" }}>
                    Hello, {user.user.name}
                  </Link>
                </span>

                <Link
                  className="nav-link"
                  onClick={handleLogout}
                  style={{ fontWeight: "bold" }}
                >
                  Logout
                </Link>
              </li>
                :
                <>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/register">Register</Link>
                    </li>
                </>
                }


                </ul>

            </div>
            </div>
        </nav>
    </div>
  );
};

export default Navbar;
