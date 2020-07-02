import React, {Component}  from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import Button from '@material-ui/core/Button';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import './container/main.css';
import img1 from '../../main/images/26.jpg';
import axios from 'axios';

class WishList extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
          checkboxtype:false,
          options:[]
        }
    }

    //삭제 메소드(부모에게 product_id 넘김)
    deleteOnedata=()=>{
        this.props.deleteOnedata(this.props.data.product_id)
    }

    GoToCakeview=()=>{
        this.props.GoToCakeview(this.props.data.product_id)
    }

    Checkbox=(event)=>{
        this.props.checkbox(event.target.value ,  event.target.checked)  
    }

    

    render()
    {
        return (
            <tr> 
                <td>
                
                    <div className = "wishlist_no">
                    {this.props.Tablecheckbox===0
                    ?<input type="checkbox" value={this.props.data.product_id} 
                            style={{transform:'scale(2,2)'}} onChange={this.Checkbox.bind(this)} /> 
                    :<input type="checkbox" value={this.props.data.product_id} checked
                    style={{transform:'scale(2,2)'}} onChange={this.Checkbox.bind(this)} /> 
                    }


                        {/* <input type="checkbox" value={this.props.data.product_id} style={{transform:'scale(2,2)'}} onChange={this.Checkbox.bind(this)} />  */}


                    {/*  <Checkbox color="default" size = "small" checked={this.state.checkboxtype} 
                        value={ this.props.data.product_id} onChange={this.Checkbox.bind(this)}
                        inputProps={{ "aria-label": "checkbox with default color" }} />   */} 
                   
                    </div>
                </td>
                <td className = "wishlist_cont_left">
                    <div className = "pick_add_cont">
                        <span className = "pick_add_img">
                            <img src = {"http://localhost:8080/acorn/image/productImage/"+this.props.data.product_img} alt = ""/>
                        </span>
                        <div className = "pick_add_info">
                            <em>{this.props.data.product_name}</em>
                        </div>
                    </div>
                </td>
                <td>
               
                    <strong>￦{new Intl.NumberFormat().format(this.props.data.product_price)}
                    </strong>
                    <div className = "btn_option_list">
                    </div>
                </td>
                <td>
                    {this.props.data.product_category}
                </td>
                <td>
                    <div>
                        <Button size="small" variant="contained" onClick={this.GoToCakeview}>
                            <em>상품보기</em>
                        </Button><br/>
                        <Button size="small" variant="outlined" onClick={this.deleteOnedata}>
                            <em>삭제하기</em>
                        </Button>
                    </div>
                </td>
            </tr>
        )
    }
}
 
export default WishList