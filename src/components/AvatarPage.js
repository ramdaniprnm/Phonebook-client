import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { request, url } from '../services/PhonebookApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCamera } from '@fortawesome/free-solid-svg-icons';

export const AvatarPage = (props) => {
    const { id } = useParams('')
    const { updatePhonebookItem } = props;
    const [contact, setContact] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const fileInput = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await request.get(id);
                setContact(response.data);
                const avatarUrl = response.data.avatar
                    ? `${url()}/images/${id}/avatar/${response.data.avatar}`
                    : `${url()}/images/default.png`;
                setPreviewUrl(avatarUrl);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchContact();
    }, [id]);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        }
    }, [previewUrl]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            // Validate file type
            if (!file.type.match(/^image\/(jpeg|png|gif)$/i)) {
                alert('Please select an image file (JPEG, PNG, or GIF)');
                return;
            }

            // Create preview immediately
            setPreviewUrl(URL.createObjectURL(file));
            setSelectedFile(file);

            // Prepare and send the file
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await request.put(`${id}/avatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log('Upload Progress:', percentCompleted);
                }
            });

            if (response.data) {
                setContact(prev => ({
                    ...prev,
                    avatar: response.data.avatar
                }));
            }
        } catch (err) {
            console.error('Upload Error:', err.response?.data || err.message);
            alert('Failed to update avatar. Please try again.');
        }
    };


    const handleSave = async (e) => {
        const formData = new FormData();
        formData.append('avatar', selectedFile);

        try {
            setLoading(true);
            const response = await request.put(`/${id}/avatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                // Add these to track upload progress
                onUploadProgress: (progressEvent) => {
                    console.log('Upload Progress:', progressEvent.loaded / progressEvent.total * 100);
                }
            });
            if (response.data) {
                // Update local state before navigation
                setContact(prev => ({
                    ...prev,
                    avatar: response.data.avatar
                }));
                navigate('/');
            }
        } catch (err) {
            console.error('Upload Error:', err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveClick = () => {
        fileInput.current.click()
    }


    return (
        <div className="avatar-page">
            <div className="avatar-header">
                <button className="btn-back" onClick={() => navigate('/')}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Back
                </button>
                <h2>Update PP</h2>
            </div>

            <div className="avatar-container">
                <div className="avatar-preview">
                    <img
                        src={previewUrl}
                        onClick={handleSaveClick}
                        alt={contact?.name || 'avatar'}
                        className="avatar-image"
                    />
                    <label className="avatar-upload-label">
                        <FontAwesomeIcon icon={faCamera} />
                        <input
                            type="file"
                            ref={fileInput}
                            accept="image/jpeg,image/png,image/gif"

                            onChange={handleFileChange}
                            className="avatar-input"
                        />
                    </label>
                </div>
                <div className="avatar-actions">
                    <button
                        className="btn-save"
                        onClick={handleSave}
                        disabled={!selectedFile || loading}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};
