import { Route, Redirect } from "react-router-dom";

const restrictedRoute = (props) => {
  return(
    this.props.loggedIn ?
      (<Route path = { this.props.url }>
        <{this.props.comp}/>
      </Route>)
      :
      (<Redirect to = "/login" />)
  )
}
