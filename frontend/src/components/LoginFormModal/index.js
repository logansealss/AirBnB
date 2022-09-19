import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({afterSubmission, className}) {
  const [showModal, setShowModal] = useState(false);

  function onLogin(){
    setShowModal(false);
    afterSubmission();
  }

  return (
    <>
      <div 
        onClick={() => setShowModal(true)}
        className={className}
      >
        Log in
      </div>
      {showModal && (
        <Modal 
          onClose={() => setShowModal(false)}
          className="form-container"
        >
          <LoginForm onLogin={onLogin}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;