import React, { useEffect, useState } from 'react'
import { MapWrap, IconWrap } from './MapStyles'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

import * as MdIcons from 'react-icons/md'
function Map() {
  const [currentPosition, setCurrentPosition] = useState('')
  // set location value
  const getCurrentLocation = (location) => { setCurrentPosition(location) }
  const [selected, setSelected] = useState({});
  const onSelect = item => {
    setSelected(item);
  }
  // get current Location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let latlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      console.log(latlng)
      getCurrentLocation(latlng)
    });
  }
  useEffect(() => {
    getLocation()
  }, [])
  // map style
  const mapStyles = {
    height: "100vh",
    width: "100%"
  };
  const onMarkerchange = (e) => {
    setCurrentPosition(e)
  };
  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng })
  };
  return (
    <MapWrap>

      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={14}
        center={currentPosition}

        onLoad={map => {
          map.addListener('click', (e) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            let newAddress = { lat, lng }
            // onMarkerchange(newAddress)
            // changefocus.current.blur();
          })
        }}
      >
        {
          currentPosition.lat ?
            <Marker
              position={currentPosition}
              onDragEnd={(e) => onMarkerDragEnd(e)}
              draggable={true} /> :
            null
        }
        {
          selected.location &&
          (
            <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p>{selected.name}</p>
            </InfoWindow>
          )
        }

      </GoogleMap>
      <IconWrap onClick={getLocation} ><MdIcons.MdMyLocation /></IconWrap>
    </MapWrap>
  )
}

export default Map
