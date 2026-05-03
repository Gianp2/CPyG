import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase/config";

export const authService = {
  /**
   * Login de usuario
   */
  login: async (email, password) => {
    try {
      if (!auth) throw new Error("Auth no inicializado");

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return userCredential;
    } catch (error) {
      let message = "Error al iniciar sesión";

      if (error.code) {
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
            message = "Credenciales inválidas";
        }
      }

      throw new Error(message);
    }
  },

  /**
   * Logout
   */
  logout: async () => {
    try {
      if (!auth) throw new Error("Auth no inicializado");

      await signOut(auth);
    } catch (error) {
      throw new Error("No se pudo cerrar la sesión");
    }
  },

  /**
   * Listener de cambios de autenticación
   */
  onAuthChange: (callback) => {
    if (!auth) return () => {};

    return onAuthStateChanged(auth, (user) => {
      callback(user ?? null);
    });
  },

  /**
   * Usuario actual
   */
  getCurrentUser: () => {
    if (!auth) return null;
    return auth.currentUser ?? null;
  }
};