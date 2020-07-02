import React, { Component } from 'react';
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {TableBody } from "@material-ui/core"
import { IoIosHeartEmpty } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import { IoIosHeart } from "react-icons/io";

import Lettering1 from './lettering1';
import Lettering2 from './lettering2';
import Lettering3 from './lettering3';
import Candle1 from './candle1';
import Candle2 from './candle2';
import Candle3 from './candle3';
import basicCandle2 from "./basicCandle2.png";
import happyBirthdayCandle from "./happyBirthdayCandle.jpg";
import heartCandle2 from "./heartCandle2.png";
import numberCandle from "./numberCandle.jpg";
import smileCandle2 from "./smileCandle2.jpg";
import './cakeView.css';


import ReviewPage from './reviewPage';
import ReviewViewPage from './reviewViewPage';
import axios from 'axios';

class cakeView extends Component {

  constructor(props) {
    super(props)

    this.state = {
      text: '',
      text2: '',
      text3: '',
      candle: '',
      candle2: '',
      candle3: '',
      textInput: '',
      textInput2: '',
      textInput3: '',
      buy_pick_date: '',
      buy_count: '1',
      bookmark: false,
      buy_pick_date_noSelectMsg: '',

      buy_pick_date_type: false,

      candleArray: [],
      textInputArray: [],
      product_id: '',
      product_name: '',
      product_text: '',
      product_img: '',
      product_price: '',
      product_standard_price: '',
      product_category: ''
    }
  }

  //해당 상세페이지에 들어오면 상품 정보 가져옴
  componentWillMount()
  {
    console.log("Product_id" + localStorage.getItem("product_id"))

    let url = "http://54.180.183.72:8080/acorn/product/getData?product_id=" + localStorage.getItem("product_id");
    axios.get(url).then((ResponseData) => {
      console.log(this.state.product_img)
      this.setState({
        product_id: ResponseData.data.product_id,
        product_name: ResponseData.data.product_name,
        product_text: ResponseData.data.product_text,
        product_img: ResponseData.data.product_img,
        product_price: ResponseData.data.product_price,
        product_standard_price: ResponseData.data.product_price,
        product_category: ResponseData.data.product_category
      },() =>
      {
          console.log(this.state.product_img)
      });
    }).catch((error) => {
      console.log("list error:" + error);
    });

    let url2 = "http://54.180.183.72:8080/acorn/product/recentAdd";
    axios.post(url2, { user_id: localStorage.getItem("user_id"), product_id: localStorage.getItem("product_id") }).then((res) => { }).catch((error) => {
      console.log("최근본 목록 추가에러:" + error);
    });

    let url3 = "http://54.180.183.72:8080/acorn/bookmark/stateOfBookMark?user_id=" + localStorage.getItem("user_id") + "&product_id=" + localStorage.getItem("product_id");
    axios.post(url3).then((res) => {
      this.setState({
        bookmark: res.data
      })
    }).catch((error) => {
      console.log("북마크 확인에러:" + error);
    });
  }

  //구매하기 버튼 클릭
  buying = () => {
    //날짜가 지정안되어있으면 구매하기 실행 안된다
    if (this.state.buy_pick_date_type === true) {
      let url = "http://54.180.183.72:8080/acorn/buy/insertOfBuy";

      //아래 방식은 setState를 우선순위로 실행시키고 이후에 ()=>axios를 실행시킴으로써 axios가 실행될 때 변경된 state값이 들어가게 하는 문법
      this.setState(
        previousState => ({
          candleArray: [...previousState.candleArray, this.state.candle, this.state.candle2, this.state.candle3],
          textInputArray: [...previousState.textInputArray, this.state.textInput, this.state.textInput2, this.state.textInput3],
        }), () =>
        axios.post(url, {
          user_id: localStorage.getItem("user_id"),
          product_id: localStorage.getItem("product_id"),
          buy_price: this.state.product_price,
          buy_pick_date: this.state.buy_pick_date,
          buy_count: this.state.buy_count,
          buy_option_text: this.state.textInputArray,
          buy_option_candle: this.state.candleArray
        }).then((res) => {

        }).catch((error) => { console.log(error) })
      );
      window.location.href = "/Mo_kyeonny/order";
    } else {
      this.setState({
        buy_pick_date_noSelectMsg: "픽업 날짜를 선택해주세요"
      })
    }
  }

  // 비로그인 시 구매하기 버튼 누르면 로그인 페이지로 이동
  loginpage = () => {
    window.location = "/Mo_kyeonny/login";
  }

