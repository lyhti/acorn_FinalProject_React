import React, { useState } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import Button from '@material-ui/core/Button';
import axios from 'axios';


import '../container/css/offerPage.css';

const kindOfCake = [
  {
    value: "빵 케이크", label: "빵 케이크"
  },
  {
    value: "앙금 케이크", label: "앙금 케이크"
  },
  {
    value: "마카롱 케이크", label: "마카롱 케이크"
  },
  {
    value: "슈가 케이크", label: "슈가 케이크"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",


    }
  },
}));

function ProductOfferPage({ history }, props) {
  const classes = useStyles();

  //이벤트
  const [cakeName, setCakeName] = useState("");
  const [cakePrice, setCakePrice] = useState();
  const [cakeText, setCakeText] = useState("");
  const [kind, setKind] = useState(1);
  const [cakeImgSrc, setCakeImgSrc] = useState('');
  const [cakeImg, setCakeImg] = useState(null);

  const nameChangeHandler = (e) => {
    setCakeName(e.target.value);
  }
  const optionChangeHandler = (e) => {
    setKind(e.target.value);
  }
  const priceChangeHandler = (e) => {
    setCakePrice(e.target.value);
  }
  const textChangeHandler = (e) => {
    setCakeText(e.target.value);
  }

  //이미지 업로드 이벤트
  const onImageChange = (e) => {
    const uploadFile = e.target.files[0];
    if (uploadFile) {
      setCakeImg(uploadFile);

      if (FileReader) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setCakeImgSrc(fileReader.result);
        }
        fileReader.readAsDataURL(uploadFile);
      }
    }
  }

  //onSubmit 함수
  const onSubmit = (e) => {
    e.preventDefault();
    const imgUploadUrl = "http://54.180.183.72:8080/acorn/product/productFile";
    const productAddUrl = "http://54.180.183.72:8080/acorn/product/add";

    const formData = new FormData();
    formData.append('uploadFile', cakeImg);

    axios(imgUploadUrl, {
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {

        return axios(productAddUrl, {
          method: 'post',
          data: {
            product_name: cakeName,
            product_img: res.data,
            product_text: cakeText,
            product_price: cakePrice,
            product_category: kind
          }
        })
      })
      .then((res) => {
        console.log('success');
        history.push("/Mo_kyeonny/adminpage");
      })
      .catch((error) => {
        alert('상품 저장 중 에러 발생');
        throw error;
      });
  }

  return (
    <div className="User_mypage_content">
      <form onSubmit={onSubmit}>
        <div className={classes.root} noValidate autoComplete="off">
          <div className="hr-sect">상품등록페이지</div>
          <div className="mypageContent">
            <div>
              <TextField
                label="상품명"
                name="product_name"
                tabIndex="product_name"
                value={cakeName}
                onChange={nameChangeHandler}
              />
            </div>
            <br></br>
            <div>
              <input type="file" name="product_img" onChange={onImageChange} accept="image/*" ></input>
            </div>
            <div>
              {
                cakeImgSrc && (<img style={{ width: '200px', marginTop: '16px' }} src={cakeImgSrc} alt="아무거나" />)
              }
            </div>
            <br></br>
            <div>
              <TextField
                select
                label="케이크 종류"
                id="product_category"
                name="product_category"
                value={kind}
                onChange={optionChangeHandler}
                variant="outlined"
                size="small"
              >
                {kindOfCake.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                label="가격"
                id="product_price"
                name="product_price"
                value={cakePrice}
                onChange={priceChangeHandler}
              />
            </div>
            <div>
              <TextField
                label="상세설명"
                multiline
                rows={10}
                id="product_text"
                name="product_text"
                value={cakeText}
                onChange={textChangeHandler}
                variant="outlined"
              />
            </div>
            <div style={{ marginLeft: '35px' }}>
              <Button type="submit" variant="outlined" color="primary">
                상품 등록
                </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}


export default ProductOfferPage;