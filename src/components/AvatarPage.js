import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { request, url } from '../services/PhonebookApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCamera } from '@fortawesome/free-solid-svg-icons';

export const AvatarPage = () => {
    const { id } = useParams('')
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState('http://192.168.1.7:3000/default.png');
    const [loading, setLoading] = useState(true);
    const fileInput = useRef(null);
    const navigate = useNavigate();
    let selectedImage = null

    console.log('image default in homepage', selectedFile);


    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const response = await request.get(`api/phonebook/${id}`);
                console.log('request image', response);
                if (response.data.avatar) setSelectedFile(`http://192.168.1.7:3003/images/${response.data.avatar}`);
            } catch (error) {
                console.error('Error fetching Avatar:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAvatar();
    }, [id]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedImage) return;
        console.log('selected image', selectedImage);

        const formData = new FormData();
        formData.append('avatar', selectedFile);
        console.log('formdata', formData);
        try {
            const response = await request.put(`api/phonebook/${id}/avatar`, FormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data) {
                navigate('/')
            }
            console.log('success update data', response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSaveClick = () => {
        fileInput.current.click()
    }


    return (
        <div className="avatar-page">
            <div className="avatar-header">
                <button className="btn-back" onClick={() => navigate('/')}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Back
                </button>
                <h2>Update PP </h2>
            </div>
            <div className="avatar-container">
                <div className="avatar-preview">
                    <img
                        src={previewUrl}
                        onClick={handleSaveClick}
                        alt='avatar'
                        className="avatar-image"
                    />
                    <label className="avatar-upload-label">
                        <FontAwesomeIcon icon={faCamera} />
                        <input
                            type="file"
                            ref={fileInput}
                            accept="image/jpeg, image/png, image/jpg, image/gif"
                            onChange={handleFileChange}
                            className="avatar-input"
                        />
                    </label>
                </div>
                <div className="avatar-actions">
                    <form onSubmit={handleSubmit}>
                        <button type='submit'
                            className="btn-save"
                            disabled={!selectedFile}
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
