import React, { Component } from "react";
import plus from "../../Images/plus.png";
import Grid from "@material-ui/core/Grid";
import "./ManageServiceMaster.css";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import ManageServiceModal from "./ManageServiceModal";
import MediaServiceTable from "./ManageServiceTable";
import Button from '@material-ui/core/Button';
import { Input, Select, Icon } from 'antd';
import dateFormat from 'dateformat';
import Paper from '@material-ui/core/Paper';
import IconsModal from './IconsModal'
const current_date=(dateFormat(new Date(),"dd mmm yyyy"))

export default class ManageServiceMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      getTableDataopen:false,
      Search:null,
    };
  }
  handleClickopen = () => {
    this.setState({ open: true });
  };
  handleClickclose = () => {
    this.setState({ open: false });
  };

  getTableData=()=>{
    this.setState({ getTableDataopen: !this.state.getTableDataopen });
  }

  render() {
    const { Search } = Input;
    return (
      <div className="manageservicemaster">
        <Paper>
        <div className="uploadsmasterheader">
              <div className="managetitleuser">MANAGE ROOMS</div>
           
        
            <div className="current_container">
   
            <Search
              placeholder=" search "
              onChange={(e) => this.setState({ Search: e.target.value })}
              style={{ width: 150 }}
              className="search_box_container"
              />
                <img
                  className="plus-icon"
                  src={plus}
                  alt={"hi"}
                  onClick={this.handleClickopen}
                />
                </div>
		        </div>
         

        <MediaServiceTable getTableData={this.state.getTableDataopen} getTableDatafalse={this.getTableData} searchData={this.state.Search}/>
        
        </Paper>
        <Modalcomp  visible={this.state.open}  xswidth={null} title={"ADD ROOMS"}  clrchange="text_clr_change" closemodal={(e)=>this.handleClickclose(e)} getTableData={this.getTableData} >

           <ManageServiceModal className="manage-modal" open={this.state.open}  closemodal={this.handleClickclose}  getTableData={this.getTableData}  />
       </Modalcomp>
      </div>
    );
  }
}
