import React from "react";
import axios from 'axios';

import '../main/container/main.css';

class wholeProductMore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      moreItems: [],
      showItems: 12
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);

    localStorage.getItem("moreItems")

    let url_newproduct = "http://54.180.183.72:8080/acorn/product/" + localStorage.getItem("moreItems");
    axios.get(url_newproduct)
      .then((res) => {
        this.setState({
          moreItems: res.data
        });
      }).catch((error) => {
      });
  }


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
          {this.state.moreItems.slice(0, this.state.showItems).map((item, idx) => (
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
          <br />
          <strong className="cateTitle" style={{ fontSize: '20pt' }}>
            <span style={{ marginLeft: '480px' }}>
              {localStorage.getItem("moreItems") === "newList"
                ? "최신 순"
                : localStorage.getItem("moreItems") === "priceUpList"
                  ? "높은 가격 순"
                  : localStorage.getItem("moreItems") === "priceDownList"
                    ? "낮은 가격 순"
                    : localStorage.getItem("moreItems") === "countList"
                      ? "판매량 높은 순"
                      : localStorage.getItem("moreItems") === "countReview"
                        ? "리뷰 많은 순"
                        : ""
              }
            </span>
          </strong>
          {this.displayItems()}
        </span>
      </div>
    );
  }
}

export default wholeProductMore;