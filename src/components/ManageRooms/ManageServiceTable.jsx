import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import "./ManageServiceTable.css";
import dateFormat from "dateformat";
import { Input, Select, Icon ,notification} from 'antd';
import ManageServiceModal from "./ManageServiceModal";
import Axios from "axios";
import DeleteMedia from "./DeleteMedia"
// import IconsModal from '../ManageService/IconsModal'
import{apiurl} from "../../App";
const current_date = dateFormat(new Date(), "dd mmm yyyy");

class DashboardTable extends React.Component {
  state = {
    openview: false,
    editopen:false,
    getTableData:[],
    tabledata:[],
    props_loading:false,
    editdetails:[],
    fulltabledata:[],
    // editoneTimeOpen:false,
    Search:null,
    deleteopen:false,
  };

  modelopen = (data,id) => {
    if (data === "view") {
      this.setState({ editopen: true });
    } else if (data === "edit") {
     var editdetails = this.state.fulltabledata.filter((data)=>{
       return data.roomId === id
      })
      this.setState({ editdetails:editdetails[0],editopen: true,
        // editoneTimeOpen:true
       });
    }
  };

  closemodal = () => {
    this.setState({ editopen: false, editopen: false,deleteopen:false });
  };
  componentDidMount(){
    this.getTableData();
    this.setState({props_loading:true})
  }

  UNSAFE_componentWillReceiveProps(newprops){
    console.log(newprops.searchData,"newprops")
    this.setState({
      search:newprops.searchData
    })
    if(newprops.getTableData){
      this.getTableData("Record Added Successfully")
      this.props.getTableDatafalse()
    }
  }

  getTableData =(notifymsg)=>{
    if(notifymsg){
      this.setState({
        props_loading:true
       })       
    }

    Axios({
      method:"post",
      url:apiurl+'getRoomDetails',
      data:{
        "roomVendorId":"18",
        "limit":1000,
        "pageno":1
      }
    })
    .then((response)=>{
      var tabledata =[]
      var fulltabledata =[]

      response.data.data[0].details.map((val,index)=>{
        tabledata.push({roomtype:val.br_room_type,roomname:val.br_room_name,quantity:val.br_quanity,
          change_per_day:val.br_charge_per_day,id:val.roomId}) 
        fulltabledata.push(val)     
      })
      this.setState({
        tabledata:tabledata,
        fulltabledata:fulltabledata,
        props_loading:false,
       }) 
       if(notifymsg){
        notification.success({
          description:notifymsg,
          placement:"topRight",
        });
       }   
    })

  }

  deleteopen=(data,id)=>{
    this.setState({deleteid:id,deleteopen:!this.state.deleteopen})
  }



  deleterow=()=>{
    Axios({
      method:"post",
      url:apiurl+'deleteRoomDetails',
      data:{
        "roomId":this.state.deleteid,
      }
    })
    .then((response)=>{
      if(response.data.status){
        this.getTableData("Record Deleted Successfully")
      }else{
        notification.success({
          description:response.data.msg,
          placement:"topRight",
        });
      }
      this.setState({
        deleteopen:!this.state.deleteopen,
      })
    }
    )
  }

  render() {

    const searchdata = []
    this.state.fulltabledata.filter((data,index) => {
      console.log(data,"datadata")
      if (this.state.search === undefined || this.state.search === null){
        searchdata.push({roomtype:data.br_room_type,roomname:data.br_room_name,quantity:data.br_quanity,
          change_per_day:data.br_charge_per_day,id:data.roomId})
      }
      else if (data.br_room_type !== null && data.br_room_type.toLowerCase().includes(this.state.search.toLowerCase()) || data.br_room_name !== null && data.br_room_name.toLowerCase().includes(this.state.search.toLowerCase()) || data.br_quanity.toString() !== null && data.br_quanity.toString().toLowerCase().includes(this.state.search.toLowerCase()) || data.br_charge_per_day.toString() !== null && data.br_charge_per_day.toString().toLowerCase().includes(this.state.search.toLowerCase())) {
        searchdata.push({
          roomtype: data.br_room_type,
          roomname: data.br_room_name,
          quantity: data.br_quanity,
          change_per_day:data.br_charge_per_day,
          id:data.roomId
        })
      }
  })

    return (
      <div>
  
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "roomtype", label: "Room Type" },
            { id: "roomname", label: "Room Name" },
            { id: "quantity", label: "Quantity" },
            { id: "change_per_day", label: "Charge/Day (KWD)" },
            { id: "", label: "Action" },
          ]}
          rowdata={searchdata}
          modelopen={(e,id) => this.modelopen(e,id)}
          VisibilityIcon={"close"}
          props_loading={this.state.props_loading}
          deleteopen={(e,id) => this.deleteopen(e,id)}
        />

        <Modalcomp
          visible={this.state.editdetails && this.state.editopen}
          xswidth={null}
          clrchange="text_clr_change"
          title={this.state.editdetails?"EDIT ROOMS":"ADD ROOMS"}
          // editData={this.state.editopen}
          // editopenModal ={this.state.editopen && true}
          closemodal={(e) => this.closemodal(e)} 
        >
          <ManageServiceModal
            closemodal={this.closemodal}
            editdetails={this.state.editdetails}
            getTableData={()=>this.getTableData("Record Modified Successfully")}
            // editoneTimeclose={()=>this.setState({editoneTimeOpen:false})}
            // editoneTimeOpen={this.state.editoneTimeOpen}
          />
        </Modalcomp>

        <Modalcomp  visible={this.state.deleteopen} title={"Delete Manage Package"} closemodal={this.closemodal} xswidth={"xs"}>
           <DeleteMedia deleterow={this.deleterow} closemodal={this.closemodal}  />
         </Modalcomp>

      </div>
    );
  }
}

export default DashboardTable;
