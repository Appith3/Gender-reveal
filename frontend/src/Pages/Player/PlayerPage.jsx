import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sonography from '../../assets/SVGs/Sonography';
import { fetchSessionData } from '../../firebase/gameService'; 

const PlayerPage = () => {
	const [sessionCode, setSessionCode] = useState('');
	const [isValidSession, setIsValidSession] = useState(false);
	const [error, setError] = useState();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		// Obtén el sessionId de los parámetros de la URL
		const params = location.search;
		
		const [sessionId, _sessionCode] = params.split('&').map(param => param.split('=')[1]);
		_sessionCode && setSessionCode(_sessionCode)

		if (sessionId) {
			// Verifica la sesión usando fetchSessionData
			fetchSessionData(sessionId)
				.then((data) => {
					const { isActive, sessionId: id, sessionCode: code} = data;

					if( isActive ) {
						if(id === sessionId && code === _sessionCode) {
							setIsValidSession(true);
						} else {
							setError('Código de sesión inválido. Inténtalo de nuevo.')
						}
					} else {
						setError('La sesión a la que deseas ingresar se encuentra inactiva ')
					}
				})
				.catch((error) => {
					console.error("Error al validar la sesión: ", error);
					setIsValidSession(false);
				});
		}
}, [location.search]);

	const handlePlayClick = () => {
		if(isValidSession) {
			navigate('/game');
		} else {
			setError('Sesión no encontrada')
		}
	};

	return (
		<main className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-100 flex flex-col items-center justify-center gap-10">
			<header className="flex flex-col text-center">
					<span className="text-lg">Ingresa el código para jugar</span>
			</header>

			<section className='flex flex-col gap-8 justify-center items-center'>
				<div className='w-60 h-60 lg:w-96 lg:h-96 rounded-lg bg-sky-200 shadow-sm'>
					<Sonography />
				</div>

				<div>
					<label htmlFor="sessionCode" className="block text-sm lg:text-lg font-medium text-gray-700">
						Código de la sesión
					</label>
					<input
						type="text"
						id="sessionCode"	
						className="w-full px-3 py-2 border border-gray-300 rounded-md text-center text-xl lg:text-2xl font-bold"
						placeholder="Código aquí"
						aria-describedby="sessionCodeHelp"
						value={sessionCode}
						onChange={e => setSessionCode(e.target.value)}
					/>
					<p id="sessionCodeHelp" className="mt-2 text-sm lg:text-lg text-gray-500">
						Ingresa el código de la misma forma 
					</p>
				</div>

				<div className='flex flex-col min-w-full'>
					<button
							onClick={handlePlayClick}
							className='py-2 px-4 rounded-md bg-black text-white lg:hover:bg-neutral-700 text-base lg:text-lg text-center'
					>
						Jugar
					</button>

					{!isValidSession && <span className="text-red-500">{error}</span>}
				</div>

				<Link to='/login' className='py-2 px-4 min-w-full rounded-md border border-black lg:hover:bg-neutral-700 text-base lg:text-lg text-center'>
					Soy Host
				</Link>
			</section>
		</main>
	);
}

export default PlayerPage;