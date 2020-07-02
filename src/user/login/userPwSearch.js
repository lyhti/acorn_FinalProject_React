import React, { useState } from 'react';
import UserPwFounder from './userPwFounder'
import { withStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core"

const StyledButton = withStyles({
  root: {

    borderRadius: 3,
    border: 1,
    borderColor: '#45adad',
    color: '#45adad',
    height: 30,
    width: 155,
    padding: '0 30px',
    boxShadow: '0 1px 1px 1px #45adad',
  },
  label: {

  },
})(Button);

const UserPwSearch = () => {

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  }
  const closeModal = e => {
    if (e.target.id === "modal") {
      toggleModal();
    }
  }

  return (
    <>
      <div><StyledButton onClick={() => setShowModal(true)}>비밀번호 찾기</StyledButton></div>
      {showModal && (
        <UserPwFounder

          toggleModal={toggleModal}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

export default UserPwSearch;