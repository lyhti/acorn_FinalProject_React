import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import '../user/mypage/container/main.css';
import numeral from 'numeral';
import axios from 'axios';


class adminOrderListTable extends Component {
  constructor() {
    super();
    this.state =
    {
      buy_option_data: []
    };
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





  orderDetail = (e) => {
    localStorage.setItem("buy_order_id", e.target.value);
    localStorage.setItem("buy_id", this.props.data.buy_id);
    window.location = "/Mo_kyeonny/ordersheet?user_id=" + localStorage.getItem("user_id")
  }


  cakeview = () => {
    localStorage.setItdiv("product_id", this.props.data.product_id);
    window.location = "/Mo_kyeonny/cakeview";
  }

  render() {
    return (
      <tr>
        <td className="noworder_buy_order_id">
          <strong>
            {this.props.data.buy_order_id}
          </strong>
        </td>
        <td className="noworder_product_cont">
          <div className="pick_add_cont">
            <span className="pick_add_img" onClick={this.cakeview} style={{cursor:'pointer'}}>
              <img src={"http://54.180.183.72:8080/acorn/image/productImage/" + this.props.data.product_img}
                alt="" />
            </span>
            <div className="pick_add_info">
              <div>
                {this.props.data.product_name}
              </div>
              <div className="pick_option_box">
                <span className="text_type_cont">
                  <td><strong>레터링 문구</strong></td>   <td><strong>양초 종류</strong></td>
                  {
                    this.state.buy_option_data.map((itdiv, idx) =>
                      (
                        <tr>
                          {itdiv.buy_option_text !== ""
                            ? <td> {idx + 1}  :  {itdiv.buy_option_text}   </td>
                            : ""
                          }

                          {itdiv.buy_option_candle !== ""
                            ? <td> {idx + 1}  :  {itdiv.buy_option_candle}   </td>
                            : ""
                          }
                        </tr>
                      ))
                  }
                </span>
              </div>
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
                ?
                <Button type="Button" onClick={this.orderBuyState} size="small" variant="contained"
                  value={this.props.data.buy_id}>
                  <div>입금대기</div>
                </Button>
                :
                this.props.data.buy_order_type === 1
                  ?
                  <Button type="Button" onClick={this.orderBuyState} size="small" variant="contained"
                    value={this.props.data.buy_id}>
                    <div>제작중</div>
                  </Button>
                  :
                  this.props.data.buy_order_type === 2
                    ?
                    <Button type="Button" onClick={this.orderBuyState} size="small" variant="contained"
                      value={this.props.data.buy_id}>
                      <div>제작완료</div>
                    </Button>
                    :
                    <div>수령완료</div>
                    }
            </span>
            <div>
              {this.state.buystate}
            </div>
          </div>
        </td>
        <td>
          <Button type="Button" onClick={this.orderDetail} size="sm" variant="outline-info"
            value={this.props.data.buy_order_id}>
            주문정보확인
                    </Button>
        </td>
      </tr>
    )
  }
}

export default adminOrderListTable