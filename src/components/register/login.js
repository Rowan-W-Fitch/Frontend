import React from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {
  Icon,
  InputGroup
} from "@blueprintjs/core"
import pavones from "../imgs/Pavones.jpg"
import { Route, Redirect, Link } from 'react-router-dom'
import AuthContainer from '../../containers/AuthContainer'
import { Subscribe } from 'unstated';
import Home from '../home/home'
import logo2 from '../imgs/logo2.png'

class Login extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
    }
  }

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  handleUChange = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handlePassChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  async sendData(){
    try{
      const loggedIn = await this.props.auth.getAuth(this.state.email, this.state.username, this.state.password)
      if(loggedIn === true ) this.setState({ logged: true })
    }
    catch(e){
      alert(e);
    }
  }

  render(){
    const styles = {
      content:{
        minHeight: "100vh",
        height: "100%",
        display: "block",
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${pavones})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        opacity: 1.6,
      }
    }
    const logCheck = this.props.auth.checkAuth()
    return(
      this.state.logged || logCheck ?
      (
        <Redirect to = "/home" />
      )
      :
      (
        <div style = {styles.content}>
          <Container>
                <Row style ={{justifyContent: "center"}}>
                  <Card style={{ marginTop: "5%", width: "300px"}}>
                    <Card.Header>
                      <img src = {logo2} width="50" height="50"/><b>Sign In</b>
                    </Card.Header>
                    <Card.Body>
                    <Form>
                      <Form.Group controlId="formUser">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" value = {this.state.username} onChange = {this.handleUChange} defaultValue="Bob" />
                      </Form.Group>
                      <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value = {this.state.email} onChange = {this.handleEmailChange} />
                      </Form.Group>
                      <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value = {this.state.password} onChange = {this.handlePassChange} />
                      </Form.Group>
                      <Button style = {{ marginTop: '25px', height: "100%" }} variant="primary" size = "lg" block onClick = { () => this.sendData() }>
                        Login
                      </Button>
                    </Form>
                    <div style = {{marginTop: "2%" }}>
                      <Link to={"/register"}><b>Don't Have An Account?</b></Link>
                    </div>
                    </Card.Body>
                  </Card>
                </Row>
          </Container>
        </div>
      ))
    }

}

export default props => {
  return (
    <Subscribe to={[AuthContainer]}>
      {(a) => <Login auth = {a}/>}
    </Subscribe>
  )
}
