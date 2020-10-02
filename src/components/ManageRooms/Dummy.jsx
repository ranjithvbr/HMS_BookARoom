// import React, { Component } from "react";
// import Grid from "@material-ui/core/Grid";
// import Labelbox from "../../helpers/labelbox/labelbox";
// import Button from "@material-ui/core/Button";
// import "./ManageServiceModal.css";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Air_condition from "../../Images/air condition.svg";
// import { Card } from "@material-ui/core";
// import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
// import { Upload, message } from "antd";
// import dateFormat from 'dateformat';
// import { NavLink } from "react-router-dom";
// import IconsModal from './IconsModal'
// import Modalcomp from "../../helpers/ModalComp/Modalcomp";
// import CloseIcon from '@material-ui/icons/Close';
// import profile from '../../Images/1.jpg'
// import ValidationLibrary from "../../helpers/validationfunction";
// import Axios from "axios";
// import {apiurl} from "../../App";
// import {Tag} from 'antd';


// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

// function beforeUpload(file) {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJpgOrPng && isLt2M;
// }

// export default class ManageServiceModal extends Component {
//   constructor(props) {
//    super(props);
//      this.state = {
//       loading: false,
//       images:[],
//       open:false,
//       editopen:false,
//       imageUrl:"",
//       tagData:[],
//       Managerooms:{
//        'room_type':{
//         'value': '',
//         validation: [{ 'name': 'required' }],
//         error: null,
//         errmsg: null
//       },
//       'room_name':{
//        'value': '',
//         validation: [{ 'name': 'required' }],
//         error: null,
//         errmsg: null
//       },
//       'facilities':{
//         'value': '',
//         validation: [{}],
//         error: null,
//         errmsg: null
//       },
//       'quantitity':{
//           'value': '',
//            validation: [{ }],
//            error: null,
//            errmsg: null
//       },
//         'no_of_rooms':{
//           'value': '',
//            validation: [{ }],
//            error: null,
//            errmsg: null
//       },
//         'charge_day':{
//           'value': '',
//            validation: [{ }],
//            error: null,
//            errmsg: null
//        },
//         'from_date':{
//           'value': '',
//            validation: [{ }],
//            error: null,
//            errmsg: null
//        },
//         'to_date':{
//           'value': '',
//            validation: [{ }],
//            error: null,
//            errmsg: null
//         },      
//     }
//   }
//   };

  
//   componentDidMount() { 
//     // Assigning Edit Data
//     console.log(this.state.editData,"totaldata")
//     const {editData,editopenModal} = this.props;    
//     }


//     // validation part
//     checkValidation = () => {
//       var Managerooms = this.state.Managerooms;
//       var packageKeys = Object.keys(Managerooms);
//       console.log(packageKeys);
//       for (var i in packageKeys) {
//           var errorcheck = ValidationLibrary.checkValidation(Managerooms[packageKeys[i]].value, Managerooms[packageKeys[i]].validation);
//           console.log(errorcheck);
//           Managerooms[packageKeys[i]].error = !errorcheck.state;
//           Managerooms[packageKeys[i]].errmsg = errorcheck.msg;
//       }
//       var filtererr = packageKeys.filter((obj) =>
//       Managerooms[obj].error == true);
//       console.log(filtererr.length)
//       if (filtererr.length > 0) {
//           this.setState({ error: true })
//       } else {
//           this.setState({ error: false })
//           this.onSubmitData()
//       }
//       this.setState({ Managerooms })
//   }
//   changeDynamic = (data, key) => { 
//       var Managerooms = this.state.Managerooms;
//       var errorcheck = ValidationLibrary.checkValidation(data, Managerooms[key].validation);
//       Managerooms[key].value = data;
//       Managerooms[key].error = !errorcheck.state;
//       Managerooms[key].errmsg = errorcheck.msg;
//       this.setState({ Managerooms });
//       this.setState({})
//   }
//   onSubmitData=()=>{
//     // alert("ed")
//     var RoomApiData={
//       br_room_type:this.state.Managerooms.room_type,
//       br_room_name:this.state.Managerooms.room_name,
//       br_quanity:this.state.Managerooms.quantitity,
//       br_charge_per_day:this.state.Managerooms.charge_day,
//       br_from_date:this.state.Managerooms.from_date,
//       br_to_date:this.state.Managerooms.to_date,
//       br_vendor_id:18,
//       roomFacility:this.state.Managerooms.facilities,
//       uploadFile:this.state.imageUrl
//     }
  

