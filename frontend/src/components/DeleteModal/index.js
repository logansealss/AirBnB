import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeletePopup from './DeletePopup'

export default function DeleteModal({ whenClicked, className, booking, spot, review, isDiv }) {
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

  if(booking){
    type = "booking"
  }

  if(spot){
    type = "spot"
  }

  if(review){
    type = "review"
  }


  return (
    <>
      {isDiv ?
        <div
          onClick={onClick}
          className={className ? className : ""}
        >
          {`Delete ${type}`}
        </div> :
        <button
          onClick={() => setShowModal(true)}
          className={className ? className : ""}
        >
          {`Delete ${type}`}
        </button>
      }
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          className="delete-popup"
        >
          <DeletePopup onCompletion={onCompletion} spot={spot} review={review} booking={booking} />
        </Modal>
      )}
    </>
  );
}