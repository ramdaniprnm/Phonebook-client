import React from 'react';
import PhonebookItem from './PhonebookItem';

export const PhonebookList = ({ 
  PhonebookItems, 
  updatePhonebook, 
  deletePhonebook, 
  throwDeleteModal,
  deleteResend,
  resend 
}) => {
  return (
      <div className='phonebook-list'>
          {PhonebookItems.map((item) => (
              <PhonebookItem
                  key={item.id}
                  {...item}
                  synced={item.synced}
                  updatePhonebook={updatePhonebook}
                  deletePhonebook={deletePhonebook}
                  throwDeleteModal={throwDeleteModal}
                  deleteResend={() => deleteResend(item.id)}
                  resend={() => resend(item)}
              />
          ))}
      </div>
  );
};