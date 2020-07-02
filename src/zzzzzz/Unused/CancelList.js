import React, {Component}  from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import '../CSS/Main.css';
import Myinfo from './Myinfo';

class CancelList extends Component
{
    render()
    {
        return (
            <div className = "User_mypage_content">
                <Myinfo/>
                <div className = "SangpumList_Title">
                    <h3>취소/반품/교환 내역</h3>
                </div>
                <div className = "data_check_box">
                    <form name = "frmDateSearch" method = "get">
                        <h3>취소/반품/교환 조회</h3>
                        <div className = "data_check_list">
                        <ButtonGroup size="large" aria-label="large outlined button group">
                            <Button>오늘</Button>
                            <Button>7일</Button>
                            <Button>15일</Button>
                            <Button>1개월</Button>
                            <Button>3개월</Button>
                            <Button>1년</Button>
                        </ButtonGroup>
                            {/* <button type = "button" data-value = "0">오늘</button>
                            <button type = "button" data-value = "7">7일</button>
                            <button type = "button" data-value = "15">15일</button>
                            <button type = "button" data-value = "30">1개월</button>
                            <button type = "button" data-value = "90">3개월</button>
                            <button type = "button" data-value = "365">1년</button> */}
                        </div>
                        <div className = "data_check_calendar">
                            <TextField type = "date" label="시작일"
                                InputLabelProps = {{shrink: true}}/>
                            &emsp;∼&emsp;
                            <TextField type = "date" label="종료일"
                                InputLabelProps = {{shrink: true}}/>
                        </div>
                        {/* <div className = "data_check_calendar">
                            <input type = "date" value = "2020-06-03"/>
                            ~
                            <input type = "date" value = "2020-06-10"/>
                        </div> */}
                        <Button type = "submit" size="large" variant="contained">조회</Button>
                    </form>
                </div>
                <div className = "data_result_list">
                    <div className = "list_title_tab">
                        <ul>
                            <li className = "on">
                                <div>
                                    <span>취소/반품/교환 신청 내역</span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <span>취소/반품/교환 처리 현황</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className = "list_title">
                        취소/반품/교환 내역 총
                        <span>0</span>건
                    </div>
                    <div className = "data_result_table">
                        <table>
                            <thead>
                                <tr>
                                    <th>날짜/주문번호</th>
                                    <th>상품명/옵션</th>
                                    <th>상품금액/수량</th>
                                    <th>주문상태</th>
                                    <th>확인/리뷰</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan = "6">
                                        <p className = "no_data">조회내역이 없습니다.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
           
        )
    }
}
 
export default CancelList