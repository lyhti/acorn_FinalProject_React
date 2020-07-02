import React, { Component } from 'react';
import '../../user/mypage/container/main.css';
import axios from 'axios';
import AllMemberListTable from './allMemberListTable';

class allMemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardData: [],

    }
  }

  //목록 출력하는 list함수 
  list = () => {
    let url = "http://54.180.183.72:8080/acorn/user/list";
    axios.post(url)
      .then((ResponseData) => {
        //url로 받은 데이타 state변수에 넣기
        this.setState({
          boardData: ResponseData.data
        })
      }).catch((error) => {
        console.log("list에러:" + error);
      });
  }

  //랜더링 직전 호출되는 함수에서 list호출
  componentWillMount() {
    this.list();
  }


  //데이타 삭제하는 함수
  onMemoDelete = (user_id) => {
    if (window.confirm("정말 탈퇴시키겠습니까?") === true) {
      console.log("true");
      let url = "http://54.180.183.72:8080/acorn/user/delete?user_id=" + user_id;
      axios.delete(url).then((res) => {
        //목록 다시 출력
        this.list();
      }).catch(err => {
      })
      alert("탈퇴되었습니다.");
    } else {
      alert("취소되었습니다.")
    }
  }

  render() {
    return (
      <div className="User_mypage_content">
        <div className="Order_content">
          <div className="sub_content">
            <div className="content_box">
              <form name="frmOrder">
                <div className="order_wrap">
                  <div className="order_cont">
                    <div className="cart_cont_list">
                      <div className="order_cart_title">
                        <h3>회원관리</h3>
                      </div>
                      <div className="order_table_type">
                        <table>
                          <thead>
                            <tr>
                              <th width='10'>이름</th>
                              <th width='150'>이메일</th>
                              <th width='150'>핸드폰번호</th>
                              <th width='100'>가입일</th>
                              <th width='100'>주문횟수</th>
                              <th width='80'>회원탈퇴</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              this.state.boardData.map((row, idx) => (
                                <AllMemberListTable row={row} idx={idx} key={row.num}
                                  onDelete={this.onMemoDelete.bind(this)}
                                />
                              ))
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default allMemberList