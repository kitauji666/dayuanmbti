import axios from "axios";
import "../CSS/AnimeCard.css";
import { useState, useEffect, React } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function AnimeCard(props) {
  const [imageUrl, setImageUrl] = useState("");
  const [animeName, setAnimeName] = useState("");
  const [animeEpNum, setAnimeEpNum] = useState("");
  const [animeStartDate, setAnimeStartDate] = useState("");
  const [animeRank, setAnimeRank] = useState("");
  const [animeScore, setAnimeScore] = useState("");
  const [animeDirector, setAnimeDirector] = useState("");
  const [animeProduction, setAnimeProduction] = useState("");
  const [animeTopTags, setAnimeTopTags] = useState([]);
  const [errorLoading, setErrorLoading] = useState(true);
  useEffect(() => {
    try {
      setFields();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getInfo = (response, key, alterKey) => {
    const object = response.data.infobox.find((item) => item.key === key);
    if (object) {
      if (
        typeof object.value === "string" ||
        typeof object.value === "number"
      ) {
        return object.value;
      } else {
        return "";
      }
    } else {
      const object2 = response.data.infobox.find(
        (item) => item.key === alterKey
      );
      if (object2) {
        return object2.value;
      } else {
        console.log("Object not found");
        return "";
      }
    }
  };
  const setFields = () => {
    axios
      .get(`https://api.bgm.tv/v0/subjects/${props.subjectId}`)
      .then((response) => {
        const url = response.data.images.large;
        // const object = response.data.infobox.find((item) => item.key === "中文名");
        // console.log(object);
        // let name = "";
        // if (object) {
        //   name = object.value;
        // } else {
        //   console.log("Object not found");
        // }
        let name = getInfo(response, "中文名");
        // const name = response.data.infobox["中文名"];
        // const epNum = response.data.infobox[2].value;
        const director = getInfo(response, "导演");
        const production = getInfo(response, "动画制作", "制作");
        if (!name) {
          name = response.data.name;
        }
        console.log(response.data);
        const epNum = getInfo(response, "话数");
        const startDate = getInfo(response, "放送开始", "上映年度");
        const rank = response.data.rating.rank;
        const score = response.data.rating.score;
        const tags = response.data.tags.slice(0, 3).map((ele) => {
          return ele.name;
        });
        setImageUrl(url);
        setAnimeName(name);
        setAnimeEpNum(epNum);
        setAnimeStartDate(startDate);
        setAnimeDirector(director);
        setAnimeProduction(production);
        setAnimeRank(rank);
        setAnimeScore(score);
        setAnimeTopTags(tags);
        setErrorLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (errorLoading) {
    return <div></div>;
  }
  return (
    <div className="anime-card">
      <div className="anime-card-left-section">
        <div className="poster">
          <img src={imageUrl} alt="" />
        </div>
      </div>
      <div className="anime-card-info">
        <h1>{animeName}</h1>
        {animeDirector && <p>导演：{animeDirector}</p>}
        {animeProduction && <p>制作：{animeProduction}</p>}
        <p>共{animeEpNum}话</p>
        {animeStartDate && <p>{animeStartDate}播出</p>}
        <p>
          Bangumi评分：{animeScore}，排名{animeRank}位
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>{props.user}</span>的打分：
          {props.userrate}
        </p>
        {props.comment && (
          <p>
            <span style={{ fontWeight: "bold" }}>{props.user}</span>的评价是：
            <span className="anime-card-comment">{props.comment}</span>
          </p>
        )}
        {/* <p>
          热门标签：
          {animeTopTags.map((ele) => {
            return <span>{ele}</span>;
          })}
        </p> */}
        <a
          href={`https://bangumi.tv/subject/${props.subjectId}`}
          target="_blank"
        >
          Bangumi详细页面
        </a>
      </div>
    </div>
  );
}

export default AnimeCard;
