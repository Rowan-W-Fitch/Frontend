import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import MapCard from './map/mapCard'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import { GoogleComponent } from 'react-google-location'
import banzai from '../imgs/banzai.jpg'
import './home.css'


export class Home extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      startLat: null,
      startLon: null,
      getSpots: false,
      Spots: null,
      loading: false,
      maxDistance: null
    }
    this.handleDistance = this.handleDistance.bind(this);
  }

  geoLocate(){
    navigator.geolocation.getCurrentPosition(
      (position) => this.setState({
        startLat: position.coords.latitude,
        startLon: position.coords.longitude
      }))
  }

  handleAddressChange(addy){
    const lat = addy && addy.coordinates && addy.coordinates.lat
    const lon = addy && addy.coordinates && addy.coordinates.lng
    if(lat && lon){
      this.setState({
        startLat: lat,
        startLon: lon
      })
    }
  }

  handleDistance(event) {
    this.setState({
      maxDistance: parseInt(event.target.value)
    })
  }

  async getSpot(){
    try {
      await this.setState({ loading: true })
      const res = await fetch('http://localhost:8000/get_spots',
      {
        method: "post",
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          max_distance: this.state.maxDistance,
          latitude: this.state.startLat,
          longitude: this.state.startLon
        })
      }).then((re)=>{ return re.json() }).then((json)=>{ this.setState({ Spots: json, getSpots: false, loading: false }) });
    }
    catch(e){
      alert(e);
    }
  }

  render(){
    const APIKey = process.env.REACT_APP_GOOGLE_API_KEY
    return(
      <Container fluid>
        <Row>
          <Col sm = {8}>
            <Jumbotron>
              <p> Welcome to Optimal Stoke! </p>
              <Button onClick = {() => this.setState({ getSpots: true })}>
              Get Optimal Spot
              </Button>
            </Jumbotron>
          </Col>
          <Col sm = {4}>
            <img src = {banzai} width = {300} height = {300}/>
          </Col>
        </Row>

        <Modal
        show={this.state.getSpots}
        onHide={() => this.setState({ getSpots: false })}
        backdrop="static"
        keyboard={false}
        size = "lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Please Provide The Following Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Container>
                <Row className="align-items-center">
                  <Col>
                    <Form.Group>
                      <Form.Label><b>Enter Your Address Here</b></Form.Label>
                      <GoogleComponent
                        apiKey={APIKey}
                        coordinates = {true}
                        onChange={(e) => this.handleAddressChange(e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs ="auto" >
                    <Button className = 'mt-3' onClick = {() => this.geoLocate()}>
                      Use Your Current Location
                    </Button>
                  </Col>
                </Row>
                <Row className = "align-items-center">
                  <Col xs = "auto">
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label><b>How Far Are You Willing to Drive?</b></Form.Label>
                      <Form.Control as="select" onChange={this.handleDistance}>
                        <option value = {10} >10 miles (normal)</option>
                        <option value = {20} >20 miles (kinda far)</option>
                        <option value = {30} >30 miles (pretty far)</option>
                        <option value = {40} >40 miles (very dedicated)</option>
                        <option value = {50} >50 miles (I'm desparate!)</option>
                        <option value = {75} >75 miles (I live in San Bernardino)</option>
                        <option value = {100} >100 miles (I'm taking a daytrip)</option>
                        <option value = {1000} >I'm looking to score anywhere</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Container>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
            disabled = { this.state.startLat && this.state.startLon && this.state.loading===false ? false : true }
            onClick = {() => this.getSpot()}
            >
              {this.state.loading && (
                <Spinner animation="border" />
              )}
              {this.state.loading ? null: "Get Spots!"}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
        show={this.state.Spots ? true : false}
        onHide={() => this.setState({ Spots: null })}
        backdrop="static"
        keyboard={false}
        size = "lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Your Top Beach</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Container>
                <Row>
                  <MapCard
                  startLat = {this.state.startLat}
                  startLng = {this.state.startLon}
                  beachName = {this.state.Spots? this.state.Spots.best_name : null}
                  endLat = {this.state.Spots ? this.state.Spots.best_lat : null}
                  endLng = {this.state.Spots ? this.state.Spots.best_lon : null}
                  />
                </Row>
              </Container>
            </Form>
          </Modal.Body>
        </Modal>

      </Container>
    );
  }

}
