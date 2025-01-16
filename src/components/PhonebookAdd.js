import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../services/PhonebookApi';

export const PhonebookAdd = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();



    const cancelSubmit = (e) => {
        e.preventDefault();
        navigate('/');
    }

    const closeButton = () => {
        setShowAlert(false);
    };

    const formSubmit = async () => {
        try {
            await request.post('', { name, phone });
            navigate('/');
        } catch (error) {
            console.error(error.code);
            setAlertMessage('error', error.message);
            setShowAlert(true);
        }
    }

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
                <div className="btn-group">
                    <button type="button" onClick={formSubmit} id="saveData" className="btn-brown">save</button>
                    <button type="button" onClick={cancelSubmit} className="btn-brown">cancel</button>
                </div>
            </div>
        </>
    );
};
