import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Ddont from "./Pages/Ddont";
import Depression from "./Pages/Depression";
// import PanicDisorder from "./pages/PanicDisorder";
// import SplitPersonality from "./pages/SplitPersonality";
// import Anxiety from "./pages/Anxiety";
// import EmotionalBurnout from "./pages/EmotionalBurnout";
// import IdentityCrisis from "./pages/IdentityCrisis";
// import Addiction from "./pages/Addiction";
// import OCD from "./pages/OCD";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Ddont />} />
      <Route path="/depression" element={<Depression />} />
      {/* <Route path="/panic-disorder" element={<PanicDisorder />} />
      <Route path="/split-personality" element={<SplitPersonality />} />
      <Route path="/anxiety" element={<Anxiety />} />
      <Route path="/emotional-burnout" element={<EmotionalBurnout />} />
      <Route path="/identity-crisis" element={<IdentityCrisis />} />
      <Route path="/addiction" element={<Addiction />} />
      <Route path="/ocd" element={<OCD />} /> */}
    </Routes>
  );
}
