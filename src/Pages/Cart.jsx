import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Title from '../components/Title';
import { FaTrash, FaCartArrowDown } from 'react-icons/fa';

export default class Cart extends Component {
    constructor(props) {
        super();
        this.state = {
            carts: JSON.parse(localStorage.getItem('products'))
        }
        this.cartItemDelete = this.cartItemDelete.bind(this);
    }

    cartItemDelete(_id) {
        let getLocalStorage = JSON.parse(localStorage.getItem('products'))
        let getStorages = getLocalStorage.map(getStorage => getStorage._id)
        let index = getStorages.findIndex(id => id === _id);
        this.state.carts.splice(index, 1);
        const parsed = JSON.stringify(this.state.carts);
        localStorage.setItem("products", parsed);
        window.location.reload();
    }
    render() {
        return (
            <>
                <Title title="My Cart" />
                <div className="w-full py-16">
                    <div className="text-center font-bold text-2xl">
                        <h1>Keranjang Anda</h1>
                    </div>
                    <div className="py-8">
                        {
                            undefined !== this.state.carts && this.state.carts.length ?
                                <table className="table-auto mx-auto">
                                    <thead className="text-left">
                                        <tr>
                                            <th className="px-4 py-2">Image</th>
                                            <th className="px-4 py-2">Product</th>
                                            <th className="px-4 py-2">Harga</th>
                                            <th className="px-4 py-2">Quantity</th>
                                            <th className="px-4 py-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {
                                            this.state.carts.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="border px-4 py-2"><img width="100" src={item.image} alt={item.name} /></td>
                                                    <td className="border px-4 py-2">{item.name}</td>
                                                    <td className="border px-4 py-2">{item.price}</td>
                                                    <td className="border px-4 py-2">{item.quantity}</td>
                                                    <td className="border px-4 py-2"><button onClick={(e, _id) => this.cartItemDelete(item._id)} className="px-4 py-2 border-2 border-red-700 hover:bg-black hover:border-black hover:text-white transition duration-150 ease-in rounded text-red-700"><FaTrash /></button></td>
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className="border px-4 py-2">TOTAL :</td>
                                            <td className="border px-4 py-2">{this.state.carts.reduce((res, item) => {
                                                return res + (item.price * item.quantity)
                                            }, 0)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                :
                                <div className="w-auto max-w-xl mx-auto py-8 lg:px-12 px-8 flex items-center my-16">
                                    <FaCartArrowDown className="lg:text-3xl text-2xl mx-auto" />
                                    <h1 className="lg:text-3xl text-2xl mx-auto">Keranjang Anda Kosong</h1>
                                </div>
                        }
                        {
                            undefined !== this.state.carts && this.state.carts.length ?
                                <div className="text-center py-8">
                                    <button onClick={(e) => alert('Terimakasih... masih tahap progress')} className="w-64 py-3 mx-12 text-white rounded bg-yellow-700 text-lg font-medium hover:bg-yellow-800 transition duration-150 ease-linear focus:outline-none">Check Out</button>
                                </div> :
                                <div className="text-center">
                                    <Link to="/">
                                        <button className="w-64 py-3 text-white mx-12 rounded bg-yellow-700 text-lg font-medium hover:bg-yellow-800 transition duration-150 ease-linear focus:outline-none">Belanja Sekarang</button>
                                    </Link>
                                </div>
                        }
                    </div>
                </div>
            </>
        )
    }
}
