import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core';

import '../styles/css/fontStyle.css';


const useStyles = makeStyles(theme => ({

  root: {
    display: "flex",
    alignItems: "center",
  },
  whole: {
    width: '100%'
  },
  title: {
    overflow: "hidden",
    width: "100%",
    textOverflow: 'ellipsis',
    // display: 'block',
    lineHeight: "16px",
    marginTop: '14px',
    marginBottom: '3px',
    paddingRight: '26px',
    color: '#222',
    fontSize: '15pt'
  },
  thumbnail: {
    //border: "1px solid darkgray",
    height: 200,
    width: 230,
    cursor:'pointer',
  },  
  price: {
    fontSize: '13px',
    color: '#222',
    lineHeight: '17px',
    verticalAlign: 'baseline'
  },
  number: {
    verticalAlign: 'baseline',
  },
  currency: {
    verticalAlign: 'baseline',
  },
  text: {
    overflow: "hidden",
    fontSize: '12pt',
    width: "100%",
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    lineHeight: "1.42em",
    maxHeight: '2.84em',
    marginTop: '10px',
    color: '#888',
  },
  area_estimation: {
    height: '14px',
    marginTop: '20px',
    fontSize: '0',
    lineHeight: '0'
  },
  count: {
    color: '#6b90dc',
    lineHeight: '13px',
    fontSize: '12px'
  },
  label: {
    margin: '0 4px 0 5px',
    color: '#8f8f8f',
    lineHeight: '13px',
    fontSize: '12px',
  },
  wholeDiv: {
    display: 'flex',
    justifyContent: 'space-around',
    marginLeft: '180px',
    width: '1500px'
  },
  cateTitle: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '20pt'
  },

}));

