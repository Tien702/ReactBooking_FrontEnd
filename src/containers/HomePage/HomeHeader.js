import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logob from '../../assets/images/Logo.jpg';
import bg1 from '../../assets/images/header-background.png';
import bg2 from '../../assets/images/bg2.png';
import bg3 from '../../assets/images/bg3.jpg';
import bg4 from '../../assets/images/bg1.png';
import user from '../../assets/images/avatar.png';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from "../../utils";
import {changeLanguageApp} from "../../store/actions";
import { withRouter } from 'react-router';
import Slider from 'react-slick';
class HomeHeader extends Component {
    
    changeLanguage = (language) =>{
        this.props.changeLanguageAppRedux(language);
    }

    returnToHome = () =>{
        if(this.props.history){
            this.props.history.push(`/home`)
        }
    }

    render() {
        
        let language = this.props.language;
        var setting = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            pauseOnHover: true,
          };
        return (
            <React.Fragment>
                <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <img className='header-logo' src={logob} onClick={() => this.returnToHome()}/>
                    </div>
                    <div className='center-content'>
                        <div className='child-content'>
                            <div><b><FormattedMessage id='home-header.specialty'/></b></div>
                            <div className='subs-title'><FormattedMessage id='home-header.searchdoctor'/></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id='home-header.clinic'/></b></div>
                                <div className='subs-title'><FormattedMessage id='home-header.chooseClinic'/></div>
                            </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id='home-header.doctor'/></b></div>
                                <div className='subs-title'><FormattedMessage id='home-header.chooseDoctor'/></div>
                            </div>
                        {/* <div className='child-content'>
                            <div><b><FormattedMessage id='home-header.examination'/></b></div>
                                <div className='subs-title'><FormattedMessage id='home-header.checkHealth'/></div>
                            </div> */}
                    </div>
                    <div className='right-content'>
                        <div className='support'>
                            <i className='fas fa-question-circle'><FormattedMessage id='home-header.support'/></i>
                        </div>
                        <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                        <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        <div className='account'>
                            <img src={user}/>                      
                        </div>
                    </div>
                </div>
                    </div>
                    {this.props.isShowBanner === true &&
                <div className='home-header-banner'>
                    <Slider {...setting}>
                            <img src={bg1}/>        
                            <img src={bg2}/>
                            <img src={bg3}/>
                            <img src={bg4}/>
                    </Slider>
                </div>
                 }
            </React.Fragment>
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
        changeLanguageAppRedux:(language) =>dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader)); 
