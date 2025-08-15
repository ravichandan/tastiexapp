// services/places.ts
import Constants from "expo-constants";

const API_KEY = undefined ;//Constants.expoConfig?.extra?.googleMapsApiKey;

export interface PlacePrediction {
  place_id: string;
  description: string;
}

export interface PlaceDetails {
  lat: number;
  lng: number;
  label: string;
}

const BASE = "https://maps.googleapis.com/maps/api";

export async function fetchAutocomplete(
  input: string,
  { sessionToken, location, radiusMeters }: { sessionToken?: string; location?: { lat: number; lng: number }; radiusMeters?: number } = {}
): Promise<PlacePrediction[]> {

  if (!API_KEY) return [];
  const params = new URLSearchParams({
    input,
    key: API_KEY,
    types: "geocode",
    ...(sessionToken ? { sessiontoken: sessionToken } : {}),
    ...(location
      ? { location: `${location.lat},${location.lng}`, radius: String(radiusMeters ?? 10000) }
      : {}),
  });


  const res = await fetch(`${BASE}/place/autocomplete/json?${params.toString()}`);
  console.log("fetchAutocomplete response:", res);
  const json = await res.json();
  if (json.status !== "OK") return [];
  return json.predictions.map((p: any) => ({
    place_id: p.place_id,
    description: p.description,
  }));
}

export async function fetchPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
  if (!API_KEY) return null;
  const params = new URLSearchParams({
    place_id: placeId,
    key: API_KEY,
    fields: "geometry/location,formatted_address",
  });

  const res = await fetch(`${BASE}/place/details/json?${params.toString()}`);
  const json = await res.json();
  if (json.status !== "OK") return null;
  const { lat, lng } = json.result.geometry.location;
  return {
    lat,
    lng,
    label: json.result.formatted_address,
  };
}

export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  if (!API_KEY) return null;
  const params = new URLSearchParams({
    latlng: `${lat},${lng}`,
    key: API_KEY,
  });
  const res = await fetch(`${BASE}/geocode/json?${params.toString()}`);
  const json = await res.json();
  if (json.status !== "OK" || !json.results?.length) return null;
  return json.results[0].formatted_address as string;
}
