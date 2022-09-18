import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({afterSubmission}) {
  const [showModal, setShowModal] = useState(false);

  function onLogin(){
    setShowModal(false);
    afterSubmission();
  }

  return (
    <>
      <div onClick={() => setShowModal(true)}>
        Log In
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm onLogin={onLogin}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;