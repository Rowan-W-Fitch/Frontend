import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { GoogleComponent } from 'react-google-location'
import banzai from '../imgs/banzai.jpg'
import './home.css'

export class Home extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      startLat: null,
      startLon: null,
      getSpots: false
    }
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
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Enter Your Address</Form.Label>
                      <GoogleComponent
                        apiKey={APIKey}
                        coordinates = {true}
                        onChange={(e) => this.handleAddressChange(e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Button onClick = {() => this.geoLocate()}>
                      Use Your Current Location
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled = { this.state.startLat && this.state.startLon ? false : true }>Get Spots!</Button>
          </Modal.Footer>
        </Modal>

      </Container>
    );
  }

}
