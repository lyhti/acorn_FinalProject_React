import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import './container/main.css';
import axios from 'axios';

class userModify extends Component {

  state = {
    findPassword: '',
    passtruefalse: ''
  }

  onChangePass = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  //엔터시
  onKeyPress = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      this.list()
    }
  }



  //클릭시...
  list = () => {


    let url = "http://localhost:8080/acorn/user/pass?user_id=" + localStorage.getItem("user_id") + "&user_pass=" + this.state.findPassword;
    axios.post(url)
      .then((ResponseData) => {
        console.log(ResponseData.data)
        this.setState({ passtruefalse: ResponseData.data });
      }).catch((error) => { });

    setTimeout(() => {
      if (this.state.passtruefalse) {
        this.props.history.push("/Mo_kyeonny/mypage/userinfochange");
      } else {
        alert("비밀번호가 잘못되었습니다")
      }
    }, 100)


  }




  componentWillMount() {
    window.scrollTo(0, 0)
    // user_id 확인
    let url_recentbuy = "http://localhost:8080/acorn/user/getData?user_id=" + localStorage.getItem("user_id");
    axios.post(url_recentbuy)
      .then((ResponseData) => {
        this.setState({
          user_email: ResponseData.data.user_email
        });
      }).catch((error) => {
      });
  }


  render() {
    return (
      <div className="User_mypage_content">
        <div className="mypage_UpdatePassword">
          <div className="update_title">
            <h3>회원정보 변경</h3>
          </div>
          <p>
            <span>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인해 주세요.</span>
          </p>

          <div className="id_pw_cont">
            <dl>
              <dt>아이디</dt>
              <dd>
                <strong>{this.state.user_email}</strong>
              </dd>
            </dl>
            <dl>
              <dt>비밀번호</dt>
              <dd>
                <div className="password_warning">
                  <input type="password" name="findPassword" className="valid"
                    id="findPassword" aria-required="true" onChange={this.onChangePass} onKeyUp={this.onKeyPress.bind(this)}/>
                </div>
              </dd>
            </dl>
          </div>
          <div className="btn_center_box">
            <Button className="btn2" type="Button" size="large" variant="outline-secondary" onClick={this.list.bind(this)}>
              인증하기
            </Button>
          </div>

        </div>
      </div>
    )
  }
}

export default userModify