import React, { Component } from "react";
import "./RevenueMaster.css";
import "./Revenuedetails.css";
import "antd/dist/antd.css";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import { Input, notification } from "antd";
import "./Revenuedetails.css";
import dateFormat from 'dateformat';

import Pdf from '../../Images/pdf.svg';
import Print from '../../Images/print.svg';
import Excel from '../../Images/excel.svg';

import DateRangeSelect from "../../helpers/DateRange/DateRange";
import ReactToPrint from "react-to-print";
import ReactExport from 'react-data-export';
import PrintData from "./PrintData";
import ReactSVG from 'react-svg';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import { apiurl } from "../../App";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class RevenueMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      revenueTotal: 0,
      search: null,
      fromDate: dateFormat(new Date(), "yyyy-mm-dd"),
      toDate: dateFormat(new Date(), "yyyy-mm-dd")
    };
  }

  componentDidMount() {
    this.getRevenueData()
  }


  getRevenueData = () => {

    this.setState({
      props_loading: true,
    })
    axios({
      method: 'POST',
      url: apiurl + 'getRoomVendorRevenue',
      data: {
        "room_vendor_id": "18",
        "revenue_from": this.state.fromDate,
        "revenue_to": this.state.toDate,
      }
    }).then((response) => {
      console.log(response.data.data.result, "res")
      var tableData = [];
      response.data.data.result.map((val) => {
        console.log("sdfkshdfgsdhs", val)
        tableData.push({
          customer: val.customer,
          roomType: val.room_type,
          bookDate: dateFormat(val.book_date, "dd mmm yyyy"),
          cost: val.cost,
          cash: val.cash,
          card: val.card,
          wallet: val.wallet,
          totalCharge: val.total_charge,
          id: val.patient_id
        })
      })
      this.setState({props_loading:false})
      var totalAmount = 0
      for (var i in response.data.data.result) {
        totalAmount = response.data.data.result[i].total_charge + totalAmount
      }
      this.setState({
        props_loading: false,
        tableData: tableData,
        enableSearch: false,
        revenueTotal: totalAmount
      })
      this.setState({})

    })
  }

  getRangeDate = (item) => {
    console.log(item, "checking Date")
    this.setState({
      fromDate: dateFormat(item[0].startDate, "yyyy-mm-dd"),
      toDate: dateFormat(item[0].endDate, "yyyy-mm-dd")
    }, () => this.getRevenueData())
  }


  // PDF FUNCTION
  generatepdf = () => {
    if (this.state.tableData.length === 0) {
      notification.info({
        description:
          'No Data Found',
        placement: "topRight",
      });
    }
    else {
      const doc = new jsPDF("a3")
      var bodydata = []
      this.state.tableData.map((data, index) => {
        bodydata.push([index + 1, data.customer, data.roomType, data.bookDate, data.cost,
        data.cash,
        data.card,
        data.wallet,
        data.totalCharge
        ])
      })
      doc.autoTable({
        beforePageContent: function (data) {
          doc.text("Revenue Details", 15, 23); // 15,13 for css
        },
        margin: { top: 30 },
        showHead: "everyPage",
        theme: "grid",
        head: [['S.No', 'Customer', 'Room Type', 'Book Date', 'Cost', 'Cash', 'Card', 'Wallet', 'Total Charge']],
        body: bodydata,
      })

      doc.save('Revenue_Details.pdf')
    }
  }

  searchChange = (e) => {
    this.setState({
      search: e.target.value
    })
    this.setState({})
  }

  Notification=()=>{
    notification.info({
      description:
        'No Data Found',
        placement:"topRight",
    });
  }

  render() {
    const { Search } = Input;
    var searchData = [];
    console.log(this.state, "Search_data")
    searchData = this.state.tableData.filter((data) => {
      if (this.state.search === null)
        return data
      else if (data.customer !== null && data.customer.toLowerCase().includes(this.state.search.toLowerCase())
        || (data.roomType != null && data.roomType.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.bookDate != null && data.bookDate.toString().includes(this.state.search.toString()))
        || (data.cost != null && data.cost.toString().includes(this.state.search.toString()))
        || (data.cash != null && data.cash.toString().includes(this.state.search.toString()))
        || (data.card != null && data.card.toString().includes(this.state.search.toString()))
        || (data.wallet != null && data.wallet.toString().includes(this.state.search.toString()))
        || (data.totalCharge != null && data.totalCharge.toString().includes(this.state.search.toString()))

      ) {
        return data
      }
    })

    // EXCEL FUNCTION
    var multiDataSetbody = []
    this.state.tableData.map((xldata, index) => {
      if (index % 2 !== 0) {
        multiDataSetbody.push([{ value: index + 1, style: { alignment: { horizontal: "center" } } },
        { value: xldata.customer },
        { value: xldata.roomType },
        { value: xldata.bookDate },
        { value: xldata.cost },
        { value: xldata.cash },
        { value: xldata.card },
        { value: xldata.wallet },
        { value: xldata.totalCharge, style: { alignment: { horizontal: "center" } } }])
      } else {
        multiDataSetbody.push([
          { value: index + 1, style: { alignment: { horizontal: "center" }, fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.customer, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.roomType, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.bookDate, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.cost, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.cash, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.card, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.wallet, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.totalCharge, style: { alignment: { horizontal: "center" }, fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },])
      }
    })
    const multiDataSet = [
      {
        columns: [
          { title: "S.No", width: { wpx: 35 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Customer", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Room Type", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Book Date", width: { wpx: 90 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Cost", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Cash", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Card", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Wallet", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Total Charge", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },

        ],
        data: multiDataSetbody
      }
    ];
    return (
      <div className="doctor_revenue">
        <div className="uploadsmasterheader">
          <div className="patient_type_div"> <div className="titlerevenue">REVENUE</div></div>
          <div style={{ fontSize: "14px", display: "flex", alignItems: "center", }} >
            <DateRangeSelect dynalign={"dynalign"} rangeDate={(item) => this.getRangeDate(item)} />
            <Search
              placeholder="Search"
              onChange={(e) => this.searchChange(e)}
              style={{ width: 150 }}
              className="mr-2 ml-2"
            />

            <ReactSVG
              onClick={this.generatepdf}
              src={Pdf}
              style={{ marginRight: "15px", marginLeft: "15px",cursor:"pointer" }}
            />
            {this.state.tableData.length === 0 ? <ReactSVG onClick={this.Notification} src={Excel} style={{ marginRight: "15px",cursor:"pointer" }} /> :
              <ExcelFile element={<ReactSVG src={Excel} style={{ marginRight: "15px",cursor:"pointer" }} />}>
                <ExcelSheet dataSet={multiDataSet} name="Revenue Details" />
              </ExcelFile>}

            {this.state.tableData.length === 0 ?
              <ReactSVG src={Print} onClick={this.Notification} style={{cursor:"pointer"}} /> :
              <ReactToPrint
              style={{cursor:"pointer"}}
                trigger={() => <ReactSVG src={Print} />}
                content={() => this.componentRef}
              />}
            <div style={{ display: "none" }}><PrintData printTableData={this.state.tableData} ref={el => (this.componentRef = el)} /></div>
          </div>
        </div>
        <div>
          <Tablecomponent
            heading={[
              { id: "", label: "S.No" },
              { id: "customer", label: "Customer" },
              { id: "roomType", label: "Room Type" },
              { id: "bookDate", label: "Book Date" },
              { id: "cost", label: "Cost" },
              { id: "cash", label: "Cash" },
              { id: "card", label: "Card" },
              { id: "wallet", label: "Wallet" },
              { id: "totalCharge", label: "Total Charge (KWD)" },
            ]}
            rowdata={searchData}
            tableicon_align={""}
            modelopen={(e) => this.modelopen(e)}
            EditIcon="close"
            DeleteIcon="close"
            VisibilityIcon="close"
            grandtotal="total"
            props_loading={this.state.props_loading}
          />
        </div>
        <div className="revenueTotal">
            <span>Grand Total : {`${this.state.revenueTotal}`} KWD</span>
          </div>
      </div>
    );
  }
}

export default RevenueMaster;
