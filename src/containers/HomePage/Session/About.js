import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
//import Iframe from 'react-iframe';
class About extends Component {

    render() {
        

        return (
          <div className=' section-share section-about'>
                <div className='section-about-header'>
                <FormattedMessage id='homepage.about'/>
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/ulw4R87rvjs" 
                            title="[25.01.2024] BRO vs GEN | Game 1 | Bình Luận Tiếng Việt | LCK Mùa Xuân 2024" 
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen></iframe>
                        
                    </div>
                    <div className='content-right'>
                        <p>
                        "...Mixigaming pubg gameplay lien minh 2017 lmht liên minh,pubg,battleground,
                        battlegrounds,mixigaming
                        Tags: Mixigaming, Mixi, Độ Tày, Streamer Mixigaming, Funny, Mixigaming Funny 
                        Stream, Funny Stream, Streamer Việt Nam, Stream Việt Nam, Stream Việt, PUBG,
                        Player Unknown's Battle Ground VN, PUBG VN, CSGO, CSGO VN, mixigaming vlog, 
                        mixivlog, mixivlog#21, mixivlog21, vlog 21 mixigaming, mixigaming miền tây, 
                        du lịch miền tây, ẩm thực miền tây, refundgaming miền tây.."
                        </p>
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
