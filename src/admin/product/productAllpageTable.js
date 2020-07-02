import React, { Component } from 'react';
import '../../user/mypage/container/main.css';
import numeral from 'numeral';
import Button from 'react-bootstrap/Button';

class productAllpageTable extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      buy_option_text: [],
      buy_option_candle: [],
      product_price: 0
    }

  }

  productModify = (e) => {
    console.log(e.target.value);
    localStorage.setItem("product_id", e.target.value);
    window.location = "/Mo_kyeonny/adminpage/productmodifypage";


  }

  productDelete = (e) => {
    console.log(e.target.value)
    this.props.product_id(e.target.value);
  }

  // 상품 정보 페이지로 이동
  cakeview = () => {
    localStorage.setItem("product_id", this.props.data.product_id);
    window.location = "/Mo_kyeonny/cakeview";
  }


  render() {
    return (
      <tr>
        <td className="td_left">
          <div className="pick_add_cont">
            <span className="pick_add_img" onClick={this.cakeview} style={{cursor:'pointer'}}>
              <img src={"http://54.180.183.72:8080/acorn/image/productImage/" + this.props.data.product_img} alt="" />
            </span>
            <div className="pick_add_info">
              <em>
                {this.props.data.product_name}
              </em>
            </div>
          </div>
        </td>
        <td>
          <strong className="order_pick_price">
            ￦{numeral(this.props.data.product_price).format('0,0')}
          </strong>
        </td>
        <td className="td_order_pick_benefit">
          <ul className="benefit_list">
            <li className="option_lettering">
              <span className="text_type_cont">
                <strong>{this.props.data.product_category}</strong><br />
              </span>
            </li>
          </ul>
        </td>
        <td className="td_order_pick_benefit">
          <ul className="benefit_list">
            <li className="option_lettering">
              <span className="text_type_cont">
                <strong>
                  {this.props.data.product_text.substring(0, 22)}<br />
                  {this.props.data.product_text.substring(22, 44)}<br />
                  {this.props.data.product_text.substring(44)}<br />
                </strong>
              </span>
            </li>
          </ul>
        </td>
        <td>
          <strong className="order_sum">
            ￦{numeral(this.props.data.product_price).format('0,0')}
          </strong>
        </td>
        <td className="noworder_buy_cancle">
          <div className="btn_center_box">
            <Button onClick={this.productModify} size="small" variant="outline-info"
              value={this.props.data.product_id}>
              상품수정
                    </Button>
          </div>
          <br />
          <div className="btn_center_box">
            <Button onClick={this.productDelete} size="small" variant="outline-danger"
              value={this.props.data.product_id}>
              상품삭제
                    </Button>
          </div>
        </td>
      </tr>
    )
  }
}

export default productAllpageTable