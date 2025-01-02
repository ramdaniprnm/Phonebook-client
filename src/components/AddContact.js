// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getStoredContacts, saveContacts } from '../data/contacts';
// import './AddContact.css';

// const AddContact = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     avatar: '/avatars/default.png'
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const contacts = getStoredContacts();
//     const newContact = {
//       id: contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1,
//       ...formData
//     };
    
//     const updatedContacts = [...contacts, newContact];
//     saveContacts(updatedContacts);
//     navigate('/');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="add-contact-container">
//       <h2>Add New Contact</h2>
//       <form onSubmit={handleSubmit} className="add-contact-form">
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="phone">Phone:</label>
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-buttons">
//           <button type="button" onClick={() => navigate('/')} className="cancel-button">
//             Cancel
//           </button>
//           <button type="submit" className="submit-button">
//             Add Contact
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddContact;
