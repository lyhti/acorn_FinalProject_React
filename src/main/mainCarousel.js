import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'


import img1 from './images/mainbanner1.jpg';
import img2 from './images/mainbanner2.jpg';
import img3 from './images/mainbanner3.jpg';


class MainCarousel extends Component {
    render() {
        return (
            <div>
                {/* 숫자가 높아질수록 슬라이드가 느려진다 */}
                <Carousel interval={1000}>
                    <Carousel.Item>
                        <img src={img1} alt="First slide" style={{width:'100%', height:'750px'}} />
                                {/*  사진 아랫부분 설명  <Carousel.Caption>  <h3>First slide label5/h3> </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                        <img  src={img2} alt="Third slide" style={{width:'100%', height:'750px'}} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img  src={img3} alt="Third slide" style={{width:'100%', height:'750px'}} />
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default MainCarousel;