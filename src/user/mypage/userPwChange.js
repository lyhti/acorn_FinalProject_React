import React, { Component } from 'react';
import '../join/userJoin.css'
import axios from 'axios';
import { isPassword } from '../../components/check.js';
import Button from 'react-bootstrap/Button';

class userPwChange extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  //비밀번호 유효성 검사
  checkValidPass = () => {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (!isPassword(this.state.newPass)) {
        this.setState({
          isValidPass: false
        });
      } else {
        this.setState({ isValidPass: true });
      }
    }, 500);
  }
  //비밀번호 재확인
  checkMatchPass = () => {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (this.state.newPass === this.state.passCheck) {
        this.setState({ isMatchPassword: true });
      } else {
        this.setState({
          isMatchPassword: false
        });
      }
    }, 500);
  }
  onkeyChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });

    this.checkValidPass();
    this.checkMatchPass();
  }

  onSave = (e) => {
    e.preventDefault();
    let url = "http://localhost:8080/acorn/user/pass?user_id=" + localStorage.getItem("user_id") + "&user_pass=" + this.state.user_pass;
    axios.post(url)
      .then((ResponseData) => {
        this.setState({
          passtruefalse: ResponseData.data
        });
      }).catch((error) => {
        console.log("error_test:" + error);
      });

    setTimeout(() => {
      if (this.state.passtruefalse) {
        let url = "http://localhost:8080/acorn/user/updatePass";

        axios.post(url, { user_pass: this.state.newPass, user_id: localStorage.getItem("user_id") }).then(res => {
          this.setState({
          })
        }).catch(err => {
          console.log("데이터 추가 오류:" + err);
        })

        // 아래 기능은 회원가입 버튼 누르면 바로 메인 페이지로 가는 것.. 
        window.location = '/Mo_kyeonny/mypage';

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
      <div className="center1">
        <form className="form" onSubmit={this.onSave}>

          <b>비밀번호 변경</b>
          <br /><br />
          <table className="login_table table-bordered" style={{ width: '400px' }}>
            <tbody>
              <tr>
                <th>비밀번호</th>
                <td><input type="Password" name="user_pass" ref="user_pass" className="form-control input-sm" placeholder="기존 비밀번호"
                  onChange={this.onkeyChange.bind(this)} value={this.state.user_pass} required /></td>
              </tr>

              <tr>
                <th>변경할 비밀번호</th>
                <td>
                  <div>
                    <input type="Password" name="newPass" className="form-control input-sm" placeholder="영문+숫자 조합(8 ~ 10자)"
                      onChange={this.onkeyChange.bind(this)} value={this.state.newPass} required />
                    {this.state.newPass ?
                      (this.state.isValidPass ?
                        null : (<span style={{ color: "red" }}>영문+숫자 혼합하여 8~10자로 입력해주세요</span>)) : null}
                  </div>
                </td>
              </tr>

              <tr>
                <th>변경할 비밀번호 확인</th>
                <td>
                  <div>
                    <input type="Password" name="passCheck" className="form-control input-sm" placeholder="비밀번호를 확인 해주세요"
                      onChange={this.onkeyChange.bind(this)} value={this.state.passCheck} required />
                    {this.state.passCheck ?
                      (this.state.isMatchPassword ?
                        (<span style={{ color: "blue" }}>비밀번호 일치</span>) : (<span style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</span>)) : null}
                  </div>
                </td>
              </tr>
            </tbody>

          </table>
          <br />
          <div className="center2" style={{ width: '400px' }}>
            <Button variant="outline-secondary" type="submit" className="btn2">확인</Button>
          </div>
        </form>
      </div>
    )
  }
}
export default userPwChange