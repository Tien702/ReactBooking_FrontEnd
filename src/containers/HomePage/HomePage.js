import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Session/Specialty';
import Clinic from './Session/Clinic';
import OutStandingDoctor from "./Session/OutStandingDoctor";
import HandBook from './Session/HandBook';
import About from './Session/About';
import HomeFooter from './HomeFooter';

import "./Homepage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slideToScroll: 2
        };
        return (

            <div>
                <HomeHeader isShowBanner={true}/>
                <OutStandingDoctor
                    settings={settings}/>
                <Specialty 
                    settings={settings}/>
                <Clinic
                    settings={settings}/>
                <HandBook
                    settings={settings}/>
                <About/>
                <HomeFooter/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
