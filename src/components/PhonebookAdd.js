import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { request } from '../services/PhonebookApi';
import {OfflineOnline} from './OfflineOnline'

export const PhonebookAdd = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const isOnline = OfflineOnline();

  const cancelSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const closeButton = () => {
    setShowAlert(false);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Name and phone number are required');
      return;
    }

    const contactData = { name, phone, avatar: null, userId };

    // When online, try the API normally
    if (isOnline) {
      try {
        const { data } = await request.post('api/phonebook', contactData);
        navigate('/');
        console.log(data);
    } catch (error) {
        console.error('Error adding new item online:', error);
      }
    } else {
      const pendingContact = {
        ...contactData,
        status: { sent: false, operation: 'add' },
        id: `temp-${Date.now()}`
      };
      const existData = JSON.parse(sessionStorage.getItem('local_pending') || '[]');
      sessionStorage.setItem('local_pending', JSON.stringify([...existData, pendingContact]));
      navigate('/');
    }
  };

  return (
    <>
      {showAlert && (
        <div className='alert' id='alert' role='alert'>
          <button className='close-btn' onClick={closeButton}>X</button>
          <p id='alert-Message'>{alertMessage}</p>
        </div>
      )}
      <div className='form-data'>
        <form onSubmit={formSubmit}>
          <input
            type="text"
            className="adding-form"
            id='name'
            name='name'
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="adding-form"
            id='phone'
            name='phone'
            required
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="btn-group">
            <button type="submit" onClick={formSubmit} className="btn-brown">Save</button>
            <button type="button" onClick={cancelSubmit} className="btn-brown">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};