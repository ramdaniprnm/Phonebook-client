import React, { useRef, useState } from "react";
import { faPenToSquare, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { request } from "../services/PhonebookApi";
import { useNavigate } from "react-router-dom";

const PhonebookItem = (props) => {
    const { id, name, phone, avatar, updatePhonebook, throwDeleteModal } = props;
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateName, setUpdateName] = useState(name);
    const [updatePhone, setUpdatePhone] = useState(phone);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const fileInput = useRef(null);
    const navigate = useNavigate();

    let baseAvatar = `http://192.168.1.7:3003/images/${id}/${avatar}`;
    if (!avatar) {
        baseAvatar = `http://192.168.1.7:3003/images/default.png`;
    };

    const handleEditButton = async () => {
        try {
            setIsUpdate(true);
        }
        catch (error) {
            console.error('Error updating handleEdit:', error);
        }
    };


    const handleCloseButton = () => {
        setShowAlert(false);
    };

    const handleAvatarClick = () => {
        navigate(`/avatar/${id}`);
    };

    const handleSaveClick = async (e) => {
        setIsUpdate(false);
        try {
            const response = await request.put(`api/phonebook/${id}`, {
                name: updateName,
                phone: updatePhone,
            });
            updatePhonebook(id, response.data);
        } catch (error) {
            console.error('Error updating handleSaveclick:', error);
            setAlertMessage('Failed to update. Please try again.');
        }
    };

    const handleSaveFile = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('avatar', file);
            try {
                const response = await request.put(`${id}/avatar`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                updatePhonebook(id, response.data);
            } catch (error) {
                console.error('Error updating avatar:', error);
                setAlertMessage('Failed to update avatar. Please try again.');
                setShowAlert(true);
            }
        }
    };


    return (
        <>
            {showAlert && (
                <div className='alert' id='alert' role='alert'>
                    <button className='close-btn' onClick={handleCloseButton}>X</button>
                    <p id='alert-Message'>{alertMessage}</p>
                </div>
            )}
            <div className="card-body">
                <img src={baseAvatar} alt={name} onClick={handleAvatarClick} className='avatar' />
                <input
                    type='file'
                    ref={fileInput}
                    style={{ position: 'absolute', width: '1px', height: '1px', opacity: '0', overflow: 'hidden', border: '0', padding: '0', margin: '-1' }}
                    aria-hidden='true'
                    onChange={handleSaveFile}
                />
                <div className="card-content">
                    <form onSubmit={e => e.preventDefault()}>
                        {isUpdate ? (
                            <>
                                <input type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} className="adding-form" />
                                <input type="text" value={updatePhone} onChange={(e) => setUpdatePhone(e.target.value)} className="adding-form" />
                            </>
                        ) : (
                            <>
                                <p className="card-text">{name}</p>
                                <p className="card-text">{phone}</p>
                            </>
                        )}
                        <div className="button-group">
                            <button type="submit" onClick={isUpdate ? handleSaveClick : handleEditButton} className="btn-action" >
                                <FontAwesomeIcon icon={isUpdate ? faSave : faPenToSquare} />
                            </button>
                            {!isUpdate && (
                                <button type="submit" onClick={() => throwDeleteModal({ id, name })} className="btn-action" >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default PhonebookItem