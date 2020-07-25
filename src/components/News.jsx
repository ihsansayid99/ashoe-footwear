import React, { Component } from 'react'
import Banner from '../assets/img/Bannerdisc.jpeg'

export default class News extends Component {
    render() {
        return (
            <>
                <div className="container mx-auto my-12">
                    <div className="text-center mb-6">
                        <h6 className="text-sm text-red-800">STAY IN THE KNOW</h6>
                        <h2 className="lg:text-4xl text-2xl font-medium">NEWS PROMO IN OUR WEBSITE</h2>
                    </div>
                    <div className="grid grid-cols-1">
                        <div className="mx-auto w-auto">
                            <a href="https://bit.ly/PROMOPSBB001">
                                <img src={Banner} alt="Banner Disc" />
                            </a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
