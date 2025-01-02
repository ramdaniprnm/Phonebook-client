import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../services/PhonebookApi';

export default function PhonebookAdd() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const Navigate = useNavigate();

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            await request.post('', { name, phone });
            Navigate('/');
        } catch (error) {
            console.error(error);
            setAlertMessage('error', error.message);
            setShowAlert(true);
        }
    }


    const cancelSubmit = (e) => {
        e.preventDefault();
        Navigate('/');
    }

    const closeButton = () => {
        setShowAlert(false);
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
                <input
                    type="text"
                    className="form-control"
                    id='name'
                    name='name'
                    required
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    id='phone'
                    name='phone'
                    required
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div className='btn-group'>
                <button type="button" id='addData' className='col btn btn-brown mr-5' onClick={formSubmit}>Add</button>
                <button type="button" id='cancel' className='col btn btn-brown ml-5' onClick={cancelSubmit}>Cancel</button>
            </div>
        </>
    );
};
