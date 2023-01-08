import "./App.css";
import Home from "./views/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import BangumiSummary from "./views/BangumiSummary";
import MBTI from "./views/MBTI";
import MBTIGroup from "./views/MBTIGroup";
import MatchPage from "./views/MatchPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dayuanmbti/bgm/:id" element={<BangumiSummary />} />
      <Route path="/mbti" element={<MBTI />} />
      <Route path="/mbti/:id" element={<MBTIGroup />} />
      <Route path="/match/:id" element={<MatchPage />} />
    </Routes>
  );
}

export default App;
