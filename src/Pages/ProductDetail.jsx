import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { addToCart } from '../actions/cartActions'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Footer from '../components/Footer'
import Title from '../components/Title';
import reactGa from 'react-ga';
import Skeleton from 'react-loading-skeleton'


class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            quantity: 0,
            disc: ""
        }
    }
    componentDidMount() {
        Axios.get("https://ashoe-footwear.herokuapp.com/product/" + this.props.match.params.slug)
            .then(res => {
                this.setState({
                    products: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
        reactGa.initialize('UA-171589455-1')
        reactGa.pageview(window.location.pathname + window.location.search)
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const disc = (this.state.products.price) - (this.state.products.discount / 100 * this.state.products.price);
        const LinkWhatsapp = {
            link: `https://api.whatsapp.com/send?phone=6282129268807&text=Halo%20Kak.%0ASaya%20berminat%20Untuk%20Membeli%20produk%20anda.%0A${this.state.products.name}%0A${this.state.products.discount ? disc : this.state.products.price}%0Ainfo%20selanjutnya%20ka...`
        }
        return (
            <>
                <Title title={this.state.products.name} />
                <div className="container">
                    <div className="border-2 border-black text-black p-3 rounded font-sans w-full">
                        <ol className="list-reset flex text-grey-dark text-sm md:text-base">
                            <li><Link to="/" className="text-blue font-bold">Home</Link></li>
                            <li><span className="mx-2">/</span></li>
                            <li><Link to={`/${this.state.products.type}/`} className="font-bold">{this.state.products.type}</Link></li>
                            <li><span className="mx-2">/</span></li>
                            <li>{this.state.products.name}</li>
                        </ol>
                    </div>
                    {
                        this.state.products.length === 0 ?
                            Array(1).fill().map((item, index) => (
                                <div className="my-8 grid lg:grid-cols-2 grid-cols-1 gap-2 lg:gap-5" key={index}>
                                    <div className="lg:max-w-sm mx-auto w-full lg:mx-0">
                                        <Skeleton variant="rect" height={210} />
                                    </div>
                                    <div className="lg:w-full">
                                        <h1 className="text-2xl"><Skeleton width="70%" /></h1>
                                        <h5 className="font-bold"><Skeleton width="20%" /></h5>
                                        <h1 className="text-3xl"><Skeleton width="40%" /></h1>
                                        <Skeleton variant="rect" height={40} width="30%" className="mr-3" />
                                        <Skeleton variant="rect" height={40} width="40%" />
                                    </div>
                                </div>
                            ))
                            :
                            <div className="my-8 grid lg:grid-cols-2 grid-cols-1 gap-2 lg:gap-5">
                                <div className="lg:max-w-sm mx-auto w-full lg:mx-0">
                                    <img src={this.state.products.image} alt={this.state.products.name} />
                                </div>
                                <div className="lg:w-full">
                                    <h4 className="font-bold text-2xl">{this.state.products.name}</h4>
                                    <p>{this.state.products.color}</p>
                                    {
                                        this.state.products.discount ?
                                            <div className="my-2">
                                                <strike>
                                                    <p className="font-medium text-xs text-red-800"><NumberFormat value={this.state.products.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></p>
                                                </strike>
                                                <p className="font-bold text-2xl"><NumberFormat value={disc} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></p>
                                            </div>

                                            :
                                            <p className="font-bold text-2xl my-2"><NumberFormat value={this.state.products.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></p>
                                    }

                                    {isAuthenticated ?
                                        <a href={LinkWhatsapp.link}>
                                            <button className="px-10 py-2 border-black border-2 bg-black text-white rounded mr-2 hover:text-orange-700 duration-150 ease-in">Buy</button>
                                        </a>
                                        :
                                        <button onClick={() => { alert("Anda Harus Login"); this.props.history.push('/login') }} className="px-10 py-2 border-black border-2 bg-black text-white rounded mr-2 hover:text-orange-700 duration-150 ease-in">Buy</button>}
                                    <button onClick={() => { alert("Data telah disimpan") }} className="px-10 py-2 border-black border-2 rounded hover:bg-black hover:text-white transition duration-150 ease-in">Add To Cart</button>
                                    <div className="my-8">
                                        <h4>Share To:</h4>
                                        <div className="flex text-4xl my-2">
                                            <a href="https://facebook.com/ihsan.sayid" className="hover:text-blue-800 mr-3"><FaFacebook /></a> <a href="https://twitter.com/ihsan.sayidd" className="hover:text-blue-800 mr-3"><FaTwitter /></a> <a href="https://instagram.com/ihsan.sayidd" className="hover:text-yellow-600 mr-3"><FaInstagram /></a> <a href="https://web.whatsapp.com" className="hover:text-green-800 mr-3"><FaWhatsapp /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }

                </div>
                <Footer />
            </>
        )
    }
}

ProductDetail.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(
    mapStateToProps
)(ProductDetail);
