import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeletePopup from './DeletePopup'

export default function DeleteModal({ whenClicked, className, spot, review, isDiv }) {
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

  return (
    <>
      {isDiv ?
        <div
          onClick={onClick}
          className={className ? className : ""}
        >
          {spot ? 'Delete spot' : 'Delete review'}
        </div> :
        <button
          onClick={() => setShowModal(true)}
          className={className ? className : ""}
        >
          {spot ? 'Delete spot' : 'Delete review'}
        </button>
      }
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          //   className="form-container"
          className="delete-popup"
        >
          <DeletePopup onCompletion={onCompletion} spot={spot} review={review} />
        </Modal>
      )}
    </>
  );
}