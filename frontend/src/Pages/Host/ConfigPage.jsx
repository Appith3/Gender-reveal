import { Link } from 'react-router-dom'
import useGameStore from '../../store/useGameStore'

const ConfigPage = () => {
	const setBabyGender = useGameStore((state) => state.setBabyGender)
	const sessionID = useGameStore((state) => state.sessionID)
	const hostId = useGameStore((state) => state.hostId)

	const handleClickGenderButton = (e) => {
		let gender = e.target.title;
		setBabyGender(gender)
	}

	return (
		<div className='min-h-screen bg-gradient-to-b from-pink-100 to-blue-100 flex flex-col items-center justify-center p-4'>
			<section className='absolute top-4 right-4 flex flex-col'>
				<div>
					<span className='text-base font-semibold'>Id de la sesión: </span>
					<span className='italic'>{sessionID}</span>
				</div>
				<div>
				<span className='text-base font-semibold'>Host id: </span>
				<span className='italic'>{hostId}</span>
				</div>
			</section>
			<button className='absolute top-4 left-4 border border-black hover:bg-neutral-700 hover:text-white rounded-md text-black py-2 px-4'>
				<Link to='/' className='text-base font-semibold'>
					Regresar
				</Link>
			</button>
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
			</main>
    </div>
	)
}

export default ConfigPage