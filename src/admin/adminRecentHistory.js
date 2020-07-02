import React, { Component } from 'react';
import '../user/mypage/container/main.css';
import AdminInfo from './adminInfo';
import AdminDefaultTable from './adminRecentHistoryTable';
import axios from 'axios';

class adminRecentHistory extends Component {
    constructor() {
        super();
        this.state =
        {
            recent_registration: [],
            noworder: [],
            user_name: ''
        }
    }

    componentWillMount() {


        // 최근 등록 상품
        let url_recent_registration = "http://54.180.183.72:8080/acorn/product/newList"
        axios.get(url_recent_registration)
            .then((ResponseData) => {
                this.setState({
                    recent_registration: ResponseData.data
                });
            }).catch((error) => {
            });

        // 제작 진행 중 상품
        let url_noworder = "http://54.180.183.72:8080/acorn/product/noworder?user_id=" + localStorage.getItem("user_id");
        axios.get(url_noworder)
            .then((ResponseData) => {
                this.setState({
                    noworder: ResponseData.data
                });
            }).catch((error) => {
            });
    }

    render() {
        return (
            <div className="User_mypage_content">
                <AdminInfo />
                <div className="user_mypage_latelyinfo">
                    <div className="latelyinfo_title">
                        <h3>
                            최근 등록 상품
                        </h3>
                    </div>
                    <div className="latelyinfo_cont">
                        <div className="item_gallery_type">
                            <ul>
                                {
                                    this.state.recent_registration.slice(0, 5).map((item, idx) =>
                                        (
                                            <AdminDefaultTable data={item} idx={idx} />
                                        ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="user_mypage_latelyinfo">
                        <div className="latelyinfo_title">
                            <h3>
                                제작 진행 중 상품
                            </h3>
                        </div>
                        <div className="latelyinfo_cont">
                            <div className="item_gallery_type">
                                <ul>
                                    {
                                        this.state.noworder.slice(0, 5).map((item, idx) =>
                                            (
                                                <AdminDefaultTable data={item} idx={idx} />
                                            ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default adminRecentHistory