import { Link } from 'react-router-dom'

const ConfigPage = () => {
	// TODO: Add girl image

	return (
		<div className='min-h-screen bg-gradient-to-b from-pink-100 to-blue-100 flex flex-col items-center justify-center p-4'>
			<section className='absolute top-4 right-4'>
				<span className='text-base font-semibold'>Id de la sesión: </span>
				<span className='italic'>123-456</span>
			</section>
			<button className='absolute top-4 left-4 border border-black hover:bg-neutral-700 hover:text-white rounded-md text-black py-2 px-4'>
				<Link to='/' className='text-base font-semibold'>
					Regresar
				</Link>
			</button>
			<main className='flex flex-col gap-8 justify-center items-center'>
				<h1 className='text-3xl'>¿Es niño ó niña?</h1>
				<div className='flex flex-row gap-12'>
					<button className='bg-white rounded-lg shadow-xl p-4 max-w-md w-full text-center hover:shadow-2xl hover:shadow-blue-500 hover:transition-shadow hover:duration-300 focus:shadow-2xl focus:shadow-blue-500'>
						<img src='\images\boy.png' alt='boy' />
						<h2 className='text-2xl'>Niño</h2>
					</button>

					<button className='bg-white rounded-lg shadow-xl p-4 max-w-md w-full text-center hover:shadow-2xl hover:shadow-pink-500 hover:transition-shadow hover:duration-300 focus:shadow-2xl focus:shadow-pink-500'>
						<img src='\images\boy.png' alt='boy' />
						<h2 className='text-2xl'>Niña</h2>
					</button>
				</div>
			</main>
    </div>
	)
}

export default ConfigPage