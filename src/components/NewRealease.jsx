import React, { Component } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
import reactGa from 'react-ga';
import Skeleton from 'react-loading-skeleton';
import { FaPercent } from "react-icons/fa";

export default class NewRealease extends Component {
  constructor(props) {
    super(props)
    this.state = { products: [], loading: false }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.get('https://ashoe-footwear.herokuapp.com/product/new-arrival')
      .then(res => {
        this.setState({ products: res.data, loading: !this.state.loading })
      })
      .catch(err => {
        console.log("ERROR");
      })

    reactGa.initialize('UA-171589455-1')
    //to report page view
    reactGa.pageview(window.location.pathname + window.location.search)
  }

  handleClick() {
    reactGa.event({
      category: 'Promo Merdeka',
      action: 'Displayed Promotional Widget',
      label: 'Promosi',
      nonInteraction: true
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
        <h1 className="lg:text-4xl text-2xl font-medium text-center mb-6">
          NEW RELEASE!
        </h1>
        <div className="container my-10 mx-auto">
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-3">
            {!this.state.loading && Array(5).fill().map((item, index) => (
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
                    <Link to={`/${product.type}/detail/` + product.slug}>
                      {
                        product.discount ?
                          <>
                            <FaPercent className="relative transform float-right z-10 bg-yellow-500 text-2xl" />
                            <img src={product.image} alt={product.name} className="transform -translate-y-6 " />
                          </>
                          :
                          <img src={product.image} alt={product.name} className="transform -translate-y-2 mb-4" />

                      }
                      <h6 className="hover:text-orange-500">{product.name}</h6>
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
          {this.state.loading ?
            <div className="text-center my-4">
              <Link to={'/cardigan'}>
                <button onClick={this.handleClick()} className="px-4 py-2 rounded bg-black text-white border-2 hover:text-black hover:bg-white hover:border-black transition duration-150 ease-in">SHOW MORE</button>
              </Link>
            </div> : null}
        </div>
      </>
    );
  }
}
