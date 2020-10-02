import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./ViewMedia.css";
import uploadimage from "../../Images/upload-button.png";
// import View from "../../Images/view_media.png";
// import Stepper from "../AdvertisementBooking/Stepper";


import Stepper from '../StepperStatus/Stepper';


// var storeImage = [];
var result = [];
export default class ViewMedia extends Component {

  constructor(props) {
    super(props)
    this.state = {
      imageUrl:""
    }
  }
  componentWillMount() {
    
    if(this.props.viewData.media_type === "Image") {
   
      let image = this.props.viewData.media_filename;
      var storeImage = image.split("/");
      result = storeImage[4].split("_");
      // result.split("_");


     

      this.setState({imageUrl:result[2]},() =>  console.log("sdfkjsdfhjsdhfds",this.state.imageUrl) )
    }
   
  }
  render() {
    const{viewData,viewopenModal} = this.props
    
    return (
      <div>
      {/* {" "} */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
       <div style={{ fontSize: "14px" }}>{this.props.viewData.media_title}</div>
       <p className="media_active">
         {this.props.viewData.is_active == 1 ?"Active" : "Non Active"}
         </p>
      </div>
      <Grid container>
        <Grid item xs={12} md={6} className="media_title_container">

          {viewData.media_type.toLowerCase() === "video" && 
          <div className="profile_media_div">
           
            <video src = {this.props.viewData.media_filename} type="video/mp4" controls className="img_uploader_edit"/>
            
 
          </div>
  }

        {viewData.media_type.toLowerCase() === "image" &&
             
      
           <div className="profile_media_div">
           
            <img src = {viewData.media_filename} className="img_uploader_edit" alt="break"/>


          </div>
           
  }

        </Grid>
        <Grid item xs={12} md={6} className="media_title_container">
           <div className="stepper__container">
          {/* <Stepper  /> */}
          </div>
        </Grid>
      </Grid>
    </div>
    );
  }
}