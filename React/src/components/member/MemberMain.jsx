import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import MemberNav from "./MemberNav";
import MemberIndex from "./MemberIndex";
import MemberPwd from "./MemberPwd";
import MemberInfo from "./MemberInfo";
import MemberDestroy from "./MemberDestroy";
import MemberOrder from "./MemberOrder";
import MemberOrderDone from "./MemberOrderDone";
import MemberCollection from "./MemberCollection";


class MemberMain extends Component {
  state = {
    // member_id : sessionStorage.getItem('member_id'),
    token: sessionStorage.getItem('token')
  };
  render() {
    return (
      <div>
        <MemberNav />
        <main className="container-95" id="body_m">
          <div class="row g-0">
            <div className="col-2">
              <aside className="border border-light-subtle rounded-3" style={{ height: "50vh" }}>
                <div className="secColor rounded-top" style={{ height: "4vh" }}></div>
                <div>
                  <ul class="list-unstyled ps-0 mt-4 ms-4">
                    <li class="mb-1">
                      <button
                        class="btn btn-toggle align-items-center rounded collapsed fs-5"
                        data-bs-toggle="collapse"
                        data-bs-target="#home-collapse"
                        aria-expanded="true"
                      >
                        帳號設定
                      </button>
                      <div class="collapse show" id="home-collapse">
                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small fs-6">
                          <li>
                            <a
                              href="/membermain/member/pwd"
                              class="link-dark rounded"
                            >
                              更改密碼
                            </a>
                          </li>
                          <li>
                            <a
                              href="/membermain/member/info"
                              class="link-dark rounded"
                            >
                              修改基本資料
                            </a>
                          </li>
                          <li>
                            <a
                              href="/membermain/member/destroy"
                              class="link-dark rounded"
                            >
                              註銷帳號
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li class="invisible my-3"></li>
                    <li class="mb-1">
                      <button
                        class="btn btn-toggle align-items-center rounded collapsed fs-5"
                        data-bs-toggle="collapse"
                        data-bs-target="#dashboard-collapse"
                        aria-expanded="true"
                      >
                        訂單管理
                      </button>
                      <div class="collapse show" id="dashboard-collapse">
                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small fs-6">
                          <li>
                            <a
                              href="/membermain/member/order"
                              class="link-dark rounded"
                            >
                              預約中
                            </a>
                          </li>
                          <li>
                            <a
                              href="/membermain/member/orderdone"
                              class="link-dark rounded"
                            >
                              已完成
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li class="invisible my-3"></li>
                    <li class="mb-1">
                      <button
                        class="btn btn-toggle align-items-center rounded collapsed fs-5"
                        data-bs-toggle="collapse"
                        data-bs-target="#orders-collapse"
                        aria-expanded="true"
                      >
                        收藏餐廳
                      </button>
                      <div class="collapse show" id="orders-collapse">
                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small fs-6">
                          <li>
                            <a
                              href="/membermain/member/collection"
                              class="link-dark rounded"
                            >
                              管理收藏
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
            <div className="col-8">
              <div className="border border-light-subtle border-opacity-10 rounded mx-3 mb-5">
                <div className="majorColor rounded-top" style={{ height: "4vh" }}></div>
                <BrowserRouter>
                  <Switch>
                    <Route path="/membermain" component={MemberIndex} exact />
                    <Route
                      path="/membermain/member/index"
                      component={MemberIndex}
                    />
                    <Route path="/membermain/member/pwd" component={MemberPwd} />
                    <Route
                      path="/membermain/member/info"
                      component={MemberInfo}
                    />
                    <Route
                      path="/membermain/member/destroy"
                      component={MemberDestroy}
                    />
                    <Route
                      path="/membermain/member/order"
                      component={MemberOrder}
                    ></Route>
                    <Route
                      path="/membermain/member/orderdone"
                      component={MemberOrderDone}
                    ></Route>
                    <Route
                      path="/membermain/member/collection"
                      component={MemberCollection}
                    />
                  </Switch>
                </BrowserRouter>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </main>
        <footer class="majorColor">
          <div style={{ height: "10vh" }}></div>
        </footer>
      </div>
    );
  }
}

export default MemberMain;
