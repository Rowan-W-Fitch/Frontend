import React from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect, Link } from 'react-router-dom';
import { Home } from '../home/home';
import AuthContainer from '../../containers/AuthContainer'
import { Subscribe } from 'unstated';
import jax from "../imgs/jax.jpg"
import logo2 from '../imgs/logo2.png'

class Register extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
    }
  }

  handleNameChange = (event) => {
    this.setState({
      first_name: event.target.value
    })
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

  handlePass2Change = (event) => {
    this.setState({
      password2: event.target.value
    })
  }

  emailGood(email){
    var atSymbol = false;
    var dotSymbol = false;
    for(var i = 0; i<email.length; i++){
      if(email[i] === '@') atSymbol = true;
      else if(email[i] === '.') dotSymbol = true;
    }
    if(atSymbol && dotSymbol) return true;
    else return false;
  }

  formGood(){
    if(
      this.state.username !== '' &&
      this.emailGood(this.state.email) &&
      this.state.password === this.state.password2) return true;
    else return false;
  }

  async postData(){
    try{
      const loggedIn = await this.props.auth.createAuth(this.state.email, this.state.username, this.state.password)
      if(loggedIn === true) this.setState({ logged: true })
    }
    catch(e){
      alert(e);
    }
  }

  sendData(){
    if(!this.formGood()) alert('form invalid!');
    else{
      this.postData();
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
        backgroundImage: `url(${jax})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        opacity: 1.6,
      }
    }
    const logCheck = this.props.auth.checkAuth()
    return(
      this.state.logged || logCheck ?
      (<Redirect to = "/home" />)
      :
      (
      <div style = {styles.content}>
        <Container>
          <Row>
            <Col>
            </Col>
            <Col>
              <Card style={{ marginTop: "", marginLeft: "40%",  width: "400px"}}>
                <Card.Header>
                  <img src = {logo2} width="50" height="50"/><b>Register Your Optimal Stoke Account</b>
                </Card.Header>
                <Card.Body>
                <Form>
                  <Form.Group controlId="formUser">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="Dude123"  ref = "user_name_input" value = {this.state.username} onChange = {this.handleUChange}/>
                  </Form.Group>
                  <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="hbshreder@gmail.com" ref = "email_input" value = {this.state.email} onChange = {this.handleEmailChange} />
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="surferDude123" ref = "pass1_input" value = {this.state.password} onChange = {this.handlePassChange} />
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword2">
                    <Form.Label>Verify Password</Form.Label>
                    <Form.Control type="password" ref = "pass2_input" value = {this.state.password2} onChange = {this.handlePass2Change}/>
                  </Form.Group>
                  <Button style = {{ marginTop: '20px' }} variant="primary" size = "lg" block onClick = { () => this.sendData() }>
                    Register
                  </Button>
                </Form>
                <div style = {{marginTop: "2%" }}>
                  <Link to={"/"}><b>Already Have An Account?</b></Link>
                </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
    );
  }

}

export default props => {
  return (
    <Subscribe to={[AuthContainer]}>
      {(a) => <Register auth = {a}/>}
    </Subscribe>
  )
}
