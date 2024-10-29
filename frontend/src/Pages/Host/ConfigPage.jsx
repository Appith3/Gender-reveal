import { useState } from 'react';
import { ChevronDown, Info, Heart, Eye, EyeOff } from 'lucide-react'
import { updateGender } from '../../firebase/gameService';
import useGameStore from '../../store/useGameStore';

const ConfigPage = () => {
	const babyGender = useGameStore((state) => state.babyGender);
	const setBabyGender = useGameStore((state) => state.setBabyGender);
	const sessionId = useGameStore((state) => state.sessionId);
	const hostId = useGameStore((state) => state.hostId);
	const sessionCode = useGameStore((state) => state.sessionCode);
	const balloonLife = useGameStore((state) => state.balloonLife);
	const setBalloonLife = useGameStore((state) => state.setBalloonLife);

	const [hideGender, setHideGender] = useState(false)

	const handleClickGenderButton = (gender) => {
		if(!hideGender) {
			setBabyGender(gender);
		}
	};

	const saveConfiguration = () => {
		updateGender(sessionId, babyGender);

		alert('Configuración guardada con éxito!')
  };

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
							<img src='\images\boy.png' alt='niño' title='niño' className='w-48 h-48'/>
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
							<img src='\images\girl.png' alt='niña' title='niña' className='w-48 h-48'/>
							Niña
						</button>
					</div>
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
            {[1, 2, 3, 4, 5].map((life) => (
              <button
                key={life}
                onClick={() => setBalloonLife(life)} // Actualizar balloonLife en el store
              >
                <Heart 
                  className={`w-8 h-8 ${
                    life <= balloonLife ? 'text-red-500 fill-current' : 'text-gray-300'
                  }`} 
                />
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Duración del juego: {balloonLife * 3} minutos
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
		</main>
	);
}

export default ConfigPage;