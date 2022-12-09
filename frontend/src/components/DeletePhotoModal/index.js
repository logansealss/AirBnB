import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeletePopup from '../DeleteModal/DeletePopup'
import TrashCan from "../../images/trashcan.svg"


export default function DeletePhotoModal({ whenClicked, spotImage }) {
    const [showModal, setShowModal] = useState(false);

    function onCompletion() {
        setShowModal(false);
    }

    function onClick() {
        setShowModal(true)
        if (whenClicked) {
            whenClicked()
        }
    }

    let type

    if (spotImage) {
        type = "image"
    }

    return (
        <>
            <div
                className="delete-photo-button"
                onClick={onClick}
            >
                <img
                    src={TrashCan}
                />
            </div>
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                    className="delete-popup"
                >
                    <DeletePopup onCompletion={onCompletion} spotImage={spotImage} />
                </Modal>
            )}
        </>
    );
}