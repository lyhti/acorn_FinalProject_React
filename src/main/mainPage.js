import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import MainCarousel from './mainCarousel';
import WholeProduct from '../main/wholeProduct';
import WholeProductMore from '../main/wholeProductMore';
import UserLogin from '../user/login/userLogin';
import UserJoin from '../user/join/userJoin';
import Mypage from '../user/mypage/container/leftMenuBar';
import OrderSheet from '../order/orderSheet'
import Order from '../order/order';
import OrderSuccess from '../order/orderSuccess';
import CakeView from './product/cakeView'
import AdminPage from '../admin/container/leftMenuBar';
import SearchResult from './searchResult';
import 'bootstrap/dist/css/bootstrap.css';
import Category from './category';
import ProductOfferPage from '../admin/product/productModifyPage'
import SearchBtn from './images/btn_combine_search.png';
import Qna from '../user/mypage/qna.js';
import '../styles/css/fontStyle.css';
import '../styles/css/componentStyle.css';

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      user_id: "",
      member_type: "",
      color: 'black',
      categoryColor:'',
      memoryPath:''
    }
  }

  // 검색창 엔터 누를 시  검색 결과 state에 저장하고 메인 사진 안보이게 하기
  onSearchPress = (e) => {
    localStorage.removeItem("search");
    if (e.key === "Enter" && e.target.value !== "") {
      localStorage.setItem("search", e.target.value);
      this.refs.search.value = ''
      window.location.href = "/Mo_kyeonny/search";
    }
  }

  searchChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSearchClick = () => {
    localStorage.removeItem("search");
    if (this.state.search === "") {
      alert("검색어를 입력해주세요")
    } else {
      localStorage.setItem("search", this.state.search);

      this.refs.search.value = ''
      window.location.href = "/Mo_kyeonny/search";
    }

  }
  logout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("member_type");
    localStorage.removeItem("login");


    window.location.href = "/Mo_kyeonny";

  }

  goTocategory = (e) => {
    localStorage.setItem("category", e.target.id);
    localStorage.setItem("categoryColor",e.target.id)

    window.location = "/Mo_kyeonny/category";  
  }


componentDidMount(){
  localStorage.removeItem("categoryColor")
  
}




  render() {
    return (
      <div>
        {/* 로그인, 고객센터 등 시작 */}
        <div className="sideStyle">

          {/* 세션으로 로그인/로그아웃 화면을 갈라서 보여준다  */}
          {
            localStorage.getItem("login") === "login_ok"
              ?
              <span className="sideBtn"  onClick={this.logout} style={{ marginLeft: '20px', cursor: 'pointer' }}>
                로그아웃
				</span>
              :
              <NavLink to="/Mo_kyeonny/login">
                <span className="sideBtn"   style={{ marginLeft: '30px' }}>
                  로 그 인
					</span>
              </NavLink>
          }

          {localStorage.getItem("login") !== "login_ok"
            ?
            <NavLink to="/Mo_kyeonny/join">
              <span className="sideBtn"   style={{ marginLeft: '20px' }}>
                회원가입
					</span>
            </NavLink>
            : ''
          }


          {localStorage.getItem("login") === "login_ok" && localStorage.getItem("member_type") === "1"
            ?
            <NavLink to="/Mo_kyeonny/mypage"  style={{ textDecoration: 'none' }}>
              <span className="sideBtn" style={{ border: 'none', fontSize: '12pt', marginLeft: '20px' }}>
                마이페이지
					</span>
            </NavLink>
            : ''
          }

          {/* 판매자만 판매자센터가 보인다 */}
          {
            localStorage.getItem("member_type") === "2"
              ?
              <NavLink to="/Mo_kyeonny/adminpage">
                <span className="sideBtn"  style={{ backgroundColor:"whitesmoke", border: 'none', fontSize: '12pt', marginLeft: '20px' }}>
                  판매자센터
						</span>
              </NavLink>
              : ''
          }
          <NavLink to="/Mo_kyeonny/qna" style={{ textDecoration: 'none' }}>
            <span className="sideBtn" style={{ border: 'none', fontSize: '12pt', marginLeft: '20px' }}>
              고객센터
						</span>
          </NavLink>
          <div>
          </div>
        </div>
        {/* 로그인, 고객센터 등 종료 */}

        {/* 상단 메뉴 바 시작 */}
        <div style={{ height: '100px' }} className="headerMain">
          {/* 로고 */}
          <div className="headerLogo">
            <NavLink exact to="/Mo_kyeonny"   style={{ textDecoration: 'none' }}>
              <span className="logoStyle" style={{ color: '#45adad' }}>Cake House</span>
            </NavLink>
          </div>

          {/* 검색 */}
          <div className="headerSearch">
            <div className="inputBox">
              <input type="text" name="search" ref="search" onChange={this.searchChange.bind(this)} onKeyPress={this.onSearchPress} className="searchBox" />
              <img src={SearchBtn} alt="검색" className="searchBtn" onClick={this.onSearchClick.bind(this)} style={{ width: '17px', height: '17px' }} />
            </div>
          </div>

          {/* 카테고리 */}
          <div className="headerCate">
            <span style={{}} >
              <span id="빵 케이크" className="cateStyle" onClick={this.goTocategory.bind(this)}>   
                 일반빵케이크 
						</span>
              <span id="앙금 케이크" className="cateStyle" onClick={this.goTocategory.bind(this)}>
               앙금 케이크 
						</span>
              <span id="마카롱 케이크" className="cateStyle" onClick={this.goTocategory.bind(this)}>
                마카롱케이크
						</span>
              <span id="슈가 케이크" className="cateStyle" onClick={this.goTocategory.bind(this)}>
                슈가케이크
						</span>
            </span>
          </div>
        </div>

        {/* 가운데 contents 시작 */}
        <div className="main_content">
          <Route exact path="/Mo_kyeonny" component={MainCarousel} />
          <Route exact path="/Mo_kyeonny" component={WholeProduct} />
          <Route path="/Mo_kyeonny/WholeProductMore" component={WholeProductMore} />
          <Route path="/Mo_kyeonny/login" component={UserLogin} />
          <Route path="/Mo_kyeonny/join" component={UserJoin} />
          <Route path="/Mo_kyeonny/mypage" component={Mypage} />
          <Route exact path="/Mo_kyeonny/ordersheet" component={OrderSheet} />
          <Route exact path="/Mo_kyeonny/order" component={Order} />
          <Route path="/Mo_kyeonny/order/success" component={OrderSuccess} />
          <Route path="/Mo_kyeonny/cakeview" component={CakeView} />
          <Route path="/Mo_kyeonny/adminpage" component={AdminPage} />
          <Route path="/Mo_kyeonny/search" component={SearchResult} search={this.state.search} />
          <Route path="/Mo_kyeonny/category" component={Category} />
          <Route path="/Mo_kyeonny/productofferpage" component={ProductOfferPage} />
          <Route path="/Mo_kyeonny/qna" component={Qna} />
        </div>
        {/* 가운데 contents 종료 */}
      </div>

    );
  }
}

export default MainPage;