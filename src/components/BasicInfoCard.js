import "../CSS/BasicInfoCard.css";

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

function BasicInfoCard(props) {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            className="avatar"
            style={{ filter: props.offline ? "grayscale(100%)" : "" }}
            src={`http://q.qlogo.cn/headimg_dl?dst_uin=${props.id}&spec=640&img_type=jpg`}
            // src={props.avatar}
            alt="Avatar"
          />
        </div>
        <div className="flip-card-back">
          <div className="basic-info-card-info">
            <h1 className="flip-card-username">{props.name}</h1>
            <p className="flip-card-mbti">MBTI: {props.mbti}</p>
            <a
              className="flip-card-link"
              href={toURL(props.mbti)}
              target="_blank"
            >
              {props.mbti}的动漫角色
            </a>
            <a
              className="flip-card-link"
              href={`#/bgm/${props.bgm}`}
              target="_blank"
            >
              {props.name}的bangumi
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfoCard;
