import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Home from './Home';
import Chat from './Chat'
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username : ''
    }
    this.updateInput = this.updateInput.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);

  }
  updateInput(event){
    this.setState({username : event.target.value})
  }
  handleClick(){
    var userid = this.state.username;
    // this.initializeAppLogic(userid);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">NFA Applozic Spike</h1>
        </header>
        <p className="App-intro">
          This is to demo applozic chat integration with react.js for NFA.
        </p>
        <main>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/chat' component={Chat}/>
          </Switch>

        </main>
      </div>
    );
  }
}

export default App;
