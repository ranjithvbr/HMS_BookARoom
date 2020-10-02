import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Profile from "../../Images/profile.svg";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import "./Drawerpage.css";
import { Dropdown } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import avatar from "../../Images/avatar.jpg";
import Badge from "@material-ui/core/Badge";
import bell from "../../Images/bell.png";
import Logo from "../../Images/Logo.png";
import home_svg from "../../Images/home_svg.svg";
import queue_svg from "../../Images/queue_svg.svg";
import schedule_svg from "../../Images/schedule_svg.svg";
import advertise_svg from "../../Images/availability.svg";
import revenue_svg from "../../Images/revenue_svg.svg";
import upload_svg from "../../Images/upload_svg.svg";
import Appointment from "../../Images/appointment.svg";
import Cancel from "../../Images/cancel.svg";
// import Availability from "../../Images/availability.svg";
import Total from "../../Images/total.svg";
import deals from "../../Images/deals.svg";

import {
  Menulist,
  MenuItem,
  ListItemText,
  ListItemIcon,
  MenuList,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import calendar_svg from "../../Images/calendar_svg.svg";
import ReactSVG from "react-svg";
import Deal_new from "../../Images/deal_new.svg";
import Paper from "@material-ui/core/Paper";
// import Profilepage from "../LabProfile/Profilepage";
import Profilepage from "../../components/Profilepage/Profilepage";
import ProfileLogout from "../../components/ProfileLogout/ProfileLogout";
import Deals from "../../Images/deals.svg";
import Manage_new from "../../Images/manage.svg";
import Drawerpage from "../../components/Drawer page/Drawerpage";
import ViewDetailsMaster from "../../components/ViewDetails/ViewDetailsMaster";
import AdvertisementMaster from "../../components/AdvertisementBooking/AdvertisementMaster";
// import AvailabilityMaster from "../../components/Availability/AvailabilityMaster";
import QueueComp from "../Queuecomp/queuecomp";
// import AppointmentsDashboard from "../AppointmentList/AppointmentsDashboard";
// import AppointmentMaster from "../../components/AppointmentShedule/AppointmentMaster";
import CancelledDashboard from "../../components/CancelledHistory/CancelledDashboard";
import DealsMaster from "../../components/Deals/DealsMaster";
import MediaUploadsMaster from "../../components/MediaUploads/MediaUploadsMaster";
// import CancelPayment from "../../components/CancelPayment/CancelPayment";
import BookRoomDashboardMaster from "../BookRoomDashboard/BookRoomDashboardMaster";
import Revenuemaster from "../../components/Revenue/RevenueMaster";
import Login from "../BookRoomLogin/Login";
import Forgot from "../BookRoomLogin/Forgot";
import BookRoomLogin from "../BookRoomLogin/ResetPassword";
import ManageServiceMaster from "../ManageRooms/ManageServiceMaster";
import deal_new from "../../Images/Advertisebook.svg";
// import ProfileComp from "../LabProfile/ProfileComp";
import PaymentReceived from "../paymentReceived/PaymentReceived";
import CancelPayment from "../CancelPayment/CancelPayment";
import TotalBookroomDashboard from "../TotalBookroom/TotalBookroomDashboard";
import { BrowserRouter, Switch, Route,NavLink } from "react-router-dom";
import {notification} from 'antd';
import Noimageavailable from "../../Images/Noimageavailable.png"
import Axios from 'axios';
import {apiurl} from '../../App'

const drawerWidth = 260;
const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 100,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

var today = new Date();

var date=today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var time = today.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true })

class MiniDrawer extends React.Component {

