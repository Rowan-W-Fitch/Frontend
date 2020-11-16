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
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import ImageFadeIn from "react-image-fade-in";
import { GoogleComponent } from 'react-google-location'
import InfiniteScroll from 'react-infinite-scroller'
import rowan from '../imgs/rowan.JPG'
import AuthContainer from '../../containers/AuthContainer'
import { Redirect } from 'react-router-dom'
import { Subscribe } from 'unstated';
import logo2 from '../imgs/logo2.png'


class Home extends React.Component{

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
      const res = await fetch(`${process.env.REACT_APP_API}/get_spots`,
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
      }).then((re)=>{ return re.json() }).then((json)=>{ this.setState({ Spots: JSON.parse(json), getSpots: false, loading: false }) });
    }
    catch(e){
      alert(e);
    }
  }

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        Spots: this.state.Spots.concat(Array.from({ length: this.state.Spots.length }))
      });
    }, 1500);
  }

  render(){
    const APIKey = process.env.REACT_APP_GOOGLE_API_KEY
    const logged = this.props.auth.checkAuth()
    return(
      logged ?
      (<div className = 'content' >
        <Navbar bg="light" variant = "light">
          <Navbar.Brand>
          <img
            src={logo2}
            width="50"
            height="50"
          />
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/map">Spot Map</Nav.Link>
          </Nav>
          <Button onClick = { () => this.props.auth.logOut() }>Log out</Button>
        </Navbar>
        <Container fluid>
          <Row>
            <Col>
              <Row style = {{justifyContent: "center"}}>
                <Card className = "mt-3" style = {{width: "70rem"}}>
                  <Card.Header className="text-center"><b>Welcome To Optimal Stoke!</b></Card.Header>
                  <Card.Body>
                    <li>First, you enter your starting address (or you can share your current location)</li>
                    <li>Next, enter the max distance you're willing to drive for a surf</li>
                    <li>Finally, sit back and let the amazing ranking algorithm decide for you where to surf, no more anxiety on where to go!</li>
                    <div className="text-center mt-2">
                      <Button onClick = {() => this.setState({ getSpots: true })}>
                      Get Optimal Spot
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Row>

              <Row className = "mt-3" style = {{justifyContent: "center"}}>
                <Card style = {{width: "70rem", overflowY: "scroll"}}>
                  <Card.Header className = "text-center"><b>{this.state.Spots ? "Your Top Spots" : "About the Dev"}</b></Card.Header>
                  <Card.Body>
                  {this.state.Spots ?
                    (<Row className = "mt-3 justify-content-center">
                    {
                      this.state.Spots && this.state.Spots.length > 0 ?
                      (
                        <div style={{width: "90%", maxHeight: "430px"}}>
                          <InfiniteScroll
                          pageStart={0}
                          hasMore={false}
                          useWindow={false}
                          >
                            {this.state.Spots.map( s => (<Row className = "mb-3"><MapCard startLat={this.state.startLat} startLng = {this.state.startLon} endLat = {s.lat} endLng = {s.lon} beachName = {s.name}/></Row>))}
                          </InfiniteScroll>
                        </div>
                      )
                      :
                      <h5>No Spots are Close Enough!</h5>
                    }
                    </Row>) : (
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
                        <img
                          style = {{marginLeft: "3rem"}}
                          src={logo2}
                          width="100"
                          height="100"
                        />
                      </Col>
                      <Col className = "text-center">
                        <Image src={rowan} style = {{ width: 350, height: 350 }}roundedCircle />
                        <br/>
                        <br/>
                        {'Me at HB'}
                      </Col>
                      </Row>
                    )}
                  </Card.Body>
                </Card>
              </Row>
            </Col>
          </Row>
        </Container>
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
                          <option>Choose Distance</option>
                          <option value = {10} >10 miles (normal)</option>
                          <option value = {20} >20 miles (kinda far)</option>
                          <option value = {30} >30 miles (pretty far)</option>
                          <option value = {40} >40 miles (very dedicated)</option>
                          <option value = {50} >50 miles (I'm frothing)</option>
                          <option value = {60} >60 miles (I'm desparate!)</option>
                          <option value = {75} >75 miles (I'm a weekend warrior)</option>
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
              disabled = { this.state.startLat && this.state.startLon && this.state.maxDistance && this.state.loading===false ? false : true }
              onClick = {() => this.getSpot()}
              >
                {this.state.loading && (
                  <Spinner animation="border" />
                )}
                {this.state.loading ? null: "Get Spots!"}
              </Button>
            </Modal.Footer>
          </Modal>
      </div>) :
      (<Redirect to = "/" />)
    );
  }

}

export default props => {
  return (
    <Subscribe to={[AuthContainer]}>
      {(a) => <Home auth = {a}/>}
    </Subscribe>
  )
}
