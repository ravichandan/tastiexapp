// features/home/hooks/useFilters.ts
import { useEffect, useState } from 'react';
import { fetchCuisines, fetchDietaryOptions } from '@/services/filtersApi';
import { useFiltersStore } from '@/state/useFiltersStore';
import { CUISINES, DIETARIES } from '@/shared/config/menuConfig';

export function useFilters() {
  const { cuisines, dietaryOptions, setFilters } = useFiltersStore();
  const [loading, setLoading] = useState(cuisines.length === 0); // Only load if not in store
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cuisines.length && dietaryOptions.length) return;

    const loadFilters = async () => {
      try {
        const [cuisineRes, dietaryRes] = await Promise.all([
          // TODO: Fetch cuisines and dietary options concurrently
          // fetchCuisines(),
          // fetchDietaryOptions(),
          // Mocking API calls for now
          Promise.resolve(CUISINES),
          Promise.resolve(DIETARIES),
        ]);
        setFilters(cuisineRes, dietaryRes);
      } catch (err: any) {
        console.error('Failed to load filters:', err.message);
        setError('Failed to load filters' + (err.message ? `: ${err.message}` : ''));
      } finally {
        setLoading(false);
      }
    };

    loadFilters();
  }, []);

  return { cuisines, dietaryOptions, loading, error };
}