  generateAlert = (description) => {
    notification.success({
      // message: "Success",
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };


  state = {
    open: false,
    logout: false,
    custom_hide: true,
    ProfileData:[],
    date: date,
    time: time,
    current_location:""
  };

  componentDidMount(){
    this.ProfileGetApi()    
      this.setState({
        current_location: window.location.href
      },() => console.log("sfdshfjsdhfjsdhfsdf", this.state.current_location))
  }
  ProfileGetApi=()=>{
    var self=this
    Axios({
      method: 'post',
      url: apiurl +'BookRoom/getBookRoomvendorprofile',
      data: {
        "brvendorId":"18"
      }
    })
  .then((response) => {
    var ProfileData=[]
    console.log(response,"getdetails")
    ProfileData=response.data.data
    this.setState({ProfileData}) 
  }).catch((error) => {
      })
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  viewmodalOpen = () => {
    this.setState({ viewmodal: true, profilecompopen: true });
  };
  viewmodalClose = () => {
    this.setState({ viewmodal: false });
  };
  logoutOpen = () => {
    this.setState({ logout: true });
  };
  logoutClose = () => {
    this.setState({ logout: false });
  };

  active_box = () => {
    this.setState({current_location:window.location.href},() => console.log("sfkjhdsfljkldhsfk",this.state.current_location))
  }
  render() {
    const { classes, theme, children } = this.props;
    if (this.state.custom_hide) {
      if (window.location.href.includes("/Home/profile")) {
        this.setState({
          viewmodal: true,
          custom_hide: false,
        });
      }
    }

    console.log(this.state.ProfileData,"ProfileData")

    return (
      <div className="drawerpage_container">
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open,
            })}
          >
            <Toolbar disableGutters={!this.state.open}>
              <div className="drawer-logo-container">
                <img className="logo" src={Logo} alt="logo" />
              </div>
              <IconButton
                // color="inherit"
                color="black"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <div
                className={`${
                  this.state.open
                    ? "dropdown-container"
                    : "dropdown-container_close"
                }`}
              >
                <Dropdown>
                  <Badge
                    color="secondary"
                    variant="dot"
                    className={classes.margin}
                  >
                    <div className="notification-icon">
                      {" "}
                      <img className="notification" src={bell} />
                    </div>
                  </Badge>
                  <Dropdown.Toggle
                    variant="my_style"
                    id="dropdown-basic"
                    // onClick={this.logoutOpen}
                  >
                    {/* My Profile */}
                    {this.state.ProfileData && this.state.ProfileData[0] && this.state.ProfileData[0].vendor_name}
                  </Dropdown.Toggle>

                  {/* <Dropdown.Menu className="dropdown-menu" > */}
                  {/* <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
     <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
     <Dropdown.Item href="#/action-3">Log out</Dropdown.Item>  */}

                  {/* </Dropdown.Menu>   */}
                  {/* {this.state.logout === true && (
                    <div>
                      <ProfileLogout
                        open={this.state.logout}
                        onClose={this.logoutClose}
                      />
                    </div>
                  )} */}
               <Dropdown.Menu className="dropdown-menu">
                  {this.state.ProfileData.map((val)=>{
               return(
                    <div className="dropdown-img">
                    {/* <NavLink activeClassName="active" to="/Home/profilepage"> */}
                   
                      <img
                        className="Avatar"
                        alt="avatar-missing"
                        src={val.vendor_filename ? val.vendor_filename : Noimageavailable }
                      />
             
                      {/* </NavLink> */}
                      
                     
                    </div>
                    )})}
                    {this.state.ProfileData.map((val)=>{
               return(
                    <div className="name_email">
                      <NavLink activeClassName="active" to="/Home/profile">
                   <div className="username" style={{color:'black',textDecoration:'none',fontSize:'15px'}}>{val.vendor_name}</div>
                   </NavLink>
                   <NavLink activeClassName="active" to="/Home/profile">

                   <div style={{color:'#757575',textDecoration:'none',fontSize:'15px'}}>{val.vendor_email}</div>
                   </NavLink>
                   </div>
               )})}
                    <Divider />
                    <div className="profile_logout_butt">
                    <NavLink activeClassName="active" to="/Home/profile">
                      <p>Profile</p>
                      </NavLink>
                      {/* <Button
                        className="logout_butt"
                        // onClick={this.handleClose}
                        onClose={this.props.onClose}
                        onClick={this.logoutclick}
                      >
                        Logout
                      </Button> */}
                      <a
                        component={NavLink}
                        href="/bookroom/?/"
                        className="logout_butt"
                        // onClick={this.handleClose}
                        onClose={this.props.onClose}
                      >
                        Logout
                      </a>
                    </div>
                    <Divider />
                    <div className="profile_logout_privacy ">
                      <p>Privacy Policy Terms of Service</p>
                    </div>
                  </Dropdown.Menu>

                </Dropdown>

                <div className="date-wrapper1">
                  <div className="date-wrapper2">
                  <large className="date">{this.state.date+" "+this.state.time}</large>
                  </div>

                </div>
              </div>
              
              {/* <Avatar
                className="Avatar-image"
                alt="avatar-missing"
                src={avatar}
                onClick={this.viewmodalOpen}
                className={classes.avatar}
              /> */}
      {this.state.ProfileData.map((val)=>{
               return(
              <Avatar
                className="Avatar-image"
                alt="avatar-missing"
                src={val.vendor_filename?val.vendor_filename:Noimageavailable}
                className={classes.avatar}
              />
               )})}
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              }),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />

