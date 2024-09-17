import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import JSConfetti from 'js-confetti';
import Ballon from './Ballon';

import popSound from '../assets/audio/pop-sound.mp3'

const GamePage = () => {
  const [clicks, setClicks] = useState(0);
	const [play] = useSound(popSound)

  const ballonLife = 5;
  const progress = (clicks / ballonLife) * 100;

  const jsConfetti = useRef(null);

  useEffect(() => {
    jsConfetti.current = new JSConfetti();
  }, []);

  const handleClick = () => {
    if (clicks < ballonLife) {
      setClicks(prev => {
        const newClicks = prev + 1;

        if (newClicks >= ballonLife) {
					play()
          jsConfetti.current.addConfetti();
        }

        return newClicks;
      });
    }
  };

  return (
    <main className='flex flex-col gap-12 items-center justify-center h-screen bg-gray-100 m-0 p-0 overflow-hidden'>
			<section className='absolute top-4 right-4'>
				<span className='text-base font-semibold'>Id de la sesión: </span>
				<span className='italic'>123-456</span>
			</section>

      <div className='absolute top-8'>
        <h1 className='text-3xl font-bold mb-4'>¡Haz clic en el globo para reventarlo!</h1>

        <div className='w-full mt-6'>
          <div className='w-full bg-gray-300 rounded-full h-6'>
            <div
              className={`h-6 rounded-full ${progress >= 100 ? 'bg-red-500' : progress >= 70 ? 'bg-orange-500' : 'bg-green-500'}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

			{
				progress == 100
				? (<span>Trono el globo!!!</span>)
				: (
					<motion.div
						className='w-48 h-48 flex items-center justify-center cursor-pointer'
						animate={{ scale: 1 + clicks * 0.05 }}
						onClick={handleClick}
					>
						<Ballon />
					</motion.div>
				) 
			}
      
    </main>
  );
};

export default GamePage;
