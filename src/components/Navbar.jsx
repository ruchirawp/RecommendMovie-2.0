import {React, useEffect, useContext, useState} from "react";
import Logo from "../public/images/logo.png";
import {Link} from "react-router-dom";
import "../styles.css";
import { UserContext } from "../UserContext";
import Search from "./search/SearchBar";
import emptySearch from "./search/Search";
import { Navigate } from 'react-router-dom';
import SearchBar from "./search/SearchBar";


const Navbar = () => {

    const {user, setUser} = useContext(UserContext)
    const [active, setActive] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
        }
      }, [])

      const handleLogout = () => {
          localStorage.clear();
          setUser(null);
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
                            console.log(active)
                    
                    }}>Movies</Link>

                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link link ${active==="show"?"activeLink":"inactiveLink"}`} to="/shows" onChange={()=> setActive("show")}>TV Shows</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className={`nav-link link ${active==="about"?"activeLink":"inactiveLink"}`} to="/about" onChange={()=> setActive("about")}>About</Link>
                    </li> */}
                </ul>
                <SearchBar/>
                <ul className="navbar-nav" style={{marginLeft: "50px"}}>
                {
                user?                    
                 <li className="nav-item">
                        <Link className="nav-link active" onClick={handleLogout} >Logout</Link>
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
