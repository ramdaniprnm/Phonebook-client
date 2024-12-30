import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowDownAZ } from "@fortawesome/free-solid-svg-icons/faArrowDownAZ";
import { faArrowUpAZ } from "@fortawesome/free-solid-svg-icons/faArrowUpAZ";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function PhonebookItem(props) {
    const { id, name, phone, avatar } = props;
    const [sortOrders, setSortOrder] = useState(localStorage.getItem('sortOrder') || 'asc');
    const [updateName, setUpdateName] = useState(name);
    const [updatePhone, setUpdatePhone] = useState(phone);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();


    const navigateAddForm = (e) => {
        e.preventDefault();
        navigate('/add');
    }

    const saveButton = async (e) => {
        try {
            const response = await axios.put(id.toString(), {
                name: updateName,
                phone: updatePhone,
            });
        }
    }

    const closeButton = () => {
        setShowAlert(false);
    }

    const handleSort = () => {
        const newSortOrder = sortOrders === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setSortOrder(newSortOrder);
        localStorage.setItem('sortOrder', newSortOrder);
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
                    <img src={avatar} alt={name} onClick={ } className='avatar' />
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
                    </div>
                    <div className="nav sticky-top"></div>
                    <button type="button" className="btn-brown" id="sortPhonebook" onClick={handleSort}>
                        <FontAwesomeIcon icon={sortOrders === 'asc' ? faArrowUpAZ : faArrowDownAZ} />
                    </button>
                    <div className="search-bar">
                        <input type="text" placeholder="Search" />
                        <button type="button" className="btn-brown" id="searchPhonebook">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                    <div>
                        <button type="button" onClick={navigateAddForm} className="btn-brown" id="addPhonebook">
                            <FontAwesomeIcon icon={faUserPlus} />
                        </button>
                    </div>
                </div>

            </>
            )
}