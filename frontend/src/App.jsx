import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// player components
import PlayerPage from './Pages/Player/PlayerPage';
// host components
import WelcomePage from "./Pages/Host/WelcomePage";
import ConfigPage from "./Pages/Host/ConfigPage";
import GamePage from "./Pages/Host/GamePage";
import PlayerGamePage from "./Pages/Player/GamePage";

function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

function PlayerRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlayerPage />} />
        <Route path="/game" element={<PlayerGamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

function HostRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  return (
    <div>
      {isMobile ? <PlayerRoutes /> : <HostRoutes />}
    </div>
  );
};

export default App;
