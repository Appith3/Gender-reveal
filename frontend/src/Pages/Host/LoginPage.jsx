import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGameAndSessionData } from '../../firebase/gameService';
import useGameStore from '../../store/useGameStore';

const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const setSessionId = useGameStore((state) => state.setSessionId);
  const sessionId = useGameStore((state) => state.sessionId);
  const setIsAuth = useGameStore((state) => state.setIsAuth);
  const isMobile = useGameStore((state) => state.isMobile);
  const setGameAndSessionData = useGameStore((state) => state.setGameAndSessionData);
  const storedSessionId = localStorage.getItem('sessionId'); // Recupera el sessionId desde localStorage

  useEffect(() => {
    // Verifica si hay un sessionId guardado y redirige automáticamente si es válido
    const autoLogin = async () => {
      if (storedSessionId) {
        try {
          const gameData = await fetchGameAndSessionData(storedSessionId);
          const { session } = gameData

          setGameAndSessionData(gameData);
          setIsAuth(true);
          !isMobile 
            ? navigate(`/welcome/?sessionId=${session.gameId}`)
            : navigate(`/config`);
        } catch (error) {
          setError('Error al cargar la sesión. Verifica el código.');
        }
      }
    };
    autoLogin();
  }, [navigate, storedSessionId, setIsAuth, setSessionId]);

  const handleJoinSession = async () => {
    try {
      const gameData = await fetchGameAndSessionData(sessionId);
      const { session } = gameData
      setGameAndSessionData(gameData);
      setIsAuth(true);
      // Guarda el sessionId en localStorage para futuras visitas
      localStorage.setItem('sessionId', session.gameId);
      !isMobile
        ? navigate(`/welcome/?sessionId=${session.gameId}`)
        : navigate(`/config`);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCreateGame = () => {
    // TODO: implementar logica para crear juego 
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Revelación de Género</h1>
        <p className="text-center text-gray-600 mb-6">Configuración</p>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Ingresa tu código de sesión</h2>
          <div className="flex md:flex-row flex-col md:space-x-2 space-y-2">
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
              Entrar a la sesión
            </button>
          </div>
          {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
        </div>

        {!isMobile && (
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">¿No tienes un juego?</h2>
            <button
              onClick={handleCreateGame}
              className="px-4 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Crear nuevo juego
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;