            <MenuList className="appbar_sideicons" onClick={this.active_box}> 
              <MenuItem component={Link} to="/Home/dashboard" className={`${this.state.current_location.includes("/dashboard" || "/dashboard") && "active_text_heading"}`} >
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={home_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Home" />
              </MenuItem>
        
                <MenuItem component={Link} to="/Home/totalbookroom" className={`${this.state.current_location.includes("/totalbookroom") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={advertise_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Total Rooms Booked " />
              </MenuItem>

              <MenuItem component={Link} to="/Home/cancelhistory" className={`${this.state.current_location.includes("/cancelhistory") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={Cancel} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Cancelled Booking" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/advertise" className={`${this.state.current_location.includes("/advertise") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={deal_new} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Advertisement Booking" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/deals" className={`${this.state.current_location.includes("/deals") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <div>
                      <ReactSVG src={deals} />
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText primary="Deals" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/revenue" className={`${this.state.current_location.includes("/revenue") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={revenue_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Revenue" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/manageservice" className={`${this.state.current_location.includes("/manageservice") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={Manage_new} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Manage Rooms" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/mediaupload" className={`${this.state.current_location.includes("/mediaupload") && "active_text_heading"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <div>
                      <ReactSVG src={upload_svg} />
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText primary="Media Uploads" />
              </MenuItem>

              <MenuItem
                component={Link}
                to="/Home/profile"
                onClick={this.viewmodalOpen}
                className={`${this.state.current_location.includes("/profile") && "active_text_heading"}`}
              >
                <ListItemIcon>
                  <div className="icon-container">
                    <div>
                      <ReactSVG src={Profile} />
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>
            </MenuList>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Route
              path={`${this.props.match.path}/revenue`}
              component={Revenuemaster}
              exact
            />
            <Route path="/viewdetails" component={ViewDetailsMaster} />
            <Route
              path={`${this.props.match.path}/advertise`}
              // component={AdvertisementMaster}
              render={(props) => <AdvertisementMaster {...props} generateAlert={this.generateAlert} />}
              exact
            />
            {/* <Route
              path={`${this.props.match.path}/availability`}
              component={AvailabilityMaster}
              exact
            /> */}
            <Route
              path={`${this.props.match.path}/queue`}
              component={QueueComp}
              exact
            />
            {/* <Route
              path={`${this.props.match.path}/appointments`}
              component={AppointmentsDashboard}
              exact
            /> */}
             <Route
              path={`${this.props.match.path}/totalbookroom`}
              component={TotalBookroomDashboard}
              exact
            />
            {/* <Route
              path={`${this.props.match.path}/AppointShedule`}
              component={AppointmentMaster}
              exact
            /> */}
            <Route
              path={`${this.props.match.path}/cancelhistory`}
              component={CancelledDashboard}
              exact
            />
            <Route
              path={`${this.props.match.path}/manageservice`}
              component={ManageServiceMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/deals`}
              component={DealsMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/mediaupload`}
              component={MediaUploadsMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/profile`}
              // component={Profilepage}
              exact
              render={(props) => <Profilepage {...props} generateAlert={this.generateAlert} ProfileGetApi={this.ProfileGetApi
              } />} exact
            />
            {/* <Route
              path={`${this.props.match.path}/back`}
              component={ProfileComp}
              exact
            /> */}

            <Route
              path={`${this.props.match.path}/dashboard`}
              component={BookRoomDashboardMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/paymentreceived`}
              component={PaymentReceived}
              exact
            />
            <Route
              path={`${this.props.match.path}/cancelpayment`}
              component={CancelPayment}
              exact
            />
            <div>
              {children}
            </div>
          </main>
        </div>
      </div>
    );
  }
}
MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);










