import React, { Component } from 'react'
import Slider from 'react-slick'
import Banner1 from '../assets/img/banner.jpg'
import Banner2 from '../assets/img/banner2.jpg'
import Banner3 from '../assets/img/banner3.jpg'
import Banner4 from '../assets/img/banner4.jpg'


export default class Hero extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 700,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 2500,
            cssEase: "linear"
        }
        return (
            <div className="mb-8">
                <Slider {...settings}>
                    <div className="w-full h-full">
                        <img src={Banner1} alt="Banner" />
                    </div>
                    <div className="w-full">
                        <img src={Banner3} alt="Banner" />
                    </div>
                    <div className="w-full">
                        <img src={Banner2} alt="Banner" />
                    </div>
                    <div className="w-full">
                        <img src={Banner4} alt="Banner" />
                    </div>
                </Slider>
            </div>
        )
    }
}
