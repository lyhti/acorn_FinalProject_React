import React from "react";
import axios from 'axios';

import NoData from './images/noData.gif';

import '../main/container/main.css';

class TestScroller extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: [],

      showItems: 12,
    };
  }

  //화면 들어오면 검색 결과 가져오기
  componentWillMount() {
    let url = "http://54.180.183.72:8080/acorn/product/searchProduct?search=" + localStorage.getItem("search");
    axios.get(url)
      .then((res) => {
        this.setState({
          search: res.data
        });
      }).catch((error) => {
        console.log("error:" + error);
      });
  }


  //스크롤이 마지막에 닿으면 loadMoreItems를 실행시킴
  componentDidMount() {
    window.addEventListener('scroll', this.infiniteScroll, true)
  }

  infiniteScroll = () => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight === scrollHeight) {
      this.setState({
        showItems: this.state.showItems + 12,
        loadingState: true
      })
    }
  }

  //화면에 뿌려줄 값
  displayItems() {
    var items = [];
    items.push(
      <div className="cateMain">
        <div className="cateListWrap">
          {this.state.search.slice(0, this.state.showItems).map((item, idx) => (
            <div className="cateCake" onClick={this.goTocakeview.bind(this, item.product_id)}>
              <div className="cakeList">
                <div>
                  <img src={"http://54.180.183.72:8080/acorn/image/productImage/" + item.product_img}
                    className="thumbnail" alt="" /><br />
                </div>
                <strong className="cateTitle" title={item.product_name}>{item.product_name}</strong><br />
                <strong className="">
                  <span className="cateMoney">{item.product_price.toLocaleString('en')}</span>
                  <span className="">원</span></strong>
                <p className="cateText">{item.product_text}</p>
                <span className="label">리뷰</span>
                <span className="count">{item.review_count}</span>
                <span className="label">평점</span>
                <span className="count">{item.review_avg_star}</span><span className="count">/</span><span className="count">5</span>

                <span className="star-rating">
                  <span style={{ width: (item.review_avg_star * 20) + "%" }}></span>
                </span>
              </div>
              <hr />
            </div>
          )
          )}
        </div>
      </div>
    );
    return items;
  }

  goTocakeview = (product_id) => {
    localStorage.setItem("product_id", product_id);
    window.location.href = "/Mo_kyeonny/cakeview";
  }

  render() {
    return (
      <div ref="iScroll" style={{ height: "800px", overflow: "none" }}>
        <span>

          {this.state.search.length === 0
            ? <img src={NoData} style={{ width: '600px', marginTop: '200px', marginLeft: '700px' }} alt="" />
            : this.displayItems()
          }
        </span>


        {this.state.endingState ? "마지막 페이지입니다^^" : ""}
      </div>
    );
  }
}

export default TestScroller;