import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import JSConfetti from 'js-confetti';
import useGameStore from '../../store/useGameStore';
import { CONFETTI_FOR_BOY, CONFETTI_FOR_GIRL } from '../../constants';

import Balloon from '../../assets/SVGs/Balloon';
import popSound from '../../assets/audio/pop-sound.mp3';
import { listenToGameChanges } from '../../firebase/gameService';

const GamePage = () => {
  const [progress, setProgress] = useState(0);  // Mantener el progreso del globo

  const [play] = useSound(popSound);

  const sessionId = useGameStore((state) => state.sessionId);
  const babyGender = useGameStore((state) => state.babyGender);
  const balloonLife = useGameStore((state) => state.balloonLife);  // La vida del globo va disminuyendo
  const totalBalloonLife = useGameStore((state) => state.totalBalloonLife);  // La vida total del globo es constante
  const isPopped = useGameStore((state) => state.isPopped); // Verifica si el globo ha explotado
  const setGameData = useGameStore((state) => state.setGameData);

  const jsConfetti = useRef(null);
  const isBoy = babyGender === 'niño';

  // Escuchar los cambios del juego en la base de datos
  useEffect(() => {
    if (!sessionId) return;

    const unsubscribe = listenToGameChanges(sessionId, (gameData) => {
      setGameData(gameData);

      // Calcular el progreso en función de la vida restante del globo
      const progress = Math.min(((totalBalloonLife - balloonLife) / totalBalloonLife) * 100);
      setProgress(progress);

      // Verificar si la vida del globo es 0 o si el globo ha explotado
      if (balloonLife <= 0 || gameData.isPopped) {
				// TODO: actualizar el estatus a finalizado
        play(); // Reproducir sonido de pop
        jsConfetti.current.addConfetti({
          confettiColors: isBoy ? CONFETTI_FOR_BOY : CONFETTI_FOR_GIRL,
        });
      }
    });

    return () => unsubscribe(); // Limpiar la suscripción cuando el componente se desmonte
  }, [sessionId, balloonLife, totalBalloonLife, isPopped, setGameData]);

  // Inicializar JSConfetti
  useEffect(() => {
    jsConfetti.current = new JSConfetti();
  }, []);

  return (
    <main className='flex flex-col gap-12 items-center justify-center h-screen bg-gray-100 m-0 p-0 overflow-hidden'>
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
      `}</style>

      <section className='absolute top-4 right-4'>
        <span className='text-base font-semibold'>Id de la sesión: </span>
        <span className='italic'>{sessionId}</span>
      </section>

      <div className='absolute top-8'>
        <h1 className='text-3xl font-bold mb-4'>¡Haz clic en el globo para reventarlo!</h1>

        {progress !== 100 && (
          <div className='w-full mt-6'>
            <div className='w-full bg-gray-300 rounded-full h-6'>
              <div
                className={`h-6 rounded-full ${progress >= 100 ? 'bg-red-500' : progress >= 70 ? 'bg-orange-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {progress === 100 || isPopped ? (
        <h1
          className={`text-4xl sm:text-6xl font-bold animated-gradient ${
            isBoy ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gradient-to-r from-pink-400 to-pink-600'
          } text-transparent bg-clip-text`}
          aria-live="polite"
        >
          ¡Es {isBoy ? 'un' : 'una'} {babyGender}!
        </h1>
      ) : (
        <motion.div
          className='w-48 h-48 flex items-center justify-center cursor-pointer'
          animate={{ scale: 1 + ((totalBalloonLife - balloonLife) / totalBalloonLife) * 0.05 }} // Cambié la lógica para reflejar la vida restante
        >
          <Balloon />
        </motion.div>
      )}
    </main>
  );
};

export default GamePage;
