import { useLocation } from "react-router";
import FilteredWall from "../components/FilteredWall";
function MBTIGroup() {
  const location = useLocation();
  const mbti = location.pathname.split('/').pop();
  return (
    <div>
      <FilteredWall filter={mbti} header={`${mbti}人群`}/>
    </div>
  );
}
export default MBTIGroup;