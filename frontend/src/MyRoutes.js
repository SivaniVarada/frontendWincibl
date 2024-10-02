import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Ddont from "./Pages/Ddont";
import Depression from "./Pages/Depression";


export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/analyse" element={<Ddont />} />
      <Route path="/depression" element={<Depression />} />
  
    </Routes>
  );
}