//     if(this.props.editData){
//       this.PackageUpdateApi()   // Update Api Call
//     }else{
//       this.RoomInsertApi(RoomApiData)
//       // Insert Api Call
//     }
//     this.props.closemodal()
  
//   }
//   RoomInsertApi =(RoomApiData)=>{
//     alert("dd")
//     Axios({
//       method:"POST",
//       url:apiurl+'addRooms',
//       data:{
//         ...RoomApiData
//       }
//     })
//     .then((response)=>{
//       console.log(response,"resss")
//     })
//   }



//   handleClickopen = () => {
//     this.setState({ open: true });
//   };
//   handleClickclose = () => {
//     this.setState({ open: false });
//   };

//   handleChange = info => {
//     if (info.file.status === 'uploading') {
//       this.setState({ loading: true });
//       return;
//     }
//     if (info.file.status === 'done') {
//       // Get this url from response in real world.
//       getBase64(info.file.originFileObj, imageUrl =>
//         this.setState({
//           images: [...this.state.images,imageUrl],
//           loading: false,
//         }),
//       );
//     }
//   };
//   render() {
//     const uploadButton = (
//       <div>
//         {this.state.loading ? <></> : <></>}
//       </div>
//     );
//     const { imageUrl } = this.state;
//     const Current_date=(dateFormat(new Date(),"dd mmm yyyy"))
//     return (
//       <div className="manage_service">
//          <Grid container spacing={2}>
// {/*FIRST GRID  */}
//            <Grid item md={5} sm={12}>
//              <Grid container>
//                 <Grid item md={5} sm={4}>
//                   <div className="clinictotal_div w-100">
//                       <Labelbox className="label-box"
//                        labelname="Room Type" 
//                        type="text"
//                        changeData={(data) => this.changeDynamic(data, 'room_type')}
//                        value={this.state.Managerooms.room_type.value}
//                        error={this.state.Managerooms.room_type.error}
//                        errmsg={this.state.Managerooms.room_type.errmsg}  />
//                   </div>
//                 </Grid>
//                 <Grid item md={1}/>
//                 <Grid item md={5} sm={4}>
//                   <div className="clinictotal_div w-100">
//                     <Labelbox className="label-box" 
//                       labelname="Room Name" 
//                       type="text"
//                       changeData={(data) => this.changeDynamic(data, 'room_name')}
//                       value={this.state.Managerooms.room_name.value}
//                       error={this.state.Managerooms.room_name.error}
//                       errmsg={this.state.Managerooms.room_name.errmsg}
//                     />
                
//                   </div>
//                  </Grid>
//                   <Grid item md={5} sm={4} className="mt-3">
//                       <div className="clinictotal_div w-100">
//                         <Labelbox  className="label-box" 
//                           labelname="Facilities"  
//                           type="text" 
//                           changeData={(data) => this.changeDynamic(data, 'facilities')}
//                           value={this.state.Managerooms.facilities.value}
//                           error={this.state.Managerooms.facilities.error}
//                           errmsg={this.state.Managerooms.facilities.errmsg} 
//                         />
//                       </div>
//                     </Grid>
//                     <Grid item md={1}/>
//                     <Grid item md={2} sm={4} className="mt-3">
//                       <div className="clinictotal_div w-100">
//                         <Labelbox className="label-box" 
//                           labelname="Quantitity" 
//                           type="select"
//                           changeData={(data) => this.changeDynamic(data, 'quantitity')}
//                           value={this.state.Managerooms.quantitity.value}
//                           error={this.state.Managerooms.quantitity.error}
//                           errmsg={this.state.Managerooms.quantitity.errmsg} 
//                         />
//                       </div>
//                     </Grid>
//                     <Grid item md={1} sm={4} className="mt-3 ml-4">
//                     <label className="ac_icon">Icon</label>
//                       <div className="border_adjust">
//                        <img className="air_condition" src={Air_condition} alt={"chill"} />
//                       </div>
//                   </Grid>
//                   <Grid item md={2} sm={2} className="icon_color">
//                       <AddBoxSharpIcon className="addicon_color" onClick={this.handleClickopen} />
//                   </Grid>
//                   <div>
//                     <Tag closable>
//                       <span></span>
//                     </Tag>
//                   </div>
               
