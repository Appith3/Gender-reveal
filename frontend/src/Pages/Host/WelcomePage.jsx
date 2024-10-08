import { Link } from 'react-router-dom'
import QRCode from 'react-qr-code'

import useGameStore from '../../store/useGameStore'

const WelcomePage = () => {
	const sessionID = useGameStore((state) => state.sessionID);
	const sessionCode = useGameStore((state) => state.sessionCode)

	return (
		<div className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-100 flex flex-col items-center justify-center p-4">
			<section className="absolute top-4 right-4">
				<span className='text-base font-semibold'>Id de la sesión: </span>
				<span className='italic'>{sessionID}</span>
			</section>
			<main className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
				<h1 className="text-3xl font-bold mb-4 text-gray-800">¿Es niño ó niña?</h1>
				<p className="text-lg mb-6 text-gray-600">Bienvenido a este momento especial! Escanea el código QR e ingresa el código para jugar.</p>
				
				<div className="mb-6">
						<QRCode
							size={256}
							style={{ height: "auto", maxWidth: "100%", width: "100%" }}
							value={`http://192.168.0.101:5173/player?sessionId=${sessionID}`}
							viewBox={`0 0 256 256`}
						/>
				</div>
				
					<label htmlFor="gameCode" className="block font-semibold text-4xl text-gray-700 mb-6">
						Código: {sessionCode}
					</label>

					<button className="w-full bg-black hover:bg-neutral-700 rounded-md text-white py-2 px-4">
						<Link to="/game" className='text-xl'>
							Comenzar el juego
						</Link>
					</button>
			</main>
			<button className="absolute top-4 left-4 border border-black hover:bg-neutral-700 hover:text-white rounded-md text-black py-2 px-4">
				<Link to="/config" className='text-lg'>
					⚙ Configuración
				</Link>
			</button>
		</div>
	)
}

export default WelcomePage