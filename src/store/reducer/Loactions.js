import { SET_LOCATION, SET_MY_ADDRESS, DESTINATION_LATLNG, DESTINATION_ADDRESS } from '../constants/Constants'
const initialState = {
  location: null,
  address: null,
  d_latlng: null,
  d_address: null


}
export default function getLocation(state = initialState, action) {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload
      }
    case SET_MY_ADDRESS:
      return {
        ...state,
        address: action.payload
      }
    case DESTINATION_ADDRESS:
      return {
        ...state,
        d_address: action.payload
      }
    case DESTINATION_LATLNG:
      return {
        ...state,
        d_latlng: action.payload
      }
    default:
      return state
  }
}