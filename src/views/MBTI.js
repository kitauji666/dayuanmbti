import MBTICircle from "../components/MBTICircle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/MBTI.css";
function MBTI() {
  const mbtiMap = {
    istj: {
      num: 1,
      backgroundColor: "#2f4f4f",
      textColor: "white",
    },
    estj: {
      num: 2,
      backgroundColor: "#a0522d",
      textColor: "white",
    },
    isfj: {
      num: 3,
      backgroundColor: "#006400",
      textColor: "white",
    },
    esfj: {
      num: 4,
      backgroundColor: "#4b0082",
      textColor: "white",
    },
    esfp: {
      num: 5,
      backgroundColor: "#ff0000",
      textColor: "white",
    },
    isfp: {
      num: 6,
      backgroundColor: "#ffa500",
      textColor: "white",
    },
    estp: {
      num: 7,
      backgroundColor: "#ffff00",
      textColor: "black",
    },
    istp: {
      num: 8,
      backgroundColor: "#00ff00",
      textColor: "black",
    },
    infj: {
      num: 9,
      backgroundColor: "#00fa9a",
      textColor: "black",
    },
    enfj: {
      num: 10,
      backgroundColor: "#00ffff",
      textColor: "black",
    },
    infp: {
      num: 11,
      backgroundColor: "#0000ff",
      textColor: "white",
    },
    enfp: {
      num: 12,
      backgroundColor: "#d8bfd8",
      textColor: "white",
    },
    intp: {
      num: 13,
      backgroundColor: "#ff00ff",
      textColor: "white",
    },
    entp: {
      num: 14,
      backgroundColor: "#1e90ff",
      textColor: "white",
    },
    intj: {
      num: 15,
      backgroundColor: "#f0e68c",
      textColor: "black",
    },
    entj: {
      num: 16,
      backgroundColor: "#ff69b4",
      textColor: "white",
    },
  };
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  function handleChange(event) {
    const { value } = event.target;
    setInput(value);
    setIsValid(/^[IE][NS][TF][JP]$/.test(value));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (input) {
      navigate(`/match/${input.toLowerCase()}`);
    }
  }

  return (
    <div>
      <h1 style={{marginTop:"3%"}}>全16种MBTI</h1>
      <div className="mbti-wall-section">
        <div className="mbti-wall">
          {Object.keys(mbtiMap).map((personality) => (
            <MBTICircle
              className="mbti-circle"
              key={personality}
              num={mbtiMap[personality]["num"]}
              personality={personality.toUpperCase()}
              backgroundColor={mbtiMap[personality]["backgroundColor"]}
              textColor={mbtiMap[personality]["textColor"]}
            />
          ))}
        </div>
      </div>
      <p style={{ textAlign: "center", marginTop: "3%" }}>
        点选圆圈可以查看该类型的群友
      </p>
      <div className="mbti-bottom-section">
        <img
          src="https://luhuadong.com/images/career/MBTI-01.jpg"
          alt="mbti-explanation"
          style={{ width: "40%" }}
        />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="请输入你的MBTI"
            pattern="^[IE][NS][TF][JP]$"
            value={input}
            onChange={handleChange}
          />
          <button type="submit">进行匹配</button>
        </form>
        {!isValid && <div style={{ color: "red" }}>请输入正确的MBTI</div>}
        <a
          href="https://www.16personalities.com/ch/%E4%BA%BA%E6%A0%BC%E6%B5%8B%E8%AF%95"
          target="_blank"
        >
          不清楚你的MBTI？点此进行测试{`>>`}
        </a>
        <br />
        <a href="#/">返回主页</a>
      </div>
    </div>
  );
}

export default MBTI;
