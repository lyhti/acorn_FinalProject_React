import React, {Component}  from 'react';
import img1 from '../../image/27.jpg';
import '../../user/mypage/container/main.css';
import OptionChange from './OptionChange/Option_Change'

class Cart extends Component
{
    render()
    {
        return(
        <tr>
            <td className = "td_left">
                <div className = "pick_add_cont">
                    <span className = "pick_add_img">
                        <img src = {img1} alt = ""/>
                    </span>
                    <div className = "pick_add_info">
                        <em>
                            {this.props.data.name}
                        </em>
                        <div className = "pick_option_box">
                            <span className = "text_type_cont">
                                사이즈 : {this.props.data.option}
                            </span>
                        </div>
                    </div>
                </div>
            </td>
            <td className = "td_order_amount">
                <div className = "order_count_num">
                    <strong>{this.props.data.su}개</strong>
                    <div className = "btn_option_list">
                        <OptionChange/>
                        {/* <Button variant="outlined" className = "btn_option_change">
                            <span>옵션/수량변경</span>
                        </Button> */}
                    </div>
                </div>
            </td>
            <td>
                <strong className = "order_pick_price">
                    ￦{this.props.data.price}
                </strong>
            </td>
            <td className = "td_order_pick_benefit">
                <ul className = "benefit_list">
                    <li className = "benefit_mileage">
                        <em>적립</em>
                        <span>
                            상품
                            <strong>+{this.props.data.point}P</strong>
                        </span>
                    </li>
                </ul>
            </td>
            <td>
                <strong className = "order_sum">
                    ￦{this.props.data.price}
                </strong>
            </td>
            <td className = "td_order_delivery">
                50,000원 이상<br/>
                구매시 무료배송<br/>
                ￦0<br/>
                (택배)
            </td>
        </tr>
        )
    }
}
 
export default Cart