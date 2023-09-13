import React, { useReducer, createContext } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Logout from './components/Logout';
import { initialState, reducer } from '../src/reducer/UseReducer';

import Errorpage from './components/Errorpage';

export const UserContext=createContext();

//context api is used to make states available for multiple branches

const Routing=()=>{
  return(
    <switch>
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/signin" element={<Signin />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/logout" element={<Logout />}/>
      <Route path="*" element={<Errorpage />}/>
    </Routes>
    </switch>
    
  );
}

const App = () => {
  const [state, dispatch]=useReducer(reducer, initialState);
  return (
    
    <>
    <UserContext.Provider value={{state, dispatch}}>
      <Navbar />
      <Routing />
      </UserContext.Provider>
    </>
  );
}
export default App;