import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase/config";

export const authService = {
  login: async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // Mapeamos los errores de Firebase a mensajes en español amigables
      let message = "Error al iniciar sesión";
      
      switch (error.code) {
        case "auth/user-not-found":
          message = "No existe un usuario con este correo";
          break;
        case "auth/wrong-password":
          message = "La contraseña es incorrecta";
          break;
        case "auth/invalid-email":
          message = "El formato del correo no es válido";
          break;
        case "auth/too-many-requests":
          message = "Demasiados intentos. Intenta más tarde";
          break;
        default:
          message = error.message;
      }
      
      // Lanzamos el error con el mensaje amigable para que el componente lo atrape
      throw new Error(message);
    }
  },

  logout: async () => {
    try {
      return await signOut(auth);
    } catch (error) {
      throw new Error("No se pudo cerrar la sesión");
    }
  },

  onAuthChange: (callback) => {
    return onAuthStateChanged(auth, callback);
  },

  getCurrentUser: () => auth.currentUser
};