import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({ afterClicked, afterSubmission, className }) {
  const [showModal, setShowModal] = useState(false);

  function onLogin() {
    setShowModal(false);
    if (afterSubmission) {
      afterSubmission();
    }
  }

  function onClick() {
    setShowModal(true)
    if (afterClicked) {
      afterClicked()
    }
  }

  return (
    <>
      <div
        onClick={onClick}
        className={className}
      >
        Log in
      </div>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          className="form-container"
        >
          <LoginForm onLogin={onLogin} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;