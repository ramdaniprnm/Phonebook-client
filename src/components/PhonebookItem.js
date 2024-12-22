import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const App = () => {
    const [contacts, setContacts] = useState([
        { id: 1, name: "John Doe", phone: "123-456-7890" },
        { id: 2, name: "Jane Smith", phone: "987-654-3210" },
    ]);

    const handleDelete = (id) => {
        setContacts(contacts.filter((contact) => contact.id !== id));
    };

    const handleEdit = (id) => {
        const newName = prompt("Enter the new name:");
        const newPhone = prompt("Enter the new phone number:");
        if (newName && newPhone) {
            setContacts(
                contacts.map((contact) =>
                    contact.id === id ? { ...contact, name: newName, phone: newPhone } : contact
                )
            );
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {contacts.map((contact) => (
                    <div key={contact.id} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body text-center">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${contact.name}&background=random`}
                                    alt="Avatar"
                                    className="rounded-circle mb-3"
                                    style={{ width: "80px", height: "80px" }}
                                />
                                <h5 className="card-title">{contact.name}</h5>
                                <p className="card-text">{contact.phone}</p>
                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() => handleEdit(contact.id)}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(contact.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
