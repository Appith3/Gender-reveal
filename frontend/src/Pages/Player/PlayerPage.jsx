import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScanQr from '../../assets/SVGs/ScanQr'

const PlayerPage = () => {
	const [sessionCode, setSessionCode] = useState('')

	return (
		<main className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-100 flex flex-col items-center justify-center gap-10">
			<header className="flex flex-col text-center">
				<span className="text-lg">Ingresa el código para jugar</span>
			</header>

			<section className='flex flex-col gap-8 justify-center items-center'>
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

				
				<Link to='/game' className='py-2 px-4 w-full rounded-md bg-black text-white lg:hover:bg-neutral-700 text-base lg:text-lg text-center'>
					Jugar
				</Link>
			</section>
		</main>
	)
}

export default PlayerPage