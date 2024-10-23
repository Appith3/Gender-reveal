import { Link } from 'react-router-dom'
import useGameStore from '../../store/useGameStore'
import { updateGender } from '../../firebase/gameService'
import { useState } from 'react'

const ConfigPage = () => {
	const [buttonMessage, setButtonMessage] = useState('Una vez guardada la selección ya no se puede cambiar')

	const babyGender = useGameStore((state) => state.babyGender);
	const setBabyGender = useGameStore((state) => state.setBabyGender);
	const sessionId = useGameStore((state) => state.sessionId);
	const hostId = useGameStore((state) => state.hostId);

	const handleClickGenderButton = (e) => {
		let gender = e.target.title;
		setBabyGender(gender);
	}

	const handleSaveGender = () => {
		if(babyGender) {
			updateGender(sessionId, babyGender)
		} else {
			setButtonMessage('Primero debe elegir un genero para el bebé')
		}
	}

	return (
		<div className='min-h-screen bg-gradient-to-b from-pink-100 to-blue-100 flex flex-col items-center justify-center p-4'>
			<section className='absolute top-4 flex flex-col-reverse gap-4 md:flex-row-reverse md:justify-around md:w-full'>
				<section className='flex flex-col border border-black rounded py-1 px-2 bg-cyan-300'>
					<div>
						<span className='text-base font-semibold'>Id de la sesión: </span>
						<span className='italic'>{sessionId}</span>
					</div>
					<div>
						<span className='text-base font-semibold'>Host id: </span>
						<span className='italic'>{hostId}</span>
					</div>
				</section>

				<Link to='/' className='border border-black hover:bg-neutral-700 hover:text-white rounded-md text-black py-2 px-4 text-base font-semibold text-center md:h-fit'>
					Regresar
				</Link>
			</section>

			<main className='flex flex-col gap-8 justify-center items-center'>
				<h1 className='text-3xl'>¿Es niño ó niña?</h1>
				<div className='flex flex-row gap-12'>
					<button onClick={handleClickGenderButton} value={'niño'} className='bg-white rounded-lg shadow-xl p-4 max-w-md w-full text-center hover:shadow-2xl hover:shadow-blue-500 hover:transition-shadow hover:duration-300 focus:shadow-2xl focus:shadow-blue-500 active:opacity-50'>
						<img src='\images\boy.png' alt='niño' title='niño'/>
						<h2 className='text-2xl'>Niño</h2>
					</button>

					<button onClick={handleClickGenderButton} value={'niña'} className='bg-white rounded-lg shadow-xl p-4 max-w-md w-full text-center hover:shadow-2xl hover:shadow-pink-500 hover:transition-shadow hover:duration-300 focus:shadow-2xl focus:shadow-pink-500 active:opacity-50'>
						<img src='\images\girl.png' alt='niña' title='niña'/>
						<h2 className='text-2xl'>Niña</h2>
					</button>
				</div>

				<section>
					<button className='border border-black hover:bg-neutral-700 hover:text-white rounded-md text-black py-2 px-4 text-base font-semibold text-center w-full' onClick={handleSaveGender}>Guardar elección</button>
					<p className='text-base font-light'>{buttonMessage}</p>
				</section>
			</main>
			

    </div>
	);
}

export default ConfigPage