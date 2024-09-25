import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./Pages/Host/WelcomePage";
import ConfigPage from "./Pages/Host/ConfigPage";
import GamePage from "./Pages/Host/GamePage";
import PlayerPage from "./Pages/Player/PlayerPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />

        <Route path="/config" element={<ConfigPage />} />

        <Route path="/game" element={<GamePage />} />

        <Route path="/player" element={<PlayerPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
