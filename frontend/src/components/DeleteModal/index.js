import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeletePopup from './DeletePopup'

export default function DeleteModal({ className, spot, review }) {
  const [showModal, setShowModal] = useState(false);

  function onCompletion() {
    setShowModal(false);
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={className ? className : ""}
      >
        {spot ? 'Delete spot' : 'Delete review'}
      </button>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
        //   className="form-container"
          className="delete-popup"
        >
          <DeletePopup onCompletion={onCompletion} spot={spot} review={review}/>
        </Modal>
      )}
    </>
  );
}