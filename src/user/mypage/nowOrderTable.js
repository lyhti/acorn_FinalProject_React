import React, { Component } from 'react';
import './container/main.css';
import Button from 'react-bootstrap/Button';
import numeral from 'numeral';
import axios from 'axios';

class nowOrderTable extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      product_price: 0,
      buy_order_type: this.props.buy_order_type,
      buy_option_data: []
    }
  }

  componentWillMount() {
    let url_buy = "http://54.180.183.72:8080/acorn/product/noworder_selectOfBuyOption?buy_id=" + this.props.data.buy_id;
    axios.post(url_buy)
      .then((ResponseData) => {
        console.log(ResponseData.data)
        this.setState({
          buy_option_data: ResponseData.data
        });

      }).catch((error) => {
      });



  }

  orderBuyCancle = (e) => {
    console.log(e.target.value);
    let url = "http://54.180.183.72:8080/acorn/buy/deleteOrderbuy?buy_id=" + e.target.value;
    axios.post(url)
      .then((ResponseData) => {
        this.setState({

        });
      }).catch((error) => {
      });
    window.location.reload();
  }


  // 주문자 정보 보기??
  orderDetail = () => {
    console.log(this.props.data.buy_order_id)
    console.log(this.props.data.buy_id)
    localStorage.setItem("buy_order_id", this.props.data.buy_order_id);
    localStorage.setItem("buy_id", this.props.data.buy_id);
    window.location = "/Mo_kyeonny/ordersheet";
  }

  cakeview = () => {
    localStorage.setItem("product_id", this.props.data.product_id);
    window.location = "/Mo_kyeonny/cakeview";
  }

  render() {
    return (
      <tr>

        <td className="noworder_buy_order_id">
          <strong onClick={this.orderDetail} className = "user_buy_order_id">
            {this.props.data.buy_order_id}<br />
            <Button type="button" onClick={this.orderDetail} size="small" variant="outline-info"
              value={this.props.data.buy_id} className="orderDetail">
              주문정보확인
            </Button>
          </strong>
        </td>
        <td className="noworder_product_cont">
          <div className="pick_add_cont">
            <span className="pick_add_img" onClick={this.cakeview} style={{cursor:'pointer'}}>
              <img src={"http://54.180.183.72:8080/acorn/image/productImage/" + this.props.data.product_img} alt="" />
            </span>
            <div className="pick_add_info">
              <em>
                {this.props.data.product_name}
              </em>
              <br />
              <span>
                <td><strong>레터링 문구</strong></td>   <td><strong>양초 종류</strong></td>
                {
                  this.state.buy_option_data.map((item, idx) =>
                    (
                      <tr>
                        {item.buy_option_text !== ""
                          ? <td> {idx + 1}  :  {item.buy_option_text}   </td>
                          : ""
                        }

                        {item.buy_option_candle !== ""
                          ? <td> {idx + 1}  :  {item.buy_option_candle}   </td>
                          : ""
                        }
                      </tr>
                    ))
                }
              </span>
            </div>
          </div>
        </td>
        <td className="noworder_buy_price">
          <strong className="order_buy_price">
            ￦{numeral(this.props.data.buy_price).format('0,0')}
          </strong>
          <div className="order_count_num">
            <strong>{this.props.data.buy_count}개</strong>
          </div>
        </td>
        <td>
          <div className="btn_option_list">
            <span>
              {this.props.data.buy_order_type === 0
                ? "입금대기" : this.props.data.buy_order_type === 1
                  ? "제작중" : this.props.data.buy_order_type === 2
                    ? "제작완료" : "수령완료"}
            </span>
          </div>
        </td>
        <td className="noworder_buy_cancle">
          <div className="btn_center_box">
            {this.props.data.buy_order_type === 0 ?
            <Button onClick={this.orderBuyCancle} size="sm" value={this.props.data.buy_id} className="cancle_button"
                variant="outline-danger">
                주문취소
              </Button> : <em>취소불가</em>}
          </div>
        </td>
      </tr>
    )
  }
}
export default nowOrderTable