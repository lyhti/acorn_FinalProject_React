import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import numeral from 'numeral';

import '../user/mypage/container/main.css';



class orderSheet extends Component {
  constructor() {
    super();
    this.state =
    {
      ordersheet: [],
      buy_option_text: [],
      buy_option_candle: []
    }
  }


  componentWillMount() {
    //최근 주문 정보
    let url = "http://54.180.183.72:8080/acorn/product/ordersheetlist?buy_order_id=" + localStorage.getItem("buy_order_id");
    axios.get(url)
      .then((ResponseData) => {
        this.setState({
          ordersheet: ResponseData.data
        });
      }).catch((error) => {
      });

    let url_buy = "http://54.180.183.72:8080/acorn/buy/selectOfBuyOneData?buy_id=" + localStorage.getItem("buy_id");
    axios.post(url_buy)
      .then((ResponseData) => {
        this.setState({
          buy_option_text: ResponseData.data.buy_option_text,
          buy_option_candle: ResponseData.data.buy_option_candle,
        });
      }).catch((error) => {
      });


  }

  orderlist = () => {
    window.history.go(-1);

  }

  render() {
    return (
      <div className="order_content">
        <div className="location_wrap">
          <div className="location_cont">
            <span>주문 상세</span>
          </div>
        </div>
        <div className="sub_content">
          <div className="content_box">
            <form name="frmOrder">
              <div className="order_wrap">
                <div className="order_detail_title">
                  <h2>ORDER DETAIL</h2>
                </div>
                {this.state.ordersheet.map((data, idx) =>
                  (
                    <div className="order_cont">
                      <div className="order_view_info">
                        <div className="order_info">
                          <div className="order_info_title">
                            <h4>주문 정보</h4>
                          </div>
                          <TableContainer component={Paper} className="order_info_table_type">
                            <Table aria-label="simple table" className="order_info_table">
                              <TableBody>
                                <TableRow>
                                  <TableCell className="order_detail_th">
                                    <span>주문번호</span>
                                  </TableCell>
                                  <TableCell>
                                    <span>{data.buy_order_id}</span>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>
                                    <span>주문일자</span>
                                  </TableCell>
                                  <TableCell>
                                    <span>{data.buy_sell_date}</span>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>
                                    <span>주문자</span>
                                  </TableCell>
                                  <TableCell>
                                    <span>{data.user_name}</span>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>
                                    <span>주문처리상태</span>
                                  </TableCell>
                                  <TableCell>
                                    <span>
                                      {data.buy_order_type === 0
                                        ? "입금대기" : data.buy_order_type === 1
                                          ? "제작중" : data.buy_order_type === 2
                                            ? "제작완료" : "수령완료"}
                                    </span>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                        <div className="payment_info">
                          <div className="order_info_title">
                            <h4>결제정보</h4>
                          </div>
                          <TableContainer component={Paper} className="payment_info_table_type">
                            <Table aria-label="simple table" className="payment_info_table">
                              <TableBody>
                                <TableRow>
                                  <TableCell className="order_detail_th">
                                    <span>상품 합계 금액</span>
                                  </TableCell>
                                  <TableCell>
                                    <strong className="order_payment_sum">
                                      ￦{numeral(data.buy_price).format('0,0')}
                                    </strong>
                                  </TableCell>
                                </TableRow>

                                <TableRow>
                                  <TableCell>최종 결제 금액</TableCell>
                                  <TableCell>
                                    ￦<strong className="order_payment_sum">
                                      {numeral(data.buy_price).format('0,0')}
                                    </strong>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>결제 수단</TableCell>
                                  <TableCell>
                                    <div className="pay_with_list">
                                      <strong className="order_payment_sum">
                                        무통장입금
                                                                </strong>
                                      <ul>
                                        <li>입금 은행 : 신한</li>
                                        <li>입금 계좌 : 110-461-271083</li>
                                        <li>예금주 명 : (주)케이크하우스</li>
                                        <li>
                                          입금 금액 :
                                                                        <strong className="order_payment_sum">
                                            ￦{numeral(data.buy_price).format('0,0')}
                                          </strong></li>
                                        <li>입금자 명 : {data.user_name}</li>
                                      </ul>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                        <div className="cart_cont_list">
                          <div className="order_cart_title">
                            <h3>주문상세내역</h3>
                          </div>
                          <div className="order_table_type">
                            <table>
                              <thead>
                                <tr>
                                  <th>상품/옵션 정보</th>
                                  <th>수량</th>
                                  <th>상품금액</th>

                                  <th>합계금액</th>
                                  <th>주문처리상태</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="td_left">
                                    <div className="pick_add_cont">
                                      <span className="pick_add_img">
                                        <img src={"http://54.180.183.72:8080/acorn/image/productImage/" + data.product_img} alt="" />
                                      </span>
                                      <div className="pick_add_info">
                                        <em>
                                          {data.product_name}
                                        </em>
                                        <div className="pick_option_box">
                                          <span className="text_type_cont">
                                            <strong>레터링 문구 : </strong><br />
                                                                            1. {this.state.buy_option_text[0]}<br />
                                            {this.state.buy_option_text[1] === "" ? "" : <div>2. {this.state.buy_option_text[1]}<br /></div>}
                                            {this.state.buy_option_text[2] === "" ? "" : <div>3. {this.state.buy_option_text[2]}<br /></div>}
                                            <br />
                                            <strong>양초 종류 : </strong><br />
                                                                            1. {this.state.buy_option_candle[0]}<br />
                                            {this.state.buy_option_candle[1] === "" ? "" : <div>2. {this.state.buy_option_candle[1]}<br /></div>}
                                            {this.state.buy_option_candle[2] === "" ? "" : <div>3. {this.state.buy_option_candle[2]}<br /></div>}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="td_order_amount">
                                    <div className="order_count_num">
                                      <strong>{data.buy_count}개</strong>
                                    </div>
                                  </td>
                                  <td>
                                    <strong className="order_pick_price">
                                      ￦{numeral(data.product_price).format('0,0')}
                                    </strong>
                                  </td>

                                  <td>
                                    <strong className="order_sum">
                                      ￦{numeral(data.buy_price).format('0,0')}
                                    </strong>
                                  </td>
                                  <td className="td_order_delivery">
                                    {data.buy_order_type === 0
                                      ? "입금대기" : data.buy_order_type === 1
                                        ? "제작중" : data.buy_order_type === 2
                                          ? "제작완료" : "수령완료"}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="payment_final">
                          <div className="btn_center_box"
                            >
                            <Button className="btn_order_buy" size="lg" variant="light" onClick={this.orderlist}>
                              주문목록으로
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default orderSheet