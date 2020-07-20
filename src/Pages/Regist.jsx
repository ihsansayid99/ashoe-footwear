import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { registerUser } from '../actions/authActions'
import classnames from 'classnames'
import Title from '../components/Title';
import reactGa from 'react-ga';

class Regist extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      role: "USER",
      avatar: "",
      isWarning: false,
      file: 'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png',
      fileInput: false
    };
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this._handleImageChange = this._handleImageChange.bind(this)
  }

  componentDidMount() {
    //if logged in and user navigate to register page, should redirect to Home
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/login')
    }
    reactGa.initialize('UA-171589455-1')
    reactGa.pageview(window.location.pathname + window.location.search)
  }

  _handleImageChange(e) {
    console.log(this.state.file);
    e.preventDefault()



    // if (file) {
    //   this.setState({ fileInput: true })
    // }
    // if (!this.fileInput) {
    //   Resizer.imageFileResizer(
    //     file,
    //     150,
    //     150,
    //     'PNG',
    //     80,
    //     0,
    //     uri => {
    //       console.log(uri);
    //       this.setState({
    //         avatar: uri,
    //         file: file.name
    //       })
    //     },
    //     'base64'
    //   )
    // }

    // reader.onloadend = () => {
    //     this.setState({
    //         file: file.name,
    //         avatar: reader.result
    //     })
    // }

    // reader.readAsDataURL(file)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      fullName: this.state.fullName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      role: this.state.role,
      avatar: this.state.file
    };
    if (this.state.avatar <= 0) {
      this.setState({
        isWarning: true
      })
    }
    this.props.registerUser(newUser, this.props.history)
  }

  render() {
    const { errors } = this.state
    return (
      <>
        <Title title="Register Page" />
        <div className="w-full max-w-screen-sm lg:max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="font-bold">Registration</h2>
          </div>
          <form noValidate onSubmit={this.onSubmit} className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fullname"
              >
                Full Name
              </label>
              <input
                className={classnames("w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", { invalid: errors.fullName })}
                type="text"
                placeholder="Fullname"
                name="fullName"
                onChange={this.onChange}
                value={this.state.fullName}
                error={errors.fullName}
              />
              <span className="text-red-600 text-sm py-2 px-2">{errors.fullName}</span>

            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={classnames("shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", { invalid: errors.email })}
                type="email"
                placeholder="Email"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
              />
              <span className="text-red-600 text-sm py-2 px-2">{errors.email}</span>

            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={classnames("shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline", { invalid: errors.password })}
                type="password"
                name="password"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
              />
              <span className="text-red-600 text-sm py-2 px-2">{errors.password}</span>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Confirm Password
              </label>
              <input
                className={classnames("shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline", { invalid: errors.password2 })}
                type="password"
                name="password2"
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
              />
              <span className="text-red-600 text-sm py-2 px-2">{errors.password2}</span>
            </div>
            <div className="mb-6 flex items-center">
              {/* <label  className={`fileUpload flex-shrink-0 cursor-pointer ${this.state.isWarning ? "bg-red-900 text-white border-white" : "bg-white"} hover:bg-black  w-auto hover:text-white border-black text-sm border-2 text-black py-2 px-3 rounded`}>
                <span className="hidden lg:inline-flex"><FaUpload className="mr-2" />Uploads Image</span> {this.state.file.length > 0 && <span className="font-bold"> | {this.state.file}</span>}
                <span className="lg:hidden sm:block"><FaUpload /></span>
              </label> */}
              <input type="file" name="userImage" className="py-2 px-2 cursor-pointer" onChange={this._handleImageChange} accept="image/*" />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="border-2 border-black text-black hover:bg-black hover:text-white transition duration-150 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Daftar
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

Regist.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Regist))