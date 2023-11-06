import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, NavLink, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";

import EnterpriseInfo from "./EnterpriseInfo";
import EnterpriseFacility from "./EnterpriseFacility";
import EnterpriseReview from "./EnterpriseReview";
import EnterprisePromotion from "./EnterprisePromotion";

const EnterpriseMember = () => {

  let { path, url } = useRouteMatch();
  const myID = sessionStorage.getItem('resturant_id');
  const [resturant, setResturant] = useState({ resturant_name: "大樹先生親子餐廳" });

  async function fetchData() {
    const response = await axios.get(`http://localhost:8000/api/enterprise/getResturantName/${myID}`);
    setResturant(response.data[0]);
  }

  useEffect(() => fetchData, []);

  return (
    <React.Fragment>
      <div className="container-95 my-2" id="body">
        <span>{resturant.resturant_name}，您好</span>
      </div>
      <div className="container-95 mb-3">
        <div className="row justify-content-between align-items-center majorColor text-light rounded-top">
          <div className="col mt-2 ps-5 align-middle text-center h5 fw-bold letter-spacing30">
            設定列表
          </div>
        </div>
        <div className="row px-2 border rounded-bottom">
          <BrowserRouter>
            <div className="col-2 list-group list-group-flush mt-2 px-2">
              <div className="list-group-item h4 fw-bold">設定項目</div>
              <NavLink className="list-group-item list-group-item-action" to={`${url}/Info`}>基本資料</NavLink>
              <NavLink className="list-group-item list-group-item-action" to={`${url}/Facility`}>設施服務</NavLink>
              <NavLink className="list-group-item list-group-item-action" to={`${url}/Promotion`}>優惠活動</NavLink>
              <NavLink className="list-group-item list-group-item-action" to={`${url}/Review`}>評價留言</NavLink>
            </div>
            <Switch>
              <Route path={path} component={EnterpriseInfo} exact />
              <Route path={`${path}/:proid`} children=<Child /> />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EnterpriseMember;

function Child() {
  const componentNames = {
    Info: EnterpriseInfo,
    Facility: EnterpriseFacility,
    Review: EnterpriseReview,
    Promotion: EnterprisePromotion,
  };
  let { proid } = useParams();
  var EnterprisePages = componentNames[proid];
  return <EnterprisePages />;
}
