import React, { Component } from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import recentHistory from '../recentHistory';
import OrderList from '../../../order/orderList';
import NowOrder from '../nowOrder';
import WishList from '../wishList';
import UserModify from '../userModify';
import UserPwChange from '../userPwChange'
import UserInfoChange from '../userInfoChange'
import Unregister from '../unregister';
import Qna from '../qna';

import './userlmb.css';


class leftMenuBar extends Component {
  render() {
    return (
      <div className="User_mypage_main">
        <BrowserRouter>
          <div className="User_mypage_info">
            <div className="mypageTitle">
              <Link to="/Mo_kyeonny/mypage"><b>마이페이지</b></Link>
            </div>
            <ul className="mypageListName">
              <li className="mypageSubTitle">
                <b>상품정보</b>
                <ul>
                  <li>
                    <Link to="/Mo_kyeonny/mypage/orderlist"><span>지난주문내역</span></Link>
                  </li>
                  <li>
                    <Link to="/Mo_kyeonny/mypage/noworder"><span>진행상품목록</span></Link>
                  </li>
                  <li>
                    <Link to="/Mo_kyeonny/mypage/wishlist"><span>위시리스트</span></Link>
                  </li>
                </ul>

              </li>
              <li className="mypageSubTitle">
                <b>회원정보</b>
                <ul className="mypageListName">
                  <li>
                    <Link to="/Mo_kyeonny/mypage/usermodify"><span>회원정보 변경</span></Link>
                  </li>
                  <li>
                    <Link to="/Mo_kyeonny/mypage/userpwchange"><span>비밀번호 변경</span></Link>
                  </li>
                  <li>
                    <Link to="/Mo_kyeonny/mypage/unregister"><span>회원 탈퇴</span></Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <Route exact path="/Mo_kyeonny/mypage" component={recentHistory} />
          <Route exact path="/Mo_kyeonny/mypage/orderlist" component={OrderList} />
          <Route exact path="/Mo_kyeonny/mypage/noworder" component={NowOrder} />
          <Route exact path="/Mo_kyeonny/mypage/wishlist" component={WishList} />
          <Route exact path="/Mo_kyeonny/mypage/usermodify" component={UserModify} />
          <Route exact path="/Mo_kyeonny/mypage/userpwchange" component={UserPwChange} />
          <Route exact path="/Mo_kyeonny/mypage/userinfochange" component={UserInfoChange} />
          <Route exact path="/Mo_kyeonny/mypage/unregister" component={Unregister} />
          <Route exact path="/Mo_kyeonny/mypage/qna" component={Qna} />
        </BrowserRouter>
      </div>
    )
  }
}

export default leftMenuBar