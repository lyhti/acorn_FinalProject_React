import React, {Component}  from 'react';
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
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import '../user/mypage/container/main.css';
import axios from 'axios';

class order extends Component
{
    constructor()
    {
        super();
        this.state = 
        {
            // user_name : "",
            // user_hp : '',
            // point : "",
            autoFocus : false,
            // check_date_noSelectMsg:'',
            check_date_type: false,
            // buy_id :'',
            // user_id: '',
            // product_id: '',
            // buy_sell_date: '',
            // buy_price:'',
            // buy_count:'',
            // buy_pick_date:'', 
            buy_option_text:[],
            buy_option_candle:[],
            // buy_order_id:'',

            // product_name :'',
            // product_text: '',
            // product_img: '',
            // product_price: ''           
        };
    }

 
    // 200620 구목현 시작
    componentWillMount()
    {        
        let url_buy="http://localhost:8080/acorn/buy/selectOfBuyOneData?buy_id="+localStorage.getItem("buy_id");
        axios.post(url_buy)
        .then((ResponseData)=>{
            this.setState({
                buy_id : ResponseData.data.buy_id,
                product_id: ResponseData.data.product_id ,
                buy_sell_date: ResponseData.data.buy_sell_date,
                buy_price: ResponseData.data.buy_price,
                buy_count: ResponseData.data.buy_count,
                buy_pick_date: ResponseData.data.buy_pick_date,
                buy_option_text: ResponseData.data.buy_option_text,
                buy_option_candle: ResponseData.data.buy_option_candle,
                buy_order_id: ResponseData.data.buy_order_id,  
            });
        }).catch((error) =>{
        });

        let url_product="http://localhost:8080/acorn/product/getData?product_id="+localStorage.getItem("product_id");
        axios.get(url_product)
        .then((ResponseData)=>{
            this.setState({
                product_name : ResponseData.data.product_name,
                product_text: ResponseData.data.product_text,
                product_img: ResponseData.data.product_img,
                product_price: ResponseData.data.product_price
            });
        }).catch((error) =>{
        });

        let url_user="http://localhost:8080/acorn/user/getData?user_id="+localStorage.getItem("user_id");
        axios.post(url_user)
        .then((ResponseData)=>{
            this.setState({
                user_name: ResponseData.data.user_name,
                user_email : ResponseData.data.user_email,
                user_hp: ResponseData.data.user_hp
            });
        }).catch((error) =>{
        });

    }
    // 200620 구목현 종료




    inputChange = (e) =>
    {
        this.setState(
            {
                // 이것을 실행하기 위해서 ref 말고 태그 값에 name 을 줘야 한다.
                [e.target.name] : e.target.value
            }            
        )
    }

    emailselect = (e) =>
    {
        this.setState(
            {
                user_email_addr: e.target.value,
                user_email_addr_self : e.target.value
            }
        )
    }

    emailChange = (e) =>
    {
        if(this.state.user_email_addr_self === "")
        {
            this.setState(
                {
                    // 이것을 실행하기 위해서 ref 말고 태그 값에 name 을 줘야 한다.
                    [e.target.name] : e.target.value,
                    autoFocus : true
                }
            )
        }
    }
  
  
    onPay=()=>{
        if(this.state.check_date_type === true){
        window.location.href= "/Mo_kyeonny/order/success ";
        }  else{
            this.setState({
                check_date_noSelectMsg: "약관에 동의 해주세요"
              })
        }
    }


