import React, { useState } from 'react'
import { MDBInput } from 'mdbreact';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { useDispatch, useSelector } from 'react-redux';
import { setSearchLocation, setSearchAddress, setMyAddress } from '../../store/action/Actions';
function AutoPlace() {
  const dispatch = useDispatch()
  // const address = useSelector(state => state.Locations.d_address)
  const [address, setAddress] = useState('')
  const handleChange = address => {
    setAddress(address)
  };

  const handleSelect = address => {
    setAddress(address)
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => dispatch(setSearchLocation(latLng)))
      .catch(error => console.error('Error', error));
  };
  return (

    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <MDBInput outline label="Search Location"
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input Search-input',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion, i) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div key={i}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>

  )
}

export default AutoPlace



















// const dispatch = useDispatch()
// const address = useSelector(state => state.Locations.d_address)
// // const [adress, setAdress] = useState(address)
// // const selectedLoaction = (payload) => {
// //   let latlng = {
// //     lat: payload.geometry.location.lat(),
// //     lng: payload.geometry.location.lng()
// //   }
// //   dispatch(setSearchLocation(latlng))
// //   dispatch(setSearchAddress(payload.formatted_address))

// // }

// return (
//   <Autocomplete

//     className="Search-input"
//     apiKey={API_KEY}
//     onPlaceSelected={(place) => {
//       selectedLoaction(place);
//     }}
//   />

// )
// }