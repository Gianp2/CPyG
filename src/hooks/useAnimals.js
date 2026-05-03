import { useState, useEffect, useCallback } from "react";
import { animalService } from "../services/animalService";

/**
 * Hook personalizado para gestionar la lógica de animales con paginación.
 */
export function useAnimals() { // Export nombrado
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // 🚀 FETCH INICIAL
  const fetchAnimals = useCallback(async () => {
    try {
      setLoading(true);
      const { data, lastVisible: nextVisible } = await animalService.getPaginated({
        limitCount: 8,
      });

      setAnimals(data || []);
      setLastVisible(nextVisible);
      setHasMore(!!nextVisible && data.length === 8);
      setError(null);
    } catch (err) {
      console.error("Error en fetchAnimals:", err);
      setError(err?.message || "Error cargando animales");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🚀 CARGAR MÁS
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore || !lastVisible) return;

    try {
      setLoadingMore(true);
      const { data, lastVisible: nextVisible } = await animalService.getPaginated({
        limitCount: 6,
        startAfterDoc: lastVisible,
      });

      if (data && data.length > 0) {
        setAnimals((prev) => [...prev, ...data]);
        setLastVisible(nextVisible);
        setHasMore(!!nextVisible && data.length === 6);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error en loadMore:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, lastVisible]);

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  return {
    animals,
    loading,
    loadingMore,
    error,
    refresh: fetchAnimals,
    loadMore,
    hasMore,
  };
}

export default useAnimals;