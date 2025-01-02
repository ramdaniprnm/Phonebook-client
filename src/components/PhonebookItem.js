import React, { useRef, useState } from "react";
import { faPenToSquare, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

export const PhonebookItem = (props) => {
    const { id, name, phone, avatar, updatePhonebook, deleteModal } = props;
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateName, setUpdateName] = useState(name);
    const [updatePhone, setUpdatePhone] = useState(phone);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const fileInput = useRef(null);

    const saveButton = async (e) => {
        setIsUpdate(false);
        try {
            const response = await axios.put(id.toString(), {
                name: updateName,
                phone: updatePhone,
            });
            updatePhonebook(id, response.data);
        } catch (error) {
            console.error('Error updating data:', error);
            setAlertMessage('Failed to update. Please try again.');
            setShowAlert(true);
        }
    };

    const editButton = () => {
        setIsUpdate(true);
    }

    const imageButton = () => {
        fileInput.current.click();
    }

    const closeButton = () => {
        setShowAlert(false);
    }

    return (
        <>
            <div className="card">
                {showAlert && (
                    <div className='alert' id='alert' role='alert'>
                        <button className='close-btn' onClick={closeButton}>X</button>
                        <p id='alert-Message'>{alertMessage}</p>
                    </div>
                )}
                <div className="card-body">
                    <img src={avatar} alt={name} onClick={imageButton} className='avatar' />
                    <input
                        type="file"
                        ref={fileInput}
                    />
                    <div className="card-content">
                        {isUpdate ? (
                            <>
                                <input type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} className="form-control" />
                                <input type="text" value={updatePhone} onChange={(e) => setUpdatePhone(e.target.value)} className="form-control" />
                            </>
                        ) : (
                            <>
                                <p className="card-title">{name}</p>
                                <p className="card-text">{phone}</p>
                            </>
                        )}
                        <div className="button-group">
                            <button type="button" onClick={isUpdate ? saveButton : editButton} className="btn-action" >
                                <FontAwesomeIcon icon={isUpdate ? faSave : faPenToSquare} />
                            </button>
                            {!isUpdate && (
                                <button onClick={() => deleteModal({ id, name })} className="btn-action" >
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