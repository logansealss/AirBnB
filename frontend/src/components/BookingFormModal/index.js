import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import BookingForm from './BookingForm'

export default function BookingModal({ whenClicked, afterSubmission, className, booking }) {
    const [showModal, setShowModal] = useState(false);

    function onCompletion() {
        setShowModal(false);
        if (afterSubmission) {
            afterSubmission();
        }
    }

    function onClick() {
        setShowModal(true)
        if (whenClicked) {
            whenClicked()
        }
    }

    return (
        <>

            <button
                onClick={() => setShowModal(true)}
                className={className ? className : ""}
            >
                Update booking
            </button>
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                    className="form-container"
                >
                    <BookingForm
                        onCompletion={onCompletion}
                        booking={booking}
                    />
                </Modal>
            )}
        </>
    );
}