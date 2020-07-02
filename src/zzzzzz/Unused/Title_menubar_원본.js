import React, { Component } from 'react';
import {Route, BrowserRouter, NavLink, Link} from 'react-router-dom';
import MainCenter1 from './Main_center1';
import MainCenter2 from './Main_center2';
import Thumbnail_Search from './Thumbnail_Search'
import Main from './User_mypage/Main';
import Cart from './Cart';
import Order from './User_mypage/Order';
import OrderDetail from './User_mypage/OrderDetail';
import AdminMypage from '../Admin/AdminMypage';
import UserJoinMain from './user_login/User_Join_Main';
import UserLoginMain from './user_login/User_Login_Main';
 
import 'bootstrap/dist/css/bootstrap.css';
// import Axios from 'axios';


class Title_menubar extends Component {

    state={
        search:'',
        CenterImage:'0',    //시작하자마자 + 로고 누르면 센터 보이게 하기
        user_id:'',
        member_type:''
    }

    // 검색창 엔터 누를 시  검색 결과 state에 저장하고 메인 사진 안보이게 하기
    onSearchPress=(e)=>{
        if(e.key ==="Enter" && e.target.value!==""  )
        {
            this.setState({
                search : e.target.value ,
            });
            this.refs.search.value='';

            // 아래 방법들은 페이지 이동할때 쓰이는 다양한 방법들 // 나중에 참조할 수 있을 때 사용할 것
            //return <Redirect push to="/home"></Redirect>
            //const history = createHashHistory();
            //history.go("/home");
            //history.push("/home");
            //useLocation.call("/home");
        }
    }

    //검색 후 검색창 초기화
    deleteSearch=()=>{
        this.setState({
            search:''
        })
        
    }

    // //처음들왔을때+로고  제외하고  나머지 버튼 눌럿을때  아래 사진 안보이게 하기 + 검색 component 사라지게 하기
    // CenterImageChangeTo1=()=>{
    //     this.setState({
    //         CenterImage:'1',
    //         search:''
    //     });
       
    // }

    // //전시회 클릭시
    // clickCategory_1=()=>{
    //     this.CenterImageChangeTo1();
    //     sessionStorage.setItem("categoryName","전시회");
    // }

    // //미술관 클릭시
    // clickCategory_2=()=>{
    //     this.CenterImageChangeTo1();
    //     sessionStorage.setItem("categoryName","미술관");
    // }

    // //박물관 클릭시
    // clickCategory_3=()=>{
    //     this.CenterImageChangeTo1();
    //     sessionStorage.setItem("categoryName","박물관");
    // }

    // //박람회 클릭시
    // clickCategory_4=()=>{
    //     this.CenterImageChangeTo1();
    //     sessionStorage.setItem("categoryName","박람회");

    // }

    // //사진전 클릭시
    // clickCategory_5=()=>{
    //     this.CenterImageChangeTo1();
    //     sessionStorage.setItem("categoryName","사진전");
    // }

    // //궁 클릭시
    // clickCategory_6=()=>{
    //     this.CenterImageChangeTo1();
    //     sessionStorage.setItem("categoryName","궁");
    // }

    // //로그인 버튼 클릭시
    // clickLogin=()=>{
    //     this.CenterImageChangeTo1();

    // }

    // //로그아웃 버튼 클릭시
    // clickLogOut=()=>{
    //     this.CenterImageChangeTo1();
    //     sessionStorage.removeItem("login");
    //     sessionStorage.removeItem("user_id");
    //     sessionStorage.removeItem("member_type");
    // }

    // //회원가입 클릭시
    // member_sign=()=>{
    //     this.CenterImageChangeTo1();
    // }
  
    // //장바구니 클릭시
    // basket=()=>{
    //     this.CenterImageChangeTo1();
        

    // }

    // //mypage 클릭시
    // mypage=()=>{
    //     this.CenterImageChangeTo1();

    // }

    // //고객센터 클릭시
    // notice=()=>{
    //     this.CenterImageChangeTo1();

    // }



