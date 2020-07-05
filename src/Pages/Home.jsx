import React, { Component } from 'react'
import Hero from '../components/Hero'
import NewRealease from '../components/NewRealease'
import News from '../components/News'
import Footer from '../components/Footer'
import Title from '../components/Title'
class Home extends Component {

    render() {

        return (
            <>
                <Title title="Homepage" />
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
