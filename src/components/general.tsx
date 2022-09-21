import React, { useState } from "react";
import '../styles/general.css';
import avatar from '../resources/images/avatar.jpg';

export const General = () => {
  const [editMode, setEditMode] = useState(false);
  const [personData, setPersonData] = useState({
    name: 'Jonhy Bravo',
    age: '26',
    country: 'Lithuania',
    city: 'Vilnius',
    email: 'email@gmail.com',
    phone: '+37067894561',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonData({...personData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditMode(false);
  }

  const formMode = () => {
    return <form onSubmit={handleSubmit} className='general-container'>
      <div className="profile">
        <span>
          <img src={avatar} alt='profile'></img>
        </span>
        <input type="text" placeholder='Full Name' value={personData.name} onChange={handleChange} name='name' />
        <input type="text" placeholder='Age' value={personData.age} onChange={handleChange} name='age' />
        <input type="text" placeholder='Country' value={personData.country} onChange={handleChange} name='country' />
        <input type="text" placeholder='City' value={personData.city} onChange={handleChange} name='city' />
      </div>
      <div className="contact">
        <div>
          <h4>Contact</h4>
          <input type="text" placeholder='Email' value={personData.email} onChange={handleChange} name='email' />
          <input type="text" placeholder='Phone' value={personData.phone} onChange={handleChange} name='phone' />
        </div>
        <input type="submit" value="Confirm" className="button-inverted" />
      </div>
    </form >
  }

  const displayMode = () => {
    return (<div className='general-container'>
      <div className="profile">
        <div><img src={avatar} alt='profile'></img></div>
        <div>
          <h3>{personData.name}<span>, {personData.age}</span></h3>
          <p>{personData.country}, {personData.city}</p>
        </div>
      </div>
      <div className="contact">
        <div>
          <h4>Contact</h4>
          <p>{personData.email}</p>
          <p>{personData.phone}</p>
        </div>
        <button onClick={() => { setEditMode(true); }} className="button">Edit</button>
      </div>
    </div>)
  }

  return editMode ? formMode() : displayMode();
}