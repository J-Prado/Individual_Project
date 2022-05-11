import React from "react";

import { Routes, Route } from "react-router-dom";

import "./App.css";

import { Detail } from "./components/CharDetail/detail";
import { CreationPage } from "./components/CreationPage/creationPage";
import { Home } from "./components/HomePage/home";
import { LandingPage } from "./components/LandingPage/landingPage.jsx";

function App() {
  return (
    //Instead of div as it will be more than an element rendering a react fragment is going to be used
    <React.Fragment>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="create" element={<CreationPage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
