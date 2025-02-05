import React from 'react';
import PhonebookItem from './PhonebookItem';

export const PhonebookList = ({ PhonebookItems, updatePhonebook, deletePhonebook, throwDeleteModal, handleResendRetryAdd }) => {
    return (
        <div className='phonebook-list'>
            {PhonebookItems.map(item => (
                <PhonebookItem
                    key={item.id}
                    {...item}
                    updatePhonebook={updatePhonebook}
                    deletePhonebook={deletePhonebook}
                    throwDeleteModal={throwDeleteModal}
                    handleResendRetryAdd={handleResendRetryAdd}
                />
            ))}
        </div>
    );
};