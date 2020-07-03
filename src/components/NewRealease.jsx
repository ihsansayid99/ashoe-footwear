import React, { Component } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';

export default class NewRealease extends Component {
  constructor(props) {
    super(props)
    this.state = { products: [] }
  }

  componentDidMount() {
    axios.get('https://ashoe-footwear.herokuapp.com/product/')
      .then(res => {
        this.setState({ products: res.data })
      })
      .catch(err => {
        console.log("ERROR");

      })
  }

  render() {
    return (
      <>
        <h1 className="lg:text-4xl text-2xl font-medium text-center mb-6">
          NEW RELEASE!
        </h1>
        <div className="container my-10 mx-auto">
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
            {this.state.products.length === 0 && <h1 className="text-center text-4xl">Loading...</h1>}
            {
              this.state.products.map(product => {
                return (
                  <div key={product._id} className="text-center hover:bg-gray-400">
                    <Link to={"/mens/detail/" + product._id}>
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
        </div>
      </>
    );
  }
}
