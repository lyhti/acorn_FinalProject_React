import React, {Component}  from 'react';
import '../CSS/Main.css';
import Myinfo from './Myinfo';

class Delivery_Layer extends Component
{
    render()
    {
        return (
            <div className = "User_mypage_content">
                <Myinfo/>
                <div className = "delivery_layer">
                    <div className = "delivery_layer_title">
                        <h3>배송지 관리</h3>
                        <span>배송지 관리 내역 총
                            <strong>0</strong>건
                        </span>
                    </div>
                    <div className = "delivery_content">
                        <div className = "delivery_table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>배송지이름</th>
                                        <th>받으실 분</th>
                                        <th>주소</th>
                                        <th>연락처</th>
                                        <th>수정/삭제</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan = "5">
                                            <p className = "no_data">조회내역이 없습니다.</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button type = "button" className = "btn_add_delivery">
                            + 새 배송지 추가
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
 
export default Delivery_Layer