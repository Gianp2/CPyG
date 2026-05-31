import { useState, useCallback, useRef, useEffect } from "react";
import { animalService } from "../services/animalService";

// Persistencia en memoria fuera del hook
let cachedAnimals = [];
let isFetched = false;

export function useAnimals() {
  const [animals, setAnimals] = useState(cachedAnimals);
  const [loading, setLoading] = useState(!isFetched);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  
  const lastVisibleRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchAnimals = useCallback(async (forceRefresh = false) => {
    // Si ya tenemos datos y no forzamos refresco, no hacemos nada
    if (isFetched && !forceRefresh) return;

    try {
      setLoading(true);
      const { data, lastVisible: nextVisible } = await animalService.getPaginated({
        limitCount: 8,
      });

      cachedAnimals = data || [];
      setAnimals(cachedAnimals);
      lastVisibleRef.current = nextVisible;
      setHasMore(!!nextVisible && data.length === 8);
      isFetched = true;
      setError(null);
    } catch (err) {
      setError(err?.message || "Error cargando animales");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore || !lastVisibleRef.current) return;

    try {
      setLoadingMore(true);
      const { data, lastVisible: nextVisible } = await animalService.getPaginated({
        limitCount: 6,
        startAfterDoc: lastVisibleRef.current,
      });

      if (data && data.length > 0) {
        cachedAnimals = [...cachedAnimals, ...data];
        setAnimals(cachedAnimals);
        lastVisibleRef.current = nextVisible;
        setHasMore(!!nextVisible && data.length === 6);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore]);

  // CORRECCIÓN: Usamos useEffect para disparar la carga inicial de forma segura
  useEffect(() => {
    if (!isFetched) {
      fetchAnimals();
    }
  }, [fetchAnimals]);

  return {
    animals,
    loading,
    loadingMore,
    error,
    refresh: () => fetchAnimals(true),
    loadMore,
    hasMore,
  };
}

export default useAnimals;