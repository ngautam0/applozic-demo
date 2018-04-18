import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      username : ''
    }
    this.updateInput = this.updateInput.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);

  }
  updateInput(event){
    this.setState({username : event.target.value});
  }
  handleClick(){
    window.localStorage.setItem('usernameforapplozicchat', this.state.username);
    window.location.reload()
  }

  render() {
    return (
      <div>
        <div className="form-group row">
          <label className="col-sm-4" htmlFor="usr">Enter User Id To Get Started</label>
          <input type="text" className="form-control col-sm-2" id="usr" onChange={this.updateInput}></input>
          <Link className="col-sm-4" to='/chat'><button className="btn-success " onClick={() => this.handleClick()}>Start Chat</button></Link>

        </div>

      </div>
    );
  }
}

export default Home;
