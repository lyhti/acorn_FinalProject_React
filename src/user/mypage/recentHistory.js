import React, { Component } from 'react';
import './container/main.css';
import UserInfo from './userInfo';
import RecentHistoryTable from './recentHistoryTable';
import axios from 'axios';

class recentHistory extends Component {
  constructor() {
    super();
    this.state =
    {
      recentbuy: [],
      recentview: [],
      user_name: ''
    }
  }


  componentWillMount() {
    //최근 주문 정보
    let url_recentbuy = "http://54.180.183.72:8080/acorn/buy/selectOfRecentBuyList?user_id=" + localStorage.getItem("user_id");
    axios.get(url_recentbuy)
      .then((ResponseData) => {
        this.setState({
          recentbuy: ResponseData.data
        });
      }).catch((error) => {
      });

    //최근 본 상품
    let url_recentview = "http://54.180.183.72:8080/acorn/product/recentList?user_id=" + localStorage.getItem("user_id");
    axios.get(url_recentview)
      .then((ResponseData) => {
        this.setState({
          recentview: ResponseData.data
        });
      }).catch((error) => {
      });

    //유저 정보
    let url_user = "http://54.180.183.72:8080/acorn/user/getData?user_id=" + localStorage.getItem("user_id");
    axios.post(url_user)
      .then((ResponseData) => {
        this.setState({
          user_name: ResponseData.data.user_name
        });
      }).catch((error) => {
      });
  }


  render() {
    return (
      <div className="User_mypage_content">
        <UserInfo />
        <div className="user_mypage_latelyinfo">
          <div className="latelyinfo_title">
            <h3>
              최근 주문 정보
                            <span>{this.state.user_name}님께서 주문한 최근 상품입니다.</span>
            </h3>
          </div>
          <div className="latelyinfo_cont">
            <div className="item_gallery_type">
              <ul>
                {
                  this.state.recentbuy.slice(0, 5).map((item, idx) =>
                    (
                      <RecentHistoryTable data={item} idx={idx} />
                    ))
                }
              </ul>
            </div>
          </div>
          <div className="user_mypage_latelyinfo">
            <div className="latelyinfo_title">
              <h3>
                최근 본 상품
                                <span>{this.state.user_name}님께서 본 최근 상품입니다.</span>
              </h3>
            </div>
            <div className="latelyinfo_cont">
              <div className="item_gallery_type">
                <ul>
                  {
                    this.state.recentview.slice(0, 5).map((item, idx) =>
                      (
                        <RecentHistoryTable data={item} idx={idx} />
                      ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default recentHistory