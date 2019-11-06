import React from 'react';
import logo from './logo.svg';
import Home from './component/Home';
import Navbar from './component/Navbar';
import 'semantic-ui-css/semantic.min.css'
// import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App" style={{ display: "flex", height: "100vh" }}>
        <Navbar />
        <Home />
      </div>
    );
  }
}

export default App;
