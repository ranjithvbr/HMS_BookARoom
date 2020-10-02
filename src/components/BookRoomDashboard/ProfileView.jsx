import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Trainee from '../../Images/11.jpg'
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import "./ProfileView.css";
import { TiLocation, MdLocationOn, MdLocalPhone } from "react-icons/md";
import { IoIosGlobe } from "react-icons/io";
import EditIcon from "@material-ui/icons/Edit";
import Patient from '../../Images/1.jpg'
import Clinic from '../../Images/dashboardview.png'
import { BrowserRouter, Switch, Route,NavLink } from "react-router-dom";
import close from "../../Images/close.svg"
import No_image_available from "../../Images/No_image_available.svg"

const styles = {};
var moment = require('moment');

export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cancel: null };
  }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  open=()=>
  {
  	this.setState({view:true})
  }
  onclose=()=>
  {
    this.setState({view:false})
  }
  
  formatTimeShow=(h_24)=> {
    var h = Number(h_24.substring(0, 2)) % 12;
    if (h === 0) h = 12;
    return (h < 10 ? '0' : '') + h + ':'+h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
  }

  render() {
    const viewdata=this.props.viewdata
    console.log(viewdata,"props")
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;

    return (
      <div className="doctor_popup_details">
      
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
          className="profile_modal"
        >
         <div>
            {/* <img className="close_ico"  src={close}  onClick={this.props.onClose}/> */}
            {/* <img src={viewdata.profile_image} className="patient"/> */}
            <img className="close_ico"  src={close}  onClick={this.props.onClose}/>
            <img src={viewdata.profile_image ? viewdata.profile_image : No_image_available}
            alt="This IMG format is not supporting"
            style={{ height: "10"} ,{marginTop:"10px"}} className="patient"/>
         </div>
          <Grid>
            <div className="doctor_dashboard_view">
              <div className="doctor_details_container">
                  <div className="doctor_detailsdiv">
                    <h3 className="patient_name">{viewdata.CustomerName}</h3>
                    <p className="patient_age">{viewdata.age} Years</p>
                    <p className="booked_details_font">Booked Details</p>
                   <Grid className="d-flex">
                      <Grid item md={6} sm={6 }  className ="date_align">
                        <div className="patientappointment_details">
                          <p className="patientappointment_details">Date
                         
                          <span className="patient_date">{ moment(viewdata.Date).format('DD MMM YYYY')}</span>
                          </p>
                        </div>
                        <div className="patientappointment_details-div">
                          <p className="patientappointment_details">Time
                          <span className="patient_date">{viewdata && viewdata.Time ? this.formatTimeShow(viewdata.Time) : "--"}</span>
                          </p>
                        </div>
                      </Grid>
                      <Grid item md={6} sm={6} className="book_date_adjust">
                        <div className="fromdate_adjust">
                          <p className="fromdate_adjust">From Date
                          <span className="patient_date">{moment(viewdata.fromDate).format('DD MMM YYYY')}</span>
                          </p>
                        </div>
                        <div className="fromdate_adjust-div">
                          <p className="fromdate_adjust">To Date
                          <span className="to_date">{moment(viewdata.Todate).format('DD MMM YYYY')}</span>
                          </p>
                        </div>
                      </Grid>
                   </Grid>
                <div className="divider_root"/>
                <Grid className="d-flex mt-2">
                    <Grid item md={5} sm={6 }>
                      <div className="patientappointment_details">
                        <p className="patientappointment_details Room_align">Room Type
                        <span className="patient_date">{viewdata.Roomtype}</span>
                        </p>
                      </div>
                    </Grid>
                    <Grid md={1}></Grid>
                        <div className="vertical_line"></div>
                    <Grid item md={7} sm={6} className="billed_adjust ">
                      <div className="fromdate_adjust">
                        <p className="fromdate_adjust">Total Days
                        <span className="patient_date">{viewdata.Noofdays}</span>
                        </p>
                      </div>
                      <div className="fromdate_adjust">
                        <p className="fromdate_adjust">Total Cost
                        <span className="patient_date">{viewdata.amount} KWD</span>
                        </p>
                      </div>
                  </Grid>
                </Grid>
            </div>
            </div>
         </div>
         </Grid>
        </Dialog>
        
      </div>
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(ProfileView);
