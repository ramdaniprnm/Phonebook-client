import React from 'react';
import PhonebookItem from './PhonebookItem';

export const PhonebookList = ({ PhonebookItems }) => {
  return (
    <div className='phonebook-list'>
      {PhonebookItem.map((item) => (
        <PhonebookItem
          key={item.id}
          {...item}
        />
      ))}
    </div>
  );
};