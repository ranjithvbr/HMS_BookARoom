import React, { Component } from "react";
import "antd/dist/antd.css";
import AppRouter from "./components/routers/index";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MiniDrawer from "./components/Drawer page/Drawerpage";
import Login from "./components/BookRoomLogin/Login";
import Forgot from "./components/BookRoomLogin/Forgot";
import ResetPassword from "./components/BookRoomLogin/ResetPassword";
import PaymentReceived from "./components/paymentReceived/PaymentReceived";
import CancelPayment from "./components/CancelPayment/CancelPayment";
import "./App.css";
import "./commonstyle.css";

export const apiurl = 'http://52.200.251.222:8158/api/v1/';


export default class App extends Component {
  state = { test: false };
  render() {
    return (
      <div>
        <Router basename="bookroom/?/">
          <Route exact path="/" component={Login} />
          <Route path={"/resetpassword"} component={ResetPassword} exact />
          <Route path="/forgot" component={Forgot} exact />
          <Route path="/Home" component={MiniDrawer} />
          <Route path="/cancelpayment" component={CancelPayment} exact />
          <Route path="/paymentreceived" component={PaymentReceived} exact />
        </Router>
      </div>
    );
  }
}
