import React, { Fragment } from 'react';
import logo from './logo.svg';
import Home from './component/Home';
import Invoice from './component/Invoice';
import Navbar from './component/Navbar';
import Review from './component/Review';
import Login from './component/Login';
import Cart from './component/Cart';
import Sending from './component/Sending';
import Managing from './component/Managing';
import Profile from './component/Profile';
import Promotion from './component/Promotion';
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
  state = { User: null, error: false }

  handleLogout = () => {
    this.setState({ User: null })
    history.push('/login')
  }
  handleLogin = async data => {
    const result = await axios.post(url + '/user/login', data)
    const { success, ...User } = result.data
    if (success) {
      this.setState({ User: { ...User } })
      history.push('/home')
    } else {
      this.setState({ error: true })
    }
  }

  handleEditUser = User => {
    this.setState({ User })
  }
  render() {
    const { User, error } = this.state
    return (
      <Router history={history}>
        <Navbar user={User} handleLogin={this.handleLogin} handleLogout={this.handleLogout} error={error} removeError={() => { this.setState({ error: false }) }} />
        <div className="App" style={{ display: "flex", flexDirection: "column", height: "100vh", margin: "0 10vh" }}>
          <Switch>
            {User &&
              <Fragment>
                <Route path="/cart">
                  <Cart user={User} />
                </Route>
                {!User.isAdmin &&
                  <Route path="/review">
                    <Review user={User} />
                  </Route>
                }
                {User.isAdmin &&
                  <Fragment>
                    <Route path="/sending">
                      <Sending />
                    </Route>
                    <Route path="/managing">
                      <Managing />
                    </Route>
                    <Route path="/promotion">
                      <Promotion />
                    </Route>
                  </Fragment>
                }
                <Route path="/invoice">
                  <Invoice />
                </Route>
                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/profile">
                  <Profile handleEditUser={this.handleEditUser} ID={User.ID} />
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
