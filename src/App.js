import React from "react";
import "./App.css";
import Movies from "./components/movies";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

function App() {
  return (
    <main role="main" className="container">
      <h1 className="text-center mb-3">Movies Table</h1>
      <Movies />
    </main>
  );
}

export default App;
