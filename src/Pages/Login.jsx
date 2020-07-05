import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { loginUser } from '../actions/authActions';
import Title from '../components/Title';
import reactGa from 'react-ga'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      errorAlert: false
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
    reactGa.initialize('UA-171589455-1')
    reactGa.pageview(window.location.pathname + window.location.search)

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/"); // push user to dashboard when they login
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        errorAlert: true
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <>
        <Title title="Login" />
        <div className="w-auto max-w-xs mx-auto py-16">
          <div className="text-center">
            <h2 className="font-bold">Login</h2>
          </div>
          <form noValidate onSubmit={this.onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                onChange={this.onChange}
                className={`shadow appearance-none border rounded w-full lg:w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                id="email"
                type="email"
                placeholder="Email"
              />
              {
                this.state.errorAlert ? <span className="text-red-500 text-xs italic">{errors.email}
                  {errors.emailnotfound}</span> : null
              }

            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                onChange={this.onChange}
                className={`shadow appearance-none rounded w-full lg:w-64 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="password"
                type="password"
              />
              <span className="text-red-500 text-xs italic">{errors.password}
                {errors.passwordincorrect}</span>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="border-2 border-black text-black hover:bg-black hover:text-white transition duration-150 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <Link to="/" className="inline-block align-baseline font-medium text-sm text-black transition duration-100 hover:text-blue-800">
                Lupa Password?
              </Link>
            </div>
            <div className="block mt-4 text-xs text-center hover:text-gray-700 transition duration-150">
              <Link to="/registration">Belum Punya Akun? Daftar disini</Link>
            </div>
          </form>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);