import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logob from '../../assets/images/logob.svg';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from "../../utils";
import {changeLanguageApp} from "../../store/actions";
import { withRouter } from 'react-router';

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
        return (
            <React.Fragment>
                <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <i className='fas fa-bars'></i>
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
                        <div className='child-content'>
                            <div><b><FormattedMessage id='home-header.examination'/></b></div>
                                <div className='subs-title'><FormattedMessage id='home-header.checkHealth'/></div>
                            </div>
                    </div>
                    <div className='right-content'>
                        <div className='support'>
                            <i className='fas fa-question-circle'><FormattedMessage id='home-header.support'/></i>
                        </div>
                        <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                        <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                    </div>
                </div>
                    </div>
                    {this.props.isShowBanner === true &&
                <div className='home-header-banner'>
                    <div className='content-up'> 
                        <div className='title1'><FormattedMessage id='home-header.medical'/></div>
                        <div className='title2'><FormattedMessage id='home-header.health'/></div>
                        <div className='search'>
                            <i className='fas fa-search'></i>
                            <input type='text' placeholder="Tìm kiếm Bác Sĩ chuyên khoa xương khớp..." />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='options-child'>
                                <div className='icon-child'><i className='far fa-hospital'></i></div>
                                <div className='text-child'><FormattedMessage id='home-header.specialtyClinic'/></div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><i className='fas fa-mobile-alt'></i></div>
                                <div className='text-child'><FormattedMessage id='home-header.remote'/></div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><i className='fas fa-procedures'></i></div>
                                <div className='text-child'><FormattedMessage id='home-header.general'/></div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><i className='fas fa-flask'></i></div>
                                <div className='text-child'><FormattedMessage id='home-header.medicalTests'/></div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><i className='fas fa-user-md'></i></div>
                                <div className='text-child'><FormattedMessage id='home-header.mentalHealth'/></div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><i className='fas fa-briefcase-medical'></i></div>
                                <div className='text-child'><FormattedMessage id='home-header.dental'/></div>
                            </div>
                        </div>
                    </div>
                    
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
