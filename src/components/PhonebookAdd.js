import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../utils/request';

const PhonebookAdd = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const Navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await request.post('', { name, phone });
            Navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    const closeButton = () => {
        setShowAlert(false);
    };


    return (
        <>
            {showAlert && (
                <div className='alert' id='alert' role='alert'>
                    <button className='close-btn' onClick={closeButton}>X</button>
                </div>
            )}
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <button type="submit">Add Contact</button>
            </form>
        </>
    );
};

export default PhonebookAdd;
