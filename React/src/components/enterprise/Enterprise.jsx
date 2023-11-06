import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import EnterpriseIndex from "./EnterpriseIndex";
import EnterpriseMember from "./EnterpriseMember";
import EnterpriseNav from "./EnterpriseNav";

// import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/enterprise.css";

class Enterprise extends Component {

  componentDidMount() {
    if (sessionStorage.getItem("token") === null && sessionStorage.getItem("resturant_id") === null) {
      window.location.replace("/login");
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <EnterpriseNav />
          <Switch>
            <Route path="/enterprise" component={EnterpriseIndex} exact />
            <Route
              path="/enterprise/membercenter"
              component={EnterpriseMember}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

  // componentWillUnmount() {
  //   sessionStorage.removeItem('resturant_id');
  // }
}

export default Enterprise;
