import { axiosInstance as axios } from '@/services/axiosInstance';
import { API_ENDPOINTS } from '@/shared/constants/constants';
import { useFiltersStore } from '@/state/useFiltersStore';
import { SuburbType } from '@/types/Types';

export const doSearch = async (query: string, filters: any) => {
  const { data } = await axios.get(`/search`, {
    params: { q: query, ...filters },
  });
  return data;
};

export const doGetPlaces = async (searchKey: string, filters: any) => {
  const placesEndpoint = API_ENDPOINTS.PLACES;
  return axios.get(placesEndpoint, {
    params: {
      placeName: searchKey,
      itemName: searchKey,
      distance: 50,
      city: 'sydney',
      suburbs: filters.location?.name || undefined,
      includeSurroundingSuburbs: true,
      cuisines: filters.cuisines.join(',') || undefined,
      dietary: filters.dietary.join(',') || undefined,
    },
  });
};

export const doGetItems = async (searchKey: string, filters: any) => {
  const itemsEndpoint = API_ENDPOINTS.ITEMS;
  return axios.get(itemsEndpoint, {
    params: {
      itemName: searchKey,
      distance: 50,
      city: 'sydney',
      suburbs: filters.location?.name || undefined,
      includeSurroundingSuburbs: true,
      cuisines: filters.cuisines.join(',') || undefined,
      dietary: filters.dietary.join(',') || undefined,
    },
  });
};
// const res = await fetch(`${BASE}/place/autocomplete/json?${params.toString()}`);
//   console.log("fetchAutocomplete response:", res);
//   const json = await res.json();
//   if (json.status !== "OK") return [];
//   return json.predictions.map((p: any) => ({
//     place_id: p.place_id,
//     description: p.description,
//   }));
