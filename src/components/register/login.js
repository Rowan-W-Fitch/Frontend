import React from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export class Login extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      email: '',
      username: '',
      password: ''
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
      let res = await fetch('http://localhost:8000/u_token',
      {
        method: 'post',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          username: this.state.username,
          password: this.state.password
        })
      }).then((res)=>{ return res.json() }).then((json)=>{ console.log(json) });
    }
    catch(e){
      alert(e);
    }
  }

  render(){
    return(
            <Container>
              <Row style = {{ marginTop: '75px' }}>
                <Col>
                </Col>
                <Col>
                  <Card style={{ width: '25rem' }}>
                    <Card.Header>
                      <b>Sign In to Optimal Stoke</b>
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
          );
  }

}
