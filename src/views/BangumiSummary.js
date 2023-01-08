import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Bangumi from '../components/Bangumi';
import data from "../resources/data.json";

function BangumiSummary() {
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  if (id === 'notfound') {
    return(
      <p style={{textAlign:"center", position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"}}>TA似乎不在Bangumi上玩耍😢</p>
    );
  }
  return (
    <div>
      <Bangumi id={id}/>
    </div>
  );
}

export default BangumiSummary;