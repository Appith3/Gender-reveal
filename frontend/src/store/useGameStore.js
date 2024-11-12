import { create } from 'zustand';

const useGameStore = create((set) => ({
  isAuth: localStorage.getItem('isAuth') === 'true' || false,
  setIsAuth: (authStatus) => {
    set(() => ({ isAuth: authStatus }));
    localStorage.setItem('isAuth', authStatus);
  },

  isMobile: false,
  setIsMobile: (mobileStatus) => set(() => ({ isMobile: mobileStatus })),

  hostId: localStorage.getItem('hostId') || '',
  setHostId: (id) => {
    set(() => ({ hostId: id }));
    localStorage.setItem('hostId', id);
  },

  sessionId: localStorage.getItem('sessionId') || '',
  setSessionId: (id) => {
    set(() => ({ sessionId: id }));
    localStorage.setItem('sessionId', id);
  },

  sessionCode: localStorage.getItem('sessionCode') || '',
  setSessionCode: (code) => {
    set(() => ({ sessionCode: code }));
    localStorage.setItem('sessionCode', code);
  },

  babyGender: '',
  setBabyGender: (babyGender) => set(() => ({ babyGender: babyGender })),

  balloonLife: 0,
  setBalloonLife: (life) => set(() => ({ balloonLife: life })),

  gameDuration: 1,
  setGameDuration: (duration) => set(() => ({ gameDuration: duration })),

  setGameData: (gameData) => {
    const {game, session} = gameData
    set({
      hostId: game.host || '',
      sessionId: session.sessionId || '', 
      sessionCode: session.sessionCode || '', 
      babyGender: game.genderReveal || '',
      balloonLife: game.balloonLife || 0,
      gameDuration: game.gameDuration || 1,
      playersCount: game.playersCount || 0,
      gameStatus: game.gameStatus || 'waiting'
    });
  },

  resetGameDate: () => {
    set({
      isAuth: false,
      hostId: '',
      sessionId: '', 
      sessionCode: '', 
      babyGender: '',
      balloonLife: 0,
      gameDuration: 1,
      playersCount: 0,
      gameStatus: 'waiting'
    });
  },
}));

export default useGameStore;
