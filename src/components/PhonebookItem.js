import React, { useRef, useState } from "react";
import { faPenToSquare, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { request, url } from "../services/PhonebookApi";
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

    const handleEditButton = () => {
        setIsUpdate(true);
    }

    const handleCloseButton = () => {
        setShowAlert(false);
    }

    const handleAvatarClick = () => {
        navigate(`/avatar/${id}`);
    }

    const handleSaveClick = async (e) => {
        setIsUpdate(false);
        try {
            const response = await request.put(id.toString(), {
                name: updateName,
                phone: updatePhone,
            });
            updatePhonebook(id, response.data);
        } catch (error) {
            console.error('Error updating data:', error);
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



    let baseAvatar = `${url()}/images/${id}/${avatar}`;
    if (!avatar) {
        baseAvatar = `${url()}/images/'default.png'`;
    }

    return (
        <>
            <div className="card">
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
                        {isUpdate ? (
                            <>
                                <input type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} className="form-control" />
                                <input type="text" value={updatePhone} onChange={(e) => setUpdatePhone(e.target.value)} className="form-control" />
                            </>
                        ) : (
                            <>
                                <p className="card-text">{name}</p>
                                <p className="card-text">{phone}</p>
                            </>
                        )}
                        <div className="button-group">
                            <button type="button" onClick={isUpdate ? handleSaveClick : handleEditButton} className="btn-action" >
                                <FontAwesomeIcon icon={isUpdate ? faSave : faPenToSquare} />
                            </button>
                            {!isUpdate && (
                                <button onClick={() => throwDeleteModal({ id, name })} className="btn-action" >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PhonebookItem