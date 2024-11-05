import { collection, doc, setDoc, Timestamp, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

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
    const sessionRef = doc(db, 'games', sessionId);
    const sessionSnap = await getDoc(sessionRef);

    if (sessionSnap.exists()) {
      return sessionSnap.data();  // Retorna los datos de la sesión
    } else {
      throw new Error('No se encontró un juego con ese código.');
    }
  } catch (error) {
    console.error("Error al obtener los datos juego: ", error);
    throw error;
  }
};

const createGame = async (hostId, sessionCode, sessionId) => {
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
}

export { 
  createGame, 
  fetchSessionData, 
  fetchGameData,
  updateGender,
  updateGameDuration
}