// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { faPenToSquare, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { request, url } from "../services/PhonebookApi";

// export const PhonebookItem = (props) => {
//     const { id, name, phone, avatar, updatePhonebook, deleteModal } = props;
//     const [isUpdate, setIsUpdate] = useState(false);
//     const [updateName, setUpdateName] = useState(name);
//     const [updatePhone, setUpdatePhone] = useState(phone);
//     const [alertMessage, setAlertMessage] = useState('');
//     const [showAlert, setShowAlert] = useState(false);
//     const navigate = useNavigate();

//     const saveButton = async () => {
//         setIsUpdate(false);
//         try {
//             const response = await request.put(id.toString(), {
//                 name: updateName,
//                 phone: updatePhone,
//             });
//             updatePhonebook(id, response.data);
//         } catch (error) {
//             console.error('Error updating data:', error);
//             setAlertMessage('Failed to update. Please try again.');
//             setShowAlert(true);
//         }
//     };

//     let baseAvatar = `${url()}/images/${id}/${avatar}`;
//     if (!avatar) {
//         baseAvatar = `${url()}/images/default-avatar.png`;
//     }

//     const editButton = () => {
//         setIsUpdate(true);
//     }

//     const handleAvatarClick = () => {
//         navigate(`/avatar/${id}`);
//     }

//     const closeButton = () => {
//         setShowAlert(false);
//     }

//     return (
//         <>
//             <div className="card">
//                 {showAlert && (
//                     <div className='alert' id='alert' role='alert'>
//                         <button className='close-btn' onClick={closeButton}>X</button>
//                         <p id='alert-Message'>{alertMessage}</p>
//                     </div>
//                 )}
//                 <div className="card-body">
//                     <img
//                         src={baseAvatar}
//                         alt={name}
//                         onClick={handleAvatarClick}
//                         className='avatar'
//                     />
//                     <div className="card-content">
//                         {isUpdate ? (
//                             <>
//                                 <input type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} className="form-control" />
//                                 <input type="text" value={updatePhone} onChange={(e) => setUpdatePhone(e.target.value)} className="form-control" />
//                             </>
//                         ) : (
//                             <>
//                                 <p className="card-text">{name}</p>
//                                 <p className="card-text">{phone}</p>
//                             </>
//                         )}
//                         <div className="button-group">
//                             <button type="button" onClick={isUpdate ? saveButton : editButton} className="btn-action" >
//                                 <FontAwesomeIcon icon={isUpdate ? faSave : faPenToSquare} />
//                             </button>
//                             {!isUpdate && (
//                                 <button onClick={() => deleteModal({ id, name })} className="btn-action" >
//                                     <FontAwesomeIcon icon={faTrash} />
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default PhonebookItem;
