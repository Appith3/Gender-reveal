import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import ConfigPage from "./components/ConfigPage";
import GamePage from "./components/GamePage";
import FinalPage from "./components/FinalPage";
import PlayerPage from "./components/PlayerPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />

        <Route path="/config" element={<ConfigPage />} />

        <Route path="/game" element={<GamePage />} />

        <Route path="/final" element={<FinalPage />} />

        <Route path="/player" element={<PlayerPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
