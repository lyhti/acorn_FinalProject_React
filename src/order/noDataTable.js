import React, {Component}  from 'react';
import '../user/mypage/container/main.css';


class noDataTable extends Component
{
    render()
    {
        return (
            <tr>
                <td colSpan = "5">
                    <p className = "no_data">조회내역이 없습니다.</p>
                </td>
            </tr>
        )
    }
}
 
export default noDataTable