  //bookmark
  bookmark = () => {
    //로그인 안하면 북마크 눌럿을 때 로그인 화면으로 감
    if (localStorage.getItem("user_id") > 1) {
      if (this.state.bookmark === false) {
        let url = "http://54.180.183.72:8080/acorn/bookmark/insertOfBookMark";
        axios.post(url, { user_id: localStorage.getItem("user_id"), product_id: localStorage.getItem("product_id") }).then((res) => {
          let url3 = "http://54.180.183.72:8080/acorn/bookmark/stateOfBookMark?user_id=" + localStorage.getItem("user_id") + "&product_id=" + localStorage.getItem("product_id");
          axios.post(url3).then((res) => {
            this.setState({
              bookmark: res.data
            })
          }).catch((error) => {
            console.log("북마크 확인에러:" + error);
          });
        }).catch((error) => {
          console.log("북마크 추가에러:" + error);
        });

      } else {
        let url = "http://54.180.183.72:8080/acorn/bookmark/deleteOfBookMark?user_id=" + localStorage.getItem("user_id") + "&product_id=" + localStorage.getItem("product_id");
        axios.delete(url).then((res) => {
          let url3 = "http://54.180.183.72:8080/acorn/bookmark/stateOfBookMark?user_id=" + localStorage.getItem("user_id") + "&product_id=" + localStorage.getItem("product_id");
          axios.post(url3).then((res) => {
            this.setState({
              bookmark: res.data
            })
          }).catch((error) => {
            console.log("북마크 확인에러:" + error);
          });
        }).catch((error) => {
          console.log("북마크 삭제에러:" + error);
        });

      }
    } else {
      alert("로그인 먼저 해주세요")
      window.location.href = "/Mo_kyeonny/login";
    }
  }



  componentDidUpdate() {
    if (localStorage.getItem("reviewPage") === "reviewPage") {
      window.scrollTo(0, 1000)
    } else {
      window.scrollTo(0, 0)
    }

  }

  componentWillUnmount() {
    localStorage.removeItem("reviewPage")
  }


  goTocakeModify = (e) => {
    console.log(e.target.value)
    localStorage.setItem("product_id", e.target.value);
    window.location = "/Mo_kyeonny/adminpage/productmodifypage?product_id=" + e.target.value;
  }

  // 초 +  레터링 값 저장
  candlesave1 = (x) => {
    this.setState({
      candle: x
    })
  };

  candlesave2 = (x) => {
    this.setState({
      candle2: x
    })
  };

  candlesave3 = (x) => {
    this.setState({
      candle3: x
    })
  };

  letteringsave1 = (x) => {
    this.setState({
      textInput: x
    })
  };

  letteringsave2 = (x) => {
    this.setState({
      textInput2: x
    })
  };

  letteringsave3 = (x) => {
    this.setState({
      textInput3: x
    })
  };

  backToMain = (event) => {
    return this.props.history.goBack();
  };




  onUnderReview(reviewList) {
    console.log(reviewList);
  }



  render() {
    //0622소야 memberType을 변수로 선언해줌
    const memberType = localStorage.getItem("member_type");



    //달력에서 오늘 이전 날은 선택할수 없음
    const date = new Date();
    const year = date.getFullYear(); 
    const month = date.getMonth()+1;
    const day = date.getDate()+2;

    // const values = {
    //   someDate: new Date().toISOString().substring(0, 10)

    // };



    //달력을 클릭할시 true 값 으로 변경하게
    const onCalenderClick = (event) => {
      this.setState({
        buy_pick_date_type: true
      });
    }

    //달력 값 들어가게 하는것
    const calender = (event) => {
      this.setState
        ({
          buy_pick_date: event.target.value
        })
      console.log(this.state.buy_pick_date);
    };

    //수량 버튼 클릭시 합계 가격 상승
    const amount = (event) => {
      this.setState
        ({
          buy_count: event.target.value,
          product_price: event.target.value * this.state.product_standard_price
        })
    };




    return (
      <div>
        <div style={{ float: 'left', textAlign: 'center', marginLeft: '24%', marginTop: '3%' }} >
          <img src={"http://54.180.183.72:8080/acorn/image/productImage/" + this.state.product_img} alt='' className="cakeview_img" />
          {'\u00A0'}
        </div>

        <div style={{ float: 'left' }}>

          <TableContainer>
            <Table className="cakeView_table" style={{ width: '530px' }}>
              <TableBody>
                <TableRow >
                  <TableCell style={{ padding: "5px" }}>
                    <h3 className="cakeView_div12" >
                      {this.state.product_name}
                      <span className="cakeView_catagory" >
                        {this.state.product_category}
                      </span>
                    </h3>                                                            
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell style={{ padding: "5px" }}>
                    <Box className="cakeView_div1" margin={'1px'} border={1} borderColor={'#f7f7f7'} bgcolor={'#f7f7f7'} color={'gray'} fontSize={'19px'} >
                      {this.state.product_text}
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ padding: "5px" }}>
                    <Box className="cakeView_div1" border={0} margin={'1px'} bgcolor={'#f7f7f7'} color={'gray'} fontSize={'17px'} font-family={'Poor Story'} >
                      판매가격 : <b style={{ color: "red" }}> {new Intl.NumberFormat().format(this.state.product_price)}</b> 원
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer>
            <Table size={"small"}>
              <TableBody>
                <TableRow>
                  <TableCell align={"right"} >
                    <p className="cakeView_P" style={{ padding: '0px' }} >  유통기한 :</p>
                  </TableCell>
                  <TableCell>
                    <p className="cakeView_P" > 제조일로부터2일(냉장보관필수)</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align={"right"} >
                    <p className="cakeView_P" >  사이즈 :</p>
                  </TableCell>
                  <TableCell>
                    <b className="cakeView_P"> 20cm x 25cm</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align={"right"}  >
                    <p class Name="cakeView_P" > 제조&판매원 :</p>
                  </TableCell>
                  <TableCell>
                    <p className="cakeView_P" > 케익팩토리</p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align={"right"} >
                    <p className="cakeView_P" > 예약일 : </p>
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="standard-full-width"
                      style={{ margin: 1 }}
                      type='date'
                      inputProps={{ min: (year+'-'+(month <10 ? '0'+month : month)+'-'+(day<10? '0'+day :day)) }}
                      
