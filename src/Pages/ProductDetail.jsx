import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Footer from '../components/Footer'



class ProductDetail extends Component {
    constructor(props) {
        super();
        this.state = {
            products: [],
            quantity: 1
        }
    }
    componentDidMount() {
        Axios.get("https://ashoe-footwear.herokuapp.com/product/" + this.props.match.params.id)
            .then(res => {
                this.setState({
                    products: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const LinkWhatsapp = {
            link: `https://api.whatsapp.com/send?phone=6281220871887&text=Halo%20Kak.%0ASaya%20berminat%20Untuk%20Membeli%20produk%20anda.%0A${this.state.products.name}%0A${this.state.products.price}%0Ainfo%20selanjutnya%20ka...`
        }
        return (
            <>
                <div className="container">
                    <div className="border-2 border-black text-black p-3 rounded font-sans w-full">
                        <ol className="list-reset flex text-grey-dark">
                            <li><Link to="/" className="text-blue font-bold">Home</Link></li>
                            <li><span className="mx-2">/</span></li>
                            <li><Link to="/mens/" className="text-blue font-bold">Mens</Link></li>
                            <li><span className="mx-2">/</span></li>
                            <li>{this.state.products.name}</li>
                        </ol>
                    </div>
                    <div className="my-8 grid lg:grid-cols-2 grid-cols-1 gap-2 lg:gap-5">
                        <div className="lg:max-w-xs w-64 mx-auto lg:mx-0 bg-blue-100">
                            <img src={this.state.products.image} alt={this.state.products.name} />
                        </div>
                        <div className="lg:w-full">
                            <h4 className="font-bold text-2xl">{this.state.products.name}</h4>
                            <p>{this.state.products.color}</p>
                            <p className="font-bold my-2"><NumberFormat value={this.state.products.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></p>
                            <a href={LinkWhatsapp.link}><button className="px-10 py-2 border-black border-2 bg-black text-white rounded mr-2 hover:text-orange-700 duration-150 ease-in">Buy</button></a>
                            <button onClick={() => { alert("Data telah disimpan") }} className="px-10 py-2 border-black border-2 rounded hover:bg-black hover:text-white transition duration-150 ease-in">Add To Cart</button>
                            <div className="my-8">
                                <h4>Share To:</h4>
                                <div className="flex text-4xl my-2">
                                    <a href="" className="hover:text-blue-800 mr-3"><FaFacebook /></a> <a href="" className="hover:text-blue-800 mr-3"><FaTwitter /></a> <a href="" className="hover:text-yellow-600 mr-3"><FaInstagram /></a> <a href="" className="hover:text-green-800 mr-3"><FaWhatsapp /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default ProductDetail;
