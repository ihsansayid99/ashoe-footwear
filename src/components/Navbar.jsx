import React, { Component } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/authActions'
import Logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaTimes, FaSignOutAlt } from "react-icons/fa";
import reactGa from 'react-ga';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarOpen: false,
      closeOrNot: false,
    };
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
    window.location.reload();
  }
  componentDidMount() {
    reactGa.initialize('UA-171589455-1')
    reactGa.pageview(window.location.pathname + window.location.search)
  }

  render() {
    const { user, isAuthenticated } = this.props.auth;
    const getDataCart = JSON.parse(localStorage.getItem('products'))
    return (
      <nav className="flex items-center justify-between flex-wrap bg-white text-black pt-4 px-8 lg:pt-6 pb-4 lg:px-16">
        <div className="flex items-center flex-shrink-0">
          <Link to="/">
            <img src={Logo} className="w-20 lg:w-24" alt="logo ashoe" />
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded border-black hover:text-white hover:bg-black transition duration-200 ease-in"
            onClick={() =>
              this.setState({
                navbarOpen: !this.state.navbarOpen,
                closeOrNot: !this.state.closeOrNot,
              })
            }
          >
            {!this.state.closeOrNot ? (
              <svg
                className="fill-current h-4 w-4"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            ) : (
                <FaTimes />
              )}
          </button>
        </div>
        <div
          className={`w-full lg:mx-auto lg:flex lg:w-auto ${
            this.state.navbarOpen ? "flex" : "hidden"
            }`}
        >
          <div className="text-sm font-semibold">
            <Link to="/cardigan/" className="block mt-4 lg:inline-block lg:mt-0 hover:opacity-75 transition duration-150 ease-in  mr-5">
              CARDIGAN
            </Link>
            <Link to="/bershka/" className="block mt-4 lg:inline-block lg:mt-0 hover:opacity-75 transition duration-150 ease-in  mr-5">
              BERSHKA
            </Link>
            <Link to="/sweater/" className="block mt-4 lg:inline-block lg:mt-0 hover:opacity-75 transition duration-150 ease-in mr-5">
              SWEATER
            </Link>
            <Link to="/long-outer/" className="block mt-4 lg:inline-block lg:mt-0 hover:opacity-75 transition duration-150 ease-in mr-5">
              LONG OUTER
            </Link>
          </div>
        </div>
        <div
          className={`w-full lg:w-auto text-sm lg:mt-0 lg:flex ${
            this.state.navbarOpen ? "block" : "hidden"
            }`}
        >
          <Link to="/cart" className="block mt-5 lg:inline-block lg:mt-0 hover:opacity-75 transition duration-150 ease-in mr-5">
            <span className="flex font-normal">
              <FaShoppingCart className="mr-2 text-lg" />
              Cart ({getDataCart ? getDataCart.length : 0})
            </span>
          </Link>
          <div className="block mt-5 lg:inline-block lg:mt-0">

            {isAuthenticated ?
              <div className="flex">
                <Link to="/profile">
                  <span className="font-normal hover:opacity-75 transition duration-150 ease-in">
                    <FaUser className="inline-flex mr-2 text-lg" />
                    {user.fullName}
                  </span>
                </Link>
                <span onClick={this.onLogout} className="text-lg mx-4 hover:opacity-75 transition duration-150 ease-in cursor-pointer"><FaSignOutAlt /></span>
              </div>
              :
              <span className="flex font-normal hover:opacity-75 transition duration-150 ease-in">
                <FaUser className="mr-2 text-lg" />
                <Link to="/login">Sign in/Join</Link>
              </span>
            }
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);

