import React, { useState } from 'react';
import UserIdFounder from './userIdFounder'
import { withStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core"

const StyledButton = withStyles({
  root: {

    borderRadius: 3,
    border: 1,
    borderColor: '#45adad',
    color: '#45adad',
    height: 30,
    width: 140,
    padding: '0 30px',
    boxShadow: '0 1px 1px 1px #45adad',
  },
  label: {

  },
})(Button);


const UserIdSearch = () => {

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
      {showModal && (
        <UserIdFounder

          toggleModal={toggleModal}
          closeModal={closeModal}
        />
      )}

      <div><StyledButton onClick={() => setShowModal(true)}>아이디 찾기</StyledButton></div>

    </>
  );
}

export default UserIdSearch;