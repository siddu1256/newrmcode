import React from "react";
import LeftSide from "./left";
import RightSide from "./right";
import SearchBar from "./searchbar";
import "./index.css";

function App() {
  return (
    <div className="App">
      <SearchBar />
      <div className="content-wrapper">
        <LeftSide />
        <RightSide />
      </div>
    </div>
  );
}
export default App;
