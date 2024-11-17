import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { Bolt } from 'lucide-react';

import useGameStore from '../../store/useGameStore';

import { listenToGameChanges, updateGameStatus, setTotalBallonLife } from '../../firebase/gameService';

const WelcomePage = () => {
	const navigate = useNavigate();

	const sessionId = useGameStore((state) => state.sessionId);
	const sessionCode = useGameStore((state) => state.sessionCode);
	const hostId = useGameStore((state) => state.hostId);
	const isAuth = useGameStore((state) => state.isAuth);
	const playersCount = useGameStore((state) => state.playersCount);
	const balloonLife = useGameStore((state) => state.balloonLife);
	const setGameData = useGameStore((state) => state.setGameData);
	
	useEffect(() => {
		if (isAuth && hostId) {
      navigate(`/welcome/?sessionId=${sessionId}`);
      return;
    }
	}, []);

	useEffect(() => {
		const updateGameData = (gameData) => {
			setGameData(gameData);
		};

		const unsubscribe = listenToGameChanges(sessionId, updateGameData);

		return () => unsubscribe();
	}, [sessionId, setGameData]);

	const handleStartGame = () => {
		updateGameStatus(sessionId, 'in-progress');
		setTotalBallonLife(sessionId, balloonLife)
	};

	const isDev = import.meta.env.VITE_ENV === 'dev'
	const qrValue = isDev ? `http://${import.meta.env.VITE_IP}:5173/?session=${sessionId}&code=${sessionCode}` : `http://${window.location.host}/?session=${sessionId}&code=${sessionCode}`;

	return (
		<main className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-100 flex flex-col gap-4 items-center justify-center p-4">
			<section className="absolute top-4 right-4">
				<span className='text-base font-semibold'>Id de la sesión: </span>
				<span className='italic'>{sessionId}</span>
			</section>

			<section className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
				<h1 className="text-3xl font-bold mb-4 text-gray-800">¿Es niño ó niña?</h1>
				<p className="text-lg mb-6 text-gray-600">Bienvenido a este momento especial! Escanea el código QR e ingresa el código para jugar.</p>
				
				<div className="mb-6">
					<QRCode
						size={256}
						style={{ height: "auto", maxWidth: "100%", width: "100%" }}
						value={qrValue}
						viewBox={`0 0 256 256`}
					/>
				</div>
				
				<label htmlFor="gameCode" className="block font-semibold text-4xl text-gray-700 mb-6">
					Código: {sessionCode}
				</label>

				<button className="w-full bg-black hover:bg-neutral-700 rounded-md text-white py-2 px-4">
					<Link to="/game" className='text-xl' onClick={handleStartGame}>
						Comenzar el juego
					</Link>
				</button>
			</section>

			<section className='bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center'>
				<span className="block font-semibold text-2xl text-gray-700">
					Jugadores activos: {playersCount}
				</span>
			</section>

			<button className="absolute top-4 left-4 border border-black hover:bg-neutral-700 hover:text-white rounded-md text-black py-2 px-4">
				<Link to="/config" className='text-lg flex flex-row gap-2 justify-center items-center'>
					<Bolt /> Configuración
				</Link>
			</button>
		</main>
	);
};

export default WelcomePage;
