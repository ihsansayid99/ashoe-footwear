import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebookSquare } from "react-icons/fa";
import Logo from "../assets/img/logowhite.png";

export default class Footer extends Component {
  render() {
    return (
      <>
        <footer className="mt-8 bg-black">
          <div className="container py-8 text-white grid lg:grid-cols-2 grid-cols-1 gap-12 lg:gap-24">
            <div className="">
              <h3 className="text-3xl">SUBSCRIBE TO EMAIL NEWS LETTER :</h3>
              <input
                type="email"
                className="mt-6 py-2 px-2 text-black w-64 lg:w-auto mr-3 rounded"
              />
              <button className="bg-white mt-2 text-black py-2 px-4 hover:bg-gray-700 hover:text-white transition duration-150">
                Subscribe
              </button>
            </div>
            <div>
              <h3 className="text-3xl text-left">Follow Us :</h3>
              <span className="flex">
                <div className="mt-6 text-3xl mr-5">
                  <Link to="https://instagram.com/ihsan.sayidd">
                    <FaInstagram className="hover:text-gray-700 transition duration-150" />
                  </Link>
                </div>
                <div className="mt-6 text-3xl mr-5">
                  <Link to="https://facebook.com/ihsansayid">
                    <FaFacebookSquare className="hover:text-gray-700 transition duration-150" />
                  </Link>
                </div>
                <div className="mt-6 text-3xl">
                  <Link to="https://instagram.com/ihsan.sayidd">
                    <FaTwitter className="hover:text-gray-700 transition duration-150" />
                  </Link>
                </div>
              </span>
            </div>
          </div>
          <div className="text-center text-white py-6">
            <img src={Logo} alt="ashoe logo white" className="mx-auto w-20" />
            <h6 className="">Sweater Weather - &copy; 2020</h6>
          </div>
        </footer>
      </>
    );
  }
}
