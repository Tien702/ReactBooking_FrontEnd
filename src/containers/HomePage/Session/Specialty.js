import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Homepage.scss';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import specialtyImg from "../../../assets/specialtyImg/co-xuong-khop.jpg";
import { getAllSpecialty } from "../../../services/userService";
import { withRouter } from 'react-router';
class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state ={
            dataSpecialty: []
        }
    }

    async componentDidMount(){
        let res = await getAllSpecialty();
        if(res && res.errCode === 0){
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (item) =>{
        if(this.props.history){
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }

    render() {
        
        let {dataSpecialty} =this.state;
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 3
        };
        return (
           <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='homepage.specialty'/> </span>
                        <button className='btn-section'> <FormattedMessage id='homepage.more-info'/></button>
                    </div>
                    <div className='section-body'>
                    <Slider {...settings}>
                        <div className='specialty-customize'>
                           <div className='bg-image'></div>
                           <div>Tim mạch 1</div>
                        </div>                  
                        <div className='specialty-customize'>
                            <div className='bg-image'></div>
                            <div>Tim mạch 2</div>
                            </div>
                        <div className='specialty-customize'>
                            <div className='bg-image'></div>
                            <div>Tim mạch 3</div>
                            </div>
                        <div className='specialty-customize'>
                            <div className='bg-image'></div>
                            <div>Tim mạch 4</div>
                            </div>
                        <div className='specialty-customize'>
                            <div className='bg-image'></div>
                            <div>Tim mạch 5</div>
                            </div>
                    </Slider>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
