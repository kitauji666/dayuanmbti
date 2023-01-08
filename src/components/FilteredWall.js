import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import data from "../resources/data.json";
import axios from "axios";
import BasicInfoCard from "../components/BasicInfoCard";
import "../CSS/Home.css";
import "../CSS/FilteredWall.css";
import Loader from "../components/Loader";
function FilteredWall(props) {
  const { filter, header } = props;
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      for (const object of data) {
        const { data: info } = await axios.get(
          `https://api.usuuu.com/qq/${object.id}`
        );
        object.username = info.data.name;
        object.avatar = info.data.avatar;
      }
      if (filter == "none") {
        setObjects(data);
      } else {
        setObjects(data.filter((item) => item.mbti === filter));
      }
      setLoading(false);
    }
    fetchData();
  }, []); // Only run the effect once
  if (loading) {
    if (filter == "none") {
      return <Loader prompt="开盒中，请稍侯，，，" />;
    } else {
      return <Loader prompt="筛选中，请稍侯" />;
    }
  }
  return (
    <div>
      <h1 style={{ marginTop:"3%", color: filter == "none" ? "red" : "black" }}>{header}</h1>
      <div className="wall">
        {objects.map((object) => (
          <div className="card" key={object.id}>
            <BasicInfoCard
              id={object.id}
              name={object.username}
              avatar={object.avatar}
              mbti={object.mbti}
              bgm={object.bgm ? object.bgm : "notfound"}
              offline={object.offline}
            />
          </div>
        ))}
      </div>
      {filter != "none" && objects.length == 0 && <p style={{textAlign:"center", marginTop:"3%"}}>暂无此类型的人</p>}
      <div className="wall-arrow-section">
        <a className="wall-arrow" href="/mbti">
          <Button>{filter === "none" ? "→" : "←"}</Button>
        </a>
      </div>
    </div>
  );
}

export default FilteredWall;
