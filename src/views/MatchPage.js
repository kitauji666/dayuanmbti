import { useLocation } from "react-router";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import data from "../resources/data.json";
import axios from "axios";
import BasicInfoCard from "../components/BasicInfoCard";
import "../CSS/Home.css";
import Loader from "../components/Loader";
import "../CSS/MatchPage.css";
function MatchPage() {
  const location = useLocation();
  const mbti = location.pathname.split("/").pop().toUpperCase();
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostMatch, setMostMatch] = useState([]);
  const [leastMatch, setLeastMatch] = useState([]);

  useEffect(() => {
    async function fetchData() {
      for (const object of data) {
        const { data: info } = await axios.get(
          `https://api.usuuu.com/qq/${object.id}`
        );
        object.username = info.data.name;
        object.avatar = info.data.avatar;
      }
      setObjects(data);
      data.sort((a, b) => {
        const aLetters = a.mbti.split("");
        const bLetters = b.mbti.split("");
        const aMatch = aLetters.filter((letter) =>
          mbti.includes(letter)
        ).length;
        const bMatch = bLetters.filter((letter) =>
          mbti.includes(letter)
        ).length;
        return bMatch - aMatch;
      });
      const maxMatch = Math.max(
        ...data.map((item) => {
          const letters = item.mbti.split("");
          return letters.filter((letter) => mbti.includes(letter)).length;
        })
      );

      const minMatch = Math.min(
        ...data.map((item) => {
          const letters = item.mbti.split("");
          return letters.filter((letter) => mbti.includes(letter)).length;
        })
      );

      const mostMatchArray = data.filter((item) => {
        const letters = item.mbti.split("");
        return (
          letters.filter((letter) => mbti.includes(letter)).length === maxMatch
        );
      });
      const leastMatchArray = data.filter((item) => {
        const letters = item.mbti.split("");
        return (
          letters.filter((letter) => mbti.includes(letter)).length === minMatch
        );
      });
      setMostMatch(mostMatchArray);
      setLeastMatch(leastMatchArray);
      setLoading(false);
    }
    fetchData();
  }, []); // Only run the effect once
  if (loading) {
    return <Loader prompt="匹配中，请稍侯" />;
  }
  return (
    <div>
      <h1>你的MBTI是：{mbti}</h1>
      <div className="result-page" style={{ width: "80%", margin: "auto" }}>
        <h2 style={{ marginTop: "5%" }}>这些人和你最相似：</h2>
        <div className="match-page-wall">
          {mostMatch.map((object) => (
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
        <h2 style={{ marginTop: "5%" }}>这些人和你最不相似：</h2>
        <div className="match-page-wall">
          {leastMatch.map((object) => (
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
      </div>
      <div className="wall-arrow-section">
        <a className="wall-arrow" href="#/mbti">
          <Button>{"←"}</Button>
        </a>
      </div>
    </div>
  );
}
export default MatchPage;
