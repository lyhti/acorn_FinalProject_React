import React, { Component } from 'react';
import '../user/mypage/container/main.css';
import numeral from 'numeral';

class adminRecentHistoryTable extends Component {

  pageMove = (e) => {
    localStorage.setItem("product_id", this.props.data.product_id);
    window.location = "/Mo_kyeonny/cakeview";
  }


  render() {
    return (
      <li>
        <div className="item_cont">
          <div className="item_photo_box">
            <img style = {{cursor : 'pointer'}}  src={"http://localhost:8080/acorn/image/productImage/" + this.props.data.product_img} alt=""
              onClick={this.pageMove} />
          </div>
          <div className="item_info_cont">
            <div className="item_tit_box">
              <strong className="item_name">
                {this.props.data.user_name}
              </strong>
              <span className="item_name_explain">
                {this.props.data.product_text}
              </span>
            </div>
            <div className="item_money_box">
              <strong className="item_price">
                <span>
                  ₩{numeral(this.props.data.product_price).format('0,0')}
                </span>
              </strong>

            </div>
            <div className="item_icon_box">
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default adminRecentHistoryTable