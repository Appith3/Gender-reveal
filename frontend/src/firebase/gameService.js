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

const createGame = async (hostId, sessionCode, sessionId) => {
  try {
    // Crear el juego con sessionId como el ID del documento
    await setDoc(doc(db, "games", sessionId), {
      host: hostId,
      gameStatus: "waiting",
      balloonLife: 0, // Se ajustará más adelante según los jugadores
      createdAt: Timestamp.now(),
      playersCount: 0,
      genderReveal: null,
      totalClicks: 0,
      endTime: null,
    });

    // Crear una sesión vinculada al juego
    await setDoc(doc(db, "sessions", sessionId), {
      sessionId: sessionId,
      sessionCode: sessionCode, // Código generado previamente
      gameId: sessionId, // Usamos el mismo sessionId
      isActive: true,
    });

    console.log("Nuevo juego creado con sessionId: ", sessionId);
  } catch (e) {
    console.error("Error al crear el juego: ", e);
  }
};

export { createGame, fetchSessionData }