function WholeProductPage({ history }) {

  //새롭게 추가된 순 리스트
  const [newproduct, setNewproduct] = useState([]);
  //가격 높은 순 리스트
  const [productPriceUp, setProductPriceUp] = useState([]);
  //가격 낮은 순 리스트
  const [productPriceDown, setproductPriceDown] = useState([]);
  //판매량 높은 순 리스트
  const [productCount, setProductCount] = useState([]);
  //리뷰 많은 순 리스트
  const [countReview, setCountReview] = useState([]);

  useEffect(() => {
    //최신순 리스트 뽑아오기 
    const url_newproduct = "http://localhost:8080/acorn/product/newList";
    axios.get(url_newproduct)
      .then((res) => {
        setNewproduct(res.data);
      }).catch((error) => {
        console.log("error:" + error);
      });

    //가격 높은순 리스트 뽑아오기 
    const url_ProductPriceUp = "http://localhost:8080/acorn/product/priceUpList";
    axios.get(url_ProductPriceUp)
      .then((res) => {
        setProductPriceUp(res.data);
      }).catch((error) => {
        console.log("error:" + error);
      });

    //가격 낮은순 리스트 뽑아오기 
    const url_ProductPriceDown = "http://localhost:8080/acorn/product/priceDownList";
    axios.get(url_ProductPriceDown)
      .then((res) => {
        setproductPriceDown(res.data);
      }).catch((error) => {
        console.log("error:" + error);
      });

    //판매량 높은순 리스트 뽑아오기 
    const url_ProductCount = "http://localhost:8080/acorn/product/countList";
    axios.get(url_ProductCount)
      .then((res) => {
        setProductCount(res.data);
      }).catch((error) => {
        console.log("error:" + error);
      });

    //리뷰 많은순 리스트 뽑아오기 
    const url_ProductPriceCount = "http://localhost:8080/acorn/product/countReview";
    axios.get(url_ProductPriceCount)
      .then((res) => {
        setCountReview(res.data);
      }).catch((error) => {
        console.log("error:" + error);
      });
  }, [])
  const classes = useStyles();




  return (
    <div style={{ margin: '10px' }} className="wholeStyle">
      <br></br><br></br>
      <b className={classes.cateTitle}>최신 등록순</b>
      <br />
      <span style={{ marginLeft: '1580px', cursor : "pointer" }}
        onClick={() => {
          localStorage.setItem("moreItems", "newList");
          setTimeout(() => {
            history.push("/Mo_kyeonny/WholeProductMore")
          }, 100);
        }}>+ 전체보기</span>
      <br /><br />
      <div className={classes.wholeDiv} >
        {newproduct.slice(0, 5).map((item, idx) => (
          <div className={classes.imgDiv} style={{ width: '230px' }}>
            <div>
              <img src={"http://localhost:8080/acorn/image/productImage/" + item.product_img}
                className={classes.thumbnail} alt="" onClick={() => {
                  localStorage.setItem("product_id", item.product_id);
                  setTimeout(() => {
                    history.push("Mo_kyeonny/cakeview")
                  }, 100);
                }} /><br />
            </div>
            <strong className={classes.title} title={item.product_name}>{item.product_name}</strong><br />
            <strong className={classes.price}>
              <span className={classes.number}>{item.product_price.toLocaleString('en')}</span>
              <span className={classes.currency}>원</span></strong>
            <p className={classes.text}>{item.product_text}</p>
            <div className={classes.area_estimation}>
              <span className={classes.label} style={{ cursor: 'pointer' }}
                onClick={() => {
                  localStorage.setItem("product_id", item.product_id);
                  setTimeout(() => {
                    history.push("Mo_kyeonny/cakeview")
                  }, 100);
                }}
              >리뷰</span>
              <span className={classes.count}>{item.review_count}</span>
              <span className={classes.label}>평점</span>
              <span className={classes.count}>{item.review_avg_star}<span className={classes.slash}>
                /</span>5</span>
            </div>
          </div>
        ))}
      </div>

      <br></br>
      <hr style={{ width: '1500px' }}></hr>
      <br></br>


      <b className={classes.cateTitle}>높은 가격 순</b><br></br>
      <span style={{ marginLeft: '1580px', cursor : "pointer"}}
        onClick={() => {
          localStorage.setItem("moreItems", "priceUpList");
          setTimeout(() => {
            history.push("/Mo_kyeonny/WholeProductMore")
          }, 100);
        }}>+ 전체보기</span>
      <br /><br />
      <div className={classes.wholeDiv} >
        {productPriceUp.slice(0, 5).map((item, idx) => (
          <div className={classes.imgDiv} style={{ width: '230px' }}>
            <div>
              <img src={"http://localhost:8080/acorn/image/productImage/" + item.product_img} className={classes.thumbnail} alt="" onClick={() => {
                localStorage.setItem("product_id", item.product_id);
                setTimeout(() => {
                  history.push("Mo_kyeonny/cakeview")
                }, 100);
              }} /><br />
            </div>
            <strong className={classes.title} title={item.product_name}>{item.product_name}</strong><br />
            <strong className={classes.price}>
              <span className={classes.number}>{item.product_price.toLocaleString('en')}</span><span className={classes.currency}>원</span></strong>
            <p className={classes.text}>{item.product_text}</p>
            <div className={classes.area_estimation}>

              <span className={classes.label} style={{ cursor: 'pointer' }}
                onClick={() => {
                  localStorage.setItem("product_id", item.product_id);
                  setTimeout(() => {
                    history.push("Mo_kyeonny/cakeview")
                  }, 100);
                }}
              >리뷰</span>

              <span className={classes.count}>{item.review_count}</span>
              <span className={classes.label}>평점</span>
              <span className={classes.count}>{item.review_avg_star}<span className={classes.slash}>/</span>5</span>
            </div>
          </div>
        ))}
      </div>

      <br></br>
      <hr style={{ width: '1500px' }}></hr>
      <br></br>

      <b className={classes.cateTitle}>낮은 가격순</b><br></br>
      <span style={{ marginLeft: '1580px', cursor : "pointer"}}
        onClick={() => {
          localStorage.setItem("moreItems", "priceDownList");
          setTimeout(() => {
            history.push("/Mo_kyeonny/WholeProductMore")
          }, 100);
        }}>+ 전체보기</span>
      <br /><br />
      <div className={classes.wholeDiv} >
        {productPriceDown.slice(0, 5).map((item, idx) => (
          <div className={classes.imgDiv} style={{ width: '230px' }}>
            <div>
              <img src={"http://localhost:8080/acorn/image/productImage/" + item.product_img} className={classes.thumbnail} alt="" onClick={() => {
                localStorage.setItem("product_id", item.product_id);
                setTimeout(() => {
                  history.push("Mo_kyeonny/cakeview")
                }, 100);
              }} /><br />
            </div>
            <strong className={classes.title} title={item.product_name}>{item.product_name}</strong><br />
            <strong className={classes.price}>
              <span className={classes.number}>{item.product_price.toLocaleString('en')}</span><span className={classes.currency}>원</span></strong>
            <p className={classes.text}>{item.product_text}</p>
            <div className={classes.area_estimation}>
              <span className={classes.label} style={{ cursor: 'pointer' }}
                onClick={() => {
                  localStorage.setItem("product_id", item.product_id);
                  setTimeout(() => {
                    history.push("Mo_kyeonny/cakeview")
                  }, 100);
                }}
              >리뷰</span>
              <span className={classes.count}>{item.review_count}</span>
              <span className={classes.label}>평점</span>
              <span className={classes.count}>{item.review_avg_star}<span className={classes.slash}>/</span>5</span>
            </div>
          </div>
        ))}
      </div>

      <br></br>
      <hr style={{ width: '1500px' }}></hr>
      <br></br>
      <b className={classes.cateTitle}>판매량 높은 순</b><br></br>
      <span style={{ marginLeft: '1580px', cursor : "pointer"}}
        onClick={() => {
          localStorage.setItem("moreItems", "countList");
          setTimeout(() => {
            history.push("/Mo_kyeonny/WholeProductMore")
          }, 100);
        }}>+ 전체보기</span>
      <br /><br />
      <div className={classes.wholeDiv} >
        {productCount.slice(0, 5).map((item, idx) => (
          <div className={classes.imgDiv} style={{ width: '230px' }}>
            <div>
              <img src={"http://localhost:8080/acorn/image/productImage/" + item.product_img} className={classes.thumbnail} alt="" onClick={() => {
                localStorage.setItem("product_id", item.product_id);
                setTimeout(() => {
                  history.push("Mo_kyeonny/cakeview")
                }, 100);
              }} /><br />
            </div>
            <strong className={classes.title} title={item.product_name}>{item.product_name}</strong><br />
            <strong className={classes.price}>
              <span className={classes.number}>{item.product_price.toLocaleString('en')}</span><span className={classes.currency}>원</span></strong>
            <p className={classes.text}>{item.product_text}</p>
            <div className={classes.area_estimation}>
              <span className={classes.label} style={{ cursor: 'pointer' }}
                onClick={() => {
                  localStorage.setItem("product_id", item.product_id);
                  setTimeout(() => {
                    history.push("Mo_kyeonny/cakeview")
                  }, 100);
                }}
              >리뷰</span>
              <span className={classes.count}>{item.review_count}</span>
              <span className={classes.label}>평점</span>
              <span className={classes.count}>{item.review_avg_star}<span className={classes.slash}>/</span>5</span>
            </div>
          </div>
        ))}
      </div>

      <br></br>
      <hr style={{ width: '1500px' }}></hr>
      <br></br>

      <b className={classes.cateTitle}>리뷰 많은 순</b>

      <br></br>
      <span style={{ marginLeft: '1580px', cursor : "pointer"}}
        onClick={() => {
          localStorage.setItem("moreItems", "countReview");
          setTimeout(() => {
            history.push("/Mo_kyeonny/WholeProductMore")
          }, 100);
        }}>+ 전체보기</span>
      <br /><br />
      <div className={classes.wholeDiv} >
        {countReview.slice(0, 5).map((item, idx) => (
          <div className={classes.imgDiv} style={{ width: '230px' }}>
            <div>
              <img src={"http://localhost:8080/acorn/image/productImage/" + item.product_img} className={classes.thumbnail} alt="" onClick={() => {
                localStorage.setItem("product_id", item.product_id);
                setTimeout(() => {
                  history.push("Mo_kyeonny/cakeview")
                }, 100);
              }} /><br />
            </div>
            <strong className={classes.title} title={item.product_name}>{item.product_name}</strong><br />
            <strong className={classes.price}>
              <span className={classes.number}>{item.product_price.toLocaleString('en')}</span><span className={classes.currency}>원</span></strong>
            <p className={classes.text}>{item.product_text}</p>
            <div className={classes.area_estimation}>
              <span className={classes.label} style={{ cursor: 'pointer' }}
                onClick={() => {
                  localStorage.setItem("product_id", item.product_id);
                  setTimeout(() => {
                    history.push("Mo_kyeonny/cakeview")
                  }, 100);
                }}
              >리뷰</span>
              <span className={classes.count}>{item.review_count}</span>
              <span className={classes.label}>평점</span>
              <span className={classes.count}>{item.review_avg_star}<span className={classes.slash}>/</span>5</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default WholeProductPage;