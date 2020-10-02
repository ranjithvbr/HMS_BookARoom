import React, { Component } from "react";
import plus from "../../Images/plus.png";
import Grid from "@material-ui/core/Grid";
import "./CancelledDashboard.css";
import CancelledTable from "./CancelledTable";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Input, Select, Icon } from 'antd';
import dateFormat from 'dateformat';
import Paper from '@material-ui/core/Paper';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import pdf from '../../Images/pdf.svg'
import excel from '../../Images/excel.svg'
import print from '../../Images/print.svg';
import axios from "axios";
// import jsPDF from 'jspdf';
import ReactSVG from "react-svg";
// import 'jspdf-autotable';
// import ReactExport from 'react-data-export';
// import { MdFormatListBulleted } from "react-icons/md";
// import PrintData from "./printdata";
// import ReactToPrint from "react-to-print";

const current_date=(dateFormat(new Date(),"dd mmm yyyy"))

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default class CancelledDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open:false,
      WeekData:[],
      props_loading:true,
      wk_mh_yr_Data:[],
      yearData:[],
      Search:null
       
    };
  }
  handleClickopen = () => {
    this.setState({ open: true });
  };
  handleClickclose = () => {
    this.setState({ open: false });
  };
// componentDidMount(){




  // SearchData=(e)=>{
  //   this.setState({
  //     Search:e.target.value
  //   })
  //   this.setState({})
  // }

  // generatepdf=()=>{
  //   const doc = new jsPDF("a3")
  //   var bodydata  = []
  //   this.state.wk_mh_yr_Data.map((data,index)=>{
  //     console.log(data,"dataaa")
  //     bodydata.push([index+1,data.customer,data.room_type,data.cancel,data.time])
  //   })
  //   doc.autoTable({
  //     beforePageContent: function(data) {
  //       doc.text("Uploaded Details", 15, 23); // 15,13 for css
  //       },
  //     margin: { top: 30 },
  //     showHead:"everyPage",
  //     theme:"grid",
  //     head: [['S.No', 'Customer', 'Room Type','Cancelled Date','Time']],
  //     body:bodydata,
  //   })
  //   doc.save('UploadDeatails.pdf') 
  // }
  
  render() {
    const { Search } = Input;

    const CancelsearchData = this.state.wk_mh_yr_Data.filter((data)=>{
      console.log(data,"Search_data")
      if(this.state.Search=== null)
         return data

        else if (data.customer !== null && data.customer.toLowerCase().includes(this.state.Search.toLowerCase())
        || (data.room_type != null && data.room_type.toLowerCase().includes(this.state.Search.toLowerCase()))
        || (data.cancel != null && data.cancel.toLowerCase().includes(this.state.Search.toLowerCase()))
        || (data.time != null && data.time.toLowerCase().includes(this.state.Search.toLowerCase()))
        ) {
          return data
      }   
      console.log(data,"return_value")
    }
    )
    var multiDataSetbody = []
    this.state.wk_mh_yr_Data.map((xldata,index)=>{
      if(index%2!==0){
        multiDataSetbody.push([{value:index+1,style:{alignment:{horizontal:"center"}}},
        {value:xldata.customer},
        {value:xldata.room_type},
        {value:xldata.cancel},
        {value:xldata.time},
       ])
      }
      else{
      multiDataSetbody.push([
        {value:index+1,style: {alignment:{horizontal:"center"},fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.customer,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.room_type,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.cancel,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.time,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
       ])
      }
    })

    const multiDataSet = [
      {
          columns: [
              {title: "S.No", width: {wpx: 35},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
              {title: "Customer", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}}, 
              {title: "Room Type", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
              {title: "Cancelled Date",width:{wpx: 100},style:{fill:{patternType: "solid", fgColor: {rgb: "86b149"}}}},
              {title: "Time", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
          ],
          data: multiDataSetbody      
      }
  ];
    return (
      <div className="mediaservicemaster">
        <Paper>
        {/* <div className="uploadsmasterheader"> */}
              {/* <div className="titleuser">CANCELLED BOOKINGS</div>
              <div className="doctorplus-container">
                <div className="cancel_group_buttons_div">
                
                
                  <Search
                    placeholder=" search "
                    onSearch={value => console.log(value)}
                    onChange ={(e)=>this.SearchData(e)}
                    style={{ width: 150 }}
                    className="search_box_container"
                    />
                    <div className="ml-2"><img className="header_icons" ></img>
                       <ReactSVG   
                       onClick={this.generatepdf}
                       src={pdf} 
                       style={{ marginRight: "15px", marginLeft: "15px" }}/>
                    </div>
                    <div className="">
                      <ExcelFile element={<ReactSVG src={excel} style={{ marginRight: "15px" }} />}>
                        <ExcelSheet dataSet={multiDataSet} name="Uploaded Details"/>
                    </ExcelFile>
                      </div>
                 
                <ReactToPrint
                        trigger={() => <ReactSVG src={print} />}
                        content={() => this.componentRef}
                      /> 
                  <div style={{ display: "none" }}>
                    <PrintData printTableData={this.state.wk_mh_yr_Data} ref={el => (this.componentRef = el)} />
                  </div>
                </div>
              </div> */}
        
          {/* </div> */}
      
        <CancelledTable 
             wk_mh_yr_Data={CancelsearchData.length ===  0 ? []: CancelsearchData}
             props_loading={this.state.props_loading}
             monthData={this.state.monthData}
             yearData={this.state.yearData}
             DayDataApi={this.DayDataApi}
          />
        <div className="Upload-modal-container">
         
        </div>
        </Paper>
      </div>
    );
  }
}
