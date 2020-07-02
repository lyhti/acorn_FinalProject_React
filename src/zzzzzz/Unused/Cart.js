import React, {Component}  from 'react';
import Button from '@material-ui/core/Button';
import CartTable from './CartTable';
import '../../user/mypage/container/main.css';


class Cart extends Component
{
    constructor()
    {
        super();
        this.state =
        {
            data :[
                {
                    name : "1스트라이프 반팔크루티 블루 RD9SMBAPO511R63",
                    option : "26(95)",
                    price : "71,100",
                    su : 1,
                    point : 711
                },
                {
                    name : "2스트라이프 반팔크루티 블루 RD9SMBAPO511R63",
                    option : "28(100)",
                    price : "72,200",
                    su : 2,
                    point : 722
                },
                {
                    name : "3스트라이프 반팔크루티 블루 RD9SMBAPO511R63",
                    option : "30(105)",
                    price : "73,300",
                    su : 3,
                    point : 733
                }
            ]
        }
    }

    render()
    {
        return(
            <div className = "Order_content">
                <div className = "location_wrap">
                    <div className = "location_cont">
                        <span>장바구니</span>
                    </div>
                </div>
                <div className = "sub_content">
                    <div className = "content_box">
                        <form name = "frmOrder">
                            <div className = "order_wrap">
                                <div className = "order_title">
                                    <h2>장바구니</h2>
                                    <ol>
                                        <li className = "page_on">
                                            <span>01</span>
                                            장바구니&emsp;＞&emsp;
                                        </li>
                                        <li>
                                            <span>02</span>
                                            주문서작성/결제&emsp;＞&emsp;
                                        </li>
                                        <li>
                                            <span>03</span>
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
                                                        <th>할인/적립</th>
                                                        <th>합계금액</th>
                                                        <th>배송비</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.data.map((item, idx) =>
                                                    (
                                                        <CartTable data = {item} idx = {idx}/>
                                                    ))
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className = "btn_cart_left_box">
                                        <Button variant="outlined" className = "pick_sang_del">
                                            <em>선택 상품 삭제</em>
                                        </Button>
                                        <Button variant="outlined" className = "pick_sang_bookmark">
                                            <em>선택 상품 찜</em>
                                        </Button>
                                        <p>
                                            <em>주문서 작성단계에서 할인/포인트 적용을 하실 수 있습니다.</em>
                                        </p>
                                    </div>                                       
                                    <div className = "cart_payment payment_final">
                                        <div className = "payment_final_total">
                                            <dl>
                                                <dt>최종 결제 금액</dt>
                                                <dd>
                                                    <span>
                                                        ￦
                                                        <strong>55,000</strong>
                                                    </span>
                                                </dd>
                                            </dl>
                                        </div>                                            
                                    </div>
                                    <div className = "btn_order_box">
                                        <Button className = "shopping button" size="large" variant="contained">
                                            <em>쇼핑 계속하기</em>
                                        </Button>
                                        <Button className = "select_order_buy button" type = "submit" size="large" variant="contained">
                                            <em>선택 상품 주문</em>
                                        </Button>
                                        <Button className = "all_order_buy button" type = "submit" size="large" variant="contained">
                                            <em>전체 상품 주문</em>
                                        </Button>
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
 
export default Cart