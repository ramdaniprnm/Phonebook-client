import React from 'react';
import PhonebookItem from './PhonebookItem';

export const PhonebookList = ({ PhonebookItems, updatePhonebook, deletePhonebook, deleteModal }) => {
  return (
    <div className='phonebook-list'>
      {PhonebookItems.map((item) => (
        <PhonebookItem
          key={item.id}
          {...item}
          updatePhonebook={updatePhonebook}
          deletePhonebook={deletePhonebook}
          deleteModal={deleteModal}
        />
      ))}
    </div>
  );
};
