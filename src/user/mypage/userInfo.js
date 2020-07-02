import React, { Component } from 'react';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import './container/main.css';
import axios from 'axios';

class userInfo extends Component {
  constructor() {
    super();
    this.state =
    {
      user_name: '',
      total_count: '',
      total_price: ''

    }
  }


  componentWillMount() {


    //유저 정보
    let url_user = "http://54.180.183.72:8080/acorn/user/getData?user_id=" + localStorage.getItem("user_id");
    axios.post(url_user)
      .then((ResponseData) => {
        this.setState({
          user_name: ResponseData.data.user_name,
          user_email: ResponseData.data.user_email
        });
      }).catch((error) => {
      });

    //총 구매 갯수
    let url_totalcount = "http://54.180.183.72:8080/acorn/buy/selectOfTotalBuyCount?user_id=" + localStorage.getItem("user_id");
    axios.get(url_totalcount)
      .then((ResponseData) => {
        this.setState({
          total_count: ResponseData.data
        });
      }).catch((error) => {
      });

    //총 구매 금액
    let url_totalprice = "http://54.180.183.72:8080/acorn/buy/selectOfTotalBuyPrice?user_id=" + localStorage.getItem("user_id");
    axios.get(url_totalprice)
      .then((ResponseData) => {
        this.setState({
          total_price: ResponseData.data
        });
      }).catch((error) => {
      });

  }

  render() {
    if(this.state.total_price === "")
    {
      console.log(this.state.total_price)
    }
    
    return (
      <div className="user_mypage_topinfo">
        <div className="user_mypage_toptxt">
          <div className="user_mypage_grade">
            <span className="badge">
              <span>FAMILY</span>
            </span>
            <p>{this.state.user_name}님</p><br />
          </div>
        </div>
        <div className="user_number_of_purchases">
          <ul>
            <li>
              <span>
                <EmojiEmotionsIcon />
              </span>
              <span>
                <em>아이디</em>
                <strong>{this.state.user_email}</strong>
                            </span>
            </li>
            <li>
              <span>
                <EmojiEmotionsIcon />
              </span>
              <span>
                <em>총 구입 횟수</em>
                <strong>{this.state.total_count}</strong>번
                            </span>
            </li>
            <li>
              <span>
                <EmojiEmotionsIcon />
              </span>
              <span>
                <em>총 구매 금액</em>
                <strong>{this.state.total_price === "" ? 0 : this.state.total_price}</strong>원
              </span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default userInfo