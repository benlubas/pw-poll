import React from "react";
import { Router, Link, Route } from "react-router";
import Navbar from "./components/Navbar";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import PollsPage from "./components/pages/PollsPage";

function App() {
  return <PollsPage />;
}

export default App;
