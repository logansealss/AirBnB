import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReviewForm from './CreateReviewForm'

function CreateReviewFormModal({ afterSubmission, className, spotId }) {
  const [showModal, setShowModal] = useState(false);

  function onCreation() {
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
        Create review
      </button>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          className="form-container"
        >
          <CreateReviewForm onCreation={onCreation} spotId={spotId} />
        </Modal>
      )}
    </>
  );
}

export default CreateReviewFormModal;