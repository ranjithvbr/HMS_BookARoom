import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./ManageServiceModal.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Air_condition from "../../Images/air condition.svg";
import { Card } from "@material-ui/core";
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import { Upload, message } from "antd";
import dateFormat from 'dateformat';
import { NavLink } from "react-router-dom";
import IconsModal from './IconsModal'
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import CloseIcon from '@material-ui/icons/Close';
import profile from '../../Images/1.jpg'
import ValidationLibrary from "../../helpers/validationfunction";
import Axios from "axios";
import { apiurl } from "../../App";
import { Tag, Select, Progress } from 'antd';
import icon_img from '../../Icons/baseline-airplay-24px.svg';
import Car from '../../Icons/car.svg'
import Uploads from '../../Icons/upload.svg';
import Android from '../../Icons/android.svg';
import StandWifi from '../../Icons/standwifi.svg';
import Heart from '../../Icons/heart.svg';
import Glass from '../../Icons/cheersglass.svg'
import Book from '../../Icons/book.svg'
import Simply from '../../Icons/Path 250.svg';
import Music from '../../Icons/music.svg';
import Wifi from '../../Icons/wifi.svg'
import Trolly from '../../Icons/trolly.svg'
import Lock from '../../Icons/lock.svg';
import CD from '../../Icons/cd.svg';
import UploadPic from '../../Images/uploadfile.png';
import { FiInfo } from "react-icons/fi";
import axios from 'axios';
const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  console.log(file, "file")
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === "video/mp4";
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG/MP4 file!');
  }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error('Image must smaller than 2MB!');
  // }
  // return isJpgOrPng && isLt2M;
  return isJpgOrPng;

}

const config = {
  onUploadProgress: progressEvent => console.log(progressEvent.loaded, "loader")
}

