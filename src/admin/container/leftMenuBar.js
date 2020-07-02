import React, { Component } from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';

import AdminDefault from '../adminRecentHistory';
import ProductOfferPage from '../product/productOfferPage';
import ProductModifyPage from '../product/productModifyPage';
import AdminNowOrder from '../adminNowOrder';
import AllMemberList from '../member/allMemberList';
import ProductAllpage from '../product/productAllpage'
import AdminOrderList from '../../order/adminOrderList'

import '../container/css/adminLmb.css';

class leftMenuBar extends Component {
  render() {
    return (
      <div className="User_mypage_main_Leftbar">
        <BrowserRouter>
          <div className="User_mypage_info_Leftbar">
            <div className="mypageTitle_Leftbar">
              <Link to="/Mo_kyeonny/adminpage" style={{ textDecoration: 'none' }}><b>판매자 센터</b></Link>
            </div>
            <ul className="mypageListName_Leftbar">
              <li>
                <Link to="/Mo_kyeonny/adminpage/productofferpage"><span>상품 등록</span></Link>
              </li>
              <li>
                <Link to="/Mo_kyeonny/adminpage/productAllpage"><span>전체 상품 정보</span></Link>
              </li>
              <li>
                <Link to="/Mo_kyeonny/adminpage/adminnoworder"><span>진행 상품 목록</span></Link>
              </li>
              <li>
                <Link to="/Mo_kyeonny/adminpage/adminorderlist"><span>완료 상품 목록</span></Link>
              </li>
              <li>
                <Link to="/Mo_kyeonny/adminpage/allmemberlist"><span>회원 관리</span></Link>
              </li>
            </ul>
          </div>

          <Route exact path="/Mo_kyeonny/adminpage" component={AdminDefault} />
          <Route exact path="/Mo_kyeonny/adminpage/productofferpage" component={ProductOfferPage} />
          <Route exact path="/Mo_kyeonny/adminpage/productmodifypage" component={ProductModifyPage} />
          <Route exact path="/Mo_kyeonny/adminpage/adminnoworder" component={AdminNowOrder} />
          <Route exact path="/Mo_kyeonny/adminpage/allmemberlist" component={AllMemberList} />
          <Route exact path="/Mo_kyeonny/adminpage/productAllpage" component={ProductAllpage} />
          <Route exact path="/Mo_kyeonny/adminpage/adminorderlist" component={AdminOrderList} />

        </BrowserRouter>
      </div>
    )
  }
}

export default leftMenuBar