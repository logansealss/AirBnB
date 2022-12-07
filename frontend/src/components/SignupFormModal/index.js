import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal({ afterClicked, afterSubmission, className }) {
  const [showModal, setShowModal] = useState(false);

  function onSignup() {
    setShowModal(false);
    if (afterSubmission) {
      afterSubmission();
    }
  }

  function onClick(){
    setShowModal(true)
    afterClicked()
  }

  return (
    <>
      <div
        onClick={onClick}
        className={className ? className : ""}
      >
        Sign up
      </div>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          className="form-container"
        >
          <SignupForm onSignup={onSignup} />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;