                      // values.someDate 
                      onChange={calender}
                      onClick={onCalenderClick}
                      InputLabelProps={{
                        shrink: false,
                      }}
                    />
                    <div className="cakeView_P" style={{ color: "red" }}> 예약은 오늘 일자 이틀 뒤부터 가능합니다</div>
                    <div className="cakeView_P" style={{ color: "red" }}> {this.state.buy_pick_date_noSelectMsg}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align={"right"} >
                    <p className="cakeView_P" > 수량 :</p>
                  </TableCell>
                  <TableCell>
                    <FormControl className="quantity">
                      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                        style={{ margin: 1 }}
                        onChange={amount}
                        defaultValue="1"
                      >
                        <MenuItem value={"1"}>1개</MenuItem>
                        <MenuItem value={"2"}>2개</MenuItem>
                        <MenuItem value={"3"}>3개</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>

                {/*  각각의 페이지랑 연결*/}
                {this.state.buy_count === '1' &&
                  <Candle1 candlesave1={this.candlesave1.bind(this)} />
                }
                {this.state.buy_count === '2' &&
                  <Candle2 candlesave1={this.candlesave1.bind(this)} candlesave2={this.candlesave2.bind(this)} />
                }
                {this.state.buy_count === '3' &&
                  <Candle3 candlesave1={this.candlesave1.bind(this)} candlesave2={this.candlesave2.bind(this)} candlesave3={this.candlesave3.bind(this)} />
                }

                {this.state.buy_count === '1' &&
                  <Lettering1 letteringsave1={this.letteringsave1.bind(this)} />
                }
                {this.state.buy_count === '2' &&
                  <Lettering2 letteringsave1={this.letteringsave1.bind(this)} letteringsave2={this.letteringsave2.bind(this)} />
                }
                {this.state.buy_count === '3' &&
                  <Lettering3 letteringsave1={this.letteringsave1.bind(this)} letteringsave2={this.letteringsave2.bind(this)} letteringsave3={this.letteringsave3.bind(this)} />
                }

                {/* 0622소야 memberType으로 운영자와 구매자 구별하여 구매와 수정버튼 생성 */}
                <TableRow >
                  <TableCell colSpan={2} align="center" style={{ padding: "5px 0 0 0" }}  >
                    {memberType === "2" ?
                      <Button variant="outline-danger" className="cakeView_modify_button" onClick={this.goTocakeModify.bind(this)}
                        value={this.state.product_id}>
                        상품수정
                      </Button>
                      :
                      memberType === "1" ?
                        <Button variant="outline-danger"  onClick={this.buying}>
                          구매하기
                      </Button>
                        :
                        <Button variant="outline-danger"  onClick={this.loginpage}>
                          구매하기
                      </Button>
                    }

                    {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                    <Button variant="outline-danger"  onClick={this.backToMain}>
                      목록으로
                    </Button>
                    {/* 북마크 */}
                    {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                    {localStorage.getItem("member_type") === "2"
                      ?
                      ""
                      :
                      <Button variant="outline-danger"  onClick={this.bookmark}  >
                        관심상품 &nbsp; {this.state.bookmark === true
                          ?
                          <IoIosHeart style={{ color: 'red', fontSize: '13pt' }} />
                          :
                          <IoIosHeartEmpty style={{ fontSize: '13pt' }} />}
                      </Button>
                    }

                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ clear: "both", textAlign: 'center' }}>
          <div className="cakeView_candle1">
            <img src={basicCandle2} className="cakeView_candle2" alt=""></img>
            <img src={happyBirthdayCandle} className="cakeView_candle4" alt=""></img>
            <img src={heartCandle2} className="cakeView_candle6" alt=""></img>
            <p className="cakeView_candle3">일반초</p>
            <p className="cakeView_candle5">Happy Birthday초</p>
            <p className="cakeView_candle11">하트초</p>
            <img src={numberCandle} className="cakeView_candle7" alt=""></img>
            <img src={smileCandle2} className="cakeView_candle8" alt=""></img>
            <p className="cakeView_candle9">숫자초</p>
            <p className="cakeView_candle10">smaile초</p>


          </div>
          <ReviewPage />

          <br/>
          <ReviewViewPage />
          <div style={{ height: "500px" }}></div>
        </div>
      </div>
    )
  }
}
export default cakeView