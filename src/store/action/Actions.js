import { SET_LOCATION, SET_MY_ADDRESS, DESTINATION_LATLNG, DESTINATION_ADDRESS } from "../constants/Constants"


export const setLocation = (data) => {
  return { type: SET_LOCATION, payload: data }
}
export const setMyAddress = (data) => {
  return { type: SET_MY_ADDRESS, payload: data }
}
export const setSearchLocation = (data) => {
  return { type: DESTINATION_LATLNG, payload: data }
}
export const setSearchAddress = (data) => {
  return { type: DESTINATION_ADDRESS, payload: data }
}