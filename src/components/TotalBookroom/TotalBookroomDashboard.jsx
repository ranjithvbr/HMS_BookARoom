import React, { Component } from "react";
import "./TotalBookroomDashboard.css";
import { Select } from "antd";
import "antd/dist/antd.css";
import Moment from "react-moment";
import DashboardTable from "./TotalBookroomTable";
import { Input } from "antd";
import Button from '@material-ui/core/Button';

import dateFormat from 'dateformat';
import Labelbox from "../../helpers/labelbox/labelbox";
import Paper from '@material-ui/core/Paper';
import pdf from '../../Images/pdf.svg'
import excel from '../../Images/excel.svg'
import print from '../../Images/print.svg'
import axios from "axios";
import jsPDF from 'jspdf';
import ReactSVG from "react-svg";
import 'jspdf-autotable';

const current_date=(dateFormat(new Date(),"dd mmm yyyy"))


class TotalBookroomDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "rrr",
      open:false,
      WeekData:[],
      props_loading:true,
      wk_mh_yr_Data:[],
      yearData:[],
      Search:null,
      totalData:""
    };
  }

  // DayDataApi=()=>{
  //   var self = this
  //   axios({
  //       method: 'POST',
  //       url: 'http://52.200.251.222:8158/api/v1/BookRoom/gettotalroomsbooked',
  //       data:{
  //         "brvendorId":"18",
  //         "month":false,
  //         "week":false,
  //         "year":true,
  //         "searchContent":"false",
  //         "name":"",
  //         "date":"",
  //         "limit":10,
  //         "pageno":1
  //       }
  //   }).then((response) => {
  //     var  wk_mh_yr_Data=[]
  //       response.data.data[0].details.map((val) => {
  //         console.log(val,"val")
  //         wk_mh_yr_Data.push({customer:val.CustomerName,room_type:val.Roomtype,from_date:dateFormat(val.br_from_date,"dd mmm yyyy"),
  //         to_date:dateFormat(val.br_to_date,"dd mmm yyyy"),total_days:val.Noofdays,id:val.CustomerId})
  //       })
  //       self.setState({
  //         wk_mh_yr_Data,
  //         totalData:response.data.data[0].details,          
  //         props_loading: false,
         
  //       })
  //   }).catch((error) => {
  //       alert(JSON.stringify(error))
  //   })
  // }

  


  // generatepdf=()=>{
  //   const doc = new jsPDF("a3")
  //   var bodydata  = []
  //   this.state.wk_mh_yr_Data.map((data,index)=>{
  //     console.log(data,"dataaa")
  //     bodydata.push([index+1,data.customer,data.room_type,data.from_date,data.to_date,data.total_days])
  //   })
  //   doc.autoTable({
  //     beforePageContent: function(data) {
  //       doc.text("Uploaded Details", 15, 23); // 15,13 for css
  //       },
  //     margin: { top: 30 },
  //     showHead:"everyPage",
  //     theme:"grid",
  //     head: [['S.No', 'Customer', 'Room Type','From Date','To Date','Total Days']],
  //     body:bodydata,
  //   })
  //   doc.save('UploadDeatails.pdf') 
  // }

  render() {


    var multiDataSetbody = []
    this.state.wk_mh_yr_Data.map((xldata,index)=>{
      if(index%2!==0){
        multiDataSetbody.push([{value:index+1,style:{alignment:{horizontal:"center"}}},
        {value:xldata.customer},
        {value:xldata.room_type},
        {value:xldata.from_date},
        {value:xldata.to_date},
        {value:xldata.total_days}])
      }
      else{
      multiDataSetbody.push([
        {value:index+1,style: {alignment:{horizontal:"center"},fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.customer,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.room_type,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.from_date,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.to_date,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.total_days,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
       ])
      }
    })

    const multiDataSet = [
      {
          columns: [
              {title: "S.No", width: {wpx: 35},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
              {title: "Customer", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}}, 
              {title: "Room Type", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
              {title: "From date",width:{wpx: 100},style:{fill:{patternType: "solid", fgColor: {rgb: "86b149"}}}},
              {title: "To Date", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
              {title: "Total Days", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},


          ],
          data: multiDataSetbody      
      }
  ];
    // RENDERING
    return (
      <div className="dashboard_master">
        <Paper>
          
        
        <DashboardTable
    
            />
        </Paper>
      </div>
    );
  }
}

export default TotalBookroomDashboard;
