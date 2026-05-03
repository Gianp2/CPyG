import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { uploadImageToCloudinary } from "./imageService";

const COLLECTION_NAME = "animals";

export const animalService = {
  /**
   * 🔥 PAGINADO: Obtiene animales de forma paginada
   */
  async getPaginated({ limitCount = 8, startAfterDoc = null }) {
    try {
      const q = startAfterDoc
        ? query(
            collection(db, COLLECTION_NAME),
            orderBy("fechaCreacion", "desc"),
            startAfter(startAfterDoc),
            limit(limitCount)
          )
        : query(
            collection(db, COLLECTION_NAME),
            orderBy("fechaCreacion", "desc"),
            limit(limitCount)
          );

      const snapshot = await getDocs(q);
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];

      return {
        data: snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
        lastVisible,
      };
    } catch (error) {
      console.error("Error en getPaginated:", error);
      throw error;
    }
  },

  /**
   * 🔥 CREATE: Sube imagen a Cloudinary y guarda en Firestore
   */
  async create(animalData, imageFile) {
    try {
      let imagenURL = "";

      // Si hay archivo, subimos a Cloudinary antes de guardar en Firebase
      if (imageFile) {
        const uploadedUrl = await uploadImageToCloudinary(imageFile);
        if (!uploadedUrl) {
          throw new Error("No se pudo obtener la URL de Cloudinary. Revisa el preset.");
        }
        imagenURL = uploadedUrl;
      }

      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        nombre: animalData.nombre,
        edad: animalData.edad,
        tamaño: animalData.tamaño,
        descripcion: animalData.descripcion,
        estado: animalData.estado,
        imagenURL: imagenURL, // URL de Cloudinary
        fechaCreacion: serverTimestamp(),
      });

      return docRef.id;
    } catch (error) {
      console.error("Error en animalService.create:", error);
      throw error;
    }
  },

  /**
   * 🔥 UPDATE: Actualiza datos y opcionalmente una nueva imagen
   */
  async update(id, animalData, newImageFile) {
    try {
      let updateData = { ...animalData };

      // Si el usuario seleccionó una nueva imagen en el formulario
      if (newImageFile) {
        const uploadedUrl = await uploadImageToCloudinary(newImageFile);
        if (uploadedUrl) {
          updateData.imagenURL = uploadedUrl;
        }
      }

      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error("Error en animalService.update:", error);
      throw error;
    }
  },

  /**
   * 🔥 DELETE: Elimina el documento de Firestore
   */
  async delete(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error en animalService.delete:", error);
      throw error;
    }
  },
};