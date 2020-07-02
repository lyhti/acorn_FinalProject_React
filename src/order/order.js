import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from "@material-ui/core/Checkbox";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import numeral from 'numeral';
import '../user/mypage/container/main.css';
import axios from 'axios';

class SangpumList extends Component {
  constructor() {

    super();
    this.state =
    {
      user_name: "",
      user_hp: "",
      user_email: "",
      user_email_id: "",
      user_email_addr: "",
      buy_option_text: [],
      buy_option_candle: [],
      check_date_type: false
    };
  }

  inputChange = (e) => {
    this.setState(
      {
        // 이것을 실행하기 위해서 ref 말고 태그 값에 name 을 줘야 한다.
        [e.target.name]: e.target.value
      }
    )
  }

  emailselect = (e) => {
    this.setState(
      {
        user_email_addr: e.target.value,
        user_email_addr_self: e.target.value
      }
    );
  }

  emailChange = (e) => {
    if (this.state.user_email_addr_self === "") {
      this.setState(
        {
          // 이것을 실행하기 위해서 ref 말고 태그 값에 name 을 줘야 한다.
          [e.target.name]: e.target.value,
          autoFocus: true
        }
      )
    }
  }

  onPay = () => {
    if (this.state.check_date_type1 === true && this.state.check_date_type2 === true && this.state.check_date_type3 === true) {
      window.location.href = "/Mo_kyeonny/order/success ";
    }
    else {
      this.setState(
        {
          check_date_noSelectMsg: "약관에 동의 해주세요",
          check_noSelect: "입금은행을 선택 해주세요"
        }
      )
    }
  }

  payCheck = (e) => {
    console.log(e.target.value)
  }

  componentWillMount() {
    let url_buy = "http://54.180.183.72:8080/acorn/buy/selectOfBuyOneData?buy_id=" + localStorage.getItem("buy_id");
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

    let url_product = "http://54.180.183.72:8080/acorn/product/getData?product_id=" + localStorage.getItem("product_id");
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

    let url_user = "http://54.180.183.72:8080/acorn/user/getData?user_id=" + localStorage.getItem("user_id");
    axios.post(url_user)
      .then((ResponseData) => {
        this.setState({
          user_name: ResponseData.data.user_name,
          user_email_id: ResponseData.data.user_email.split("@")[0],
          user_email_addr: ResponseData.data.user_email.split("@")[1],
          user_hp: ResponseData.data.user_hp
        });
      }).catch((error) => {
      });
    let url_productCount = "http://54.180.183.72:8080/acorn/product/updateCount?product_id=" + localStorage.getItem("product_id");
    axios.post(url_productCount)
      .then((ResponseData) => {
        this.setState({

        });
      }).catch((error) => {
      });
  }

