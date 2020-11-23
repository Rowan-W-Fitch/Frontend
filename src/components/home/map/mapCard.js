/*global google*/
import React from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");
const APIKey = process.env.REACT_APP_GOOGLE_API_KEY

export class MapCard extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      dirs: null
    }
  }

  render(){
    const startLat = this.props.startLat
    const startLng = this.props.startLng
    const endLat = this.props.endLat
    const endLng = this.props.endLng

    const MapWithADirectionsRenderer = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${APIKey}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() {
          const DirectionsService = new google.maps.DirectionsService();

          DirectionsService.route({
            origin: new google.maps.LatLng(startLat, startLng),
            destination: new google.maps.LatLng(endLat, endLng),
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result,
              });
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
        }
      })
    )(props =>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={new google.maps.LatLng(34.052235, -118.243683)}
      >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
      </GoogleMap>
    );

    return(
      <Container>
        <Card>
          <Card.Header>
            <Row>
              <Col md={4}>
                <b>{`${this.props.beachName} (${this.props.report})`}</b>
              </Col>
              <Col md={{ span: 4, offset: 4 }}>
                <a style = {{marginLeft: "30%"}} href = {this.props.url} target={"_blank"} rel={"noopener noreferrer"}>View On Surfline.com</a>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <MapWithADirectionsRenderer/>
          </Card.Body>
        </Card>
      </Container>
    )
  }



}

export default MapCard
