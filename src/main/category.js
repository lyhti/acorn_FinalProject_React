import React, { Component } from 'react';
import axios from 'axios';

import '../main/container/main.css';

class category extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			loadingState: false,
			endingState: false,
			// end:7,
			categoryData:[],
			showItems: 12,
		};
	}
   
	//메인에서 클릭한 카테고리(빵, 앙금, 마카롱, 슈가)의 케이크 목록이 나옴
	componentWillMount(){
		const url = "http://54.180.183.72:8080/acorn/product/category?product_category="+localStorage.getItem("category");
		axios.get(url)
			.then((res)=>{
				this.setState({
					categoryData:res.data,
				});
			}).catch((error)=>{
			console.log("error:"+error);
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
               {this.state.categoryData.slice(0, this.state.showItems).map((item, idx) =>(
								
								<div className="cateCake" onClick={this.goTocakeview.bind(this,item.product_id)}>
									<div className="cakeList">
										<div>
											<img src={"http://54.180.183.72:8080/acorn/image/productImage/" + item.product_img} 
												className="thumbnail" alt=""/><br/>
										</div>
											<strong className="cateTitle"title={item.product_name}>{item.product_name}</strong><br/>
											<strong className="price">
												<span className="">{item.product_price.toLocaleString('en')}</span>
												<span className="currency">원</span></strong>
											<div className="cateText">   
												{item.product_text}</div>
											<span className="label">리뷰</span>
											<span className="count">{item.review_count}</span>
											<span className="label">평점</span>
											<span className="count">{item.review_avg_star}</span><span className="count">/</span><span className="count">5</span><br></br>
											<span className="star-rating">
												<span style={{width: (item.review_avg_star*20) +"%"   }}></span>
											</span>
									</div>
								</div>
               )
            )}
            </div>     
         </div>        
      );
    return items;
  }

   // 케이크 누르면 케이크 상세페이지로 감
   goTocakeview=(product_id)=>{
   localStorage.setItem("product_id",product_id);
   window.location.href="/Mo_kyeonny/cakeview";      
   }

render() {
   return (
      <div ref="iScroll" style={{height:"800px", overflow: "none" }}>
				
				{this.displayItems()}
				{/* {this.state.loadingState? <img src={loading} style={{width:'170px'}} alt=""/> :""} */}
				{this.state.endingState?"마지막 페이지입니다^^":""}
      </div>      
    );
  }
}

export default category