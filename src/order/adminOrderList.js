import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import '../user/mypage/container/main.css';
import AdminInfo from '../admin/adminInfo';
import AdminOrderListTable from './adminOrderListTable';
import axios from 'axios';
import NoDataTable from '../order/noDataTable'

class adminOrderList extends Component {
  constructor() {
    super();

    var today = new Date(),
      year = today.getFullYear(),
      month = ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1),
      date = (today.getDate() < 10 ? '0' : '') + today.getDate(),
      today1 = year + "-" + month + "-" + date;

    this.state =
    {
      orderlist: [],
      endday: today1,
      startday: today1
    }
  }

  daysearchbtn = (e) => {
    // 버튼 클릭 시 spring에서 계산 된 날짜 가지고 오기.
    let url_time = "http://54.180.183.72:8080/acorn/buy/time?time=" + e.target.value
    axios.post(url_time)
      .then((ResponseData) => {
        this.setState({
          startday: ResponseData.data.slice(undefined, 10)
        });
      }).catch((error) => {
      });
  }


  selectday = (e) => {
    this.setState(
      {
        // 이것을 실행하기 위해서 ref 말고 태그 값에 name 을 줘야 한다.
        [e.target.name]: e.target.value
      }
    )
  }

  dateSearch = () => {
    console.log(this.state.startday);
    console.log(this.state.endday);

    // 날짜 별 조회
    let url_datesearch = "http://54.180.183.72:8080/acorn/product/dateorderlist?startday=" + this.state.startday + "&endday=" + this.state.endday + "&user_id=" + localStorage.getItem("user_id")
    axios.post(url_datesearch,
      { startday: this.state.startday, endday: this.state.endday }
    )
      .then((ResponseData) => {
        this.setState({
          orderlist: ResponseData.data
        });
      }).catch((error) => {
      });
  }

  componentWillMount() {
    // 유저 아이디 세션에 저장되어 있다고 가정
    // sessionStorage.setItem("user_id","1");

    // 지난 주문 내역
    let url_orderlist = "http://54.180.183.72:8080/acorn/product/orderlist?user_id=" + localStorage.getItem("user_id");
    axios.get(url_orderlist)
      .then((ResponseData) => {
        this.setState({
          orderlist: ResponseData.data
        });
      }).catch((error) => {
      });
  }



  render() {
    console.log(this.state.orderlist);
    return (
      <div className="User_mypage_content">
        <AdminInfo />
        <div className="SangpumList_Title">
          <h3>완료상품목록</h3>
        </div>
        <div className="data_check_box">
          <h3>조회</h3>
          <div className="data_check_list">
            <ButtonGroup size="large" aria-label="large outlined button group"
              onClick={this.daysearchbtn}>
              <Button variant="outline-secondary" value="오늘">오늘</Button>
              <Button variant="outline-secondary" value="7일">7일</Button>
              <Button variant="outline-secondary" value="15일">15일</Button>
              <Button variant="outline-secondary" value="1달">1개월</Button>
              <Button variant="outline-secondary" value="3달">3개월</Button>
              <Button variant="outline-secondary" value="1년">1년</Button>
            </ButtonGroup>
          </div>
          <div className="data_check_calendar">
            <TextField type="date" label="시작일" name="startday"
              InputLabelProps={{ shrink: true }} value={this.state.startday}
              onChange={this.selectday} className = "calendar"/>
                        &emsp;∼&emsp;
                        <TextField type="date" label="종료일" name="endday"
              InputLabelProps={{ shrink: true }} value={this.state.endday}
              onChange={this.selectday} className = "calendar"/>
          </div>
          <Button onClick={this.dateSearch} size="lg" variant="outline-secondary"
            className="dateSearch">조회</Button>
        </div>
        <div className="data_result_list">
          <div className="list_title">
            지난주문목록/내역 총
                        <span>{this.state.orderlist.length}</span>건
                    </div>
          <div className="data_result_table">
            <table>
              <thead>
                <tr>
                  <th>날짜/주문번호</th>
                  <th>상품명/옵션</th>
                  <th>상품금액/수량</th>
                  <th>주문상태</th>
                  <th>주문상세정보</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.orderlist.length === 0
                    ?
                    <NoDataTable />
                    :
                    <>
                      {
                        this.state.orderlist.map((item, idx) => (
                          <AdminOrderListTable data={item} idx={idx} />
                        ))
                      }
                    </>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default adminOrderList