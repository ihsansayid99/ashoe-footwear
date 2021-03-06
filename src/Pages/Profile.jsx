import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Title from '../components/Title';
class Profile extends Component {
    render() {
        const { user } = this.props.auth;
        return (
            <>
                <Title title="Profile" />
                <div>
                    <div className="w-full grid grid-cols-1 ">
                        <div className="mx-auto border-2 border-black rounded px-5 py-5">
                            <div className="w-64 rounded-b-full h-64 bg-cover rounded-t-full border-2" style={{ backgroundImage: `url(${user.avatar})` }}>
                                {/* <img src={url + user.avatar} className="bg-cover" alt={user.fullName} /> */}
                            </div>
                            <div className="text-center my-4">
                                <h1 className="text-2xl">{user.fullName}</h1>
                                <h1 className="text-sm">{user.email}</h1>
                                <h1>{user.role}</h1>
                            </div>
                            <div className="my-2 ml-20">
                                <button className="py-2 px-4 border-2 border-black rounded hover:bg-black transition duration-150 ease-in hover:text-white">Setting</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps
)(Profile);
