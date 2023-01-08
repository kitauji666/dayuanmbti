import React, { useState, useEffect } from "react";
import data from "../resources/data.json";
import axios from "axios";
import BasicInfoCard from "../components/BasicInfoCard";
import "../CSS/Home.css";
import Loader from "../components/Loader"
import FilteredWall from "../components/FilteredWall";
function Home() {
  const rand = Math.random();
  let header = "大院名人墙";
  if (rand < 0.3) {
    header = "答辩名人墙";
  } else if (rand < 0.5) {
    header = "大院冥人墙";
  }
  return (
    <div>
      <FilteredWall filter="none" header={header}/>
    </div>
  );
}

export default Home;
