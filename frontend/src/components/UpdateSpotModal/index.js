import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpdateSpotForm from './UpdateSpotForm';

function UpdateSpotModal({ afterSubmission, className, spot, isDiv }) {
    const [showModal, setShowModal] = useState(false);

    function onCompletion() {
        setShowModal(false);
        if (afterSubmission) {
            afterSubmission();
        }
    }

    return (
        <>
            {isDiv ?
                <div
                    onClick={() => setShowModal(true)}
                    className={className ? className : ""}
                >
                    Update spot
                </div> :
                <button
                    onClick={() => setShowModal(true)}
                    className={className ? className : ""}
                >
                    Update spot
                </button>
            }
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                    className="form-container"
                >
                    <UpdateSpotForm spot={spot} onCompletion={onCompletion}></UpdateSpotForm>
                </Modal>
            )}
        </>
    );
}

export default UpdateSpotModal;