import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import NumberFormat from 'react-number-format'
import Title from './Title'

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
                            {this.state.products.length === 0 && <h1 className="text-center text-4xl">Loading...</h1>}
                            {
                                this.state.products.map(product => {
                                    return (
                                        <div key={product._id} className="text-center hover:bg-gray-400">
                                            <Link to={"/sweater/detail/" + product._id}>
                                                <img src={product.image} alt={product.name} />
                                                <h5 className="hover:text-orange-500">{product.name}</h5>
                                                {product.discount ?
                                                    <div className="my-2">
                                                        <strike>
                                                            <p className="font-medium text-xs text-red-800"><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></p>
                                                        </strike>
                                                        <p className="font-bold"><NumberFormat value={(product.price) - (product.discount / 100 * product.price)} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></p>
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
