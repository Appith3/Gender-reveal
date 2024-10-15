import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import JSConfetti from 'js-confetti';
import useGameStore from '../../store/useGameStore';
import { CONFETTI_FOR_BOY, CONFETTI_FOR_GIRL } from '../../constants';

import Ballon from '../../assets/SVGs/Ballon';
import popSound from '../../assets/audio/pop-sound.mp3';

const GamePage = () => {
	const [clicks, setClicks] = useState(0);
	const [play] = useSound(popSound);

	const sessionID = useGameStore((state) => state.sessionID)
	const babyGender = useGameStore((state) => state.babyGender)
	const ballonLife = useGameStore((state) => state.ballonLife)

	const progress = (clicks / ballonLife) * 100;

	const jsConfetti = useRef(null);

	const isBoy = babyGender === 'niño'

	useEffect(() => {
		jsConfetti.current = new JSConfetti();
	}, []);

	const handleClick = () => {
		if (clicks < ballonLife) {
		setClicks(prev => {
			const newClicks = prev + 1;

			if (newClicks >= ballonLife) {
				play()
				jsConfetti.current.addConfetti({
					confettiColors: isBoy ? CONFETTI_FOR_BOY : CONFETTI_FOR_GIRL,
				}); 
			}

			return newClicks;
		});
		}
	};

	return (
		<main className='flex flex-col gap-12 items-center justify-center h-screen bg-gray-100 m-0 p-0 overflow-hidden'>
			{/* TODO: move animated-gradient to another file */}
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
				<span className='italic'>{sessionID}</span>
			</section>

			<div className='absolute top-8'>
				<h1 className='text-3xl font-bold mb-4'>¡Haz clic en el globo para reventarlo!</h1>

				{
					progress != 100 && (
						<div className='w-full mt-6'>
							<div className='w-full bg-gray-300 rounded-full h-6'>
								<div
									className={`h-6 rounded-full ${progress >= 100 ? 'bg-red-500' : progress >= 70 ? 'bg-orange-500' : 'bg-green-500'}`}
									style={{ width: `${Math.min(progress, 100)}%` }}
								></div>
							</div>
						</div>
					)
				}
			</div>

			{
				progress == 100
				? (
					<h1 className={`text-4xl sm:text-6xl font-bold animated-gradient ${
						isBoy
							? 'bg-gradient-to-r from-blue-400 to-blue-600'
							: 'bg-gradient-to-r from-pink-400 to-pink-600' 
						} text-transparent bg-clip-text`}
					aria-live="polite">
							¡Es {isBoy ? 'un' : 'una'} {babyGender}!
					</h1>
				)
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
