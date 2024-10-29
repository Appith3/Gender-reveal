import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import useGameStore from "./store/useGameStore";

// player components
import PlayerPage from './Pages/Player/PlayerPage';
// host components
import WelcomePage from "./Pages/Host/WelcomePage";
import ConfigPage from "./Pages/Host/ConfigPage";
import GamePage from "./Pages/Host/GamePage";
import PlayerGamePage from "./Pages/Player/GamePage";
// Globales
import LoginPage from "./Pages/Host/LoginPage";

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/" />;
};

function isMobileDevice() {
	return /Mobi|Android/i.test(navigator.userAgent);
}

function PlayerRoutes() {
	const isAuthenticated = useGameStore((state) => state.isAuth);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PlayerPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/game" element={<PlayerGamePage />} />
				<Route path="/config" element={<PrivateRoute element={<ConfigPage />} isAuthenticated={isAuthenticated} />} />
			</Routes>
		</BrowserRouter>
	);
}

function HostRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/welcome" element={<WelcomePage />} />
				<Route path="/config" element={<ConfigPage />} />
				<Route path="/game" element={<GamePage />} />
			</Routes>
		</BrowserRouter>
	);
}

const App = () => {

	const isMobile = useGameStore((state) => state.isMobile);
	const setIsMobile = useGameStore((state) => state.setIsMobile);
	
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
