import "../CSS/MBTICircle.css";
function MBTICircle(props) {
  const { num, personality, backgroundColor, textColor } = props;
  return (
    <div class="circle">
      <a
        // href={`https://www.personality-database.com/type/${num}/${personality}-anime-characters`}
        href={`/mbti/${personality}`}
        style={{backgroundColor: backgroundColor, color: textColor}}
      >
        <span>{personality}</span>
      </a>
    </div>
  );
}
export default MBTICircle;
