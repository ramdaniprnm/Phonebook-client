import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../services/PhonebookApi';

export const PhonebookAdd = () => {
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
            console.log(`name: ${name}, phone: ${phone}`);
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
                <form onSubmit={formSubmit}>
                    <input
                        type="text"
                        className="form-control"
                        id='name'
                        name='name'
                        required
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control"
                        id='phone'
                        name='phone'
                        required
                        placeholder="Phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <div className="btn-group">
                        <button type="submit" className="btn-brown">save</button>
                        <button onClick={cancelSubmit} className="btn-brown">cancel</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PhonebookAdd;