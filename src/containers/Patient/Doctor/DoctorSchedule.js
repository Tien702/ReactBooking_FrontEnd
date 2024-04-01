import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { getScheduleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from "../../../utils";
import moment from 'moment';
import localization from 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
//import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {

    constructor(props){
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            // isOpenModalBooking: false,
            // dataScheduleTimeModal: {}
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async componentDidMount(){
        let { language } = this.props;
        let allDays = this.getArrdays(language);
        this.setState({
            allDays: allDays
        })
    }

    getArrdays = (language) =>{
        let allDays = []
        for(let i =0; i < 7; i++){
            let object = {};
            if(language === LANGUAGES.VI){
                if(i === 0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm Nay - ${ddMM}`;
                    object.label = today;
                }else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if(i === 0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `ToDay - ${ddMM}`;
                    object.label = today;
                }else{
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM')
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.language !== prevProps.language){
            let allDays = this.getArrdays(this.props.language)
            this.setState({
                allDays: allDays
            });
        }
        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
            let allDays = this.getArrdays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }

    handleOnChangeSelect = async (event) =>{
        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date);
            
            if(res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
    
    }

    handleClickScheduleTime = (time) =>{
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
        console.log('check time: ',time)
    }

    closeBookingClose = () =>{
        this.setState({
            isOpenModalBooking: false,
        })
    }

    render() {
        let {allDays, allAvailableTime} = this.state;
        console.log('check availabeltime: ',this.state)
        let {language} = this.props;
        return (
            <>
                <div className='doctor-schedule-container'>
                        <div className='all-schedule'>
                            <select onChange={(event) => this.handleOnChangeSelect(event)}>
                                {allDays && allDays.length > 0 &&
                                    allDays.map((item, index) =>{
                                        return(
                                            <option
                                                value = {item.value}
                                                key={index}
                                            >
                                                {item.label}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='all-available-time'>
                            <div className='text-calendar'>
                                <i className='fas fa-calendar-alt'>
                                    <span><FormattedMessage id="patient.detail-doctor.schedule"/></span>
                                </i>
                            </div>
                            <div className='time-content'>
                                {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                <div className='time-content-btns'>  
                                    {allAvailableTime.map((item,index) =>{
                                            let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                            return(
                                                <button key={index}
                                                    className={language === LANGUAGES.VI ? 'btn-vie' : 'btn-en'}
                                                    onClick={() =>this.handleClickScheduleTime(item)}
                                                    >
                                                    {timeDisplay}
                                                    
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                                <div className='book-free'>
                                    <span>
                                        <FormattedMessage id="patient.detail-doctor.choose"/>
                                        <i className='far fa-hand-point-up'></i>
                                        <FormattedMessage id="patient.detail-doctor.book-free"/>
                                    </span>
                                </div>
                                </>

                                :

                                <div className='no-schedule'>
                                    <FormattedMessage id="patient.detail-doctor.no-schedule"/>
                                </div>

                                }
                            </div>
                        </div>
                </div>
                {/* <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingClose = {this.closeBookingClose}
                    dataTime={dataScheduleTimeModal}
                /> */}
           </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
