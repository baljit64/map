import React, { useEffect, useState } from 'react'
import { MapWrap, IconWrap, mapStyles } from './MapStyles'
import { GoogleMap, Marker, InfoWindow, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import styled from 'styled-components';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import './styles.css'
import { GeoCode } from './GeoCode'
import { useSelector, useDispatch } from 'react-redux';
import { setLocation, setMyAddress } from '../../store/action/Actions'
import AutoPlace from './AutoPlace'
import { Button } from 'react-bootstrap'
// search panel
const SearchBox = styled.div`
width:360px;
max-width:80%;
height: ${({ open, expand }) => (open && expand ? 'calc(100vh)' : !open && !expand ? '80px' : "110px")};
position:absolute;
left:${({ open }) => (open ? '0px' : '10px')};
top:${({ open }) => (open ? '0px' : '10px')};
background:#fff;
padding-left:10px;
padding-right:10px;
 box-shadow:1px 1px 5px #555555;
z-index:9;
transition:all ease-in 0.3s;
.input-wrap{
  position:relative;
 .icon{ 
   position:absolute;
   right:7px;
   top:50%;
   transform:translateY(-25%);
   cursor:pointer;
   font-size:16px;
   color:#000;
   opacity:${({ notEmpty }) => (notEmpty ? "1" : "0")}
 }
}
.expand-btn{
  height:28px;
  border-radius:25px;
  width:200px;
  border:none;
  box-shadow:1px 1px 5px #555555;
  color:#000;
  background:#fff;
  font-size:16px;
  cursor:pointer;
  text-align:center;
  margin-top:5px;
  position:absolute;
    left:50%;
    transform:translateX(-50%);
  bottom:10px;
 z-index:8;
 display:flex;
 justify-content:center;
 align-items:center;
 transition:all ease-in-out 0.3s;
 &:hover{
   background:blue;
   color:#fff;
 }
}
`

export default function Map() {
  const dispatch = useDispatch()
  const [open, setopen] = useState(false)
  const [notEmpty, setNotEmpty] = useState(false)
  const currentPosition = useSelector(state => state.Locations.location);
  const destination = useSelector(state => state.Locations.d_latlng);
  const [response, setResponse] = useState(null)
  const [start, setStart] = useState(true)
  const [expand, setExpand] = useState(false)

  // set location value
  const getCurrentLocation = (location) => { dispatch(setLocation(location)) }
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
      getCurrentLocation(latlng)
    });
  }
  useEffect(() => {
    getLocation()
  }, [])

  // change location with marker drag nd drop
  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    dispatch(setLocation({ lat, lng }))
  };
  const getCode = async () => {
    let result = await GeoCode({ currentPosition })
    dispatch(setMyAddress(result))
  }
  // updating cuurent position
  useEffect(() => {
    if (!currentPosition) {
      return false;
    }
    dispatch(setLocation(currentPosition))
    getCode()
  }, [currentPosition])
  // callbak
  const directionsCallback = (response) => {
    // console.log(response)
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response)

      } else {
        console.log('response: ', response)
      }
    }
  }
  useEffect(() => {
    if (destination === null) {
      setExpand(false)
    }
    else {
      setExpand(true)
    }
  }, [destination])

  // // play loader before map load
  if (!currentPosition) {
    return (
      <h3>
        Loading...........
      </h3>
    )
  }
  return (
    <MapWrap>

      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={destination ? 10 : 16}
        center={currentPosition}
        onLoad={map => {
          map.addListener('click', (e) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            let newAddress = { lat, lng }
          })
        }}
      >
        {
          (
            destination !== '' &&
            currentPosition !== ''
          ) && (
            <DirectionsService
              // required
              options={{
                destination: destination,
                origin: currentPosition,
                travelMode: 'WALKING',
                region: "INTERNATIONAL"

              }}
              callback={directionsCallback}

            />
          )
        }
        {
          response !== null && start === true && (
            <DirectionsRenderer

              options={{
                directions: response
              }}

            />
          )
        }
        {
          currentPosition.lat ?
            <Marker

              position={currentPosition}
              onDragEnd={(e) => onMarkerDragEnd(e)}
              draggable={true} /> :
            null
        }
        {destination ?
          <Marker
            position={destination}
          // onDragEnd={(e) => onMarkerDragEnd(e)}
          /> :
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
      <SearchBox expand={expand} open={open}>
        <div className="input-wrap">
          <FaIcons.FaTimes className="icon" />
          <AutoPlace />
        </div>
        {open && expand && destination ?
          <Button>Start direction</Button> : ''
        }
        {expand ? <div onClick={() => setopen(!open)} className="expand-btn">{open ? "Close" : "View Details"}</div> : ''}

      </SearchBox>
    </MapWrap>
  )
}




