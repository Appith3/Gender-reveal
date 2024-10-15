import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import JSConfetti from 'js-confetti';

import useGameStore from '../../store/useGameStore';
import { CONFETTI_FOR_BOY, CONFETTI_FOR_GIRL } from '../../constants';

const PlayerGamePage = () => {
  const [clicks, setClicks] = useState(0);
  const [isPopped, setIsPopped] = useState(false);

  const sessionID = useGameStore((state) => state.sessionID);
  const ballonLife = useGameStore((state) => state.ballonLife);
  const babyGender = useGameStore((state) => state.babyGender);  // Asegúrate de obtener el género del bebé

  const jsConfetti = useRef(null);
  const isBoy = babyGender === 'niño';  // Comprueba que babyGender tenga un valor correcto

  useEffect(() => {
    jsConfetti.current = new JSConfetti();
  }, []);

  const handleBalloonClick = () => {
    if (!isPopped) {
      setClicks((prevClicks) => prevClicks + 1);  // Usa la función para actualizar el estado
      if (clicks + 1 >= ballonLife) {
        setIsPopped(true);
        jsConfetti.current.addConfetti({
          confettiColors: isBoy ? CONFETTI_FOR_BOY : CONFETTI_FOR_GIRL,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">{isPopped ? 'Mira a la pantalla' : '¡Revienta el globo!'}</h1>
      <section className="absolute top-4 right-4 flex flex-col md:flex-row">
        <span className='text-base font-semibold'>Id de la sesión: </span>
        <span className='italic'>{sessionID}</span>
      </section>

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
              <span className="text-white text-4xl font-bold">{ballonLife - clicks}</span>
            </div>
          )}
        </motion.div>
      </motion.div>

      {isPopped && (
        <button
          onClick={() => {
            setClicks(0);
            setIsPopped(false);
          }}
          className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Jugar de nuevo
        </button>
      )}
    </div>
  );
};

export default PlayerGamePage;
