import React, { useState } from 'react';
import "./userFounder.css"
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const UserPwFounder = ({ toggleModal, closeModal }) => {


  const [user_name, changeName] = useState('');
  const [user_email, changeEmail] = useState('');

  const onChangeName = e => {
    changeName(e.target.value);
  }


  const onChagenEmail = e => {
    changeEmail(e.target.value);
  }

  const onSend = (x) => {
    x.preventDefault();

    var url = "http://localhost:8080/acorn/user/selectPass";

    axios.post(url,
      {
        user_name,
        user_email
      }

    ).then((responseData) => {
      console.log(responseData.data);
      if (responseData.data.length < 1) {
        toast.error("이름과 이메일을 다시 확인해주세요", {
          className: "error-toast",
          draggable: true,
          position: toast.POSITION.TOP_CENTER,
        })
      } else {
        toast.info(responseData.data, {
          className: "success-toast",
          draggable: true,
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }).catch((error) => {
      console.log("error 발생" + error);
    });
  };

  return (
    <>
      <aside id="modal" className="ModalWrapper" onClick={e => closeModal(e)}>
        <div className="ModalInner">
          <h3 className="user_Login_logoStyle"> 비밀번호 찾기</h3>
          <span id="modal" className="close" onClick={e => closeModal(e)} style={{ color: "#45adad" }}>x</span>
          <form onSubmit={onSend}>
            <div className="userFounder_search">
              <input type="text" value={user_name} onChange={onChangeName} className="form-control input-sm" placeholder="이름을 입력해주세요" />
              <div style={{ height: '8px' }}></div>
              <input type="text" value={user_email} onChange={onChagenEmail} className="form-control input-sm" placeholder="이메일을 입력해주세요" />
            </div>
            <br />

            <Button style={{width:"80px"}}  variant="outline-info"  type="submit">확인</Button>
            {'\u00A0'}{'\u00A0'}{'\u00A0'}
            <Button style={{width:"80px"}}  variant="outline-info" id="modal" onClick={e => closeModal(e)} >취소</Button>
          </form>
        </div>
      </aside>
      <ToastContainer draggable={false} transition={Zoom} autoClose={5000}></ToastContainer>
    </>
  )
};
export default UserPwFounder