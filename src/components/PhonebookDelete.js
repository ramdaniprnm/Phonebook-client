import React from 'react';

export const PhonebookDelete = () => {
    const { id, name, } = props;

    const showingModal = async () => {
        try {
            await request.delete(id.toString());
            removePhonebook(id);
            closeDeleteModal();
        } catch (error) {
            console.error('Error deleting data:', error);
            setAlertMessage('Failed to delete. Please try again.');
            setShowAlert(true);
        }
    }

    return (
        <>
            <div className='Modal-Delete' id='Delete-Modal'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1>Delete Phonebook</h1>
                        <span className='close' onClick={showingModal}>&times;</span>
                    </div>
                    <div className='modal-body'>
                        <p>Do You want to delete this Item: '{name}'?</p>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn-brown' onClick={closeDeleteModal}>No</button>
                        <button type='button' className='btn-brown' onClick={showingModal}>Yes</button>
                    </div>
                </div>
            </div>
        </>
    );
}