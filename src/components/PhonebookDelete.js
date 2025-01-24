import { request } from '../services/PhonebookApi';

export const PhonebookDelete = (props) => {
    const { id, name, deletePhonebook, closeDeleteModal } = props;

    const handleShowingModal = async () => {
        try {
            await request.delete(`api/phonebook/${id}`);
            deletePhonebook(id);
            closeDeleteModal();
        } catch (error) {
            console.error('Error deleting data:', error);
            console.log(error, 'this is work');
        }
    }

    return (
        <>
            <div className='Modal-Delete' id='Delete-Modal'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1>Delete Phonebook</h1>
                        <span className='close' onClick={closeDeleteModal}>&times;</span>
                    </div>
                    <div className='modal-body'>
                        <p>Do You want to delete this Item: '{name}'?</p>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn-brown' onClick={closeDeleteModal}>No</button>
                        <button type='button' className='btn-brown' onClick={handleShowingModal}>Yes</button>
                    </div>
                </div>
            </div>
        </>
    );
}

