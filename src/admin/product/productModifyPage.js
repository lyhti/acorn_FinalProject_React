import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import '../container/css/modifyPage.css';


class productModifyPage extends Component {
  constructor(props) {
    super();
    this.state =
    {
      product: [],
      product_category: [],
      product_id: "",
      product_name: "",
      product_price: "",
      product_text: "",
      product_img: "",
      uploadFile: [],
      product_category_select: ["빵 케이크", "앙금 케이크", "마카롱 케이크", "슈가 케이크"],

    }
  }

  componentWillMount()
  {
    console.log(localStorage.getItem("product_id"))
    // product_id 로 선택 된 상품 정보 페이지 시작하자마자 불러옴.
    let url_product = "http://54.180.183.72:8080/acorn/product/getData?product_id=" + localStorage.getItem("product_id");
    axios.get(url_product)
      .then((res) => {
        this.setState({
          product: res.data,
          product_category: res.data.product_category,
          product_name: res.data.product_name,
          product_price: res.data.product_price,
          product_id: localStorage.getItem("product_id"),
          product_text: res.data.product_text,
          product_img: res.data.product_img
        });
      }).catch((error) => {
      });
  }


  // 케이크 종류 선택 이벤트
  onChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    );
  }


  // 이미지 선택 이벤트
  onImageChange = (e) => {
    console.log(e.target.files[0].name);
    this.setState(
      {
        uploadFile: e.target.files[0],
        product_img: e.target.files[0].name
      }
    )
  }


  // 수정 버튼 클릭 이벤트
  productUpdate = (e) => {
    //FormData
    const uploadFile = new FormData();
    uploadFile.append('uploadFile', this.state.uploadFile);
    console.log(this.state.uploadFile)
    console.log(this.state.uploadFile.length)
    console.log(this.state.product_img)
    console.log(this.state.product_id)

    e.preventDefault();
    //product_id 로 선택 된 상품 정보 페이지 시작하자마자 불러옴.
    if (this.state.uploadFile.length === 0)
    {
      console.log("사진 선택안함")
      axios(
        {
          method: 'post',
          url: "http://54.180.183.72:8080/acorn/product/update",
          data:
          {
            product_id: this.state.product_id,
            product_name: this.state.product_name,
            product_text: this.state.product_text,
            product_price: this.state.product_price,
            product_category: this.state.product_category
          }
        }
      ).then((res) => { }
      ).catch(err => { })
    }

    else
    {
      console.log("사진 선택함")
      axios(
        {
          method: 'post',
          url: "http://54.180.183.72:8080/acorn/product/productFile",
          data: uploadFile,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then((res) =>
        {
          console.log("성공")
          let url_product = "http://54.180.183.72:8080/acorn/product/update"
          axios.post(url_product, 
            {
              product_id: this.state.product_id,
              product_name: this.state.product_name,
              product_text: this.state.product_text,
              product_price: this.state.product_price,
              product_img: this.state.product_img,
              product_category: this.state.product_category
            })
            .then((res) =>
            {
              console.log("성공")
            })
            .catch((error) =>
            {
              console.log("실패")
            });
        }).catch(err => {})
    }
    setTimeout(() =>
    {
      window.location = "/Mo_kyeonny/cakeview";
    }, 3000)
    
  }


  render() {
    const url = "http://54.180.183.72:8080/acorn/image/productImage/";
    return (
      <div className="User_mypage_content">
        <div noValidate autoComplete="off">
          <div className="hr-sect">상품수정페이지</div>
          <div className="mypageContent">
            <div>
              <TextField label="상품명" name="product_name" value={this.state.product_name}
                onChange={this.onChange} />
            </div>
            <br></br>
            <div>
              <input type="file" name="product_img" accept="image/*"
                onChange={this.onImageChange} /><span>{this.state.product_img}</span>
            </div>
            <div>
              <img src={url + this.state.product_img} alt="" />
            </div>
            <br></br>
            <div>
              <TextField
                select
                label="케이크 종류"
                variant="outlined"
                id="product_category"
                name="product_category"
                size="small"
                value={this.state.product_category}
                style={{ width: 300 }}
                onChange={this.onChange}
              >
                {this.state.product_category_select.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <br></br>
            <div>
              <TextField
                label="가격"
                id="product_price"
                name="product_price"
                value={this.state.product_price}
                onChange={this.onChange}
              />
            </div>
            <br />
            <div>
              <TextField
                id="product_text"
                name="product_text"
                label="상세설명"
                multiline
                rows={10}
                variant="outlined"
                value={this.state.product_text}
                onChange={this.onChange}
              />
            </div>
            <div style={{ marginLeft: '35px' }}>
              <Button style={{width:"100px"}} className="productModify_button1" variant="outline-primary" size="small" onClick={this.productUpdate}
                value={this.state.product_id}>
                상품 수정
                </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default productModifyPage