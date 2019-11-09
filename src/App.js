import React, { Fragment } from 'react';
import logo from './logo.svg';
import Home from './component/Home';
import Invoice from './component/Invoice';
import Navbar from './component/Navbar';
import Review from './component/Review';
import Login from './component/Login';
import Cart from './component/Cart';
import axios from 'axios';
import { url } from './constant'
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import history from './history'

class App extends React.Component {
  state = { User: null }

  handleLogout = () => {
    this.setState({ User: null })
    history.push('/login')
  }
  handleLogin = async data => {
    const result = await axios.post(url + '/user/login', data)
    const { success, isAdmin, ...User } = result.data
    if (success) {
      console.log(User)
      this.setState({ User: User })
      history.push('/home')
    } else {
      // TODO: show error
    }
  }
  render() {
    const { User } = this.state
    return (
      <Router history={history}>
        <Navbar user={User} handleLogin={this.handleLogin} handleLogout={this.handleLogout} />
        <div className="App" style={{ display: "flex", flexDirection: "column", height: "100vh", margin: "0 10vh" }}>
          <Switch>
            {User &&
              <Fragment>
                <Route path="/cart">
                  <Cart />
                </Route>
                <Route path="/review">
                  <Review />
                </Route>
                <Route path="/invoice">
                  <Invoice />
                </Route>
                <Route path="/home">
                  <Home />
                </Route>
              </Fragment>
            }
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
