import "../CSS/Loader.css";
function Loader(props) {
  const { prompt } = props;
  return (
    <div className="loader-section">
      <div class="loader"></div>
      <p>{prompt}</p>
    </div>
  );
}
export default Loader;
