import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../pages";
import NavbarComp from "./NavbarComp";

function App() {
  return (
    <Router>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
