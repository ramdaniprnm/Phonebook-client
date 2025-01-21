import React from 'react';
import PhonebookItem from './PhonebookItem';

export const PhonebookList = ({ PhonebookItems, updatePhonebook, deletePhonebook, throwDeleteModal }) => {

  // const phonebookRender = data.map((phonebook, index) => <PhonebookItem key={phonebook._id} phonebook={phonebook} remove={{}} />);

  return (
    <div className='phonebook-list'>
      {PhonebookItems.map((item) => (
        <PhonebookItem
          key={item.id}
          {...item}
          updatePhonebook={updatePhonebook}
          deletePhonebook={deletePhonebook}
          throwDeleteModal={throwDeleteModal}
        />
      ))}
    </div>
  );
};