//               </Grid>
//             </Grid>
// {/* SECOND DATA */}
//         <Grid item md={6} sm={12} className="ml-5">
//            <Grid container className="media_adjust">
//               <Grid item md={4} sm={4} >
//                 <div className="clinictotal_div w-100 ">
//                    <Labelbox className="label-box"
//                       labelname="No.of Rooms"
//                       type="select"
//                       changeData={(data) => this.changeDynamic(data, 'no_of_rooms')}
//                       value={this.state.Managerooms.no_of_rooms.value}
//                       error={this.state.Managerooms.no_of_rooms.error}
//                       errmsg={this.state.Managerooms.no_of_rooms.errmsg} 
//                      />
//                 </div>
//               </Grid>
//               <Grid md={1}/>
//               <Grid item md={4} sm={4} className="">
//                 <div className="clinictotal_div w-100 charge_day">
//                   <Labelbox className="label-box" 
//                     labelname="Charge/Day" 
//                     type="number"
//                     changeData={(data) => this.changeDynamic(data, 'charge_day')}
//                     value={this.state.Managerooms.charge_day.value}
//                     error={this.state.Managerooms.charge_day.error}
//                     errmsg={this.state.Managerooms.charge_day.errmsg} 
//                   />
//                   <div className ="kwd_align_manage"><span>KWD</span></div>
//                 </div>
//               </Grid>
//               <Grid md={1}/>
//               <Grid item md={4} sm={4} className="mt-3">
//                 <div className="clinictotal_div w-100">
//                   <Labelbox className="label-box" 
//                     labelname="From Date"
//                     type="datepicker"
//                     changeData={(data) => this.changeDynamic(data, 'from_date')}
//                     value={this.state.Managerooms.from_date.value}
//                     error={this.state.Managerooms.from_date.error}
//                     errmsg={this.state.Managerooms.from_date.errmsg} />
//                  </div>
//               </Grid>
//               <Grid md={1}/>
//               <Grid item md={4} sm={4} className="mt-3">
//                 <div className="clinictotal_div w-100">
//                   <Labelbox   className="label-box" 
//                     labelname="To Date"
//                     type="datepicker"
//                     changeData={(data) => this.changeDynamic(data, 'to_date')}
//                     value={this.state.Managerooms.to_date.value}
//                     error={this.state.Managerooms.to_date.error}
//                     errmsg={this.state.Managerooms.to_date.errmsg} 
//                    />
//                  </div>
//               </Grid>
//               <Grid item md={8} sm={4}>
//                 <div className="presc_labelbox">
//                      <div className="presc_inputbox">
          
//                         <label className="ac_icon">Upload image/Video</label>
//                        <Upload className="presc_browse_files"
//                           name="avatar"
//                           listType="picture-card"
//                           // className="avatar-uploader"
//                           showUploadList={false}
//                           multiple={true}
//                           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//                           beforeUpload={beforeUpload}
//                           onChange={this.handleChange}
//                         >                      
//                             {/* <div> */}
//                                 {/* <input type="text"></input> */}
//                                 {/* <p>Click here!!!</p> */}
//                             {/* </div> */}
//                           <Button className="browse_button">Browse</Button>
//                         </Upload>
//                      </div>
//                 </div>
//                 <Grid container spacing={1} className ="">
                
//                  {
//                    this.state.images ? this.state.images.map((img) => (
//                      <div className ="row">
//                       <div className ="col-sm-4 card_align_manage">
//                         <div className ="card "> 
                      
//                         <div className="presc_images">
                     
//                             <CloseIcon className="close_icon_addmodal_manage"/>
//                             <div>
//                                <img src={img}  className ="div_image_browse"/>
//                             </div>
//                       </div>
                    
//                       </div>
//                       </div>

//                      </div>
                
//                    )) : uploadButton
//                  }
                     
