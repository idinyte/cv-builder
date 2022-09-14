import React, { Component } from "react";
import '../styles/general.css';
import avatar from '../resources/images/avatar.jpg';

export class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      name: 'Jonhy Bravo',
      age: '26',
      country: 'Lithuania',
      city: 'Vilnius',
      email: 'email@gmail.com',
      phone: '+37067894561',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState(
      prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ editMode: false })
  }

  formMode = () => {
    return <form onSubmit={this.handleSubmit} className='general-container'>
      <div class="profile">
        <span>
          <img src={avatar} alt='profile'></img>
        </span>
        <input type="text" placeholder='Full Name' value={this.state.name} onChange={this.handleChange} name='name' />
        <input type="text" placeholder='Age' value={this.state.age} onChange={this.handleChange} name='age' />
        <input type="text" placeholder='Country' value={this.state.country} onChange={this.handleChange} name='country' />
        <input type="text" placeholder='City' value={this.state.city} onChange={this.handleChange} name='city' />
      </div>
      <div class="contact">
        <div>
          <h4>Contact</h4>
          <input type="text" placeholder='Email' value={this.state.email} onChange={this.handleChange} name='email' />
          <input type="text" placeholder='Phone' value={this.state.phone} onChange={this.handleChange} name='phone' />
        </div>
        <input type="submit" value="Confirm" className="button-inverted" />
      </div>
    </form >
  }

  displayMode = () => {
    return <div className='general-container'>
      <div className="profile">
        <div><img src={avatar} alt='profile'></img></div>
        <div>
          <h3>{this.state.name}<span>, {this.state.age}</span></h3>
          <p>{this.state.country}, {this.state.city}</p>
        </div>
      </div>
      <div className="contact">
        <div>
          <h4>Contact</h4>
          <p>{this.state.email}</p>
          <p>{this.state.phone}</p>
        </div>
        <button onClick={() => { this.setState({ editMode: true }) }} className="button">Edit</button>
      </div>
    </div>
  }

  render() {
    return this.state.editMode ? this.formMode() : this.displayMode()
  }
}