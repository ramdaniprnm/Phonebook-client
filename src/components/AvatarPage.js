// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getStoredContacts } from '../data/contacts';
// import './AvatarPage.css';

// const AvatarPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [contact, setContact] = useState(null);

//   useEffect(() => {
//     const contacts = getStoredContacts();
//     const foundContact = contacts.find(c => c.id === parseInt(id));
//     setContact(foundContact);
//   }, [id]);

//   if (!contact) {
//     return <div>Contact not found</div>;
//   }

//   return (
//     <div className="avatar-page">
//       <button className="back-button" onClick={() => navigate('/')}>
//         Back to Contacts
//       </button>
//       <div className="avatar-container">
//         <img 
//           src={contact.avatar || '/avatars/default.png'} 
//           alt={contact.name} 
//           className="large-avatar"
//         />
//         <h2>{contact.name}</h2>
//         <p>{contact.phone}</p>
//       </div>
//     </div>
//   );
// };

// export default AvatarPage;
