import React, { Component } from 'react';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import '../user/mypage/container/main.css';
import axios from 'axios';
import numeral from 'numeral';

class adminInfo extends Component {
  constructor(props) {
    super();
    this.state =
    {
      orderlist: [],
      noworder: [],
      user_name: '',
      product_total_count: '',
      product_total_price: ''
    }
  }

  componentWillMount() {
    // 유저 정보
    let url_user = "http://localhost:8080/acorn/user/getData?user_id=" + localStorage.getItem("user_id");
    axios.post(url_user)
      .then((ResponseData) => {
        this.setState({
          user_name: ResponseData.data.user_name
        });
      }).catch((error) => {
      });

    // 총 상품 등록 수
    let url_product_total_count = "http://localhost:8080/acorn/product/alllist"
    axios.post(url_product_total_count)
      .then((ResponseData) => {
        this.setState({
          product_total_count: ResponseData.data
        });
      }).catch((error) => {
      });

    // 총 매출 금액
    let url_product_total_price = "http://localhost:8080/acorn/product/allprice"
    axios.post(url_product_total_price)
      .then((ResponseData) => {
        this.setState({
          product_total_price: ResponseData.data
        });
      }).catch((error) => {
      });

    //최근 주문 정보
    let url_recentbuy = "http://localhost:8080/acorn/product/noworder?user_id=" + localStorage.getItem("user_id");
    axios.get(url_recentbuy)
      .then((ResponseData) => {
        this.setState({
          noworder: ResponseData.data
        });
      }).catch((error) => {
      });

    // 지난 주문 내역
    let url_orderlist = "http://localhost:8080/acorn/product/orderlist?user_id=" + localStorage.getItem("user_id");
    axios.get(url_orderlist)
      .then((ResponseData) => {
        this.setState({
          orderlist: ResponseData.data
        });
      }).catch((error) => {
      });
  }

  render() {
  
    return (
      <div className="user_mypage_topinfo">
        <div className="user_mypage_toptxt">
          <div className="user_mypage_grade">
            <span className="badge">
              <span>FAMILY</span>
            </span>
            <p>{this.state.user_name}</p>
          </div>
        </div>
        <div className="user_number_of_purchases">
          <ul>
            <li>
              <span>
                <EmojiEmotionsIcon />
              </span>
              <span>
                <em>총 상품 등록 수</em>
                {/* 나중에 숫자에 링크 걸기. */}
                <strong>{this.state.product_total_count}</strong>건
                            </span>
            </li>
            <li>
              <span>
                <EmojiEmotionsIcon />
              </span>
              <span>
                <em>총 매출 금액</em>
                {/* 나중에 숫자에 링크 걸기. */}
                <strong>
                  ₩{numeral(this.state.product_total_price).format('0,0')}
                </strong>원
                            </span>
            </li>
            <li>
              <span>
                <EmojiEmotionsIcon />
              </span>
              <span>
                <em>총 판매건수</em>
                <strong>{this.state.orderlist.length}</strong>건
              </span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default adminInfo