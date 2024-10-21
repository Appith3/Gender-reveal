import { collection, addDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

const createGame = async (hostId, sessionCode) => {
  try {
    const newGameRef = await addDoc(collection(db, "games"), {
      host: hostId,
      gameStatus: "waiting",
      balloonLife: 0, // Se ajustará más adelante según los jugadores
      createdAt: Timestamp.now(),
      sessionCode: sessionCode, // Función para generar el código
      playersCount: 0,
      genderReveal: null,
      totalClicks: 0,
      endTime: null,
    });

    // Crear una sesión vinculada al juego
    await setDoc(doc(db, "sessions", newGameRef.id), {
      gameId: newGameRef.id,
      isActive: true,
    });

    console.log("Nuevo juego creado con ID: ", newGameRef.id);
  } catch (e) {
    console.error("Error al crear el juego: ", e);
  }
};

export { createGame }