  render() {
    console.log(this.state.buy_option_text);
    return (
      <div className="order_content">
        <div className="location_wrap">
          <div className="location_cont">
            <span>주문서 작성/결제</span>
          </div>
        </div>
        <div className="sub_content">
          <div className="content_box">
            <form name="frmOrder">
              <div className="order_wrap">
                <div className="order_title">
                  <h2>주문서작성/결제</h2>
                  <ol>
                   
                    <li className="page_on">
                      <span>01</span>
                                            주문서작성/결제&emsp;＞&emsp;
                                        </li>
                    <li>
                      <span>02</span>
                                            주문완료&emsp;
                                        </li>
                  </ol>
                </div>
                <div className="order_cont">
                  <div className="cart_cont_list">
                    <div className="order_cart_title">
                      <h3>주문상세내역</h3>
                    </div>
                    <div className="order_table_type">
                      <table>
                        <thead>
                          <tr>
                            <th>주문번호</th>
                            <th>상품/옵션 정보</th>
                            <th>수량</th>
                            <th>상품금액</th>
                            <th>상품 수령일</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="td_order_pick_benefit">
                              <strong>{this.state.buy_order_id}</strong>
                            </td>
                            <td className="td_left">
                              <div className="pick_add_cont">
                                <span className="pick_add_img">
                                  <img src={"http://54.180.183.72:8080/acorn/image/productImage/" + this.state.product_img} alt="" />
                                </span>
                                <div className="pick_add_info">
                                  <em>
                                    {this.state.product_name}
                                  </em>
                                  <div className="pick_option_box">
                                    <span className="text_type_cont">
                                      <strong>레터링 문구 : </strong><br />
                                                                        1. {this.state.buy_option_text[0]}<br />
                                      {this.state.buy_option_text[1] === "" ? "" : "2. " + this.state.buy_option_text[1]}<br />
                                      {this.state.buy_option_text[2] === "" ? "" : "3. " + this.state.buy_option_text[2]}<br />
                                      <br />
                                      <strong>양초 종류 : </strong><br />
                                                                        1. {this.state.buy_option_candle[0]}<br />
                                      {this.state.buy_option_candle[1] === "" ? "" : "2. " + this.state.buy_option_candle[1]}<br />
                                      {this.state.buy_option_candle[2] === "" ? "" : "3. " + this.state.buy_option_candle[2]}<br />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="td_order_amount">
                              <div className="order_count_num">
                                <strong>{this.state.buy_count}개</strong>
                              </div>
                            </td>
                            <td>
                              <strong className="order_pick_price">
                                ￦{numeral(this.state.product_price).format('0,0')}
                              </strong>
                            </td>
                            <td className="td_order_delivery">
                              {this.state.buy_pick_date}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 상세페이지-->구매하기 누르는 순간 다음페이지(현페이지) 에서 buy_id세션 값 저장 */}
                  {localStorage.setItem("buy_id", this.state.buy_id)}
                  <div className="order_view_info">
                    <div className="order_agree">
                      <div className="order_zone_title">
                        <h4>상품 공급사 개인정보 제공 동의</h4>
                      </div>
                      <div className="order_agree_cont">
                        <div className="join_agreement_box">
                          <div className="agreement_box">
                            - 수집항목: 성명, 비밀번호, 이메일, 휴대폰번호, 주소, 전화번호<br />
                                                        - 수집/이용목적: 서비스 제공 및 계약의 이행, 구매 및 대금결제, 물품배송 또는 청구지 발송, 불만처리 등 민원처리, 회원관리 등을 위한 목적<br />
                                                        - 이용기간: 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.<br />
                                                        단, 관계법령의 규정에 의하여 보전할 필요가 있는 경우 일정기간 동안 개인정보를 보관할 수 있습니다.<br /><br />
                                                        그 밖의 사항은 (주)에이콘 개인정보처리방침을 준수합니다.
                                                    </div>
                          <div className="agreement_check">
                            <Checkbox color="default" inputProps={{ "aria-label": "checkbox with default color" }}
                              onClick={() => {
                                this.setState(
                                  {
                                    check_date_type1: !this.state.check_date_type
                                  }
                                )
                              }} />
                            <label>
                              <strong>(필수)</strong>
                                                            상품 공급사 개인정보 제공 동의에 대한 내용을 확인 하였으며 이에 동의 합니다.
                                                        </label>
                            {this.state.check_date_type1 === true
                              ?
                              ""
                              :
                              <div style={{ color: "red" }}>
                                {this.state.check_date_noSelectMsg}
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="order_info">
                      <div className="order_info_title">
                        <h4>주문자 정보</h4>
                      </div>
                      <TableContainer component={Paper} className="order_info_table_type">
                        <Table aria-label="simple table" className="order_info_table">
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <span>주문하시는 분</span>
                              </TableCell>
                              <TableCell>
                                <TextField id="standard-basic" label="Name" name="user_name"
                                  value={this.state.user_name} />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>휴대폰 번호</TableCell>
                              <TableCell>
                                <TextField id="standard-basic" label="Phone" name="user_hp"
                                  value={this.state.user_hp}  />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>이메일</TableCell>
                              <TableCell>
                                <TextField id="standard-basic" label="ID" name="user_email_id"
                                  value={this.state.user_email_id} />
                                <span className="order_info_e-mail">&emsp;@&emsp;</span>
                                <TextField id="standard-basic" label="e-mail" name="user_email_addr"
                                  value={this.state.user_email_addr} onChange={this.emailChange} />&emsp;&emsp;
                                  <Select displayEmpty inputProps={{ 'aria-label': 'Without label' }}
                                            onChange={this.emailselect} autoFocus={this.state.test}>
                                      <MenuItem selected disabled hidden>이메일선택</MenuItem>
                                      <MenuItem value="naver.com">naver.com</MenuItem>
                                      <MenuItem value="daum.net">daum.net</MenuItem>
                                      <MenuItem value="hanmail.net">hanmail.net</MenuItem>
                                      <MenuItem value="nate.com">nate.com</MenuItem>
                                      <MenuItem value="gmail.com">gmail.com</MenuItem>
                                      <MenuItem value="icloud.com">icloud.com</MenuItem>
                                      <MenuItem value=""><em>직접입력</em></MenuItem>
                                </Select>
                                <div>{this.state.test}</div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                
                    <div className="payment_progress">
                      <div className="order_info_title">
                        <h4>결제수단 선택 / 결제</h4>
                        <p className="js_pay_content">
                          ※ 고객님은 안전거래를 위해 현금으로 결제시
                          저희 쇼핑몰에서 가입한 구매안전서비스인
                          LG 유플러스의 구매안전(에스크로)서비스를 이용하실 수 있습니다.
                                                </p>
                      </div>
                      {this.state.check_date_type2 === true
                        ?
                        ""
                        :
                        <div style={{ color: "red" }}>
                          {this.state.check_noSelect}
                        </div>
                      }
                      <div className="payment_progress_list">
                        <div className="js_pay_content">
                          <div className="general_payment">
                            <dl>
                              <dt>일반결제</dt>
                              <dd>
                                <div className="payment_radio">
                                  <ul className="payment_progress_select">
                                    <RadioGroup className="payment_radio_group" defaultValue="gb">
                                      <li className="settlekindType_gb">
                                        <FormControlLabel value="gb" fontSize="5" control={<Radio color="default" size="small" />} label="무통장 입금" />
                                      </li>
                              
                                    </RadioGroup>
                                  </ul>
                                </div>
                                <div className="pay_bankbook_box">
                                  <em className="pay_bankbook_txt">
                                    ( 무통장 입금 의 경우 입금확인 후부터 배송단계가 진행됩니다. )
                                                                    </em>
                                  <ul>
                                    <li>
                                      <strong>입금자명</strong>
                                      <TextField id="standard-basic" size="small" style={{ paddingTop: 0, paddingBottom: 0, marginLeft: 15 }}
                                        value={this.state.user_name} onChange={this.inputChange} />
                                    </li>
                                    <li>
                                      <strong>입금은행</strong>
                                      <Select displayEmpty inputProps={{ 'aria-label': 'Without label' }} style={{ marginLeft: 15 }}
                                        onChange={() => {
                                          this.setState(
                                            {
                                              check_date_type2: !this.state.check_date_type
                                            }
                                          )
                                        }}>
                                        <MenuItem selected disabled hidden>입금계좌선택</MenuItem>
                                        <MenuItem value="83890104001942">신한 110461271083 (주)케이크하우스</MenuItem>
                                      </Select>
                                    </li>
                                  </ul>
                                </div>
                              </dd>
                            </dl>
                          </div>
                        
                        </div>
                      </div>
                    </div>
                    <div className="payment_final">
                      <div className="payment_final_total">
                        <dl>
                          <dt>최종 결제 금액</dt>
                          <dd>
                            <span>
                              ￦
                                                            <strong>{numeral(this.state.product_price*this.state.buy_count).format('0,0')}</strong>
                            </span>
                          </dd>
                        </dl>
                      </div>
                      <div className="payment_final_check">
                        <div className="agreement_check">
                          {this.state.check_date_type3 === true
                            ?
                            ""
                            :
                            <div style={{ color: "red" }}>
                              {this.state.check_date_noSelectMsg}
                            </div>
                          }
                          <Checkbox color="default" inputProps={{ "aria-label": "checkbox with default color" }}
                            onClick={() => {
                              this.setState(
                                {
                                  check_date_type3: !this.state.check_date_type,

                                }
                              )
                            }} />
                          <label>
                            <em>
                              <b>(필수)</b>
                                                            구매하실 상품의 결제정보를 확인하였으며, 구매진행에 동의합니다.
                                                        </em>
                          </label>
                        </div>
                      </div>
                      <div className="btn_center_box">
                        <Button className="btn_order_buy" size="large" variant="contained" onClick={this.onPay}>
                          결제하기
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SangpumList