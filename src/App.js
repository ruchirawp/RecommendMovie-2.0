import { Routes, Route,Link, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Movies from './components/movies/Movies';
import Login from './components/Login';
import { UserContext, SearchContext } from './UserContext';
import { useState } from "react";
import Footer from './components/Footer';
import Search from './components/search/Search';
import Shows from './components/shows/Shows';
import About from './components/About';

function App() {

  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            <Navbar />
            <Routes>
              <Route path="/search" element={searchQuery ? <Search query={searchQuery} /> : <Navigate to="/movies" />} />
              <Route path='/movies' element={<Movies />} />
              <Route path="/" element={<Navigate to="/movies" />} />
              <Route path="/shows" element={<Shows />} />
              <Route path="/register" element={user ? <Navigate to="/movies" /> : <Register />} />
              <Route path="/login" element={user ? <Navigate to="/movies" /> : <Login />} />
            </Routes>
            <Footer />
        </SearchContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
