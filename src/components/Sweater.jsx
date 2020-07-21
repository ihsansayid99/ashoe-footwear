import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import NumberFormat from 'react-number-format'
import Title from './Title'
import Skeleton from 'react-loading-skeleton';
import { FaPercent } from "react-icons/fa";

export default class Mens extends Component {
    constructor(props) {
        super();
        this.state = {
            products: []
        }
    }
    componentDidMount() {
        Axios.get('https://ashoe-footwear.herokuapp.com/product/sweater-vneck')
            .then(res => {
                this.setState({
                    products: res.data
                })
            })
            .catch(err => {
                console.log('ERROR' + err);

            })
    }
    discount(product) {
        let discount = (product.price) - (product.discount / 100 * product.price)
        let rounded = Math.round(discount / 1000) * 1000;
        return rounded
    }
    render() {
        return (
            <>
                <Title title="Sweater" />
                <div className="container">
                    <div className="border-2 border-black text-black p-3 rounded font-sans w-full">
                        <ol className="list-reset flex text-grey-dark">
                            <li><Link to="/" className="text-blue font-bold">Home</Link></li>
                            <li><span className="mx-2">/</span></li>
                            <li>Sweater</li>
                        </ol>
                    </div>
                    <div className="my-10">
                        <div className="grid lg:grid-cols-5 grid-cols-2 gap-2">
                            {this.state.products.length === 0 && Array(5).fill().map((item, index) => (
                                <div className="text-center" key={index}>
                                    <Skeleton variant="rect" height={210} />
                                    <h5><Skeleton /></h5>
                                    <div className="my-2">
                                        <p className="font-medium"><Skeleton width="50%" /></p>
                                        <p className="font-bold"><Skeleton width="70%" /></p>
                                    </div>
                                </div>
                            ))}
                            {
                                this.state.products.map(product => {
                                    return (
                                        <div key={product._id} className="text-center hover:bg-gray-400">
                                            <Link to={"/sweater/detail/" + product.slug}>
                                                {
                                                    product.discount ?
                                                        <>
                                                            <FaPercent className="relative transform float-right z-10 bg-yellow-500 text-2xl " />
                                                            <img src={product.image} alt={product.name} className="transform -translate-y-6" />
                                                        </>
                                                        :
                                                        <img src={product.image} alt={product.name} className="transform -translate-y-2 mb-4" />

                                                }
                                                <h5 className="hover:text-orange-500">{product.name}</h5>
                                                {product.discount ?
                                                    <div className="my-2">
                                                        <strike>
                                                            <p className="font-medium text-xs text-red-800"><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></p>
                                                        </strike>
                                                        <p className="font-bold"><NumberFormat value={this.discount(product)} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></p>
                                                    </div>

                                                    :
                                                    <p className="font-bold my-2"><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></p>
                                                }
                                                <p className="text-xs">{product.color}</p>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
