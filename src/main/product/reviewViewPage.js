import React, { Component } from 'react';
import axios from 'axios';
import Review_star_1 from './review_star/review_star_1';
import Review_star_2 from './review_star/review_star_2';
import Review_star_3 from './review_star/review_star_3';
import Review_star_4 from './review_star/review_star_4';
import Review_star_5 from './review_star/review_star_5';
import Button from 'react-bootstrap/Button';
import './cakeView.css';

class reviewViewPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      reviewList: []
    }
  }

  componentWillMount() {
    let url = "http://localhost:8080/acorn/review/list?product_id=" + localStorage.getItem("product_id");
    axios.get(url)
      .then((ResponseData) => {
        this.setState({
          reviewList: ResponseData.data
        });
      }).catch((error) => {
      });

  }


  //삭제
  delete = (review_id) => {

    let url = "http://localhost:8080/acorn/review/delete?review_id=" + review_id;
    axios.post(url)
      .then((ResponseData) => {
      }).catch((error) => {
      });
    window.location.href = "/Mo_kyeonny/cakeview";
  }


  render() {
    return (
      <div>
        {this.state.reviewList.length === 0 ?
          <table className="reviewViewPage_table">
            <tr >
              <td className="reviewViewPage_tr6" colSpan="2">구매자 상품평</td>
            </tr>

            <br />
            <tr>
              <td className="reviewViewPage_Nottd"> 상품 리뷰가 없습니다.</td>
            </tr>
          </table>

          :


          <table className="reviewViewPage_table">
            <tr >
              <td className="reviewViewPage_tr6" colSpan="2">구매자 상품평</td>
            </tr>
            <tr className="reviewViewPage_tr1">
              <td className="reviewViewPage_tdTop"> </td>
              <td className="reviewViewPage_tdTop"> </td>
              <td className="reviewViewPage_tdTop"> </td>
              <td className="reviewViewPage_tdTop"> </td>
              <td className="reviewViewPage_tdTop"> </td>
              <td > </td>
            </tr>
            {
              this.state.reviewList.map((item, idx) => (
                <tr>
                  <td className="reviewViewPage_td1">
                    {item.user_name}
                  </td>
                  <td className="reviewViewPage_td2">
                    {item.review_text}
                  </td>
                  <td className="reviewViewPage_td3">
                    {item.review_star === "1" ? <Review_star_1 /> : ''}
                    {item.review_star === "2" ? <Review_star_2 /> : ''}
                    {item.review_star === "3" ? <Review_star_3 /> : ''}
                    {item.review_star === "4" ? <Review_star_4 /> : ''}
                    {item.review_star === "5" ? <Review_star_5 /> : ''}
                  </td>
                  <td className="reviewViewPage_td4">
                    <img src={"http://localhost:8080/acorn/image/reviewImage/" + item.review_img} alt=''
                      style={{ borderRadius: '20px', width: '100px', height: '100px' }} />
                  </td>
                  <td className="reviewViewPage_td1">
                    {item.review_date}
                  </td>
                  <td className="reviewViewPage_td5">
                    {item.user_id == localStorage.getItem("user_id")
                      ? <Button variant="outline-danger" onClick={this.delete.bind(this, item.review_id)}>삭제</Button>
                      : ''
                    }
                  </td>

                </tr>

              ))
            }

          </table>
        }
      </div>
    );
  }
}

export default reviewViewPage;