import Geocode from "react-geocode";
import { API_KEY } from '../../store/constants/Constants'
Geocode.setApiKey(API_KEY);
Geocode.setLanguage("en");

export const GeoCode = async (payload) => {
  let result = await Geocode.fromLatLng(payload.currentPosition.lat, payload.currentPosition.lng)
  return result.results[0].formatted_address

}

