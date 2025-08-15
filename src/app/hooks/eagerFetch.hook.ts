// features/home/hooks/eagerFetch.ts
import { useCallback, useState } from 'react';
import { useFiltersStore } from '@/state/useFiltersStore';
import { fetchSuburbs } from '@/services/suburbsApi';

/**
 * Hook responsibilities:
 * - eagerly fetch data related to app and set them into useFiltersStore
 * - fetchAvailableSuburbs: fetch all the available suburbs
 */

export const eagerFetch = () => {
  // filter options & selected filters
  const {
    setSuburbsOptions  } = useFiltersStore();

  // UI state for loading options
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [optionsError, setOptionsError] = useState<string | null>(null);

  const fetchAvailableSuburbs = useCallback(async () => {
    console.log('In eagerFetch.hook.ts, Fetching suburbs options...');
    setOptionsLoading(true);
    setOptionsError(null);
    try {
      // adapt endpoints to your backend
      const [response] = await Promise.all([
        fetchSuburbs(),
      ]);
      
      // expecting arrays like [{"name": "collaroy plateau", "postcode": "2097"}, {"name": "woolooware", "postcode": "2230"}, ...]
      setSuburbsOptions(response.suburbs || []);
    } catch (err: any) {
      console.error('Failed to load filter options', err);
      setOptionsError(err?.message || 'Failed to load filter options');
    } finally {
      setOptionsLoading(false);
    }
  }, [setSuburbsOptions]);

  return {
    fetchAvailableSuburbs
  };
};
