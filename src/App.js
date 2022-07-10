import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components";
import { Home, Routines, Activities, MyRoutines } from "./routes";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const BASE_URL = 'https://secure-tundra-59702.herokuapp.com/api/'
  const [authToken, setAuthToken] = useState(window.localStorage.getItem('ft-token'));
  const [username, setUsername] = useState(window.localStorage.getItem('ft-username'));

  return (
    <div>
      <Navigation authToken={authToken} setAuthToken={setAuthToken} username={username} setUsername={setUsername} BASE_URL={BASE_URL} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/routines' element={<Routines BASE_URL={BASE_URL} />} />
          <Route path='/activities' element={<Activities BASE_URL={BASE_URL} authToken={authToken} />} />
          <Route path='/my-routines' element={<MyRoutines BASE_URL={BASE_URL} authToken={authToken} username={username} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
