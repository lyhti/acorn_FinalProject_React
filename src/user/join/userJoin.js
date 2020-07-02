import React, { Component } from 'react';
import './userJoin.css';
import axios from 'axios';
import { isEmail, isPassword, isHp } from '../../components/check';
import Button from 'react-bootstrap/Button';

class UserJoin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: '',
      user_pass: '',
      passCheck: '',
      user_email: '',
      user_hp: '',
      emailCheck: ''
    }
  }
  //이메일 유효성 검사
  checkValidEmail = () => {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (!isEmail(this.state.user_email)) {
        this.setState({ isValidEmail: false });
      } else {
        this.setState({ isValidEmail: true });
      }
    }, 500);
  }
  //비밀번호 유효성 검사
  checkValidPass = () => {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (!isPassword(this.state.user_pass)) {
        this.setState({ isValidPass: false });
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
      if (this.state.user_pass === this.state.passCheck) {
        this.setState({ isMatchPassword: true });
      } else {
        this.setState({
          isMatchPassword: false
        });
      }
    }, 500);
  }
  //핸드폰 유효성 검사
  checkValidHp = () => {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (!isHp(this.state.user_hp)) {
        this.setState({ isValidHp: false });
      } else {
        this.setState({ isValidHp: true });
      }
    }, 500);
  }
  //이메일 중복 체크
  checkEmail = () => {
    if (this.state.isValidEmail) {
      let submit = new FormData();
      submit.append("user_email", this.state.user_email);

      let url = "http://54.180.183.72:8080/acorn/user/checkEmail";
      axios.post(url, submit).then(res => {
        this.setState({
          emailCheck: res.data
        });
        if (this.state.emailCheck) {
          alert("중복된 이메일입니다");
          this.setState({ user_email: '' })
        } else {
          alert("사용가능한 이메일입니다");
        }
        console.log(this.state.emailCheck);
      }).catch(err => {
        console.log("이메일 중복체크 오류:" + err);
      })


    }
  }
  onkeyChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });

    this.checkValidEmail();
    this.checkValidPass();
    this.checkMatchPass();
    this.checkValidHp();
  }

  onSave = (e) => {
    if (this.state.user_name === '') {
      alert("이름을 입력하시오");
    } else if (this.state.user_email === '') {
      alert("이메일을 입력하시오");
    } else if (this.state.isEmail === false) {
      alert("이메일이 유효하지않습니다");
    } else if (this.state.isPassword === false) {
      alert("비밀번호를 확인하시오");
    } else if (this.state.isMatchPassword === false) {
      alert("비밀번호가 일치하지 않습니다");
    } else if (this.state.user_hp === '') {
      alert("전화번호를 입력하시오");
    } else if (this.state.isHp === false) {
      alert("전화번호가 유효하지 않습니다")
    } else if (this.state.emailCheck === '') {
      alert("이메일 중복체크 하십시오");
    } else if (this.state.isValidEmail === true && this.state.isValidPass === true && this.state.isMatchPassword === true
      && this.state.isValidHp === true && (this.state.emailCheck === false || this.state.emailCheck === true)) {
      e.preventDefault();

      let url = "http://54.180.183.72:8080/acorn/user/add";
      let uploadData = this.state;
      console.log(uploadData);

      axios.post(url, uploadData).then(res => {
        this.setState({
        })
      }).catch(err => {
        console.log("데이터 추가 오류:" + err);
      })

      // 아래 기능은 회원가입 버튼 누르면 바로 메인 페이지로 가는 것.. 
      window.location = '/Mo_kyeonny/login';
    }
  }



  goToMain=()=>{
    window.location.href="/"
  }

componentWillMount(){
  localStorage.setItem("loginPath","loginPath");
}




  render() {
    return (
      <div className="center1">
        <form className="form">
          <b>회원가입</b>
          <br /><br />
          <table className="login_table table-bordered" style={{ width: '400px' }}>
            <tbody>
              <tr>
                <th>이름</th>
                <td>
                  <input type="text" name="user_name" className="form-control input-sm" placeholder="홍길동"
                    onChange={this.onkeyChange.bind(this)} value={this.state.user_name} required /></td>
              </tr>

              <tr>
                <th>이메일</th>
                <td>
                  <div>
                    <input type="text" name="user_email" id="user_email" className="form-control input-sm" placeholder="abc@naver.com"
                      onChange={this.onkeyChange.bind(this)} value={this.state.user_email} required />
                    <Button type="Button" onClick={this.checkEmail.bind(this)}  variant="outline-dark">중복확인</Button>
                    {this.state.user_email ?
                      (this.state.isValidEmail ?
                        (<span style={{ color: "blue" }}>유효한 email입니다.</span>) : (<span style={{ color: "red" }}>유효하지 않은 email입니다.</span>)) : null}

                  </div>
                </td>
              </tr>

              <tr>
                <th>비밀번호</th>
                <td>
                  <div>
                    <input type="Password" name="user_pass" className="form-control input-sm" placeholder="영문+숫자 조합(8 ~ 10자)"
                      onChange={this.onkeyChange.bind(this)} value={this.state.user_pass} required />
                    {this.state.user_pass ?
                      (this.state.isValidPass ?
                        null : (<span style={{ color: "red" }}>영문+숫자 혼합하여 8~10자로 입력해주세요</span>)) : null}
                  </div>
                </td>
              </tr>

              <tr>
                <th>비밀번호 확인</th>
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

              <tr>
                <th>휴대폰 번호</th>
                <td>
                  <div>
                    <input type="text" name="user_hp" className="form-control input-sm" placeholder="010-1234-5678"
                      onChange={this.onkeyChange.bind(this)} value={this.state.user_hp} required />
                    {this.state.user_hp ?
                      (this.state.isValidHp ?
                        null : (<span style={{ color: "red" }}>잘못된 전화번호입니다.</span>)) : null}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <div className="center2" style={{ width: '400px' }}>
            <Button variant="outline-primary" type="Button" onClick={this.onSave.bind(this)} className="btn2">회원가입</Button>
            {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
            <Button  variant="outline-secondary" type="reset" className="btn1" onClick={this.goToMain}>취소</Button>
          </div>
        </form>
      </div>
    )
  }
}
export default UserJoin