//                  </Grid>
//               </Grid>
//             </Grid>
//         </Grid>
//       </Grid>

      
//             <Grid container>
//               <Grid item md={6} sm={12} className="button_grid">
//                <div className="clinicbutton-container">
//                   <Button className="clinicCancel"  onClick={this.props.closemodal} >Cancel</Button>
//                   <Button className="clinicSubmit"  onClick={this.checkValidation}>Submit</Button>
//                </div>
//               </Grid>
//              </Grid>
          
//              <Modalcomp  visible={this.state.open}  xswidth={"md"}  clrchange="text_clr_change" title={""} closemodal={(e)=>this.handleClickclose(e)}>
//                  <IconsModal className="iconmodal_modal" open={this.state.open} onClose={this.handleClickclose}/>
//              </Modalcomp>
    
//       </div>
//     );
//   }
// }


import React from 'react';
import Grid from '@material-ui/core/Grid';
import './RecruitmentAddForm.css'
import { Tag } from 'antd'
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Inputantd from '../../../formcomponent/inputantd';
import ReactSelect from '../../../formcomponent/ReactSelect';
import Button from 'react-bootstrap/Button';
import ValidationLibrary from "../../../validationlibrary/validation.js";
import { connect } from 'react-redux';
import { getLanguages, getSpecialization, getCertification, getLicenses, getQualification, generateTicket } from './RecruitmentAction';
import { getSkills } from '../create_resume/CreateResumeAction';

class RecruitmentTicket extends React.Component {

