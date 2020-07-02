import React , {useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

function ProductModifyPage(){

  const url = "http://localhost:8080/acorn/image/productImage/";
  const classes = useStyles();

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
      value: "숫자 케이크", label: "숫자 케이크"
    }
  ];

  const [cakeName, setCakeName] = useState('');
  const [cakePrice, setCakePrice] = useState('');
  const [cakeText, setCakeText] = useState('');
  const [kind, setKind] = useState(1);
  const [cakeImg, setCakeImg] = useState(''); //이미지 이름만
  const [cakeImgSrc, setCakeImgSrc] = useState(''); //경로 + 이미지 이름
  const [newCakeImgSrc, setNewCakeImgSrc] = useState(''); //새로 수정할 이미지 경로저장
  
  //product_id가 97인 상품의 정보를 요청함-- 성공 시 useState에 받아온 값들 넣어준다
  const getDataUrl = "http://localhost:8080/acorn/product/getData";
  axios.get(getDataUrl, {
    params: {
      product_id: 97
    }
  })
    .then((res)=> {
      setCakeName(res.data.product_name);
      setCakePrice(res.data.product_price);
      setCakeText(res.data.product_text);
      setCakeImgSrc(url+res.data.product_img);
      setCakeImg(res.data.product_img);
      setKind(res.data.product_category);
    })
    .catch((error) => {
      console.log(error);
    });

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

  // console.log("cakeImg : " + cakeImg);
  // console.log("cakeImgSrc : " + cakeImgSrc);
  // console.log("newCakeImgSrc : " + newCakeImgSrc);

  //이미지 업로드 이벤트
  const onImageChange = (e) => {
    const uploadFile = e.target.files[0];
    console.log(uploadFile);
    if (uploadFile) {
      setCakeImg(uploadFile);

      if (FileReader) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setNewCakeImgSrc(fileReader.result);
        }
        fileReader.readAsDataURL(uploadFile);
      }
    }
  }

   //수정값 입력 후 수정버튼 눌렀을때 함수호출
   const onSubmit = (e) => {
    e.preventDefault();
    const imgUploadUrl = "http://localhost:8080/acorn/product/productFile";
    const productUpdateUrl = "http://localhost:8080/acorn/product/update";

    const formData = new FormData();
    formData.append('uploadFile', newCakeImgSrc);

    axios(imgUploadUrl, {
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {
        return axios(productUpdateUrl, {
          method: 'post',
          data: {
            product_id: 82,
            product_name: cakeName,
            product_text: cakeText,
            product_price: cakePrice,
            product_img: newCakeImgSrc,
            product_category: kind
          }
        })
      })
        .then((res) => {
          console.log('success');
        })
        .catch((error) => {
          throw error;
        });
  }
  
  return (
    <div className = "User_mypage_content">
      {/* {init} */}
    <form onSubmit={onSubmit}>
    <div className={classes.root} noValidate autoComplete="off">
         <label>상품수정페이지</label>
      <div>
        <TextField 
          id="product_name" 
          name="product_name"
          label="상품명"
          //defaultValue={cakeName}
          value={cakeName}
          onChange={nameChangeHandler}
        />
      </div>
      <br></br>
      <div>
          <input type="file" name="product_img" onChange={onImageChange} accept="image/*" ></input>
          <img style={{ width: '200px', marginTop: '16px' }} src={newCakeImgSrc} alt=""></img>
          {/* {
            (cakeImgSrc === newCakeImgSrc) ? <img style={{ width: '200px', marginTop: '16px' }} src={cakeImgSrc} alt=""/> :
            <img style={{ width: '200px', marginTop: '16px' }} src={newCakeImgSrc} alt=""/>
          } */}
        </div>
        <div>
          {/* {
            cakeImgSrc && (<img style={{ width: '200px', marginTop: '16px' }} src={cakeImgSrc} alt="아무거나" />)
          } */}
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
          value={kind}
          onChange={optionChangeHandler}
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
          // value={cakePrice}
          onChange={priceChangeHandler}
        />
        </div>
      <div>
        <TextField
          id="product_text"
          name="product_text"
          label="상세설명"
          multiline
          rows={10}
          variant="outlined"
          // value={cakeText}
          onChange={textChangeHandler}
        />
      </div>
      <div style={{marginLeft:'35px'}}>
        <Button type="submit" variant="outlined" color="primary">
          상품 수정
        </Button>
        <Button variant="outlined" color="secondary">
          취소
        </Button>
      </div>
      </div>
      </form>
    </div>
  );
}

export default ProductModifyPage;