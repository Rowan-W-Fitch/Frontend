import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
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
import SpotMap from './spotMap'
import ptDume from '../imgs/Pt_Dume.jpg'


class Spots extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      locations: null
    }

  }

  async componentDidMount(){
    console.log("making api call")
    const pts = await fetch(`${process.env.REACT_APP_API}/markers`,
    {
      method: "get",
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((re)=>{ return re.json() }).then((json)=>{ this.setState({ locations: JSON.parse(json) }) });
  }

  render(){
    const APIKey = process.env.REACT_APP_GOOGLE_API_KEY
    const logged = this.props.auth.checkAuth()
    return(
      logged ?
      (
      <div>
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
            <Card style = {{marginTop: "5px", marginLeft: "15%", width: "70%", height: "700px"}}>
              <Card.Header>
                All Current Spots
              </Card.Header>
              <Card.Body>
                <SpotMap locations = {this.state.locations} />
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </div>
    ) :
      (<Redirect to = "/" />)
    );
  }

}

export default props => {
  return (
    <Subscribe to={[AuthContainer]}>
      {(a) => <Spots auth = {a}/>}
    </Subscribe>
  )
}
