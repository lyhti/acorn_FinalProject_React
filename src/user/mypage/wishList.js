import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Checkbox from "@material-ui/core/Checkbox";
import './container/main.css';
import UserInfo from './userInfo';
import axios from 'axios';
import NoDataTable from '../../order/noDataTable'
import numeral from 'numeral';


class wishList extends Component {
  constructor() {
    super();
    this.list = this.list.bind(this);
    this.deleteOnedata = this.deleteOnedata.bind(this);
    this.state =
    {
      allChecked: false,
      allBookMarkData: [],
      options: [],
      isSelected: false
    }
  }

  componentWillMount() {
    this.list();
    window.scrollTo(0, 0)
  }

  //데이타 가져오기
  list = () => {
    let url = "http://54.180.183.72:8080/acorn/bookmark/selectOfBookMark?user_id=" + localStorage.getItem("user_id");
    axios.post(url)
      .then((ResponseData) => {
        console.log(ResponseData.data)
        this.setState({
          allBookMarkData: ResponseData.data
        });

      }).catch((error) => {
      });
  }

  //북마크 삭제하기
  deleteOnedata = (product_id) => {
    let url = "http://54.180.183.72:8080/acorn/bookmark/deleteOfBookMark?user_id=" + localStorage.getItem("user_id") + "&product_id=" + product_id;
    axios.delete(url)
      .then(res => {
      }
      ).catch((error) => {
      })

    window.location.href = "/Mo_kyeonny/mypage/wishlist";
  }

  //전체삭제하기
  deleteAll = () => {
    let url = "http://54.180.183.72:8080/acorn/bookmark/delefeOfBookMarkAll?user_id=" + localStorage.getItem("user_id") + "&bookmarks=" + this.state.options
    axios.post(url)
      .then(res => {
      }
      ).catch((error) => {
      })
    window.location.href = "/Mo_kyeonny/mypage/wishlist";
  }


  GoToCakeview = (product_id) => {
    localStorage.setItem("product_id", product_id);
    window.location = "/Mo_kyeonny/cakeview";
  }


  changeCheckBox = (e) => {

    let itemName = e.target.name;
    let itemValue = e.target.value;
    let checked = e.target.checked;
    console.log(itemName)
    console.log(itemValue)
    console.log(checked)
    let index;
    const array = this.state.options;

    //값 저장하는 부분...
    if (itemName === "checkAll" && checked === true) {
      this.state.allBookMarkData.map((item, idx) => (
        array.push("" + item.product_id + "")
      ))
    }
    else if (itemName === "checkAll" && checked === false) {
      this.state.allBookMarkData.map((item, idx) => (
        array.splice(0, 999,)
      ))
    }
    else if (itemName !== "checkAll" && checked === true) {
      array.push(itemValue)
    }
    else if (itemName !== "checkAll" && checked === false) {
      console.log(itemValue)
      index = array.indexOf(itemValue)
      console.log(index)
      array.splice(index, 1,)
    }

    //중복제거
    const arraySet = Array.from(new Set(array));

    this.setState({
      options: arraySet
    })

    console.log(this.state.options)

    //체크박스 만드는 부분..
    this.setState(prevState => {
      let { allBookMarkData, allChecked } = prevState;

      if (itemName === "checkAll") {
        allChecked = checked;
        allBookMarkData = allBookMarkData.map(item => ({ ...item, isChecked: checked }));
      } else {
        allBookMarkData = allBookMarkData.map(item =>
          item.product_id === itemName
            ? { ...item, isChecked: checked }
            : item
        );
        allChecked = allBookMarkData.every(item => item.isChecked);
      }
      return { allBookMarkData, allChecked };
    });
  }


  renderList = () => {
    return this.state.allBookMarkData.map((item, idx) =>
      (
        <tr>
          <td>
            <div className="wishlist_no">
              <input type="checkbox" color="default" size="lg"
                value={item.product_id}
                inputProps={{ "aria-label": "checkbox with default color" }}
                onChange={this.changeCheckBox.bind(this)}
                name={item.product_id}
                checked={item.isChecked}/>
            </div>
          </td>
          <td className="wishlist_cont_left">
            <div className="pick_add_cont">
              <span className="pick_add_img" onClick={this.GoToCakeview.bind(this, item.product_id)} style={{cursor:'pointer'}}>
                <img src={"http://54.180.183.72:8080/acorn/image/productImage/" + item.product_img} alt="" />
              </span>
              <div className="pick_add_info">
                <em>{item.product_name}</em>
              </div>
            </div>
          </td>
          <td>
            <strong>
              ₩{numeral(item.product_price).format('0,0')}
            </strong>
            <div className="btn_option_list">
            </div>
          </td>
          <td>
            {item.product_category}
          </td>
          <td className="orderList_btn">
            <div className="btn_center_box">
              <Button size="small" variant="outline-info" onClick={this.GoToCakeview.bind(this, item.product_id)}
                className="cakeviewbtn">
                상품보기
              </Button>
            </div>
            <br />
            <div className="btn_center_box">
              <Button size="small" variant="outline-danger" onClick={this.deleteOnedata.bind(this, item.product_id)}
                className="orderdelete">
                삭제하기
              </Button>
            </div>
          </td>
        </tr>
      ))
  };

  render() {
    return (
      <div className="User_mypage_content">
        <UserInfo />
        <div className="SangpumList_Title">
          <h3>위시리스트</h3>
        </div>
        <div className="data_result_list">
          <div className="data_result_table">
            <table>
              <thead>
                <tr>
                  <th>
                    <div className="wishlist_no">

                      <Checkbox type="checkbox" color="default" size="small" inputProps={{ "aria-label": "checkbox with default color" }}
                        onChange={this.changeCheckBox.bind(this)} name="checkAll" checked={this.state.allChecked} />
                    </div>
                  </th>
                  <th>상품명
                                    </th>
                  <th>상품금액</th>
                  <th>카테고리</th>
                  <th>합계</th>
                </tr>
              </thead>

              <tbody>
                {
                  this.state.allBookMarkData.length === 0
                    ?
                    <NoDataTable />
                    :
                    this.renderList()
                }
              </tbody>
            </table>
            <div className="btn_wishlist_box">
              <Button onClick={this.deleteAll.bind(this)} size="md" variant="outline-secondary">
                선택 상품 삭제
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default wishList