    render()
    {

        return(
            <div className = "order_content">
                <div className = "location_wrap">
                    <div className = "location_cont">
                        <span>주문서 작성/결제</span>
                    </div>
                </div>
                <div className = "sub_content">
                    <div className = "content_box">
                        <form name = "frmOrder">
                            <div className = "order_wrap">
                                <div className = "order_title">
                                    <h2>주문서작성/결제</h2>
                                    <ol>
                                        <li className = "page_on">
                                            <span>01</span>
                                            주문서작성/결제&emsp;＞&emsp;
                                        </li>
                                        <li>
                                            <span>02</span>
                                            주문완료&emsp;
                                        </li>
                                    </ol>
                                </div>
                                <div className = "order_cont">
                                    <div className = "cart_cont_list">
                                        <div className = "order_cart_title">
                                            <h3>주문상세내역</h3>
                                        </div>
                                        <div className = "order_table_type">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>상품/옵션 정보</th>
                                                        <th>수량</th>
                                                        <th>상품금액</th>
                                                        <th>옵션</th>
                                                        <th>합계금액</th>
                                                        <th>상품 수령일
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className = "td_left">
                                                            <div className = "pick_add_cont">
                                                                <span className = "pick_add_img">
                                                                    <img src={"http://localhost:8080/acorn/image/productImage/"+this.state.product_img} alt = ""/>
                                                                </span>
                                                                <div className = "pick_add_info">
                                                                    <em>
                                                                        상품이름 : {this.state.product_name}<br/>
                                                                        상품설명 : 
                                                                    </em>
                                                                    <div className = "pick_option_box">
                                                                        <span className = "text_type_cont">
                                                                            사이즈 : 30(105) <br/> <br/> 
                                                                            주문번호: {this.state.buy_order_id}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className = "td_order_amount">
                                                            <div className = "order_count_num">
                                                                <strong>{this.state.buy_count}개</strong>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <strong className = "order_pick_price">
                                                                ￦ {new Intl.NumberFormat().format(this.state.product_price)}
                                                            </strong>
                                                        </td>
                                                        <td className = "td_order_pick_benefit" style={{marginTop:'0px', padding:'0px'}}>
                                                            
                                                                <div style={{height:'100%',  width:'50%', float:"left",borderRight:'1px solid #eee'}}>
                                                                <div style={{ottom:'1px solid #eee'}}>레터링 문구 </div> <br/>
                                                                {
                                                                this.state.buy_option_text.map((item,idx)=>(
                                                                    <table>
                                                                        <tr>
                                                                        <strong> {item}</strong>
                                                                        </tr>
                                                                    </table>
                                                                ))  }   
                                                                </div>
                                                                <div style={{width:'50%', float:"left"}}>
                                                                <div style={{borderBottom:'1px solid #eee'}}>양초 종류 </div> <br/> 
                                                                {
                                                                this.state.buy_option_candle.map((item,idx)=>(
                                                                    <table>
                                                                        <tr>
                                                                        <strong> {item}</strong>
                                                                        </tr>
                                                                    </table>
                                                                ))
                                                            }   
                                                                </div>
                                                           
                                                        {/* <span >
                                                                레터링 문구 : <br/>
                                                            {
                                                                this.state.buy_option_text.map((item,idx)=>(
                                                                    <table>
                                                                        <tr>
                                                                        <strong> {item}</strong>
                                                                        </tr>
                                                                    </table>
                                                                ))
                                                            }   
                                                            </span>
                                                            {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}
                                                            <span>
                                                                양초 종류 : <br/>
                                                            {
                                                                this.state.buy_option_candle.map((item,idx)=>(
                                                                    <table>
                                                                        <tr>
                                                                        <strong> {item}</strong>
                                                                        </tr>
                                                                    </table>
                                                                ))
                                                            }   
                                                        
                                                            </span>  */}
                                                        </td>
                                                        <td>
                                                            <strong className = "order_sum">
                                                                ￦{new Intl.NumberFormat().format(this.state.product_price*this.state.buy_count)}
                                                            </strong>
                                                        </td>
                                                        <td className = "td_order_delivery">
                                                            
                                                        <em> {this.state.buy_pick_date } </em>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/* 상세페이지-->구매하기 누르는 순간 다음페이지(현페이지) 에서 buy_id세션 값 저장 */}
                                    {localStorage.setItem("buy_id",this.state.buy_id)}                                    
                                    {/* <span>
                                        레터링 문구 : <br/>
                                    {
                                        this.state.buy_option_text.map((item,idx)=>(
                                            <table>
                                                <tr>
                                                    {item}
                                                </tr>
                                            </table>
                                        ))
                                    }   
                                    </span> 
                                    <br/>
                                    <span>
                                        양초 종류 : <br/>
                                    {
                                        this.state.buy_option_candle.map((item,idx)=>(
                                            <table>
                                                <tr>
                                                    {item}
                                                </tr>
                                            </table>
                                        ))
                                    }   
                                   
                                    </span> <br/> */}
                                  {/*   <span>
                                    상품 구매 시간 : {this.state.buy_sell_date} <br/>
                                    상품 수령 시간 : {this.state.buy_pick_date } 
                                    </span>
                                    <div className = "btn_cart_left_box">
                                        <Button variant="outlined" className = "cart_go_link">
                                            <em>장바구니 가기</em>
                                        </Button>
                                    </div> */}
                                    <div className = "order_view_info">
                                        <div className = "order_agree">
                                            <div className = "order_zone_title">
                                                <h4>상품 공급사 개인정보 제공 동의</h4>
                                            </div>
                                            <div className = "order_agree_cont">
                                                <div className = "join_agreement_box">
                                                    <div className = "agreement_box">
                                                        - 수집항목: 성명, 비밀번호, 이메일, 휴대폰번호, 주소, 전화번호<br/>
                                                        - 수집/이용목적: 서비스 제공 및 계약의 이행, 구매 및 대금결제, 물품배송 또는 청구지 발송, 불만처리 등 민원처리, 회원관리 등을 위한 목적<br/>
                                                        - 이용기간: 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.<br/>
                                                        단, 관계법령의 규정에 의하여 보전할 필요가 있는 경우 일정기간 동안 개인정보를 보관할 수 있습니다.<br/><br/>
                                                        그 밖의 사항은 (주)에이콘 개인정보처리방침을 준수합니다.
                                                    </div>                                                    
                                                    <div className = "agreement_check">
                                                        <Checkbox color="default" inputProps={{ "aria-label": "checkbox with default color" }} onClick={()=>{
                                                            this.setState({
                                                                 check_date_type: !this.state.check_date_type
                                                                })

                                                            }}/>
                                                        <label>
                                                            <strong>(필수)</strong>
                                                            상품 공급사 개인정보 제공 동의에 대한 내용을 확인 하였으며 이에 동의 합니다.
                                                        </label>
                                                        <div style={{ color: "red" }}> {this.state.check_date_noSelectMsg}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className = "order_info">
                                            <div className = "order_info_title">
                                                <h4>주문자 정보</h4>
                                            </div>
                                            <TableContainer component={Paper} className = "order_info_table_type">
                                                <Table aria-label="simple table" className = "order_info_table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>
                                                                <span>주문하시는 분</span>
                                                            </TableCell>
                                                            <TableCell>
                                                                <TextField id="standard-basic" label="Name" name = "user_name"
                                                                    value = {this.state.user_name} onChange = {this.inputChange}/>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>휴대폰 번호</TableCell>
                                                            <TableCell>
                                                                <TextField id="standard-basic" label="Phone" name = "user_hp"
                                                                    value = {this.state.user_hp} onChange = {this.inputChange}/>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>이메일</TableCell>
                                                            <TableCell>
                                                                <TextField id="standard-basic" label="ID" name = "user_email_id"
                                                                    value ={this.state.user_email} onChange = {this.inputChange}/>
                                                                <span className = "order_info_e-mail">&emsp;@&emsp;</span>
                                                                
                                                                <TextField id="standard-basic" label="e-mail" name = "user_email_addr"
                                                                    value ={this.state.user_email} autoFocus = {this.state.autoFocus}
                                                                    onChange = {this.emailChange}/>&emsp;&emsp;

                                                                <Select displayEmpty inputProps={{'aria-label': 'Without label'}}
                                                                    onChange = {this.emailselect}>
                                                                    <MenuItem selected disabled hidden>이메일선택</MenuItem>
                                                                    <MenuItem value = "naver.com">naver.com</MenuItem>
                                                                    <MenuItem value = "daum.net">daum.net</MenuItem>
                                                                    <MenuItem value = "hanmail.net">hanmail.net</MenuItem>
                                                                    <MenuItem value = "nate.com">nate.com</MenuItem>
                                                                    <MenuItem value = "gmail.com">gmail.com</MenuItem>
                                                                    <MenuItem value = "icloud.com">icloud.com</MenuItem>
                                                                    <MenuItem value = ""><em>직접입력</em></MenuItem>
                                                                </Select>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                        {/* <div className = "payment_info">
                                            <div className = "order_info_title">
                                                <h4>결제정보</h4>
                                            </div>
                                            <TableContainer component={Paper} className = "payment_info_table_type">
                                                <Table aria-label="simple table" className = "payment_info_table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>
                                                                <span>상품 합계 금액</span>
                                                            </TableCell>
                                                            <TableCell>
                                                                <strong className = "order_payment_sum">
                                                                    ￦{this.state.product_price*this.state.buy_count}
                                                                </strong>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>
                                                                <span>할인 및 적립</span>
                                                            </TableCell>
                                                            <TableCell>
                                                                <span className = "payment_icon">
                                                                    <MonetizationOnIcon style={{fontSize: 18}} color="secondary"/>&nbsp;
                                                                </span>
                                                                <strong>적립 포인트 : (+)
                                                                    <b>711</b>P
                                                                </strong>&emsp;
                                                                <span className = "payment_info_mileage">
                                                                    ( 상품<span>711</span>p, 
                                                                    회원<span>0</span>p, 
                                                                    회원<span>0</span>p )
                                                                </span>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>포인트 사용</TableCell>
                                                            <TableCell>
                                                                <TextField id="standard-basic" label="Ponit"/>
                                                                <span className = "order_info_e-mail">P&emsp;</span>
                                                                    <Checkbox color="default" inputProps={{ "aria-label": "checkbox with default color" }}/>
                                                                    <span>전액 사용하기</span>
                                                                    <span className = "money_use_sum">(보유 D-포인트 : {this.state.point} P)</span>
                                                                    <div>
                                                                    <em className = "money_use_txt">※ {this.state.point}P까지 사용 가능합니다.</em>
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        <TableRow>
                                                            <TableCell>최종 결제 금액</TableCell>
                                                            <TableCell>
                                                                ￦<strong className = "order_payment_sum">
                                                                {this.state.product_price*this.state.buy_count}
                                                                </strong>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div> */}
                                        {/* <div className = "payment_progress">
                                            <div className = "order_info_title">
                                                <h4>결제수단 선택 / 결제</h4>
                                                <p className = "js_pay_content">
                                                ※ 고객님은 안전거래를 위해 현금으로 결제시 
                                                저희 쇼핑몰에서 가입한 구매안전서비스인 
                                                LG 유플러스의 구매안전(에스크로)서비스를 이용하실 수 있습니다.
                                                </p>
                                            </div> */}
                                            {/* <div className = "payment_progress_list">
                                                <div className = "js_pay_content"> 
                                                     <div className = "general_payment">
                                                        <dl>
                                                            <dt>일반결제</dt>
                                                            <dd> */}
                                                                {/* <div className = "payment_radio">
                                                                    <ul className = "payment_progress_select">
                                                                    <RadioGroup className = "payment_radio_group">
                                                                        <li className = "settlekindType_gb">
                                                                            <FormControlLabel value="gb" fontSize="5" control={<Radio color="default" size="small"/>} label="무통장 입금"/>
                                                                        </li> */}
                                                                        {/* 밑에 3개 선택시  에스크로결제만 나옴.*/}
                                                                        {/* <li className = "settlekindType_gb">
                                                                            <FormControlLabel value="pc" control={<Radio color="default" size="small"/>} label="신용카드"/>
                                                                        </li>
                                                                        <li className = "settlekindType_gb">
                                                                            <FormControlLabel value="pb" control={<Radio color="default" size="small"/>} label="계좌이체"/>
                                                                        </li>
                                                                        <li className = "settlekindType_gb">
                                                                            <FormControlLabel value="pk" control={<Radio color="default" size="small"/>} label="카카오페이"/>
                                                                        </li>
                                                                    </RadioGroup>
                                                                    </ul>
                                                                </div> */}
                                                                {/* <div className = "pay_bankbook_box">
                                                                    <em className = "pay_bankbook_txt">
                                                                        ( 무통장 입금 의 경우 입금확인 후부터 배송단계가 진행됩니다. )
                                                                    </em>
                                                                    <ul>
                                                                        <li>
                                                                            <strong>입금자명</strong>
                                                                            <TextField id="standard-basic" size = "small" style={{paddingTop : 0, paddingBottom : 0, marginLeft: 15}}/>
                                                                        </li>
                                                                        <li>
                                                                            <strong>입금은행</strong>
                                                                            <Select displayEmpty inputProps={{'aria-label': 'Without label'}} style={{marginLeft: 15}}>
                                                                                <MenuItem value="" disabled displayEmpty>선택하세요</MenuItem>
                                                                                <MenuItem value = "83890104001942">국민 83890104001942 (주)에스제이듀코</MenuItem>
                                                                            </Select>
                                                                        </li>
                                                                    </ul>
                                                                </div> */}
                                                            {/* </dd>
                                                        </dl>
                                                    </div> */}
                                                    {/* <div className = "escrow_payment">
                                                      <dl>
                                                            <dt>에스크로결제</dt>
                                                            <dd>
                                                                <div className = "payment_radio">
                                                                    <ul className = "payment_progress_select">
                                                                        <li className = "settlekindType_gb">
                                                                            <FormControlLabel value="eb" fontSize="1" control={<Radio color="default" size="small"/>} label="계좌이체"/>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </dd>
                                                        </dl>
                                                    </div> */}
                                                    {/* <div className = "cash_tax_get"> */}
                                                        {/* <dl>
                                                            <dt>현금영수증/계산서 발행</dt>
                                                            <dd>
                                                                <div className = "payment_radio">
                                                                    <ul className = "payment_progress_select">
                                                                        <li className = "settlekindType_gb">
                                                                        <RadioGroup className = "payment_radio_group">
                                                                            <FormControlLabel value="n"  control={<Radio color="default" size="small"/>} label="신청안함"/>
                                                                            <FormControlLabel value="r" fontSize="1" control={<Radio color="default" size="small"/>} label="현금영수증"/>
                                                                            <FormControlLabel value="t" fontSize="1" control={<Radio color="default" size="small"/>} label="세금계산서"/>
                                                                        </RadioGroup>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </dd>
                                                        </dl>  */}
                                                         {/* <div className = "cash_receipt_box">
                                                            <div className = "payment_radio">
                                                                <ul className = "payment_progress_select">
                                                                    <li className = "settlekindType_gb">
                                                                    <RadioGroup className = "payment_radio_group">
                                                                        <FormControlLabel className = "abc" value="n" control={<Radio color="default" size="small"/>} label="소득공제용"/>
                                                                        <FormControlLabel value="r" control={<Radio color="default" size="small"/>} label="지출증빙용"/>
                                                                    </RadioGroup>
                                                                    </li>
                                                                </ul>
                                                            </div> */}
                                                            {/* <div className = "cash_receipt_list"> */}
                                                                {/* 현금영수증 선택 시 소득공제용 */}
                                                                {/* <dl className = "certNoHp">
                                                                    <dt>휴대폰번호</dt>
                                                                    <dd>
                                                                        <TextField id="standard-basic" size = "small" style={{paddingTop : 0, paddingBottom : 0, marginLeft: 15}}/>
                                                                    </dd>
                                                                </dl> */}
                                                                {/* 현금영수증 선택 시 지출증빙용 */}
                                                                {/* <dl className = "certNoBno">
                                                                    <dt>사업자번호</dt>
                                                                    <dd>
                                                                        <TextField id="standard-basic" size = "small" style={{paddingTop : 0, paddingBottom : 0, marginLeft: 15}}/>
                                                                    </dd>
                                                                </dl>
                                                            </div> */}
                                                        {/* </div>  */}
                                                        {/* 세금계산서 선택 시 테이블 */}
                                                        {/* <div className = "tax_invoice_box">
                                                        <TableContainer component={Paper} className = "tax_invoice_type">
                                                            <Table aria-label="simple table" className = "tax_invoice_table">
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className = "table_th">
                                                                            <span>사업자번호</span>
                                                                        </TableCell>
                                                                        <TableCell className = "input_td">
                                                                            <TextField id="standard-basic" className = "textfield" label="" />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className = "table_th">회사명</TableCell>
                                                                        <TableCell>
                                                                            <TextField id="standard-basic" className = "textfield" label=""/>
                                                                        </TableCell>
                                                                        <TableCell className = "table_th">대표자명</TableCell>
                                                                        <TableCell className = "input_text">
                                                                            <TextField id="standard-basic" className = "textfield" label=""/>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className = "table_th">업태</TableCell>
                                                                        <TableCell>
                                                                            <TextField id="standard-basic" className = "textfield" label=""/>
                                                                        </TableCell>
                                                                        <TableCell className = "table_th">종목</TableCell>
                                                                        <TableCell>
                                                                            <TextField id="standard-basic" className = "textfield" label=""/>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell className = "table_th" rowSpan={2}>사업장주소</TableCell>
                                                                        <TableCell>
                                                                            <TextField className = "taxZonecode textfield" id="standard-basic" label=""/>
                                                                        </TableCell>                                                                           
                                                                        <Button className = "btn_post_search" size="small" variant="contained">
                                                                            <strong>우편번호검색</strong>
                                                                        </Button>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell colSpan = {2}>
                                                                            <TextField className = "textfield" id="standard-basic" label=""/>
                                                                        </TableCell>
                                                                        <TableCell className = "table_td_taxAddressSub">
                                                                            <TextField className = "textfield" id="standard-basic" label=""/>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                        </div> 
                                                    </div> 
                                                 </div>
                                            </div> 
                                       </div> */}
                                        <div className = "payment_final">
                                           {/* <div className = "payment_final_total">
                                                <dl>
                                                    <dt>최종 결제 금액</dt>
                                                    <dd>
                                                        <span>
                                                            ￦
                                                            <strong>{this.state.buy_price}</strong>
                                                        </span>
                                                    </dd>
                                                </dl>
                                            </div>
                                             <div className = "payment_final_check">
                                                <div className = "agreement_check">
                                                    <Checkbox color="default" inputProps={{ "aria-label": "checkbox with default color" }}/>
                                                    <label>
                                                        <em>
                                                            <b>(필수)</b>
                                                            구매하실 상품의 결제정보를 확인하였으며, 구매진행에 동의합니다.
                                                        </em>
                                                    </label>
                                                </div>
                                            </div> */}
                                            <div className = "btn_center_box">
                                              
                                                <Button className = "btn_order_buy" size="large" variant="contained" onClick={this.onPay}>
                                                    <em>결제하기</em>
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
 
export default order