import React, { Component } from 'react';
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";

import './cakeView.css';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

class reviewPage extends Component {

  state = {
    star1: false,
    star2: false,
    star3: false,
    star4: false,
    star5: false,
    star_point: "",
    file: "",
    imagePreviewUrl: "",
    filename: "",
    text: "",
    stand_img: false,
    alldata: []
  }




  componentWillMount() {
    let url = "http://localhost:8080/acorn/buy/reviewUser?product_id=" + localStorage.getItem("product_id");
    axios.post(url)
      .then((ResponseData) => {
        this.setState({
          alldata: ResponseData.data
        });
      }).catch((error) => {
      });
  }



  star1 = () => {
    this.setState({ star1: true, star2: false, star3: false, star4: false, star5: false, star_point: "1" })
  }
  star2 = () => {
    this.setState({ star1: true, star2: true, star3: false, star4: false, star5: false, star_point: "2" })
  }
  star3 = () => {
    this.setState({ star1: true, star2: true, star3: true, star4: false, star5: false, star_point: "3" })
  }
  star4 = () => {
    this.setState({ star1: true, star2: true, star3: true, star4: true, star5: false, star_point: "4" })
  }
  star5 = () => {
    this.setState({ star1: true, star2: true, star3: true, star4: true, star5: true, star_point: "5" })
  }

  ontextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  //사진 미리보기 및 업로드 하기
  handleImageChange = (e) => {

    this.setState({
      stand_img: true
    })

    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file);

    //파일얻기
    const uploadFile = e.target.files[0];

    //파일명 얻기
    const filename = e.target.files[0].name;
    this.setState({
      filename
    });

    //FormData
    const reviewFile = new FormData();
    reviewFile.append('uploadFile', uploadFile);

    axios({
      method: 'post',
      url: "http://localhost:8080/acorn/review/reviewFile?user_id=" + localStorage.getItem("user_id") + "&product_id=" + localStorage.getItem("product_id"),
      data: reviewFile,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((res) => {
    }).catch(err => {
    })

  }


  //리뷰 저장하기
  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.stand_img) {
    } else {
      this.setState({
        filename: "noimg"
      })
    }

    if (this.state.text === '') {
      alert("내용을 입력해주세요.")
    } else {
      if (this.state.star_point === '') {
        alert("별점을 입력해주세요.")
      } else {
        let url = "http://localhost:8080/acorn/reivew/add";
        axios.post(url,
          {
            user_id: localStorage.getItem("user_id"),
            product_id: localStorage.getItem("product_id"),
            review_img: this.state.filename,
            review_text: this.state.text,
            review_star: this.state.star_point
          }).then((res) => {
          }).catch((error) => { })
        window.location.href = "/Mo_kyeonny/cakeview";


      }
    }
  }


  render() {
    //사진 미리보기
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} style={{ borderRadius: '50px', width: '100px', height: '100px' }} alt="" />);
    } else {
      $imagePreview = (<div className="previewText">사진을<br />넣어주세요 </div>);
    }

    console.log(this.state.alldata)
    console.log(localStorage.getItem("user_id"))
    return (
      <>
        {/* 실제 구매한 user_id만 댓글을 쓸 수 있다 */}

{
          this.state.alldata.map((item,idx)=>(
              <span>
                {/* = 3개쓰면 작동 안됨. 2개만 써야 함. */}
               {item.user_id == localStorage.getItem("user_id")
               ? 
                  <form onSubmit={this.onSubmit}>
                    <table style={{marginTop:'100px'}} >
                      <tr style={{border:'1px solid lightgray' }}>
                      
                        <td style={{border:'1px solid lightgray',width:'100px', height:'70px'}}>
                        {$imagePreview}
                      </td>
                      <td style={{ border: '1px solid lightgray', width: '500px' }}>
                        <textarea className="cakeView_div1" style={{ resize: 'none', width: '100%', height: '70px', fontSize: '15pt', border: '0px' }} placeholder="내용을입력해주세요" name="text" onChange={this.ontextChange.bind(this)} />
                      </td>
                      <td rowSpan="2">
                        <Button variant="outline-primary" type="submit"  >
                          등록
                          </Button>
                      </td>
                    </tr>
                    <tr style={{ border: '1px solid lightgray' }} >
                      <td style={{ border: '1px solid lightgray', width: '100px', height: '70px' }}>
                        <div style={{ marginBottom: '20px', fontSize: '50pt', height: '50px' }}>

                          <input type="file" style={{ opacity: '0', width: '70px' }} onChange={(e) => this.handleImageChange(e)} />
                          <div style={{ marginLeft: '0px', marginTop: '-120px' }}>
                            <span role="img" aria-label="camara">&#128248;</span>
                          </div>
                        </div>

                      </td>
                      <td style={{ border: '1px solid lightgray', width: '500px' }}>
                        <span style={{ fontSize: '30pt' }} onClick={this.star1} >
                          {this.state.star1
                            ? <IoIosStar style={{ color: '#45adad' }} />
                            : <IoIosStarOutline style={{ color: '#45adad' }} />}
                        </span>
                        <span style={{ fontSize: '30pt' }} onClick={this.star2}>
                          {this.state.star2
                            ? <IoIosStar style={{ color: '#45adad' }} />
                            : <IoIosStarOutline style={{ color: '#45adad' }} />}
                        </span>
                        <span style={{ fontSize: '30pt' }} onClick={this.star3}>
                          {this.state.star3
                            ? <IoIosStar style={{ color: '#45adad' }} />
                            : <IoIosStarOutline style={{ color: '#45adad' }} />}
                        </span>
                        <span style={{ fontSize: '30pt' }} onClick={this.star4}>
                          {this.state.star4
                            ? <IoIosStar style={{ color: '#45adad' }} />
                            : <IoIosStarOutline style={{ color: '#45adad' }} />}
                        </span>
                        <span style={{ fontSize: '30pt' }} onClick={this.star5}>
                          {this.state.star5
                            ? <IoIosStar style={{ color: '#45adad' }} />
                            : <IoIosStarOutline style={{ color: '#45adad' }} />}
                        </span>
                      </td>
                    </tr>
                  </table>
                </form>
                :
                <div style={{ height: '10px' }}></div>
              }
            </span>

          ))
        }




      </>
    );
  }
}

export default reviewPage