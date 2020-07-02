import React, { Component } from 'react'
import Article1 from '../assets/img/article1.jpg'
import Article2 from '../assets/img/article2.jpg'
import Article3 from '../assets/img/article3.jpg'
import Article4 from '../assets/img/article4.jpg'

export default class News extends Component {
    render() {
        return (
            <>
                <div className="container mx-auto my-12">
                    <div className="text-center mb-6">
                        <h6 className="text-sm text-red-600">STAY IN THE KNOW</h6>
                        <h2 className="lg:text-4xl text-2xl font-medium">LATEST ASHOE NEWS</h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                        <div className="w-auto">
                            <img src={Article1} alt="" />
                            <h5 className="my-2 text-lg font-medium ml-2">SKATE TEST: BONES BIG BALLS BEARINGS</h5>
                            <p className="my-2 text-sm ml-2">Bones Bearings are without question one of the most popular skateboard bearings. Compared to the conventional REDS bearings from Bones...</p>
                        </div>
                        <div className="w-auto">
                            <img src={Article2} alt="" />
                            <h5 className="my-2 text-lg font-medium ml-2">SKATE TEST: AHMAD FATHIN BEARINGS</h5>
                            <p className="my-2 text-sm ml-2">Bones Bearings are without question one of the most popular skateboard bearings. Compared to the conventional REDS bearings from Bones...</p>
                        </div>
                        <div className="w-auto">
                            <img src={Article3} alt="" />
                            <h5 className="my-2 text-lg font-medium ml-2">POCKET MAG VOL.4 - MAG & UAE CLIP OUT NOW</h5>
                            <p className="my-2 text-sm ml-2">At the beginning of the year, Pocket Mag exchanged bad weather for sunshine, marble ledges and seagulls. Together with skatedeluxe team rider Ike Fromme and others,...</p>
                        </div>
                        <div className="w-auto">
                            <img src={Article4} alt="" />
                            <h5 className="my-2 text-lg font-medium ml-2">NIKESB SHANE TEST</h5>
                            <p className="my-2 text-sm ml-2">It is probably no exaggeration to say that Shane O’Neill is one of the best pro skaters out there. With some unforgettable video clips and a hard work ethic, he has earned his first pro shoe, the Nike SB Shane...</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
