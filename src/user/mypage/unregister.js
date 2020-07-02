import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import './container/main.css';
import axios from 'axios';


class unregister extends Component {
  state = {
  }

  password = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  goodbye = (e) => {
    e.preventDefault();
    let url = "http://localhost:8080/acorn/user/pass?user_id=" + localStorage.getItem("user_id") + "&user_pass=" + this.state.user_pass;
    axios.post(url).then((ResponseData) => {
      console.log("ResponseData.data:" + ResponseData.data);
      this.setState({
        passtruefalse: ResponseData.data
      });
    }).catch((error) => {
      console.log("error_test:" + error);
    });
    console.log("this.state.passtruefalse:" + this.state.passtruefalse);
    setTimeout(() => {
      if (this.state.passtruefalse) {
        if (window.confirm("정말 탈퇴하시겠습니까?") === true) {
          console.log("true");
          let url = "http://localhost:8080/acorn/user/delete?user_id=" + localStorage.getItem("user_id");
          axios.delete(url).then((res) => {
          }).catch(err => {
          })
          alert("탈퇴되었습니다.");
          localStorage.removeItem("user_id");
          localStorage.removeItem("member_type");
          localStorage.removeItem("login");
          window.location = '/Mo_kyeonny';
        } else {
          alert("취소되었습니다.")
        }
      } else {
        alert("기존 비밀번호가 잘못입력되었습니다")
      }
    }, 100)
  }


  componentWillMount(){
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="User_mypage_content">
        <div className="Unregister_All">
          <span name="formUnregister" id="formUnregister">
            <div className="Unregister_cont">
              <div className="Unregister_Title">
                <h2>회원탈퇴</h2>
              </div>
              <div className="Unregister_content">
                <div className="Unregister_content_Title">
                  <h3>01. 회원탈퇴 안내</h3>
                </div>
                <div className="Unregister_info">
                  CAKE HOUSE 탈퇴 안내
                                    <br />
                  <br />
                                    그 동안 CAKE HOUSE를 이용해 주셔서 감사합니다.
                                    <br />
                  <br />
                                    ■ 아울러 회원 탈퇴시의 사항을 안내 드립니다.
                                    <br />
                                    1. 회원 탈퇴 시 회원님의 정보는 상품 반품 및 A/S를 위해 전자상거래 등에서의 소비자 보호에 관한 법률에 의거한 고객정보 보호정책에따라 관리 됩니다.<br />
                                    2. 탈퇴 시 회원님께서 보유하셨던 쿠폰과 적립금은 삭제 됩니다.<br />
                                    3. 탈퇴 후 30일 동안 재가입은 불가능합니다.
                                </div>
                <div className="Unregister_content_Title">
                  <h3>02. 회원탈퇴 하기</h3>
                </div>
                <table className="Unregister_table">
                  <tbody>
                    <tr>
                      <th>비밀번호</th>
                      <td>
                        <input type="password" name="user_pass" onChange={this.password.bind(this)} />
                      </td>
                    </tr>
                    <tr>
                      <th>탈퇴사유</th>
                      <td>
                        <div className="form_element">
                          <ul className="Unregister_list">
                            <li>
                              <input type="checkbox" />
                              <label className="check-s">고객서비스(상담,포장 등) 불만</label>
                            </li>
                            <li>
                              <input type="checkbox" />
                              <label className="check-s">배송불만</label>
                            </li>
                            <li>
                              <input type="checkbox" />
                              <label className="check-s">교환/환불/반품 불만</label>
                            </li>
                            <li>
                              <input type="checkbox" />
                              <label className="check-s">방문 빈도가 낮음</label>
                            </li>
                            <li>
                              <input type="checkbox" />
                              <label className="check-s">상품가격 불만</label>
                            </li>
                            <li>
                              <input type="checkbox" />
                              <label className="check-s">개인 정보유출 우려</label>
                            </li>
                            <li>
                              <input type="checkbox" />
                              <label className="check-s">쇼핑몰의 신뢰도 불만</label>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>남기실 말씀</th>
                      <td>
                        <textarea name="reasonDesc" rows="5" cols="30"></textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="btn_center_box">
              <Button type="Button" variant="outline-secondary"  className="btn2" onClick={this.goodbye.bind(this)} size="large" >
                탈퇴
              </Button>
            </div>
          </span>
        </div>
      </div>
    )
  }
}
export default unregister