import React, {Component}  from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import Button from '@material-ui/core/Button';
import './container/main.css';
import UserInfo from './userInfo';
import WishListTable from './wishListTable';
import axios from 'axios';

class wishList extends Component
{
    constructor()
    {
        super();
        this.list = this.list.bind(this);
        this.deleteOnedata = this.deleteOnedata.bind(this);
        this.state =
        {
            allBookMarkData:[],
            options:[],
            options2:[],
            Tablecheckbox:0,
            allselect:"no"
            
        }
    }

componentWillMount(){
    this.list();
}

//데이타 가져오기
list=()=>{
   
    let url="http://localhost:8080/acorn/bookmark/selectOfBookMark?user_id="+localStorage.getItem("user_id");
    axios.post(url)
    .then((ResponseData)=>{
        this.setState({
            allBookMarkData:ResponseData.data
        });
    }).catch((error) =>{
    });
}

//북마크 삭제하기
deleteOnedata=(product_id)=>{
    let url="http://localhost:8080/acorn/bookmark/deleteOfBookMark?user_id="+localStorage.getItem("user_id")+"&product_id="+product_id;
    axios.delete(url) 
      .then(res=>{   
    }
    ).catch((error)=>{ 
    })

    this.list();
}

deleteAll=()=>{


    let url="http://localhost:8080/acorn/bookmark/delefeOfBookMarkAll?user_id="+localStorage.getItem("user_id")+"&bookmarks="+this.state.options
    axios.post(url) 
      .then(res=>{   
    }
    ).catch((error)=>{ 
    })

    this.list();
}


GoToCakeview=(product_id)=>{
    //mypage(왼쪽 카테고리) --> main(위 카테고리)의 cakeview로 이동해야함... 
    //경로 지정 시 cakeview?/:product 써야할듯?
    // 200625 영환 수정.
    localStorage.setItem("product_id", product_id);
    window.location = "/Mo_kyeonny/cakeview";
}

//자식에서 개별 체크박스 눌렀을 시
checkbox=(x,y)=>{
   
    const array = this.state.options
    let index
    //x는 id값 y는 체크박스 체크 true / false
    if(y){
        //체크박스가 true 되면 array에 id값 추가
        array.push(+x)
    } else { 
        //체크박스가 false 되면 array에 id값 삭제
        index = array.indexOf(x)
        array.splice(index,1,)
    }
    this.setState({
        options:array
    })
   console.log("현재 배열 저장 값 : " + this.state.options);
}

checkboxAll=(event)=>{

    if(this.state.Tablecheckbox===0)
    {
        this.setState({  Tablecheckbox:1  })
    } else {
        this.setState({  Tablecheckbox:0  })
    }
    

    const array2 =this.state.options2
    this.state.allBookMarkData.map((item, idx) =>(
        array2.push(+item.product_id)
    ))
    this.setState({
        options:array2
    })
    console.log("현재 배열 저장 값 : " + this.state.options);
}


    render()
    {
        return (
            <div className = "User_mypage_content">
                <UserInfo/>
                <div className = "SangpumList_Title">
                    <h3>위시리스트</h3> 
                </div>
                <div className = "data_result_list">
                <div className = "data_result_table">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <div className = "wishlist_no">
                                            {/* <Checkbox color="default" size = "small" 
                                             inputProps={{ "aria-label": "checkbox with default color" }}/> */}
                                             <input type="checkbox" style={{transform:'scale(2,2)'}}
                                                     onChange={this.checkboxAll.bind(this)} />
                                        </div>
                                    </th>
                                    <th>상품명</th>
                                    <th>상품금액</th>
                                    <th>카테고리</th>
                                    <th>합계</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.allBookMarkData.length===0
                                ? 
                                <span style={{fontSize:'15pt'}}>
                                    위시리스트에 저장 된 상품이 없습니다
                                </span>
                                :
                                this.state.allBookMarkData.map((item, idx) =>
                                    (
                                        <WishListTable data={item} idx={idx} deleteOnedata={this.deleteOnedata} 
                                         GoToCakeview={this.GoToCakeview}  checkbox={this.checkbox.bind(this)}
                                         Tablecheckbox={this.state.Tablecheckbox}         />
                                    ))
                                }

                            </tbody>
                        </table>
                        <div className = "btn_wishlist_box">
                            <Button size="large" variant="outlined" onClick={this.deleteAll.bind(this)}>
                                <em>선택 상품 삭제</em>
                            </Button>
                            {/* <Button size="large" variant="outlined">
                                <em>선택 상품 장바구니</em>
                            </Button> */}
                        </div>
                    </div>                    
                </div>
            </div>           
        )
    }
}
 
export default wishList