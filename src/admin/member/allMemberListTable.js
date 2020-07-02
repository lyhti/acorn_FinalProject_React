import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class allMemberListTable extends Component {
  //삭제 이벤트
  onRemove = () => {

    const { row, onDelete } = this.props;
    onDelete(row.user_id);//props 의 ondelete 이벤트 호출

  }

  render() {
    return (
      <tr >
        <td style={{ textAlign: 'center', width: '80px' }} >
          {this.props.row.user_name}
        </td>
        <td style={{ textAlign: 'left', width: '250px' }}>
          {this.props.row.user_email}
        </td>
        <td style={{ textAlign: 'center', width: '80px' }}>
          {this.props.row.user_hp}
        </td>
        <td style={{ textAlign: 'center', width: '100px' }}>
          {this.props.row.user_sign_date}
        </td>
        <td>
          {this.props.row.buy_count}
        </td>
        <td style={{ textAlign: 'center', width: '80px' }}>
          <Button type="button"
            className="btn btn-sm btn-info"
            onClick={this.onRemove.bind(this)}>회원탈퇴</Button>
        </td>
      </tr>
    )
  }
}

export default allMemberListTable