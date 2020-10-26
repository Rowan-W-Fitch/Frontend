import React from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import logo from '../imgs/logo.png'
import { Route, Redirect } from 'react-router-dom'
import AuthContainer from '../../containers/AuthContainer'
import { Subscribe } from 'unstated';
import Home from '../home/home'


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
    return(
      this.state.logged?
      (
        <Redirect to = "/home" />
      )
      :
      (
        <Container>
          <Row style = {{ marginTop: '75px' }}>
            <Col>
            </Col>
            <Col>
              <Card style={{ width: '25rem' }}>
                <Card.Header>
                  <img src = {logo} width = {80} height = {80}/>
                  {' '}
                  <b>Sign In</b>
                </Card.Header>
                <Card.Body>
                <Form>
                  <Form.Group controlId="formUser">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" value = {this.state.username} onChange = {this.handleUChange}/>
                  </Form.Group>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value = {this.state.email} onChange = {this.handleEmailChange} />
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value = {this.state.password} onChange = {this.handlePassChange} />
                  </Form.Group>
                  <Button style = {{ marginTop: '25px' }} variant="primary" size = "lg" block onClick = { () => this.sendData() }>
                    Login
                  </Button>
                </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col>
            </Col>
          </Row>
        </Container>
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
