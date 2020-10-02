import React, { Component } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,} from "reactstrap";
import "./BookRoomDashboardMaster.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import dateFormat from "dateformat";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import "./BookRoomDashboard.css";
import Divider from "@material-ui/core/Divider";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import ProfileView from "./ProfileView";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import { Spin } from "antd";
import { apiurl } from "../../App";

const current_date = dateFormat(new Date(), "dd mmm yyyy");

class BookRoomDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "rrr",
      openview: false,
      viewdata:[],
      getTableData:[],
      DashboardTableData:[],
      dashboardDetails:[],
      DashboardViewData:[],
      totalData:"",
      tota_bookrooms:"",
      manage_rooms:"",
      cancel:"",
      total_revenue:"",
      // loading:true,
    };
  }
  
  modelopen = (data,id) => {
    if (data === "view") {

      this.setState({
         openview: true, 
         viewdata:this.state.totalData[id]
      });
   
    }
    console.log(this.state.viewdata,"jhghhgugh")
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };
  componentDidMount(){
    Axios({
      method:"POST",
      url: apiurl + "BookRoom/BRDashboard",
      data:{
        "brvendorId":"18",
        "limit":"1",
        "pageno":"1",
        "today_date":dateFormat(new Date(), "yyyy-mm-dd")

      }
    })
       .then((response) => {
         console.log(response,"res")
          const dashboardCardDetails= response.data.data[0].dashboard
          var  DashboardTableData=[]
          var dashboardDetails = response.data.data
          var viewDetails =  response.data.data[0].today_appointments
      console.log( response.data.data[0].today_appointments,"canceldata")
        response.data.data[0].today_appointments.map((val,index) => {
          console.log(val,"val")
          DashboardTableData.push({customer:val.CustomerName,room_type:val.Roomtype,from_date:dateFormat(val.fromDate,"dd mmm yyyy"),    
            to_date:dateFormat(val.Todate,"dd mmm yyyy"),total_days:val.Noofdays,id:index
          })
        })
        
        this.setState({
          DashboardTableData:DashboardTableData,
          cancel:dashboardCardDetails.cancel_count,
          manage_rooms:dashboardCardDetails.managerooms,
          tota_bookrooms:dashboardCardDetails.totalroomsbooked,
          total_revenue:dashboardCardDetails.total_revenue,
          totalData:response.data.data[0].today_appointments,
          loading:false
        })
    })
  }


  render() {
    const { Option } = Select;
    return ( 
      <Spin className="spinner_align" spinning={this.state.loading}>
      <div>
        {this.state.dashboardDetails}
        <div className="nurse_dashboard_buttons_wrap">
          <Card
            component={NavLink}
            to="/Home/totalbookroom"
            className="dashboard_card_container_green nurse_button_common_styles"
          >
            <p className="nurse_button_text">Total Rooms Booked</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="nurse_dash_numeric_wrap">
                 <p className="nurse_dash_numeric_value">{this.state.tota_bookrooms}</p>
            </div>
          </Card>
          <Card
            className="dashboard_card_container_yellow nurse_button_common_styles"
            component={NavLink}
            to="/Home/manageservice"
          >
            <p className="nurse_button_text">Manage Rooms</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="nurse_dash_numeric_wrap">
              <p className="nurse_dash_numeric_value">{this.state.manage_rooms}</p>
            </div>
          </Card>
          <Card
            className="dashboard_card_container_pinky nurse_button_common_styles"
            component={NavLink}
            to="/Home/cancelhistory"
          >
            <p className="nurse_button_text">Cancellation</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="nurse_dash_numeric_wrap">
              <p className="nurse_dash_numeric_value">{this.state.cancel}</p>
            </div>
          </Card>
          <Card
            className="dashboard_card_container_darkgreen nurse_button_common_styles"
            component={NavLink}
            to="/Home/revenue"
          >
            <p className="nurse_button_text">Total Revenue(KWD)</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="nurse_dash_numeric_wrap">
              <p className="nurse_dash_numeric_value">{this.state.total_revenue}</p>
            </div>
          </Card>
        </div>
        <div className="today_Appointments">
          <span>Today's Bookings</span>
          <span className="current_date">{current_date}</span>
        </div>

        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "customer", label: "Customer" },
            { id: "room_type", label: "Room Type" },
            { id: "from_date", label: "From Date" },
            { id: "to_date", label: "To Date" },
            { id: "total_days", label: "Total Days" },
            { id: "", label: "Action" },
          ]}
          rowdata={this.state.DashboardTableData && this.state.DashboardTableData}
          tableicon_align={""}
          modelopen={(e,id) => this.modelopen(e,id)}
          EditIcon="close"
          DeleteIcon="close"
          Workflow="close"
          props_loading={false}
        />
         <div className="buttons_container">
          <div>
            <Button
              className="nurse_dash_bottom_buttons nurse_dash_bottom2" component={NavLink} to="/Home/mediaupload">
                 Media Upload
            </Button>
            <Button
              className="nurse_dash_bottom_buttons nurse_dash_bottom3"  component={NavLink} to="/Home/advertise">
              Advertisement Booking
            </Button>
          </div>
        </div> 

      {/* <Modalcomp  visible={this.state.openview} title={"View details"} closemodal={(e)=>this.closemodal(e)}  xswidth={"xs"}> */}
           <ProfileView open={this.state.openview}  viewdata={this.state.viewdata} onClose={this.closemodal} />
    {/* </Modalcomp>  */}
     
           {/* <ProfileView open={this.state.openview}  viewdata={this.state.viewdata} onClose={this.closemodal} /> */}
  
  
      </div>
       </Spin>
    );
  }
}
export default BookRoomDashboard;
