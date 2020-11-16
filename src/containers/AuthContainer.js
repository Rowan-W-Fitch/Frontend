import { Container } from 'unstated'
import Cookies from 'js-cookie'

class AuthContainer extends Container {

  state = {
    user: Cookies.get("token") || null
  }

  async createAuth(email, username, password){
    try{
      const res = await fetch(`${process.env.REACT_APP_API}/register`,
      {
        method: 'post',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password
        })
      })
      if(res.status === 200) {
        this.setState({
          user:{
            token: res.token,
            id: res.id
          }
        })
        Cookies.set("token", res.token)
        return true
      }
      else{
        alert("invalid login credentials")
        return false
      }
    }
    catch(e){
      console.log(e);
    }
  }

  async getAuth(email, username, password){
    try{
      const res = await fetch(`${process.env.REACT_APP_API}/u_token`,
      {
        method: 'post',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password
        })
      })
      if(res.status === 200) {
        this.setState({
          user:{
            token: res.token,
            id: res.id
          }
        })
        Cookies.set("token", res.token)
        return true
      }
      else{
        alert("invalid login credentials")
        return false
      }
    }
    catch(e){
      alert(e);
    }
  }

  checkAuth(){
    if(this.state.user && this.state.user != "null") return true
    else return false
  }

  logOut(){
    Cookies.remove("token")
    this.setState({
      user: null
    })
  }

}

export default AuthContainer
