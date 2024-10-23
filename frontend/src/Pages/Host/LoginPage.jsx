import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSessionData } from '../../firebase/gameService';
import useGameStore from '../../store/useGameStore'

const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

	const setSessionId = useGameStore((state) => state.setSessionId)
	const sessionId = useGameStore((state) => state.sessionId)

  const handleJoinSession = async () => {
    try {
      const sessionData = await fetchSessionData(sessionId);
			console.log('sessionData: ', sessionData);
      navigate(`/welcome/?sessionId=${sessionData.gameId}`);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCreateGame = () => {
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Revelación de Género</h1>
        <p className="text-center text-gray-600 mb-6">¡Bienvenido a nuestro juego especial!</p>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">¿Ya tienes un código de sesión?</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Ingresa el código de sesión"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
            />
            <button
              onClick={handleJoinSession}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Unirme
            </button>
          </div>
          {error && (
            <p className="mt-2 text-red-600 text-sm">{error}</p>
          )}
        </div>
        
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">¿No tienes un juego?</h2>
          <button
            onClick={handleCreateGame}
            className="px-4 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Crear nuevo juego
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage