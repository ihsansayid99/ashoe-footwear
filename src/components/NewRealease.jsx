import React, { Component } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
import reactGa from 'react-ga'

export default class NewRealease extends Component {
  constructor(props) {
    super(props)
    this.state = { products: [] }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.get('https://ashoe-footwear.herokuapp.com/product/new-arrival')
      .then(res => {
        this.setState({ products: res.data })
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


  render() {
    return (
      <>
        <h1 className="lg:text-4xl text-2xl font-medium text-center mb-6">
          NEW RELEASE!
        </h1>
        <div className="container my-10 mx-auto">
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-3">
            {this.state.products.length === 0 && <h1 className="text-center text-4xl">Loading...</h1>}
            {
              this.state.products.map(product => {
                return (
                  <div key={product._id} className="text-center hover:bg-gray-400">
                    <Link to={"/cardigan/detail/" + product._id}>
                      <img src={product.image} alt={product.name} />
                      <h5 className="hover:text-orange-500">{product.name}</h5>
                      <p className="font-bold my-2"><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></p>
                      <p className="text-xs">{product.color}</p>
                    </Link>
                  </div>
                )
              })
            }
          </div>
          <div className="text-center my-4">
            <Link to={'/cardigan'}>
              <button onClick={this.handleClick()} className="px-4 py-2 rounded bg-black text-white border-2 hover:text-black hover:bg-white hover:border-black transition duration-150 ease-in">SHOW MORE</button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
