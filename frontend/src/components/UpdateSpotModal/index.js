import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpdateSpotForm from './UpdateSpotForm';

function UpdateSpotModal({ afterSubmission, className }) {
    const [showModal, setShowModal] = useState(false);

    function onSignup() {
        setShowModal(false);
        if (afterSubmission) {
            afterSubmission();
        }
    }

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className={className ? className : ""}
            >
                Update spot
            </button>
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                    className="form-container"
                >
                    <UpdateSpotForm></UpdateSpotForm>
                </Modal>
            )}
        </>
    );
}

export default UpdateSpotModal;