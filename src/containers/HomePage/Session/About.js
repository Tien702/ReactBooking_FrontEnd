import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
//import Iframe from 'react-iframe';
import vtv from '../../../assets/images/About/vtv1.png';
import dantri from '../../../assets/images/About/dantri.png';
import boyte from '../../../assets/images/About/boyte.png';
import vn from '../../../assets/images/About/vnexpress.png';
class About extends Component {

    returnToHome = () =>{
        if(this.props.history){
            this.props.history.push(`/home`)
        }
    }

    render() {
    
        return (
          <div className=' section-share section-about'>
                <div className='section-about-header'>
                <FormattedMessage id='homepage.about'/>
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/jbv_oefhoa4?si=sIWpfeTlzSz5V2ZA" 
                        title="YouTube video player" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                    </iframe>
                    </div>
                    <div className='content-right'>
                        <img className='header-logo' src={vtv} onClick={() => this.returnToHome()}/>
                        <img className='header-logo' src={dantri} onClick={() => this.returnToHome()}/>
                        <img className='header-logo' src={boyte} onClick={() => this.returnToHome()}/>
                        <img className='header-logo' src={vn} onClick={() => this.returnToHome()}/>
                    </div>
                </div>
          </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
