import React, { Component } from 'react';
import '../user/mypage/container/main.css';
import AdminInfo from './adminInfo'
import AdminNowOrderTable from './adminNowOrderTable';
import axios from 'axios';
import NoDataTable from '../order/noDataTable'

class adminNowOrder extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      noworder: [],
      user_id: localStorage.getItem("user_id")
    }
  }

  componentWillMount() {


    //최근 주문 정보
    let url_recentbuy = "http://54.180.183.72:8080/acorn/product/noworder?user_id=" + localStorage.getItem("user_id");
    axios.get(url_recentbuy)
      .then((ResponseData) => {
        this.setState({
          noworder: ResponseData.data
        });
      }).catch((error) => {
      });
  }

  render() {
    console.log(this.state.noworder.length)
    return (
      <div className="User_mypage_content">
        <AdminInfo />
        <div className="SangpumList_Title">
          <h3>진행상품목록</h3>
        </div>
        <div className="data_result_list">
          <div className="list_title">
            진행중인 상품 총
                        <span>{this.state.noworder.length}</span>건
                    </div>
          <div className="data_result_table">
            <table>
              <thead>
                <tr>
                  <th>날짜/주문번호</th>
                  <th>상품명/옵션</th>
                  <th>상품금액/수량</th>

                  {/* 조건2 */}
                  <th>주문상태</th>
                  <th>취소</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.noworder.length === 0
                    ?
                    <NoDataTable />
                    :
                    <>
                      {
                        this.state.noworder.map((item, idx) =>
                          (
                            <AdminNowOrderTable data={item} idx={idx} />
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

export default adminNowOrder