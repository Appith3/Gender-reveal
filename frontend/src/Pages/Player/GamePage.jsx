import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import JSConfetti from 'js-confetti';

import useGameStore from '../../store/useGameStore';
import { fetchGameAndSessionData, listenToGameChanges, updateBalloonLife, updateIsPoppedToTrue } from '../../firebase/gameService';
import { CONFETTI_MIX } from '../../constants';

const PlayerGamePage = () => {
  const isPopped = useGameStore((state) => state.isPopped);
  const setIsPopped = useGameStore((state) => state.setIsPopped)
  const sessionId = useGameStore((state) => state.sessionId);
  const balloonLife = useGameStore((state) => state.balloonLife);
  const gameStatus = useGameStore((state) => state.gameStatus);
  const setGameAndSessionData = useGameStore((state) => state.setGameAndSessionData);
  const setGameData = useGameStore((state) => state.setGameData);
  const jsConfetti = useRef(null);
  const location = useLocation();

  useEffect(() => {
    jsConfetti.current = new JSConfetti();
  }, []);

  useEffect(() => {
    const params = location.search;
    const [sessionIdParam] = params.split('&').map(param => param.split('=')[1]);

    if(sessionIdParam) {
      fetchGameAndSessionData(sessionIdParam)
        .then((data) => {
          setGameAndSessionData(data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del juego: ", error);
        });
    }

  }, [location.search]);

  useEffect(() => {
    if (!sessionId) return;  // Evita ejecutar el efecto si sessionId no está disponible

    const updateGameData = (gameData) => {
      setGameData(gameData);
    };

    const unsubscribe = listenToGameChanges(sessionId, updateGameData);

    return () => unsubscribe();
  }, [sessionId, setGameData]);

  const handleBalloonClick = () => {
    if (!isPopped) {
      const randomValue = Math.floor(Math.random() * 10) + 1; // Genera un número aleatorio entre 1 y 10
      const newBalloonLife = balloonLife - randomValue; // Resta el valor aleatorio a la vida del globo
  
      // Verifica que la vida del globo no sea menor a 0
      const updatedBalloonLife = newBalloonLife < 0 ? 0 : newBalloonLife;
    
      if (updatedBalloonLife <= 0) {
        setIsPopped(true);
        updateIsPoppedToTrue();
        jsConfetti.current.addConfetti({
          confettiColors: CONFETTI_MIX,
        });
      }
  
      // Actualiza la vida del globo en la base de datos
      updateBalloonLife(sessionId, updatedBalloonLife); // Función que debes crear para actualizar la base de datos
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-100 flex flex-col items-center justify-center p-4">
      <section className="absolute top-4 right-4 flex flex-col md:flex-row">
        <span className='text-base font-semibold'>Id de la sesión: </span>
        <span className='italic'>{sessionId}</span>
      </section>

      {gameStatus !== 'waiting'
        ? (
          <>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">{isPopped ? 'Mira a la pantalla' : '¡Revienta el globo!'}</h1>

            <motion.div 
              className="relative w-72 h-72 rounded-full bg-gradient-to-br from-yellow-400 to-purple-400 flex justify-center items-center"
              animate={isPopped ? { scale: [1, 1.2, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className={'w-64 h-64 rounded-full bg-gradient-to-br from-purple-400 to-yellow-400 shadow-lg cursor-pointer'}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBalloonClick}
                animate={isPopped ? { scale: [1, 1.2, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                {!isPopped && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">Tap!</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </>
        )
        : (
          <>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Esperando a que los mas jugadores se unan</h1>
          </>
        )
      }
    </div>
  );
};

export default PlayerGamePage;
