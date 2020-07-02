import React from 'react';
import img1 from "./cake1.jpg";
import "./Option_Change_Detail.css"



const Option_Change_Detail = ({ toggleModal, closeModal}) =>{
 
        return (
            <aside id="modal" className="ModalWrapper"  onClick={e=>closeModal(e)}>
                <div className="ModalInner">
                  <div className='Box1' style={{textAlign:"left"}}>
                    <h4> 옵션 선택</h4>
                    <span className="close" onClick={e=>closeModal(e)}>x</span>
                  </div>
                   
                    <div className="option_layer_scroll">
                      <div className="option_tit_box">
                        <dl >
                          <dt  style={{textAlign:"left", width:"70px", float:'left'}} >
                          <img className='opction_img1' src={img1} alt='' style={{width:'70px', height:'100px'}}/>  
                          </dt>
                          <dd className="option_tit_dd" >
                             <strong>돈다발 케이크</strong>
                          </dd>
                        </dl>
                        <div>
                          <dl>
                            <dt style={{marginLeft:'50px', fontSize:'12px'}}>
                              초 선택
                            </dt>
                            <dd>
                              <select>
                                <option> 일반초</option>
                                <option> Happy Birth Day!</option>
                                <option> Happy New Year!</option>
                              </select>
                            </dd>
                          </dl>
                          <dl>
                            <dt style={{paddingTop:'0px',marginLeft:'40px', fontSize:'12px'}}>
                              문구 선택
                            </dt>
                            <dd>
                              <select>
                                <option> 기본문구</option>
                                <option> Happy Birth Day!</option>
                                <option> Happy New Year!</option>
                              </select>
                            </dd>
                          </dl>
                        </div> 
                        
                      </div>
                      <br/>
                    <div style={{ height:'50px',backgroundColor:'#dadada'}}>
                        <div style={{float:'left', marginLeft:'30px', marginTop:'15px'}}>변경된 옵션 들어갈곳</div>
                        <div style={{float:'right', marginRight:'30px', marginTop:'15px'}}>30000 원</div>
                    </div>  
                    </div>
                    <button onClick={e => closeModal(e)}>취소</button><button>확인</button>
                </div>

            </aside>
        ) 
};
export default Option_Change_Detail