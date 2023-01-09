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
  const toURL = (mbti) => {
    const mbtiMap = {
      istj: 1,
      estj: 2,
      isfj: 3,
      esfj: 4,
      esfp: 5,
      isfp: 6,
      estp: 7,
      istp: 8,
      infj: 9,
      enfj: 10,
      infp: 11,
      enfp: 12,
      intp: 13,
      entp: 14,
      intj: 15,
      entj: 16,
    };
    // Convert string to lowercase
    mbti = mbti.toLowerCase();

    // Replace string with corresponding number from charMap
    let num = mbtiMap[mbti];

    // Return URL with number
    return `https://www.personality-database.com/type/${num}/${mbti}-anime-characters`;
  };
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
      <h1
        style={{ marginTop: "3%", color: filter == "none" ? "red" : "black" }}
      >
        {header}
      </h1>
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
      {filter != "none" && objects.length == 0 && (
        <p style={{ textAlign: "center", marginTop: "3%" }}>
          暂无此类型的人<br/>
          <a
            href={toURL(filter)}
            target="_blank"
          >
            不妨来看看拥有此个性的动漫角色
          </a>
        </p>
      )}
      <div className="wall-arrow-section">
        <a className="wall-arrow" href="#/mbti">
          <Button>{filter === "none" ? "→" : "←"}</Button>
        </a>
      </div>
    </div>
  );
}

export default FilteredWall;
