import { useEffect, useState } from 'react';
import { ChevronDown, Info, Heart, Eye, EyeOff } from 'lucide-react'
import { updateGender, updateGameDuration } from '../../firebase/gameService';
import useGameStore from '../../store/useGameStore';
import toast, { Toaster } from 'react-hot-toast'

const ConfigPage = () => {
	const babyGender = useGameStore((state) => state.babyGender);
	const setBabyGender = useGameStore((state) => state.setBabyGender);
	const sessionId = useGameStore((state) => state.sessionId);
	const hostId = useGameStore((state) => state.hostId);
	const sessionCode = useGameStore((state) => state.sessionCode);
	const gameDuration = useGameStore((state) => state.gameDuration);
	const setGameDuration = useGameStore((state) => state.setGameDuration);

	const [hideGender, setHideGender] = useState(false)
	const isDev = import.meta.env.VITE_ENV === 'dev'

	const handleClickGenderButton = (gender) => {
		if(!hideGender) {
			setBabyGender(gender);
		}
	};
	
	const saveConfiguration = () => {
		updateGender(sessionId, babyGender);
		updateGameDuration(sessionId, gameDuration)
		setHideGender(true);

		toast.success('Configuración guardada con éxito!', {
      duration: 3000,
      position: 'top-center',
    })
  };

	useEffect(() => {
		if(babyGender) {
			setHideGender(true);
		}
	},[])

	return (
		<main className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Configuración del Juego</h1>
				
				{/* Sección de género del bebé */}
				<section className="bg-white shadow rounded-lg mb-6 p-6">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">Género del Bebé</h2>
					<div className="flex space-x-4 mb-4">
						<button
							onClick={() => handleClickGenderButton('niño')}
							className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
									babyGender === 'niño' 
									? hideGender ? 'bg-slate-800 text-gray-700 opacity-50 cursor-not-allowed filter blur-[2px]' : 'bg-blue-500 text-white' 
									: hideGender ? 'bg-slate-800 text-gray-700 opacity-50 cursor-not-allowed filter blur-[2px]' : 'bg-gray-200 text-gray-700'
							}  flex flex-col justify-center items-center`}
							disabled={hideGender}
							aria-hidden={hideGender}
						>
							<img src='\images\boy.png' alt='niño' title='niño' className='w-32 h-32'/>
							Niño
						</button>
						<button
							onClick={() => handleClickGenderButton('niña')}
							className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
									babyGender === 'niña' 
									? hideGender ? 'bg-slate-800 text-gray-700 opacity-50 cursor-not-allowed filter blur-[2px]' : 'bg-pink-500 text-white' 
									: hideGender ? 'bg-slate-800 text-gray-700 opacity-50 cursor-not-allowed filter blur-[2px]' : 'bg-gray-200 text-gray-700'
							} flex flex-col justify-center items-center`}
							disabled={hideGender}
							aria-hidden={hideGender}
						>
							<img src='\images\girl.png' alt='niña' title='niña' className='w-32 h-32'/>
							Niña
						</button>
					</div>

					{
						isDev 
						? (
							<div className="flex items-center">
								<input
									type="checkbox"
									id="hideGender"
									checked={hideGender}
									onChange={(e) => setHideGender(e.target.checked)}
									className="mr-2"
								/>
								<label htmlFor="hideGender" className="text-sm text-gray-600 flex items-center">
									{hideGender ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
									{hideGender ? 'Ocultar género' : 'Mostrar género'}
								</label>
							</div>
						)
						: null
					}
				</section>
				
				{/* Sección de información de la sesión */}
				<section className="bg-white shadow rounded-lg mb-6 p-6">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">Información de la Sesión</h2>
					<div className="space-y-2">
						<p className="text-gray-600"><span className="font-medium">ID del host:</span> {hostId}</p>
						<p className="text-gray-600"><span className="font-medium">ID de Sesión:</span> {sessionId}</p>
						<p className="text-gray-600"><span className="font-medium">Código de la sesión:</span> {sessionCode}</p>
					</div>
				</section>
				
				{/* Sección de vida del globo */}
				<section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Duración del Juego</h2>
          <p className="text-sm text-gray-600 mb-4">
            La vida del globo determina la duración del juego. Cada corazón representa 3 minutos de juego.
          </p>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((duration) => (
              <button
                key={duration}
                onClick={() => setGameDuration(duration)} // Actualizar gameDuration en el store
              >
                <Heart 
                  className={`w-8 h-8 ${
                    duration <= gameDuration ? 'text-red-500 fill-current' : 'text-gray-300'
                  }`} 
                />
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Duración del juego: {gameDuration * 3} minutos
          </p>
        </section>

				{/* Botón para guardar la configuración */}
        <footer className="mt-6">
          <button
            onClick={saveConfiguration}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md font-medium hover:bg-green-600 transition-colors"
          >
            Guardar Configuración
          </button>
        </footer>
			</div>
			<Toaster />
		</main>
	);
}

export default ConfigPage;