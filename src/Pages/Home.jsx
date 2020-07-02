import React, { Component } from 'react'
import Hero from '../components/Hero'
import NewRealease from '../components/NewRealease'
import News from '../components/News'
import Footer from '../components/Footer'
class Home extends Component {

    render() {

        return (
            <>
                <Hero />
                <main>
                    <NewRealease />
                    <News />
                </main>
                <Footer />
            </>
        )
    }
}

export default Home;
