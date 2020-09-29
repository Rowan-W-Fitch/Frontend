import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import MapCard from './map/mapCard'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import Image from 'react-bootstrap/Image'
import ImageFadeIn from "react-image-fade-in";
import { GoogleComponent } from 'react-google-location'
import banzai from '../imgs/banzai.jpg'
import rowan from '../imgs/rowan.JPG'
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
      <div className = 'content' >
        <Container fluid>
          <Row className = 'mt-3'>
            <Col sm = {6}/>
            <Col>
              <Card>
                <Card.Header className="text-center"><b>Welcome To Optimal Stoke!</b></Card.Header>
                <Card.Body>
                  <ul>First, you enter your starting address (or you can share your current location)</ul>
                  <ul>Next, enter the max distance you're willing to drive for a surf</ul>
                  <ul>Finally, sit back and let the amazing ranking algorithm decide for you where to surf, no more anxiety on where to go!</ul>
                  <div className="text-center">
                    <Button onClick = {() => this.setState({ getSpots: true })}>
                    Get Optimal Spot
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className = 'mt-3 mb-3'>
            <Col sm = {6}/>
            <Col>
              <Card>
                <Card.Header className = "text-center"><b>About the Dev</b></Card.Header>
                <Card.Body>
                  <Row>
                  <Col sm={6}>
                    <p>
                      My name is Rowan Fitch, and I'm a senior at Occidental College in Los Angeles, but I grew up surfing in Jax Beach, Florida. When I came to college in Los Angeles, I faced an interesting dillemma.
                      My problem was that Occidental College was about an hour drive away from any beach worth surfing at. As a result, I actually have a wider array of beaches I can surf at, since there isn't a clear
                      cut obvious choice. Malibu surfrider is about an hour north, Huntington Beach is about an hour south, and El Porto is about an hour west. So, I created this project as an attempt to solve my
                      peculiar problem. I also wanted to share my knowledge of surf spots I have come to know and love here in California (HB always will have my heart) with anyone else who uses this. I hope your stoke is
                      optimized! -Rowan Fitch
                    </p>
                    <br/>
                    <Button onClick = {() => this.setState({ getSpots: true })}>
                      Get Optimal Spot
                    </Button>
                  </Col>
                  <Col className = "text-center">
                    <Image src={rowan} style = {{ width: 350, height: 350 }}roundedCircle />
                    <br/>
                    <br/>
                    {'Me at HB'}
                  </Col>
                  </Row>
                </Card.Body>
              </Card>
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
      </div>
    );
  }

}
