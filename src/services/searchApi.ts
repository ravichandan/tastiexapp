import {axiosInstance as axios} from '@/services/axiosInstance';
import { useFiltersStore } from '@/state/useFiltersStore';
import { SuburbType } from '@/types/Types';


export const doSearch = async (query: string, filters: any) => {
  const { data } = await axios.get(`/search`, {
    params: { q: query, ...filters },
  });
  return data;
};



// const res = await fetch(`${BASE}/place/autocomplete/json?${params.toString()}`);
//   console.log("fetchAutocomplete response:", res);
//   const json = await res.json();
//   if (json.status !== "OK") return [];
//   return json.predictions.map((p: any) => ({
//     place_id: p.place_id,
//     description: p.description,
//   }));