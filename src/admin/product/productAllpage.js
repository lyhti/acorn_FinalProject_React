import React, { Component } from 'react';
import '../../user/mypage/container/main.css';
import UserInfo from '../../user/mypage/userInfo';
import AdminInfo from '../adminInfo'
import ProductAllpageTable from './productAllpageTable'
import axios from 'axios';
import ProductNoDataTable from './productNoDataTable'

class productAllpage extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      product_total: [],
      user_id: localStorage.getItem("user_id")
    }
  }

  componentWillMount() {
    // 유저 아이디 세션에 저장되어 있다고 가정
    // sessionStorage.setItem("user_id","1");

    // 전체 상품 출력
    let url_allOfProduct = "http://54.180.183.72:8080/acorn/product/list"
    axios.get(url_allOfProduct)
      .then((ResponseData) => {
        this.setState({
          product_total: ResponseData.data
        });
      }).catch((error) => {
      });
  }

  // 운영자가 상품 삭제 함
  productDelete = (product_id) => {
    console.log(product_id);
    // 상품 삭제
    let url_product_delete = "http://54.180.183.72:8080/acorn/product/delete?product_id=" + product_id;
    axios.post(url_product_delete)
      .then((res) => {
        this.setState(
          {

          });
      }).catch((error) => {
      });
    window.location.reload();
  }

  render() {
    return (
      <div className="User_mypage_content">
        {this.state.user_id === "1" ? <AdminInfo /> : <UserInfo />}
        <div className="order_cart_title">
          <h3>전체 상품 정보</h3>
        </div>
        <div className="order_table_type">
          <table>
            <thead>
              <tr>
                <th>상품/옵션 정보</th>
                <th>상품금액</th>
                <th>종류</th>
                <th>내용</th>
                <th>합계금액</th>
                <th>상품수정</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.product_total.length === 0
                  ?
                  <ProductNoDataTable />
                  :
                  <>
                    {
                      this.state.product_total.map((item, idx) =>
                        (
                          <ProductAllpageTable data={item} idx={idx}
                            product_id={this.productDelete} />
                        ))
                    }
                  </>
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default productAllpage