import React, { Component } from 'react';

class Thumbnail_category extends Component {

    // 카테고리 클릭 시 카테고리 이름 값을  state에 저장
    state={  category:this.props.category    } 

    render() {
    // 카테고리 클릭 시 카테고리 이름 값을  const에 저장
    const {category} = this.props;

        return (
            
            <div>
            {/* 카테고리 클릭시 카테고리 이름 값이 넘어 온것을 확인하며 state, const, props에 다 저장 완료  */}
                {category} 
                {this.state.category}
                {this.props.category}
           
              
            </div>
        );
    }
}

export default Thumbnail_category;