import React from "react";
import "./printdata.css"

export default class PrintData extends React.Component {
    render() {
        console.log(this.props.printTableData,"printTableData")
        var printBodyData = this.props.printTableData.map((printdata,index)=>{
            return(
                <tr>
              <td>{index+1}</td>
              <td>{printdata.customer}</td>
              <td>{printdata.room_type}</td>
              <td>{printdata.cancel}</td>
              <td>{printdata.time}</td>
            </tr>
            )
        })

      return (
          <div className="printtabledata">
              <div className="printDataTitle">Uploaded Details</div>
        <table>
          <thead>
            <th>S.No</th>
            <th>Customer</th>
            <th>Room Type</th>
            <th>Cancelled Date</th>
            <th>Time</th>
          </thead>
          <tbody>
          {printBodyData}
          </tbody>
        </table>
        </div>
      );
    }
  }