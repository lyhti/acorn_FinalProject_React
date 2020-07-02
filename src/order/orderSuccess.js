import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import '../user/mypage/container/main.css';

class orderSuccess extends Component {
  constructor() {


    super();
    this.state =
    {

      user_name: "",
      user_hp: '',
      user_email: "",
      point: "",


      buy_id: '',
      user_id: '',
      product_id: '',
      buy_sell_date: '',
      buy_price: '',
      buy_count: '',
      buy_pick_date: '',
      buy_option_text: [],
      buy_option_candle: [],
      buy_order_id: '',

      product_name: '',
      product_text: '',
      product_img: '',
      product_price: ''

    };
  }

  componentWillMount() {

    let url_buy = "http://localhost:8080/acorn/buy/selectOfBuyOneData?buy_id=" + localStorage.getItem("buy_id");
    axios.post(url_buy)
      .then((ResponseData) => {
        this.setState({
          buy_id: ResponseData.data.buy_id,
          product_id: ResponseData.data.product_id,
          buy_sell_date: ResponseData.data.buy_sell_date,
          buy_price: ResponseData.data.buy_price,
          buy_count: ResponseData.data.buy_count,
          buy_pick_date: ResponseData.data.buy_pick_date,
          buy_option_text: ResponseData.data.buy_option_text,
          buy_option_candle: ResponseData.data.buy_option_candle,
          buy_order_id: ResponseData.data.buy_order_id,
        });
      }).catch((error) => {
      });

    let url_product = "http://localhost:8080/acorn/product/getData?product_id=" + localStorage.getItem("product_id");
    axios.get(url_product)
      .then((ResponseData) => {
        this.setState({
          product_name: ResponseData.data.product_name,
          product_text: ResponseData.data.product_text,
          product_img: ResponseData.data.product_img,
          product_price: ResponseData.data.product_price
        });
      }).catch((error) => {
      });

    let url_user = "http://localhost:8080/acorn/user/getData?user_id=" + localStorage.getItem("user_id");
    axios.post(url_user)
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

    const onHome = () => {
      window.location = "/Mo_kyeonny/mypage";
    }

    return (
      <div className="Order_content">
        <div className="location_wrap">
          <div className="location_cont">
            <span>주문완료</span>
          </div>
        </div>
        <div className="sub_content">
          <div className="content_box">
            <form name="frmOrder">
              <div className="order_wrap">
                <div className="order_title">
                  <h2>주문완료</h2>
                  <ol>
                    <li>
                      <span>01</span>
                                            주문서작성/결제&emsp;＞&emsp;
                                        </li>
                    <li className="page_on">
                      <span>02</span>
                                            주문완료&emsp;
                                        </li>
                  </ol>
                </div>
                <div style={{ marginLeft: "50%", fontSize: '60px', alignContent: 'center' }}>
                  <span role="img" aria-label="cake">&#127856;</span>
                </div>
                <div style={{ marginLeft: "45%" }}>
                  <b>주문이 정상적으로 접수되었습니다.</b> <br />
                </div>
                <div className="Unregister_content_Title">
                  <h3>주문요약정보</h3>
                </div>
                <table className="Unregister_table">
                  <tbody>
                    <tr>
                      <th>결제수단</th>
                      <td>
                        <strong>무통장 입금</strong>
                        <ui>
                          <li>입금은행 : 신한</li>
                        </ui>
                        <ui>
                          <li>입금계좌 : 110461271083</li>
                        </ui>
                        <ui>
                          <li>예금주명 : (주)케이크하우스</li>
                        </ui>
                        <ui>
                          <li>입금금액 : {new Intl.NumberFormat().format(this.state.product_price * this.state.buy_count)} 원</li>
                        </ui>

                      </td>
                    </tr>
                    <tr>
                      <th>주문번호</th>
                      <td>
                        {this.state.buy_order_id}
                      </td>
                    </tr>
                    <tr>
                      <th>주문일자</th>
                      <td>
                        {this.state.buy_sell_date}
                      </td>
                    </tr>
                    <tr>
                      <th>주문상품</th>
                      <td>
                        {this.state.product_name}
                      </td>
                    </tr>
                    <tr>
                      <th>주문자명</th>
                      <td>
                        {this.state.user_name}
                      </td>
                    </tr>
                    <tr>
                      <th>픽업날짜</th>
                      <td>
                        {this.state.buy_pick_date} (09:00~20:00)
                                                    </td>
                    </tr>
                    <tr>
                      <th>결제금액</th>
                      <td>
                        {new Intl.NumberFormat().format(this.state.product_price * this.state.buy_count)}원
                                                    </td>
                    </tr>


                  </tbody>
                </table>
                <br/>

                <div className="btn_center_box">
                  <Button variant="outline-primary" style={{width:"80px"}}  onClick={onHome}>
                    확인
                  </Button>
                </div>


              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default orderSuccess