import React, { useState } from 'react';
import "./userFounder.css"
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const UserIdFounder = ({ toggleModal, closeModal }) => {

  const [user_name, changeName] = useState('');
  const [user_hp, changeHp] = useState('');

  const onChangeName = e => {
    changeName(e.target.value);
  }



  const onChagenHp = e => {

    var number = e.target.value.replace(/[^0-9]/g, "");
    console.log(number);
    var phone = "";
    if (number.length === 12) {
      return number;
    }
    else if (number.length < 7) {
      phone += number.substr(0, 3);
      phone += "-";
      phone += number.substr(3);
    } else if (number.length < 11) {
      phone += number.substr(0, 3);
      phone += "-";
      phone += number.substr(3, 3);
      phone += "-";
      phone += number.substr(6);
    } else {
      phone += number.substr(0, 3);
      phone += "-";
      phone += number.substr(3, 4);
      phone += "-";
      phone += number.substr(7);
    }

    changeHp(phone);
  }

  const onSend = (x) => {

    x.preventDefault();

    var url = "http://localhost:8080/acorn/user/selectEmail";

    axios.post(url,
      {
        user_name,
        user_hp
      }

    ).then((responseData) => {
      console.log(responseData.data);
      if (responseData.data.length < 1) {
        toast.error("이름과 휴대폰번호를 다시 확인해주세요", {
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
          <h3 className="user_Login_logoStyle"> 아이디 찾기</h3>
          <span id="modal" className="close" onClick={e => closeModal(e)} style={{ color: "#45adad" }}>x</span>
          <form onSubmit={onSend}>
            <div className="userFounder_search">
              <input type="text" value={user_name} onChange={onChangeName} className="form-control input-sm" placeholder="이름을 입력해주세요" />
              <div style={{ height: '8px' }}></div>
              <input type="text" value={user_hp} onChange={onChagenHp} className="form-control input-sm" placeholder="휴대폰 번호를 입력해주세요" />
            </div>
            <br />
            <Button style={{width:"80px"}} variant="outline-info" type="submit">확인</Button>
            {'\u00A0'}{'\u00A0'}{'\u00A0'}
            <Button style={{width:"80px"}} variant="outline-info" id="modal" onClick={e => closeModal(e)} >취소</Button>
          </form>
        </div>
      </aside>
      <ToastContainer draggable={false} transition={Zoom} autoClose={5000}></ToastContainer>
    </>
  )
};
export default UserIdFounder