    state = {
        placeholderMin:"Min",
        placeholderMax:"Max",
        certification: ['-', '-'],
        expcount_one:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
        expcount_two:[26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],
        expcount:[expcount_one + expcount_two],
        template: [
            {
                id: 1,
                value: 'Senior Counsel'
            },
            {
                id: 2,
                value: 'Junior Counsel'
            }
        ],
        searchIn: [
            {
                id: 1,
                value: 'Database'
            },
            {
                id: 2,
                value: 'Ex Employee'
            },
            {
                id: 2,
                value: 'Interns'
            }
        ],
        gender: [
            {
                id: 1,
                value: 'Male'
            },
            {
                id: 2,
                value: 'Female'
            },
        ],
        languages: ['Tamil', 'English',],
        specilization: ['-', '-', '-'],
        licenses: ['-', '-', '-'],
        skillset: ['Labour Law', 'Arbitration'],
        changeval: true,
        recruitmentTicketData:
        {
            'tempId':
            {
                'value': '',
                validation: [{ 'name': 'required' }, { 'name': '' }],
                error: "",
                errmsg: null
            },
            'qualifyId':
            {
                'value': '',
                validation: [{ 'name': '' }],
                error: null,
                errmsg: null
            },
            'minage':
            {
                'value': '',
                validation: [{ name: 'allowNumaricOnly' }],
                error: null,
                errmsg: null
            },
            'maxage':
            {
                'value': '',
                validation: [{ name: 'allowNumaricOnly' }],
                error: null,
                errmsg: null
            },
            'minexp':
            {
                'value': '',
                validation: [{ name: 'allowNumaricOnly' }],
                error: null,
                errmsg: null
            },
            'maxexp':
            {
                'value': '',
                validation: [{ name: 'allowNumaricOnly' }],
                error: null,
                errmsg: null
            },
            'noOfcandidates':
            {
                'value': '',
                validation: [{ name: 'allowNumaricOnly' }],
                error: null,
                errmsg: null
            },
            'searchIn':
            {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
            'gender':
            {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
            'certId':
            {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
            'langId':
            {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
            'specId':
            {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
            'liceId':
            {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
            'skillId':
            {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
        }
    }

    componentWillMount() {
        this.props.dispatch(getLanguages());
        this.props.dispatch(getSpecialization());
        this.props.dispatch(getCertification())
        this.props.dispatch(getLicenses());
        this.props.dispatch(getQualification())
        this.props.dispatch(getSkills())
    }


    changeDynamic = (data, key) => {
        var myKey = ["searchIn", "gender", "certId", "langId", "specId", "liceId", "skillId"]

        console.log("key", key);
        console.log("data", data);
        var recruitmentTicketData = this.state.recruitmentTicketData;
        var targetkeys = Object.keys(recruitmentTicketData);

        var errorcheck = ValidationLibrary.checkValidation(data, recruitmentTicketData[key].validation);
        recruitmentTicketData[key].value = data;
        // for (var i in myKey) {
        //     if (key === myKey[i]) {
        //         recruitmentTicketData[key].value = data.map(val => val.id);
        //         alert(JSON.stringify(recruitmentTicketData[key].value=data.map(val => val.id)))
        //     }
        // }
        recruitmentTicketData[key].error = !errorcheck.state;
        recruitmentTicketData[key].errmsg = errorcheck.msg;
        this.setState({ recruitmentTicketData });
        var filtererr = targetkeys.filter((obj) =>
            recruitmentTicketData[obj].error == true || recruitmentTicketData[obj].error == null);
        if (filtererr.length > 0) {
            this.setState({
                error: true,
                errordummy: false
            })
        } else {
            this.setState({ error: false })
        }
    }

    callroot = () => {
        this.setState({ changeval: false })

        var recruitmentTicketData = this.state.recruitmentTicketData;
        var targetkeys = Object.keys(recruitmentTicketData);
        console.log(targetkeys);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(recruitmentTicketData[targetkeys[i]].value, recruitmentTicketData[targetkeys[i]].validation);
            console.log(errorcheck);
            recruitmentTicketData[targetkeys[i]].error = !errorcheck.state;
            recruitmentTicketData[targetkeys[i]].errmsg = errorcheck.msg;
        }
        var filtererr = targetkeys.filter((obj) =>
            recruitmentTicketData[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0) {
            this.setState({ error: true })
        } else {
            this.setState({ error: false })

        }
        this.setState({ recruitmentTicketData })

        if (filtererr.length === 0) {
            // alert("Hey")
            this.generateTicketApi()
        }

        let changenext = []
        let j = 0
        for (j = 0; j < targetkeys.length; j++) {
            changenext.push(this.state.recruitmentTicketData[targetkeys[j]].error)
        }
        let nextvalue = changenext.every((val) => val === false)

        if (nextvalue === true) {
            this.props.propFunc && this.props.propFunc(2)
        }

    }

    generateTicketApi = () => {
        var recruitmentTicketData = {}
        var ticketKeys = Object.keys(this.state.recruitmentTicketData)
        var ticketData = ticketKeys.slice(7)
        var key1 = ["tempId", "qualifyId", "minage", "maxage", "minexp", "maxexp", "noOfnoOfcandidates"]
        var myKey = ["searchIn", "gender", "certId", "langId", "specId", "liceId", "skillId"]
        var generateTag = [];
        var arr = {}
        for (var i = 0; i <= 6; i++) {
            arr[key1[i]] = this.state.recruitmentTicketData[ticketKeys[i]].value
        }
        // alert(JSON.stringify(this.state.recruitmentTicketData))
        var arr1 = {}
        for (var i in ticketData) {
            // alert(JSON.stringify(this.state.recruitmentTicketData[ticketData[i]].value))
            arr1[myKey[i]] = this.state.recruitmentTicketData[ticketData[i]].value.map(val => val.id)
        }

        // alert(JSON.stringify(arr1))

        var data = {
            empId: 1,
            ...arr,
            generateTicket: [
                arr1
            ]
        }
        // alert(JSON.stringify(data))
        // this.props.dispatch(generateTicket(data))

    }

    render() {

        const { languages, certification, licenses, specialization, qualification, skills } = this.props;
        console.log(this.state.recruitmentTicketData)
        return (
            <React.Fragment>
                <div className="card top_move">
                    <div className="card-body">
                        <Grid container spacing={4} className="mt-3 ">
                            <Grid item md={3} sm={5} className="w-100">

                                <ReactSelect className="w-100" label="Template"
                                    options={this.state.template.map((val) => { return { value: val.value, label: val.value, id:val.CourseId } })}
                                    changeData={(data) => this.changeDynamic(data, 'tempId')}
                                    value={this.state.recruitmentTicketData.tempId.value}
                                    error={this.state.recruitmentTicketData.tempId.error}
                                    errmsg={this.state.recruitmentTicketData.tempId.errmsg}
                                    required
                                    closeMenuOnSelect
                                />
                            </Grid>
                            <Grid md={1} />
                            <Grid item md={3} sm={5} className="w-100">
                                <ReactSelect className="w-100 " label="Qualification"
                                    options={qualification.length > 0 && qualification.map((val) => { return { value: val.Qualifyname, label: val.Qualifyname,id:val.QualifyId } })}
                                    changeData={(data) => this.changeDynamic(data, 'qualifyId')}
                                    value={this.state.recruitmentTicketData.qualifyId.value}
                                    error={this.state.recruitmentTicketData.qualifyId.error}
                                    errmsg={this.state.recruitmentTicketData.qualifyId.errmsg}
                                    closeMenuOnSelect
                                />
                            </Grid>
                            <Grid md={1} />
                            <Grid item md={3} sm={5} className="w-100">
                                <ReactSelect className="w-100 " label="Certifications"
                                    options={certification.length > 0 && certification.map((val) => { return { value: val.CourseName, label: val.CourseName, id: val.CourseId } })}
                                    // options={certification.length > 0 && certification.map(val => [val.CourseName]).map( (valSelect) => { return({value:valSelect,label:valSelect})} )}
                                    changeData={(data) => this.changeDynamic(data, 'certId')}
                                    value={this.state.recruitmentTicketData.certId.value}
                                    error={this.state.recruitmentTicketData.certId.error}
                                    errmsg={this.state.recruitmentTicketData.certId.errmsg}
                                    isMulti
                                />
                            </Grid>

                            <Grid md={1} />

                            <Grid item md={3} sm={5}>
                                <div className="d-flex">
                                    <Inputantd className="min_width" label="Age" placeholder="Min"
                                        changeData={(data) => this.changeDynamic(data, 'minage')}

                                        value={this.state.recruitmentTicketData.minage.value}
                                        error={this.state.recruitmentTicketData.minage.error}
                                        errmsg={this.state.recruitmentTicketData.minage.errmsg} />
                                    <Inputantd className="max_width mt-2" placeholder="Max"
                                        changeData={(data) => this.changeDynamic(data, 'maxage')}
                                        value={this.state.recruitmentTicketData.maxage.value}
                                        error={this.state.recruitmentTicketData.maxage.error}
                                        errmsg={this.state.recruitmentTicketData.maxage.errmsg} />
                                </div>
                            </Grid>

                            <Grid md={1} />

                            <Grid item md={3} sm={5} className="">
                                <div className="d-flex">
                                    <Dropdownantd className="min_width" label="Experience" 
                                        placeholder={"Min"}
                                        option={this.state.expcount.map((val)=>val)}
                                        changeData={(data) => this.changeDynamic(data, 'minexp')}
                                        value={this.state.recruitmentTicketData.minexp.value}
                                        error={this.state.recruitmentTicketData.minexp.error}
                                        errmsg={this.state.recruitmentTicketData.minexp.errmsg} />

                                    <Dropdownantd className="max_width mt-2" 
                                        placeholder={"Max"}
                                        changeData={(data) => this.changeDynamic(data, 'maxexp')}
                                        value={this.state.recruitmentTicketData.maxexp.value}
                                        error={this.state.recruitmentTicketData.maxexp.error}
                                        errmsg={this.state.recruitmentTicketData.maxexp.errmsg}
                                    />
                                </div>
                            </Grid>

                            <Grid md={1} />


                            <Grid item md={3} sm={5} className="w-100">
                                <ReactSelect className="w-100 " label="Search In"
                                    options={this.state.searchIn.map((val) => { return { value: val.value, label: val.value, id:val.id } })}
                                    changeData={(data) => this.changeDynamic(data, 'searchIn')}
                                    value={this.state.recruitmentTicketData.searchIn.value}
                                    error={this.state.recruitmentTicketData.searchIn.error}
                                    errmsg={this.state.recruitmentTicketData.searchIn.errmsg}
                                    defaultValue={this.state.searchIn.length > 0 && this.state.searchIn.map(val => val.value)}
                                    isMulti
                                />
                            </Grid>

                            <Grid item md={3} sm={5} className="w-100">
                                <ReactSelect className="w-100 " label="Gender"
                                    options={this.state.gender.map((val) => { return { value: val.value, label: val.value, id:val.id } })}
                                    changeData={(data) => this.changeDynamic(data, 'gender')}
                                    value={this.state.recruitmentTicketData.gender.value}
                                    error={this.state.recruitmentTicketData.gender.error}
                                    errmsg={this.state.recruitmentTicketData.gender.errmsg}
                                    isMulti
                                />
                            </Grid>
                            <Grid md={1} />
                            <Grid item md={3} sm={5} className="w-100">
                                <ReactSelect className="w-100 " label="Language"
                                    options={languages.length > 0 && languages.map((val) => { return { value: val.LangName, label: val.LangName,id:val.LangId } })}
                                    changeData={(data) => this.changeDynamic(data, 'langId')}
                                    value={this.state.recruitmentTicketData.langId.value}
                                    error={this.state.recruitmentTicketData.langId.error}
                                    errmsg={this.state.recruitmentTicketData.langId.errmsg}
                                    isMulti
                                />
                            </Grid>
                            <Grid md={1} />

                            <Grid item md={3} sm={5} className="w-100">
                                <ReactSelect label="Specialization" className="w-100"
                                    options={specialization.length > 0 && specialization.map((val) => { return { value: val.SpecName, label: val.SpecName, id:val.SpecId } })}
                                    changeData={(data) => this.changeDynamic(data, 'specId')}
                                    value={this.state.recruitmentTicketData.specId.value}
                                    error={this.state.recruitmentTicketData.specId.error}
                                    errmsg={this.state.recruitmentTicketData.specId.errmsg}
                                    isMulti
                                />
                            </Grid>


                            <Grid item md={3} sm={5} className="w-100">
                                <ReactSelect className="w-100 " label="License"
                                    options={licenses.length > 0 && licenses.map((val) => { return { value: val.LiceName, label: val.LiceName,id:val.LiceId } })}
                                    changeData={(data) => this.changeDynamic(data, 'liceId')}
                                    value={this.state.recruitmentTicketData.liceId.value}
                                    error={this.state.recruitmentTicketData.liceId.error}
                                    errmsg={this.state.recruitmentTicketData.liceId.errmsg}
                                    isMulti
                                />
                            </Grid>
                            <Grid md={1} />

                            <Grid item md={3} sm={5} className="w-100">
                                <ReactSelect className="w-100 " label="Skills"
                                    options={skills != null && skills.map((val) => { return { value: val.CLName, label: val.CLName,id:val.CLId } })}
                                    changeData={(data) => this.changeDynamic(data, 'skillId')}
                                    value={this.state.recruitmentTicketData.skillId.value}
                                    error={this.state.recruitmentTicketData.skillId.error}
                                    errmsg={this.state.recruitmentTicketData.skillId.errmsg}
                                    isMulti
                                />
                            </Grid>

                            <Grid md={1} />
                            <Grid item md={3} sm={5} className="">
                                <Inputantd className="w-100" label="Required Number of noOfcandidates"
                                    changeData={(data) => this.changeDynamic(data, 'noOfcandidates')}
                                    value={this.state.recruitmentTicketData.noOfcandidates.value}
                                    error={this.state.recruitmentTicketData.noOfcandidates.error}
                                    errmsg={this.state.recruitmentTicketData.noOfcandidates.errmsg}
                                />
                            </Grid>


                            <Grid container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                className="mb-2"
                                spacing={3}>
                                <Grid item className="mr-2">
                                    <Button size="lg" className="btnmargin btnwidth btnclr w-100" onClick={() => this.callroot()}>Generate Ticket</Button>
                                </Grid>
                                <Grid item className="ml-4" >
                                    <Button size="lg" className="btnwidth btnclr_outline w-100">Save as Template</Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    languages: state.recruitment.languages,
    certification: state.recruitment.certification,
    specialization: state.recruitment.specialization,
    licenses: state.recruitment.licenses,
    qualification: state.recruitment.qualification,
    skills: state.resumeReducer.skills
})

export default connect(mapStateToProps)(RecruitmentTicket);
