import React, { Component } from 'react'


export default class News extends Component {
    render() {
        return (
            <>
                <div className="container mx-auto my-12">
                    <div className="text-center mb-6">
                        <h6 className="text-sm text-red-600">STAY IN THE KNOW</h6>
                        <h2 className="lg:text-4xl text-2xl font-medium">NEWS PROMO IN OUR WEBSITE</h2>
                    </div>
                    <div className="grid grid-cols-1">
                        <div className="mx-auto w-auto">
                            <img src="https://troya.tv/UnderConstruction.png" alt="" />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
