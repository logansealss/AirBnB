import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReviewForm from './CreateReviewForm'

function CreateReviewFormModal({ whenClicked, afterSubmission, className, spotId, review, isDiv }) {
  const [showModal, setShowModal] = useState(false);

  function onCompletion() {
    setShowModal(false);
    if (afterSubmission) {
      afterSubmission();
    }
  }

  function onClick(){
    setShowModal(true)
    if(whenClicked){
      whenClicked()
    }
  }

  return (
    <>
      {isDiv ?
        <div
          onClick={onClick}
          className={className ? className : ""}
        >
          {!review ? 'Create review' : 'Update review'}
        </div> :
        <button
          onClick={() => setShowModal(true)}
          className={className ? className : ""}
        >
          {!review ? 'Create review' : 'Update review'}
        </button>
      }
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          className="form-container"
        >
          <CreateReviewForm 
            onCompletion={onCompletion} 
            spotId={spotId} 
            reviewToUpdate={review} 
          />
        </Modal>
      )}
    </>
  );
}

export default CreateReviewFormModal;