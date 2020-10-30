/*global google*/
import React from 'react';
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} = require("react-google-maps");
const APIKey = process.env.REACT_APP_GOOGLE_API_KEY

export class SpotMap extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      dirs: null
    }
  }

  render(){
    const pts = this.props.locations

    const MapWithMarkers = compose(
      withScriptjs,
      withGoogleMap,
    )(props =>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={new google.maps.LatLng(34.052235, -118.243683)}
      >
        {
          pts && pts.map( p =>
            (<Marker
              position={{ lat: Number(p.lat), lng: Number(p.lng) }}
              />
            )
          )
        }
      </GoogleMap>
    );

    return(
      <div>
        <MapWithMarkers
        googleMapURL = {`https://maps.googleapis.com/maps/api/js?key=${APIKey}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement= <div style={{ height: `100%` }} />
        containerElement= <div style={{ height: `600px` }} />
        mapElement= <div style={{ height: `100%` }} />
        />
      </div>
    )
  }



}

export default SpotMap
