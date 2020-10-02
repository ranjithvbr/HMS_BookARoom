import React from 'react';
import {notification, Button} from 'antd';
// import icon_img from '../../Images/icon.svg';
import './IconsModal.css';
import { apiurl } from "../../App";
import axios from 'axios';

class IconsModal extends React.Component{
    state = { 
        visible: true,
        icons:[
          // {
          //   id:1,
          //   icon_img:<img src={icon_img} />,
          //   name:"tv"

          // },
          // {
          //   id:2,
          //   icon_img:<img src = {Car}/>,
          //   name:"car"
          // },
          // {
          //   id:3,
          //   icon_img:<img src = {Uploads}/>,
          //   name:"uploads"
          // },
          // {
          //   id:4,
          //   icon_img:<img src = {Android}/>,
          //   name:"android"
          // },
          // {
          //   id:5,
          //   icon_img:<img src = {StandWifi}/>,
          //   name:"stadwifi"
          // },
          // {
          //   id:6,
          //   icon_img:<img src = {Heart}/>,
          //   name:"heart"
          // },
          // {
          //   id:7,
          //   icon_img:<img src = {Glass}/>,
          //   name:"glass"
          // },
          // {
          //   id:8,
          //   icon_img:<img src = {Book}/>,
          //   name:"book"
          // },
          // {
          //   id:9,
          //   icon_img:<img src = {Simply}/>,
          //   name:"simply"
          // },
          // {
          //   id:10,
          //   icon_img:<img src = {Music}/>,
          //   name:"music"
          // },
          // {
          //   id:11,
          //   icon_img:<img src = {Wifi}/>,
          //   name:"wifi"
          // },
          // {
          //   id:12,
          //   icon_img:<img src = {Trolly}/>,
          //   name:"trolly"
          // },
          // {
          //   id:13,
          //   icon_img:<img src = {Lock}/>,
          //   name:"lock"
          // },
          // {
          //   id:14,
          //   icon_img:<img src = {CD}/>,
          //   name:"cd"
          // },
        ]
     };
iconclicked=(id,iconval)=>{
  this.setState({
    selecticon:id,
    selectimg:iconval,
  });
}

selectedicon=()=>{
  if(this.state.selectimg){
    this.props.selectedicon(this.state.selectimg)
    this.props.onClose()
  }else{
    notification.info({
      description:"Plaease select atleast one Facilities",
      placement:"topRight",
    });
  }

}

componentDidMount=()=>{
  this.getIcon()
}

getIcon=()=>{
  axios({
    method: 'post',
    url: apiurl + "getFacilityIcon",
    data:{
      "vendor_id":"18", 
    } 
})
.then((response) => {
  console.log(response,"icons")

  this.setState({
    icons:response.data.data
  })
})
}

uploadIcon=(e)=>{
  var formData = new FormData();

  formData.append('file_name', e.target.files[0]);
  formData.set("vendor_id","18");

  axios({
    method: 'post',
    url: apiurl + "insertFacilityIcon",
    data:formData
})
.then((response) => {
  console.log(response,"response")
  this.getIcon()
})
}

 

    render(){
      const TagData = this.props
      console.log(this.state.icons,"icons")
        return(
           <>
          <div >
            <div  className="overside" >
              <div className="row">
                {
                  this.state.icons.map((val)=>{
                    return(
                      <div className="col-sm-3 mt-3">
                        {
                         <div className={`${this.state.selecticon===val.id && "back_red"} border_icon `} onClick={(e)=>this.iconclicked(val.id,val)}>
                           <img src={ val.icon_name} />
                           </div>
                        }
                      </div>
                    )
                  })
                }
              </div>
           
              <div className ="add_more_icons_manage">
                  <p onClick={() => document.getElementById('seticon').click()} >Add more icons</p>
                  <input type="file" id="seticon" className="addmoreiconinput" accept=".jpg,.jpeg,.png" onChange={this.uploadIcon}/>
                  <Button className="iconmodel_ok"  onClick={this.selectedicon} >Ok</Button>
              </div>
              {/* <div>{this.state.val}</div> */}

            </div>  
      </div>
           </>
        )
    }
}
export default IconsModal;