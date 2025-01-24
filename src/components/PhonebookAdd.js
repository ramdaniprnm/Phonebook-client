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
        if (!name || !phone) {
            alert('Name and phone number are required');
            return;
        }
        try {
            await request.post('http://localhost:3003/api/phonebook', { name, phone, avatar: null });
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
                <form onSubmit={e => e.preventDefault()}>
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
                        <button type="submit" onClick={formSubmit} id="saveData" className="btn-brown">save</button>
                        <button type="submit" onClick={cancelSubmit} className="btn-brown">cancel</button>
                    </div>
                </form>
            </div>
        </>
    );
};
