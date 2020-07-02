import React, { Component } from 'react';
import UserIdSearch from './userIdSearch';
import UserPwSearch from './userPwSearch';
import { withStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core"
import axios from 'axios';
import './userLogin.css'
import produce from 'immer';

const StyledButton = withStyles({
  root: {

    borderRadius: 3,
    border: 1,
    borderColor: '#ff99cc',
    color: '#ff99cc',
    height: 80,
    padding: '0 30px',
    boxShadow: '0 2px 2px 2px #ff99cc',
  },
  label: {

  },
})(Button);


class userLogin extends Component {

  state = {
    user_email: '',
    user_pass: '',

    user_nickname: '',
    list: "",

    member_type: '',
    user_id: ''
  }

  changeFormHandler(ev) {
    this.setState(
      { [ev.target.name]: ev.target.value }
    );
  }

    onLogin = async(x) => {
    x.preventDefault();
    var url = "http://localhost:8080/acorn/login/user";

    let f = new FormData();
    f.append('user_email', this.state.user_email);
    f.append('user_pass', this.state.user_pass);

   await axios.post(url, f
    ).then((responseData) => {
      this.setState({ list: responseData.data }, () =>
        localStorage.setItem("user_id", this.state.list.user_id),
      );
      this.setState({ list: responseData.data }, () =>
        localStorage.setItem("member_type", this.state.list.member_type)
      );
      this.setState(state => (
        produce(state, draft => { draft.list = responseData.data })
      ));
    }).catch((error) => {
      console.log("error 발생" + error);
    });

    //로그인 비밀번호 틀릴 시 넘어감 방지
    setTimeout(() => {
      if (localStorage.getItem("member_type") === "1" || localStorage.getItem("member_type") === "2") {
        localStorage.setItem("login", "login_ok")

        if(localStorage.getItem("loginPath")==="loginPath") {
          localStorage.removeItem("loginPath");
          return window.location.href="/"
        }else{
          return this.props.history.go(-1);
        }
      } else
        alert("틀린비밀번호입니다.");
    }, 100)
  }

  render() {
    return (
      <div className="userLogin_center1">
        <div>
          <strong>로그인</strong>
          <form onSubmit={this.onLogin.bind(this)}>
            <table>
              <tbody>
                <div className="userLogin_div3">
                  <tr>
                    <div style={{ float: "left" }}>
                      <td style={{ marginLeft: "300px", width: "350px" }}>
                        <input type="text" value={this.state.user_email} onChange={this.changeFormHandler.bind(this)} name="user_email" className="form-control input-sm" placeholder="이메일을 입력해주세요" />
                        <div style={{ height: '8px' }}></div>
                        <input type="password" value={this.state.user_pass} onChange={this.changeFormHandler.bind(this)} name="user_pass" className="form-control input-sm" placeholder="비밀번호를 입력해주세요" />
                      </td>
                    </div>
                    <div style={{ float: "left", marginLeft: "20px" }}>
                      <td>
                        <StyledButton type="submit"> 로그인</StyledButton>
                      </td>
                    </div>
                  </tr>
                </div>
              </tbody>
            </table>
          </form>
          <div className="userLogin_div4" >
            <div className="userLogin_div5">
              <UserIdSearch />
            </div>
            <div className="userLogin_div6">
              <UserPwSearch />
            </div>
          </div>
        </div>

      </div>
    )
  }
}
export default userLogin