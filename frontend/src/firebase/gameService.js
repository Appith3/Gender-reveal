import { onSnapshot, doc, setDoc, Timestamp, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const listenToGameChanges = (gameId, callback) => {
  const gameRef = doc(db, 'games', gameId);

  const unsubscribe = onSnapshot(gameRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data());  // Retorna los datos actualizados
    } else {
      console.error('No se encontró el juego con ese ID.');
    }
  });

  return unsubscribe;  // Llamar a unsubscribe() detiene la escucha
};

const fetchSessionData = async (sessionId) => {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    const sessionSnap = await getDoc(sessionRef);

    if (sessionSnap.exists()) {
      return sessionSnap.data();  // Retorna los datos de la sesión
    } else {
      throw new Error('No se encontró la sesión con ese código.');
    }
  } catch (error) {
    console.error("Error al obtener la sesión: ", error);
    throw error;
  }
};

const fetchGameData = async (sessionId) => {
  try {
    const gameRef = doc(db, 'games', sessionId);
    const gameSnap = await getDoc(gameRef);

    if (gameSnap.exists()) {
      return gameSnap.data();
    } else {
      throw new Error('No se encontró un juego con ese código.');
    }
  } catch (error) {
    console.error("Error al obtener el juego: ", error);
    throw error;
  }
};

const fetchGameAndSessionData = async (sessionId) => {
  try {
    const gameRef = doc(db, 'games', sessionId);
    const gameSnap = await getDoc(gameRef);

    const sessionRef = doc(db, 'sessions', sessionId);
    const sessionSnap = await getDoc(sessionRef);

    if (gameSnap.exists() && sessionSnap.exists()) {
      return {
        game: gameSnap.data(),
        session: sessionSnap.data()
      }; 
    } else {
      throw new Error('No se encontró un juego con ese código.');
    }
  } catch (error) {
    console.error("Error al obtener los datos juego: ", error);
    throw error;
  }
};

const createGame = async (hostId, sessionCode, sessionId) => {
  console.log('sessionId: ', sessionId);
  console.log('sessionCode: ', sessionCode);
  console.log('hostId: ', hostId);
  try {
    // Verificar si ya existe un juego con el sessionId
    const gameRef = doc(db, "games", sessionId);
    const gameSnap = await getDoc(gameRef);

    if (gameSnap.exists()) {
      return; // Salir de la función si el juego ya existe
    }

    // Crear el juego con sessionId como el ID del documento
    await setDoc(gameRef, {
      host: hostId,
      gameStatus: "waiting",
      gameDuration: 0, // (gameDuration * 60) * numPlayers * AverageClicksPerSecond -> 0.5
      createdAt: Timestamp.now(),
      playersCount: 0,
      genderReveal: null,
      gameDuration: 1, // de 3 a 15 minutos
      isPopped: false
    });

    // Crear una sesión vinculada al juego
    await setDoc(doc(db, "sessions", sessionId), {
      sessionId: sessionId,
      sessionCode: sessionCode, // Código generado previamente
      gameId: sessionId, // Usamos el mismo sessionId
      isActive: true,
    });

  } catch (e) {
    console.error("Error al crear el juego: ", e);
  }
};

const updateGender = async (sessionId, gender) => {
  try {
    const gameRef = doc(db, "games", sessionId);
    
    await setDoc(gameRef, { genderReveal: gender }, { merge: true });

  } catch (error) {
    console.error("Error al actualizar el género: ", error);
    throw error;
  }
};

const updateGameDuration = async (sessionId, duration) => {
  try {
    const gameRef = doc(db, "games", sessionId);

    await setDoc(gameRef, { gameDuration: duration }, { merge: true });
  } catch (error) {
    console.error("error al guardar la duración: ", error);
    throw error;
  }
};

const updateGameStatus = async (sessionId, status) => {
  try {
    const gameRef = doc(db, "games", sessionId);

    await updateDoc(gameRef, { gameStatus: status });
  } catch (error) {
    console.error("error al guardar el estatus del juego: ", error);
    throw error
  }
}

const updateGamePlayersCount = async (gameId) => {
  const gameRef = doc(db, "games", gameId);
  
  try {
    // Obtener datos actuales del juego
    const gameSnap = await getDoc(gameRef);
    if (!gameSnap.exists()) {
      throw new Error("El juego no existe");
    }

    const gameData = gameSnap.data();
    const { gameDuration, playersCount = 0 } = gameData;

    // Calcular nuevos valores
    const newPlayersCount = playersCount + 1;
    const balloonLife = ((gameDuration * 3) * 60) * 0.5 * newPlayersCount;

    // Actualizar en la base de datos
    await updateDoc(gameRef, {
      playersCount: newPlayersCount,
      balloonLife,
    });
    return { playersCount: newPlayersCount, balloonLife };
  } catch (error) {
    console.error("Error al actualizar playersCount: ", error);
    throw error;
  }
};

const setTotalBallonLife = async (gameId, ballonLife) => {
  try{
    const gameRef = doc(db, "games", gameId);
    
    await setDoc(gameRef, { totalBalloonLife: ballonLife }, { merge: true });
  } catch (error) {
    console.error("error al establecer totalBalloonLife: ", error);
    throw error;
  }
}

const updateBalloonLife = async (sessionId, newBalloonLife) => {
  try {
    const gameRef = doc(db, 'games', sessionId);  // Obtén la referencia del documento del juego
    await updateDoc(gameRef, {
      balloonLife: newBalloonLife,
    });
  } catch (error) {
    console.error('Error al actualizar la vida del globo: ', error);
  }
};

const updateIsPoppedToTrue = async (sessionId) => {
  try {
    const gameRef = doc(db, 'games', sessionId);  // Obtén la referencia del documento del juego
    await updateDoc(gameRef, {
      isPopped: true,
    });
  } catch (error) {
    console.error('Error al actualizar la vida del globo: ', error);
  }
}

export { 
  listenToGameChanges,
  createGame, 
  fetchSessionData,
  fetchGameData,
  fetchGameAndSessionData,
  updateGender,
  updateGameDuration,
  updateGamePlayersCount,
  updateGameStatus,
  setTotalBallonLife,
  updateBalloonLife,
  updateIsPoppedToTrue
}