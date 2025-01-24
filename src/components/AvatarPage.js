import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { request } from '../services/PhonebookApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCamera } from '@fortawesome/free-solid-svg-icons';

export const AvatarPage = (props) => {
    const { name } = props;
    const { id } = useParams();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentAvatar, setCurrentAvatar] = useState('http://192.168.1.7:3003/images/default.png');
    const [loading, setLoading] = useState(true);
    const fileInput = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const response = await request.get(`api/phonebook/${id}`);
                if (response.data.avatar) {
                    setCurrentAvatar(`http://192.168.1.7:3003/images/${id}/${response.data.avatar}`);
                }
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
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('avatar', selectedFile);

        try {
            await request.put(`api/phonebook/${id}/avatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/');
        } catch (error) {
            console.error('Error updating avatar:', error);
        }
    };

    const handleSaveClick = () => {
        fileInput.current.click();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="avatar-page">
            <div className="avatar-header">
                <button className="btn-back" onClick={() => navigate('/')}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Back
                </button>
                <p>Update Profile: '{name}'</p>
            </div>
            <div className="avatar-container">
                <form onSubmit={handleSubmit}>
                    <div className="avatar-preview">
                        <img
                            src={previewUrl || currentAvatar}
                            onClick={handleSaveClick}
                            alt="avatar"
                            className="avatar-image"
                        />
                        <label className="avatar-upload-label">
                            <FontAwesomeIcon icon={faCamera} />
                            <input
                                type="file"
                                ref={fileInput}
                                accept="image/*"
                                onChange={handleFileChange}
                                className="avatar-input"
                            />
                        </label>
                    </div>
                    <div className="avatar-actions">
                        <button
                            type="submit"
                            className="btn-save"
                            disabled={!selectedFile}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AvatarPage;