export default class ManageServiceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      images: [],
      editimages:[],
      editfinalimg:[],
      open: false,
      editopen: false,
      imageUrl: "",
      tagData: [],
      Roomnos: [],
      quantity_nos: [],
      selectedimg: "",
      finalimg: [],
      uploaderror:false,
      showprogress: false,
      progressstate: 0,
      deleteMediaList:[],
      Managerooms: {
        'room_type': {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
        },
        'room_name': {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
        },

        'no_of_rooms': {
          'value': 1,
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
        },
        'charge_day': {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
        },
        'from_date': {
          'value': dateFormat(new Date(), "yyyy-mm-dd"),
          validation: [{}],
          error: null,
          errmsg: null
        },
        'to_date': {
          'value': dateFormat(new Date(), "yyyy-mm-dd"),
          validation: [{}],
          error: null,
          errmsg: null
        },
      },
      Manageroomsadd: {
        'facilities': {
          'value': '',
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
        },
        'quantity': {
          'value': 1,
          validation: [{ 'name': 'required' }],
          error: null,
          errmsg: null
        },
      },

    }

  };

  componentDidMount() {
    this.getIcon()
    console.log(this.props.editdetails,"didmount")
    var { editdetails } = this.props
    console.log(editdetails,"didmount")

    if(editdetails){

      var edittagdata = []
      var editimgdata = []
      var deletefacility = []

      editdetails.facility.map((data)=>{
        edittagdata.push({icon:data.icon,facility:data.facilityName,facilityQty:data.facilityQuantity,facilityIconId:data.facilityIconId})
        deletefacility.push({faclityId:data.facilityId})
      })

      editdetails.mediaDetails.map((img)=>{
        editimgdata.push({id:img.id,img:img.br_upload_image})
      })

      this.state.Managerooms.charge_day.value=editdetails.br_charge_per_day
      this.state.Managerooms.room_type.value = editdetails.br_room_type
      this.state.Managerooms.room_name.value = editdetails.br_room_name
      this.state.Managerooms.no_of_rooms.value = editdetails.br_quanity
      this.state.Managerooms.from_date.value = dateFormat(editdetails.br_from_date, "yyyy-mm-dd")
      this.state.Managerooms.to_date.value = dateFormat(editdetails.br_to_date, "yyyy-mm-dd")
      this.setState({tagData:edittagdata,editimages:editdetails.mediaDetails,br_room_id:editdetails.roomId,imgVidlength:editdetails.mediaDetails.length,editfinalimg:editimgdata,deleteRoomFacility:deletefacility})
    }
  }



  // validation part
  checkValidation = () => {
    var Managerooms = this.state.Managerooms;
    var packageKeys = Object.keys(Managerooms);
    console.log(packageKeys);
    for (var i in packageKeys) {
      var errorcheck = ValidationLibrary.checkValidation(Managerooms[packageKeys[i]].value, Managerooms[packageKeys[i]].validation);
      console.log(errorcheck);
      Managerooms[packageKeys[i]].error = !errorcheck.state;
      Managerooms[packageKeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = packageKeys.filter((obj) =>
      Managerooms[obj].error == true);
    console.log(filtererr.length)

    var stateimgtrue = this.props.editdetails ? this.state.editimages.length === 0 :this.state.images.length === 0 

    if (filtererr.length > 0 || new Date(this.state.Managerooms.from_date.value) > new Date(this.state.Managerooms.to_date.value) ||  this.state.tagData.length === 0 || stateimgtrue) {
      
      this.state.Manageroomsadd.facilities.error = null
      
      if(this.state.images.length === 0 && stateimgtrue){
        this.setState({
          uploaderror:true
        })
      }

      if(this.state.editimages.length === 0){
        this.setState({
          uploaderror:true
        })
      }

      if(this.state.tagData.length === 0){
        this.setState({
          Facilitieserror:true
        })
      }

      if(new Date(this.state.Managerooms.from_date.value) > new Date(this.state.Managerooms.to_date.value)){
        console.log(new Date(this.state.Managerooms.from_date.value),"fromdate")
        console.log(new Date(this.state.Managerooms.to_date.value),"fromdate")
        this.state.Managerooms.to_date.error = true
        this.state.Managerooms.to_date.errmsg = "To Date should be greater then From Date"
      }
      this.setState({ error: true })
    } else {
      this.setState({ error: false })
      if(this.props.editdetails){
        this.updateData()
      }else{
      this.onSubmitData()
      }
    }
    this.setState({ Managerooms })

  }
  changeDynamic = (data, key) => {
    var Managerooms = this.state.Managerooms;
    var errorcheck = ValidationLibrary.checkValidation(data, Managerooms[key].validation);
    Managerooms[key].value = data;
    Managerooms[key].error = !errorcheck.state;
    Managerooms[key].errmsg = errorcheck.msg;
    this.setState({ Managerooms });


    if(key==="to_date"){
      if(new Date(this.state.Managerooms.from_date.value) > new Date(data)){
        this.state.Managerooms.to_date.error = true
        this.state.Managerooms.to_date.errmsg = "To Date should be greater then From Date"
      }
    }else if(key==="from_date"){

      if(new Date(this.state.Managerooms.to_date.value) < new Date(data)){
        this.state.Managerooms.to_date.error = true
        this.state.Managerooms.to_date.errmsg = "To Date should be greater then From Date"
      }else{
      this.state.Managerooms.to_date.error = null
      }
    }

    this.setState({})
  }

  checkValidationAdd = () => {
    var Manageroomsadd = this.state.Manageroomsadd;
    var packageKeys = Object.keys(Manageroomsadd);
    console.log(packageKeys);
    for (var i in packageKeys) {
      var errorcheck = ValidationLibrary.checkValidation(Manageroomsadd[packageKeys[i]].value, Manageroomsadd[packageKeys[i]].validation);
      Manageroomsadd[packageKeys[i]].error = !errorcheck.state;
      Manageroomsadd[packageKeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = packageKeys.filter((obj) =>
      Manageroomsadd[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })
      this.tagadd()
    }
    this.setState({ Manageroomsadd,Facilitieserror:false })

  }
  changeDynamicadd = (data, key) => {
    var Manageroomsadd = this.state.Manageroomsadd;
    var errorcheck = ValidationLibrary.checkValidation(data, Manageroomsadd[key].validation);
    Manageroomsadd[key].value = data;
    Manageroomsadd[key].error = !errorcheck.state;
    Manageroomsadd[key].errmsg = errorcheck.msg;
    this.setState({ Manageroomsadd,Facilitieserror:false });
    this.setState({})
  }

  tagadd = () => {

    var tagdata = { icon: this.state.selectedimg, facility: this.state.Manageroomsadd.facilities.value, facilityQty: this.state.Manageroomsadd.quantity.value, facilityIconId: this.state.facilityIconId, roomId: 1 }

    var tagData = []

    tagData.push(...this.state.tagData, tagdata)

    this.state.Manageroomsadd.facilities.value = ""
    this.state.Manageroomsadd.facilities.error = null
    this.state.Manageroomsadd.quantity.value = 1

    this.setState({ tagData: tagData, selectedimg: this.state.nochangeSelectedimg })

  }

  updateData=()=>{

    this.setState({ showprogress: true })

    var formData = new FormData();

    var roomFacility = []

    for (let j = 0; j < this.state.tagData.length; j++) {
      roomFacility.push(this.omit(this.state.tagData[j], ['icon']))
    }
    var noneedid = []

    this.state.editfinalimg.map((editdata,index)=>{
      this.state.deleteMediaList.map((deleteid)=>{
        if(deleteid.mediaId===editdata.id){
          this.state.editfinalimg.splice(index, 1)
        }
      })
    })


    this.state.editfinalimg.map((rejectdata,index)=>{
          formData.append('uploadFile', rejectdata.img)
    })

    // formData.append('uploadFile', productimages)
    formData.set("br_room_type", this.state.Managerooms.room_type.value);
    formData.set("br_room_name", this.state.Managerooms.room_name.value);
    formData.set("br_quanity", this.state.Managerooms.no_of_rooms.value);
    formData.set("br_charge_per_day", this.state.Managerooms.charge_day.value);
    formData.set("br_from_date", this.state.Managerooms.from_date.value);
    formData.set("br_to_date", this.state.Managerooms.to_date.value);
    formData.set("br_vendor_id", "18");
    formData.set("addRoomFacility", JSON.stringify(roomFacility));
    formData.set("deleteRoomFacility", JSON.stringify(this.state.deleteRoomFacility));
    formData.set("deleteMediaList", JSON.stringify(this.state.deleteMediaList));
    formData.set("roomId", this.state.br_room_id);

    console.log(formData,"formData")

    this.RoomUpdateApi(formData);
  }

  omit = (obj, arr) =>
    Object.keys(obj)
      .filter(k => !arr.includes(k))
      .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

  onSubmitData = () => {

    this.setState({ showprogress: true })

    var formData = new FormData();

    var roomFacility = []

    for (let j = 0; j < this.state.tagData.length; j++) {
      roomFacility.push(this.omit(this.state.tagData[j], ['icon']))
    }

    // let productimages = [];

    for (let i = 0; i < this.state.finalimg.length; i++) {
      // productimages.push(this.state.finalimg[i])
      formData.append('uploadFile', this.state.finalimg[i])
    }

    // formData.append('uploadFile', productimages)
    formData.set("br_room_type", this.state.Managerooms.room_type.value);
    formData.set("br_room_name", this.state.Managerooms.room_name.value);
    formData.set("br_quanity", this.state.Managerooms.no_of_rooms.value);
    formData.set("br_charge_per_day", this.state.Managerooms.charge_day.value);
    formData.set("br_from_date", this.state.Managerooms.from_date.value);
    formData.set("br_to_date", this.state.Managerooms.to_date.value);
    formData.set("br_vendor_id", "18");
    formData.set("roomFacility", JSON.stringify(roomFacility));

      this.RoomInsertApi(formData)

  }
  RoomInsertApi = (RoomApiData) => {

    axios.post(apiurl + 'addRooms',
      RoomApiData,
      {
        onUploadProgress: (progressEvent) => {
          this.setState({
            progressstate: parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 98))
          })
        }
      }
    )
      .then((response) => {
        console.log(response, "resss")
        this.setState({
          showprogress: false
        })
        this.props.closemodal()
        this.props.getTableData()

      })
  }

  RoomUpdateApi = (RoomUpdateData) => {

    axios.post(apiurl + 'editRooms',
    RoomUpdateData,
      {
        onUploadProgress: (progressEvent) => {
          this.setState({
            progressstate: parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 98))
          })
        }
      }
    )
      .then((response) => {
        console.log(response, "resss")
        this.setState({
          showprogress: false
        })
        this.props.getTableData()
        this.props.closemodal()
        
      })
  }


  uploadimgDel = (uploadindex) => {
    if(this.props.editdetails){

      var deleteuploadIMG = this.state.editimages.filter((data, index) => {
        return data.id !== uploadindex
      })

      var deleteMediaList = [...this.state.deleteMediaList,{mediaId:uploadindex}]
  
      // var deleteuploadIMGfinal = this.state.finalimg.filter((data, index) => {
      //   console.log("===>",index+this.state.imgVidlength+"imgadd")
      //   return index+this.state.imgVidlength+"imgadd" !== uploadindex
      // })

  
      this.setState({
        editimages: deleteuploadIMG,
        deleteMediaList:deleteMediaList,
        // finalimg: deleteuploadIMGfinal,
      })
    }else{
    var deleteuploadIMG = this.state.images.filter((data, index) => {
      return index !== uploadindex
    })

    var deleteuploadIMGfinal = this.state.finalimg.filter((data, index) => {
      return index !== uploadindex
    })

    this.setState({
      images: deleteuploadIMG,
      finalimg: deleteuploadIMGfinal,
    })
  }

  }

  tagClick = (tagindex) => {

    var deletetag = this.state.tagData.filter((data, index) => {
      return index !== tagindex
    })

    this.setState({
      tagData: deletetag
    })

  }

  handleClickopen = () => {
    this.setState({ open: true });
  };
  handleClickclose = () => {
    this.setState({ open: false });
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          images: [...this.state.images, imageUrl],
          loading: false,
        }),
      );
    }
    if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  Roomnos = () => {
    var rooms = [];
    for (let i = 1; i <= 50; i++) {
      rooms.push(i)
    }
    return rooms
  }

  quantity_nos = () => {
    var quantity = [];
    for (let i = 1; i <= 10; i++) {
      quantity.push(i)
    }
    return quantity
  }

  iconchoose = () => {
    this.setState({ open: !this.state.open })
  }

  uploadImgVid = (e) => {
    var imglength = this.state.editimages.length
    var self = this
    var file = e.target.files[0];
    var fileReader = new FileReader();
    if (file.type.match('image')) {
      fileReader.onload = function () {
        var img = document.createElement('img');
        img.src = fileReader.result;
        console.log(img.src, "fileresult")
        self.setState({ images: [...self.state.images, img.src], finalimg: [...self.state.finalimg, file],editfinalimg: [...self.state.editfinalimg, {id:imglength+"imgadd",img:file}],uploaderror:false,editimages: [...self.state.editimages, {br_upload_image:img.src,id:imglength+"imgadd"}]})
        document.getElementById('roomimg').appendChild(img);
      };
      fileReader.readAsDataURL(file);
    } else {
      fileReader.onload = function () {
        var blob = new Blob([fileReader.result], { type: file.type });
        var url = URL.createObjectURL(blob);
        var video = document.createElement('video');
        var timeupdate = function () {
          if (snapImage()) {
            video.removeEventListener('timeupdate', timeupdate);
            video.pause();
          }
        };
        video.addEventListener('loadeddata', function () {
          if (snapImage()) {
            video.removeEventListener('timeupdate', timeupdate);
          }
        });
        var snapImage = function () {
          var canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          var image = canvas.toDataURL();
          console.log(image, "fileresult")
          self.setState({ images: [...self.state.images, image], finalimg: [...self.state.finalimg, file],editfinalimg: [...self.state.editfinalimg, {id:imglength+"imgadd",img:file}],uploaderror:false,editimages: [...self.state.editimages,{br_upload_image:image,id:imglength+"imgadd"}] })


          var success = image.length > 100000;
          if (success) {
            var img = document.createElement('img');
            img.src = image;
            document.getElementById('roomimg').appendChild(img);
            URL.revokeObjectURL(url);
          }
          return success;
        };
        video.addEventListener('timeupdate', timeupdate);
        video.preload = 'metadata';
        video.src = url;
        // Load video in Safari / IE11
        video.muted = true;
        video.playsInline = true;
        video.play();
      };
      fileReader.readAsArrayBuffer(file);
    }
  }

  getIcon = () => {
    axios({
      method: 'post',
      url: apiurl + "getFacilityIcon",
      data: {
        "vendor_id": "18",
      },
      config
    })
      .then((response) => {
        console.log(response, "icons")

        this.setState({
          icons: response.data.data,
          nochangeSelectedimg: response.data.data[0].icon_name,
          selectedimg: response.data.data[0].icon_name,
          facilityIconId: response.data.data[0].id
        })
      })
  }

  managecancel=()=>{
    this.state.Managerooms.room_type.value = ""
    this.state.Managerooms.room_type.error = null

    this.state.Managerooms.room_name.value = ""
    this.state.Managerooms.room_name.error = null

    this.state.Manageroomsadd.facilities.value = ""
    this.state.Manageroomsadd.quantity.value = 1
    this.state.Managerooms.no_of_rooms.value = 1
    this.state.Managerooms.charge_day.value = ""
    this.state.Managerooms.from_date.value = dateFormat(new Date(), "yyyy-mm-dd")

    this.state.Managerooms.to_date.value = dateFormat(new Date(), "yyyy-mm-dd")
    this.state.Managerooms.to_date.error = null


    this.setState({
      selectedimg:false,
      tagData:[],
      images:[],
      finalimg:[]
    })
    // this.props.closemodal()
  }

  selectedIcon = (data) => {
    console.log(data, "selectedIcon")
    this.setState({ selectedimg: data.icon_name, selectedimgdetails: data, facilityIconId: data.id })
  }

  render() {
    console.log(this.state.Managerooms.no_of_rooms.value, "no_of_rooms")
    return (

      <div className="manage_service">
        {this.state.showprogress &&
          <Progress type="circle" percent={this.state.progressstate} width={80} className="progressbar_align" />}

        <Grid container spacing={2}>
          {/*FIRST GRID  */}
          <Grid item md={5} sm={12}>
            <Grid container>
              <Grid item md={5} sm={4} className="mr-4">
                <div className="clinictotal_div w-100">
                  <Labelbox className="label-box"
                    labelname="Room Type"
                    type="text"
                    changeData={(data) => this.changeDynamic(data, 'room_type')}
                    value={this.state.Managerooms.room_type.value}
                    error={this.state.Managerooms.room_type.error}
                    errmsg={this.state.Managerooms.room_type.errmsg} />
                </div>
              </Grid>
              {/* <Grid item md={1}/> */}
              <Grid item md={5} sm={4}>
                <div className="clinictotal_div w-100">
                  <Labelbox className="label-box"
                    labelname="Room Name"
                    type="text"
                    changeData={(data) => this.changeDynamic(data, 'room_name')}
                    value={this.state.Managerooms.room_name.value}
                    error={this.state.Managerooms.room_name.error}
                    errmsg={this.state.Managerooms.room_name.errmsg}
                  />

                </div>
              </Grid>
              <Grid item md={5} sm={4} className="mt-3">
                <div className="clinictotal_div w-100">
                  <Labelbox className="label-box"
                    labelname="Facilities"
                    type="text"
                    changeData={(data) => this.changeDynamicadd(data, 'facilities')}
                    value={this.state.Manageroomsadd.facilities.value}
                    error={this.state.Manageroomsadd.facilities.error}
                    errmsg={this.state.Manageroomsadd.facilities.errmsg}
                  />
                </div>
                {this.state.Facilitieserror ? <div className="facilities_error">Please add atleast one Facilities</div>:<div className="uploadImgVid_errorheight"></div>}
              </Grid>
              {/* <Grid item md={1}/> */}
              <Grid item md={3} sm={4} className="mt-3 ml-4">
                <div className="clinictotal_div w-100">
                  <Labelbox className="label-box"
                    labelname="Quantity"
                    type="select"
                    changeData={(data) => this.changeDynamicadd(data, 'quantity')}
                    value={this.state.Manageroomsadd.quantity.value}
                    error={this.state.Manageroomsadd.quantity.error}
                    errmsg={this.state.Manageroomsadd.quantity.errmsg}
                    dropdown={this.quantity_nos()}>
                  </Labelbox>

                </div>
              </Grid>
              <Grid item md={1} sm={4} className="mt-3 ml-4">
                <label className="ac_icon">Icon</label>
                <div className="border_adjust" onClick={this.iconchoose} >
                  <img className="air_condition" src={this.state.selectedimg ? this.state.selectedimg : this.state.icons && this.state.icons[0].icon_name} />
                </div>
              </Grid>
              <Grid item md={1} sm={2} className="icon_color">
                <AddBoxSharpIcon className="addicon_color" onClick={this.checkValidationAdd} />
              </Grid>

              <div className={"tag_master"}>
                {this.state.tagData.map((val, index) => {
                  return (
                    <div className="tag_container">
                      <img src={val.icon} />
                      <div className="tag_name">{val.facility}</div>
                      <div className="tag_quantity">{"\xa0" + "-" + "\xa0" + val.facilityQty + "\xa0\xa0"}</div>
                      <CloseIcon className="tag_close" onClick={() => this.tagClick(index)} />
                    </div>
                  )
                })}
              </div>

            </Grid>
          </Grid>
          {/* SECOND DATA */}
          <Grid item md={6} sm={12} className="ml-5">
            <Grid container className="media_adjust">
              <Grid item md={4} sm={4} >
                <div className="clinictotal_div w-100 ">
                  <Labelbox className="label-box" labelname="No.of Rooms"
                    type="select"
                    changeData={(data) => this.changeDynamic(data, 'no_of_rooms')}
                    value={this.state.Managerooms.no_of_rooms.value?this.state.Managerooms.no_of_rooms.value:null}
                    dropdown={this.Roomnos()}>
                  </Labelbox>

                </div>
              </Grid>
              <Grid md={1} />
              <Grid item md={4} sm={4} className="">
                <div className="clinictotal_div w-100 charge_day">
                  <Labelbox className="label-box"
                    labelname="Charge/Day"
                    type="number"
                    changeData={(data) => this.changeDynamic(data, 'charge_day')}
                    value={this.state.Managerooms.charge_day.value}
                    error={this.state.Managerooms.charge_day.error}
                    errmsg={this.state.Managerooms.charge_day.errmsg}
                  />
                  <div className="kwd_align_manage"><span>KWD</span></div>
                </div>
              </Grid>
              <Grid md={1} />
              <Grid item md={4} sm={4} className="mt-3">
                <div className="clinictotal_div w-100">
                  <Labelbox className="label-box"
                    labelname="From Date"
                    type="datepicker"
                    changeData={(data) => this.changeDynamic(data, 'from_date')}
                    minDate={new Date()}
                    value={this.state.Managerooms.from_date.value}
                    error={this.state.Managerooms.from_date.error}
                    errmsg={this.state.Managerooms.from_date.errmsg} />
                </div>
              </Grid>
              <Grid md={1} />
              <Grid item md={4} sm={4} className="mt-3">
                <div className="clinictotal_div w-100 todateerrmsg_room">
                  <Labelbox className="label-box"
                    labelname="To Date"
                    type="datepicker"
                    changeData={(data) => this.changeDynamic(data, 'to_date')}
                    minDate={new Date()}
                    value={this.state.Managerooms.to_date.value}
                    error={this.state.Managerooms.to_date.error}
                    errmsg={this.state.Managerooms.to_date.errmsg}
                  />
                </div>
              </Grid>
              <Grid item md={12} sm={12}>

                <div className="uploadImgVid_label">Upload Image / Video</div>

                <div onClick={() => document.getElementById('getFile').click()} className="uploadImgVid_master">
                  <div className="browse_master">
                    <p>My Image.png</p>
                    <p className="browse_button">Browse</p>
                  </div>
                </div>

                {this.state.uploaderror ? <div className="uploadImgVid_error">Please add atleast one Image/Video</div>:<div className="uploadImgVid_errorheight"></div>}

                <input type="file" id="getFile" accept=".jpg,.png,.jpeg,.mp4" className="fileupload" onChange={this.uploadImgVid} />

                {!this.props.editdetails ?
                  <Grid container spacing={1} className={this.state.images.length > 0 && "roomupload_legend"}>

                  {
                    <div className="room_master">
                      {
                        this.state.images.map((img, index) => {
                          return (
                            <div className="presc_images">
                              <CloseIcon className="close_icon_addmodal_manage" onClick={() => this.uploadimgDel(index)} />
                              <div>
                                {
                                img.endsWith(".mp4")?
                                <video className="div_video_browse">
                                <source src={img} type="video/mp4" />
                              </video>:
                                <img src={img} id="roomimg" className="div_image_browse" />
                          }
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  }

                </Grid>
                :
                <Grid container spacing={1} className={this.state.editimages.length > 0 && "roomupload_legend"}>

                  {
                    <div className="room_master">
                      {
                        this.state.editimages.map((img, index) => {
                          console.log(img,"imgimg")
                          return (
                            <div className="presc_images">
                              <CloseIcon className="close_icon_addmodal_manage" onClick={() => this.uploadimgDel(img.id?img.id:index+"delimg")} />
                              <div>
                                {
                                img.br_upload_image.endsWith(".mp4")?
                                <video className="div_video_browse">
                                <source src={img.br_upload_image} type="video/mp4" />
                              </video>:
                                <img src={img.br_upload_image} id="roomimg" className="div_image_browse" />
                          }
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  }

                </Grid>}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={6} sm={12} className="button_grid">
            <div className="clinicbutton-container">
              <Button className="clinicCancel" onClick={this.managecancel} >Cancel</Button>
              {!this.props.editdetails?
              <Button className="clinicSubmit" onClick={this.checkValidation}>Submit</Button>
              :
              <Button className="clinicSubmit" onClick={this.checkValidation}>Update</Button>
              }
            </div>
          </Grid>
        </Grid>

        <Modalcomp visible={this.state.open} xswidth={"md"} modelwidthClass={"iconmodel_baralign"} clrchange="text_clr_change" title={"Facility Icons"} closemodal={(e) => this.iconchoose(e)}>
          <IconsModal className="iconmodal_modal" open={this.state.open} selectedicon={(data) => this.selectedIcon(data)} onClose={this.iconchoose} />
        </Modalcomp>

      </div>
    );
  }
}
