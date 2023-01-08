import "./App.css";
import Home from "./views/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BangumiSummary from "./views/BangumiSummary";
import MBTI from "./views/MBTI";
import MBTIGroup from "./views/MBTIGroup";
import MatchPage from "./views/MatchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dayuanmbti" element={<Home/>} />
        <Route path="/bgm/:id" element={<BangumiSummary/>} />
        <Route path="/mbti" element={<MBTI/>} />
        <Route path="/mbti/:id" element={<MBTIGroup/>} />
        <Route path="/match/:id" element={<MatchPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