    render() {
        return (
            <BrowserRouter>
            <div>
            
                {/*상단 검은 배경*/}
                <div style={{backgroundColor:'black', height:'70px'}}>

                    {/*로고*/}
                    <NavLink exact to="/home" style={{textDecoration:'none'}}>
                        <span style={{color:'white', fontSize:'30pt'}} onClick={this.deleteSearch}>Shopping Mall</span>
                    </NavLink>
                   
                    {/* 검색창*/}
                    <input type="text" name="search" ref="search" onKeyPress={this.onSearchPress.bind(this)}
                            style={{width:'500px', marginLeft:'50px', height:'40px', fontSize:'15pt'}} placeholder="검색어를 입력해주세요" />               

                    {/* 카테고리 */}
                    <span style={{color:'white', fontSize:'18pt', marginLeft:'200px'}}>

                        <NavLink exact to="/home/thumbnail_category1"   style={{textDecoration:'none'}} onClick={this.clickCategory_1}>
                            <span style={{marginLeft:'50px', color:'white'}}>
                                일반빵케이크
                            </span>
                        </NavLink>

                        <NavLink exact to="/home/thumbnail_category2" style={{textDecoration:'none'}} onClick={this.clickCategory_2}>
                            <span style={{marginLeft:'50px', color:'white'}}>
                                앙금케이크
                            </span>
                        </NavLink>

                        <NavLink exact to="/home/thumbnail_category3" style={{textDecoration:'none'}} onClick={this.clickCategory_3}>
                            <span style={{marginLeft:'50px', color:'white'}}>
                                마카롱케이크
                            </span>
                        </NavLink>

                        <NavLink exact to="/home/thumbnail_category4" style={{textDecoration:'none'}} onClick={this.clickCategory_4}>
                            <span style={{marginLeft:'50px', color:'white'}}>
                                숫자케이크
                            </span>
                        </NavLink>
                    </span>
                </div>   
             
                {/* 상단 아래 메뉴들(로그인, 고객센터 등) */}
                <div style={{marginTop:'15px',  height:'20px'}}>


                {/* 세션으로 로그인/로그아웃 화면을 갈라서 보여준다  */}
                { sessionStorage.getItem("login")==="login_ok" 
                            ?    
                                    <span style={{border:'none',  fontSize:'12pt', marginLeft:'20px', backgroundColor:'white', color:'black', cursor:'pointer'}}  
                                    onClick={this.clickLogOut} >로그아웃</span>
                            : 
                                <NavLink to="/home/login" style={{textDecoration:'none'}}   >
                                    <span style={{border:'none',fontSize:'12pt', marginLeft:'30px', backgroundColor:'white', color:'black'}} 
                                    onClick={this.clickLogin}>로 그 인</span>
                                </NavLink>
                }


                    <NavLink to="/home/UserLoginMain" style={{textDecoration:'none'}}>
                        <span style={{border:'none',  fontSize:'12pt', marginLeft:'20px', backgroundColor:'white', color:'black'}} 
                                onClick={this.member_sign}>회원가입</span>
                    </NavLink>

                   {/* 장바구니 어떻게 할지 생각해볼 것! */}
                    <NavLink to="/home/cart" style={{textDecoration:'none'}}>
                        <span style={{border:'none',  fontSize:'12pt', marginLeft:'20px', backgroundColor:'white', color:'black' , cursor:'pointer'}} 
                                onClick={this.basket}>장바구니</span>
                    </NavLink>                    

                    <NavLink to="/home/mypage" style={{textDecoration:'none'}}>
                        <span style={{border:'none',  fontSize:'12pt', marginLeft:'20px', backgroundColor:'white', color:'black'}} 
                                >MyPage</span>
                    </NavLink>


{/* 판매자만 판매자센터가 보인다 */}
{sessionStorage.getItem("member_type")==="2"    
                ?
                    <NavLink to="/seller_center">
                        <button style={{border:'none',  fontSize:'12pt', marginLeft:'20px', backgroundColor:'white', color:'black'}}>판매자센터</button>
                    </NavLink>
                :   ''
}
                    <NavLink to="/home/notice" style={{textDecoration:'none'}}>
                        <span style={{border:'none',  fontSize:'12pt', marginLeft:'20px', backgroundColor:'white', color:'black'}} 
                              onClick={this.notice}>고객센터</span>
                    </NavLink>
                </div>
        


            {/* 시작하자마자 메인사진 보이게 하기 + 카테고리 및 메뉴 버튼 누르면 이미지 사라지고 페이지 이동 */}
            {/* {this.state.CenterImage==='0'?<MainCenter1/>:''}
        
            {this.state.CenterImage==='0'?<MainCenter2/>:''}
        
            {this.state.CenterImage==='0'?<BottomDescription/>:''} */}
        
            {/* 검색에 글자쓰고 엔터치면 search 값이 아래 나오게함 // 다른 버튼 누르면 페이지 이동 */}
            {/* {this.state.search===''?'':<ThumbnailSearch searchContent={this.state.search}/>} */}

                <Route exact path="/home" component={MainCenter1}/>
                <Route exact path="/home" component={MainCenter2}/>
                
                <Route path = "/home/login" component={UserJoinMain}/>
                <Route path = "/home/UserLoginMain" component={UserLoginMain}/>
                <Route path = "/home/cart" component = {Cart}/>
                <Route path = "/home/mypage" component = {Main}/>
                <Route path = "/home/order" component = {Order}/>
                <Route path = "/home/orderdetail" component = {OrderDetail}/>
                
                <Route path = "/home/admin" component = {AdminMypage}/>
            </div>
            </BrowserRouter>
        );
    }
}

export default Title_menubar;