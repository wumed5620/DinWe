import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class EnterpriseNav extends Component {
  state = {
    token: sessionStorage.getItem('token')
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar fixed-top bg-light shadow">
          <div className="container-fluid">
            {/* 這是統一的高度 */}
          {/* <a className="nav-link text-secondary px-3 py-3" href="/index" id="nav-link" > */}
            <a className="nav-link text-secondary" href="/index" id="nav-link" >
              <img className="logo" src={require("../images/LOGO_A.png")} alt="" />
            </a>
            <ul className="nav justify-content-end">
              <div className="nav-link">
                <Link id="btncolor" className="btn btn-outline-light px-3 text-decoration-none text-secondary align-middle" to="/enterprise">
                  首頁
                </Link>
                <div className="btn-group ms-1">
                  <div id="btncolor" className="btn btn-light">
                    <Link id="linkcolor" className="text-decoration-none text-secondary align-middle" to="/enterprise/membercenter">
                      商家中心
                    </Link>
                    <span className="ms-1" data-bs-toggle="dropdown" aria-expanded="false">
                      <span className="bi bi-caret-down-fill"></span>
                    </span>
                    <ul className="mt-3 dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="/enterprise/membercenter/Info">基本資料</a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/enterprise/membercenter/Facility">設施服務</a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/enterprise/membercenter/Promotion">優惠活動</a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/enterprise/membercenter/Review">評價留言</a>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button type="button" className="dropdown-item text-end"
                          onClick={() => this.Logout(this.state.token)}>登出</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>


              {/* <li className="nav-item dropdown">
                <button
                  id="nav-link"
                  className="nav-link text-secondary btn btn-outline-light text-secondary"
                  data-bs-toggle="dropdown"
                  type="button"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    fill="currentColor"
                    className="bi bi-bell mb-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                  </svg>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="/enterprise">
                      <div className="container">
                        <div className="text-body-tertiary pb-1 border-bottom">
                          2023/03/22 11:29a.m.
                        </div>
                        <div className="text-secondary m-1">
                          {" "}
                          收到一筆 2023/03/26(日) 訂位資料
                        </div>
                      </div>
                    </a>
                    <hr className="dropdown-divider opacity-50" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/enterprise">
                      <div className="container">
                        <div className="text-body-tertiary pb-1 border-bottom">
                          2023/03/22 11:43a.m.
                        </div>
                        <div className="text-secondary m-1">
                          {" "}
                          收到一筆 2023/03/26(日) 訂位資料，請進行確認
                        </div>
                      </div>
                    </a>
                    <hr className="dropdown-divider opacity-50" />
                  </li>

                  <li>
                    <a
                      className="dropdown-item text-secondary text-end"
                      href="/enterprise"
                    >
                      <i className="bi bi-chevron-double-down"></i>
                      <span>點選看更多</span>
                      <i className="bi bi-three-dots"></i>
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }

  Logout = async (token) => {
    // const logout = {token: token}; 
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/logout', { token: this.state.token });
      alert(response.data.message);
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('resturant_id');
      window.location.href = '/login';
    } catch (error) {
      console.error(error);
    }
  }
}

export default EnterpriseNav;
