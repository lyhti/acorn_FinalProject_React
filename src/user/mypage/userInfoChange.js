import React, { Component } from 'react';
import '../join/userJoin.css'
import axios from 'axios';
import { isHp } from '../../components/check.js';
import Button from 'react-bootstrap/Button';

class userInfoChange extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
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



  onkeyChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });

    this.checkValidHp();
  }

  onUpdate = (e) => {
    if (this.state.user_name === '') {
      alert("이름을 입력하시오");
    } else if (this.state.user_hp === '') {
      alert("전화번호를 입력하시오");
    } else if (this.state.isHp === false) {
      alert("전화번호가 유효하지 않습니다")
    } else if (this.state.isValidHp === true) {
      e.preventDefault();

      let url = "http://localhost:8080/acorn/user/update";
      let uploadData = this.state;
      console.log(uploadData);

      axios.post(url, { user_name: this.state.user_name, user_hp: this.state.user_hp, user_id: localStorage.getItem("user_id") }).then(res => {
        this.setState({
        })
      }).catch(err => {
        console.log("데이터 수정 오류:" + err);
      })

      // 아래 기능은 회원가입 버튼 누르면 바로 메인 페이지로 가는 것.. 
      window.location = '/Mo_kyeonny/mypage';
    }
  }

  componentWillMount() {
    this.setState({
      isValidHp: true
    })


    let url = "http://localhost:8080/acorn/user/updateform?user_id=" + localStorage.getItem("user_id");
    axios.get(url)
      .then((ResponseData) => {
        this.setState({
          user_name: ResponseData.data.user_name,
          user_email: ResponseData.data.user_email,
          user_hp: ResponseData.data.user_hp
        });
      }).catch((error) => {
      });


  }

  render() {
    return (
      <div className="center1">
        <form className="form">
          <b>회원정보 수정</b>
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
                  {this.state.user_email}
                </td>
              </tr>
              <tr>
                <th>휴대폰 번호</th>
                <td>
                  <div>
                    <input type="text" name="user_hp" className="form-control input-sm" placeholder="010-1234-5678"
                      onChange={this.onkeyChange.bind(this)} value={this.state.user_hp} required />
                    {this.state.user_hp
                      ?
                      (this.state.isValidHp ? null : (<span style={{ color: "red" }}>잘못된 전화번호입니다.</span>))
                      : null}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <div className="center2" style={{ width: '400px' }}>
            <Button type="Button"  variant="outline-secondary" onClick={this.onUpdate.bind(this)} className="btn2">수정</Button>
          </div>
        </form>
      </div>
    )
  }
}
export default userInfoChange;