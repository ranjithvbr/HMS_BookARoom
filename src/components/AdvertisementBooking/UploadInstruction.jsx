/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import './UploadInstruction.css'
import Green from '../../Images/green.svg'

export default class UploadMedia extends Component {
    constructor(props)
    {
        super(props)
        this.state={name:""}
    }
    render() {
        return (
            <div>
               <div className="green_upload_container"><img src={Green} className="green_uploadint"/><span className="upload_ins">Please Upload Image in JPG or PNG format</span></div>
               <div className="green_upload_container"><img src={Green} className="green_uploadint"/><span  className="upload_ins">For Half Page Advertisemnt,Image Size Should be 370 * 410</span></div>
               <div className="green_upload_container"><img src={Green} className="green_uploadint"/><span  className="upload_ins">For Full Page Advertisemnt,Image Size Should be 370 * 820</span></div>
            </div>
        )
    }
}
