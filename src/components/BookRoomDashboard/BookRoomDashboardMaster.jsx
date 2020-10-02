import React, { Component } from "react";
import "./BookRoomDashboardMaster.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import Paper from "@material-ui/core/Paper";
import BookRoomDashboard from "./BookRoomDashboard";

class BookRoomDashboardMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "rrr",
    };
  }

  render() {
    const { Option } = Select;
    return (
      <div className="trainer_dashboard_master">
        <Paper>
          <div className="dashboardborder_box">
            <p className="dashboard">ROOM DASHBOARD</p>
          </div>

          <div>
            <BookRoomDashboard />
          </div>
        </Paper>
      </div>
    );
  }
}
export default BookRoomDashboardMaster;
