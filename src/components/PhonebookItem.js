import React, { useCallback, useRef, useState } from "react";
import { faPenToSquare, faRotate, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { request } from "../services/PhonebookApi";
import { useNavigate } from "react-router-dom";
import { PhonebookList } from "./PhonebookList";

const PhonebookItem = (props) => {
    const { id, name, phone, avatar, updatePhonebook, throwDeleteModal, synced, resend } = props;
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

//     const removeResend = useCallback((_id) => {
//         request.delete(`api/phonebook/${_id}`).then(() => {
//             setData(state => state.filter(item => item._id !== data._id));
//         }).catch((error) => {
//             console.error('Error removing:', error);
//         });
//     }, [])

//     const resendItem = useCallback((phonebook) => {
//             request.post(`api/phonebook`, {
//                 name: phonebook.name,
//                 phone: phonebook.phone
//             }).then(({data}) => {
//                 setData(state => state.map(item => {
//                     if (item._id === data._id) {
//                     data.sent = true
//                 }
//             return item
//         }))
//     })    
// }, []);

return (
    <>
        {showAlert && (
            <div className='alert' id='alert' role='alert'>
                <button className='close-btn' onClick={() => setShowAlert(false)}>X</button>
                <p id='alert-Message'>{alertMessage}</p>
            </div>
        )}
        <div className="card-body">
            <img src={baseAvatar} alt={name} onClick={() => navigate(`/avatar/${id}`)} className='avatar' />
            <input
                type='file'
                ref={fileInput}
                style={{ display: 'none' }}
                onChange={handleSaveFile}
            />
            <div className="card-content">
                <form onSubmit={e => e.preventDefault()}>
                    {isUpdate ? (
                        <>
                            <input 
                                type="text" 
                                value={updateName} 
                                onChange={(e) => setUpdateName(e.target.value)} 
                                className="adding-form" 
                            />
                            <input 
                                type="text" 
                                value={updatePhone} 
                                onChange={(e) => setUpdatePhone(e.target.value)} 
                                className="adding-form" 
                            />
                        </>
                    ) : (
                        <>
                            <p className="card-text">{name}</p>
                            <p className="card-text">{phone}</p>
                        </>
                    )}
                    <div className="button-group">
                        <button 
                            type="button" 
                            onClick={isUpdate ? handleSaveClick : () => setIsUpdate(true)} 
                            className="btn-action"
                        >
                            <FontAwesomeIcon icon={isUpdate ? faSave : faPenToSquare} />
                        </button>
                        
                        {!isUpdate && (
                            <button 
                                type="button" 
                                onClick={() => throwDeleteModal({ id, name })} 
                                className="btn-action"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        )}

                        {!synced && (
                            <button 
                                type="button" 
                                onClick={() => resend({ id, name, phone, avatar })} 
                                className="btn-action"
                                title="Resend"
                            >
                                <FontAwesomeIcon 
                                    icon={faRotate} 
                                />
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    </>
);
};
export default PhonebookItem