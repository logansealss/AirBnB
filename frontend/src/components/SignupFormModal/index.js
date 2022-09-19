import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal({ afterSubmission, className }) {
  const [showModal, setShowModal] = useState(false);

  function onSignup() {
    setShowModal(false);
    if (afterSubmission) {
      afterSubmission();
    }
  }

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
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