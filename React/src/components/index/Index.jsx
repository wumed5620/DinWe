import React, { Component } from "react";
import logo from "../images/LOGO_A.png";

import axios from "axios";

import SearchBar from "./SearchBar";
import Infomation from "./Infomation";
import CarouselCard from "./CarouselCard";
import CarouselNews from "./CarouselNews";
import BackToTop from "./BackToTop";
import Promotions from "./Promotions";
import ChatBox from "./ChatBox";

class Index extends Component {
  state = {
    navbarTransparent: true,
    searchinput: "",
    member_image: "",
    member_name: ""
  };

  searchChange = (e) => {
    const value = e.target.value;
    const newState = { ...this.state };
    newState.searchinput = value;
    this.setState(newState);
  };

  searchBtn = () => {
    this.props.history.push("/searchIndex");
    sessionStorage.setItem("searchinput", this.state.searchinput);
  };

  searchSet = (e) => {
    const value = e.target.alt;
    console.log(value);
    sessionStorage.setItem("searchinput", value);
    this.props.history.push("/searchIndex");
  };



  async componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);

    let navSearch = document.getElementById("navSh");

    window.addEventListener("scroll", function () {
      if (
        document.body.scrollTop > 480 ||
        document.documentElement.scrollTop > 480
      ) {
        navSearch.style.display = "block";
      } else {
        navSearch.style.display = "none";
      }
    });

    const id = sessionStorage.getItem("member_id");

    if (id !== null) {
      const response = await axios.post('http://127.0.0.1:8000/api/member/show', { 'member_id': sessionStorage.getItem('member_id') });
      console.log(response.data.data);
      let newState = { ...this.state };
      newState.member_image = response.data.data.member_image;
      newState.member_name = response.data.data.member_name;
      this.setState(newState)
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const scrollPosition = window.scrollY;
    const newState = { ...this.state };
    if (scrollPosition === 0 && !this.state.navbarTransparent) {
      newState.navbarTransparent = true;
      this.setState(newState);
    } else if (scrollPosition > 0 && this.state.navbarTransparent) {
      newState.navbarTransparent = false;
      this.setState(newState);
    }
  };

  render() {
    // 登出
    let token = sessionStorage.getItem("token");

    const Logout = async () => {
      // const logout = {token: token};
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/logout", {
          token: token,
        });
        // console.log(response.data);

        alert(response.data.message);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("member_id");
        sessionStorage.removeItem("resturant_id");
        sessionStorage.removeItem("god");
        window.location.reload("/login");
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <div>
        <section>
          <nav
            className={`navbar fixed-top ${this.state.navbarTransparent
              ? "bg-transparent"
              : "bg-white border shadow"
              }`}
          >
            <div class="container-fluid">
              <a href="/index" class="px-3 py-3">
                <img
                  className=""
                  src={logo}
                  style={{ width: "250px" }}
                  alt="logo"
                />
              </a>
              <div id="navSh" style={{ display: "none" }} className="w-50">
                <div class="bg-width border border-dark rounded-1 py-2">
                  <div className="row align-items-center justify-content-between">
                    <div className="col-1 ms-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        class="bi bi-shop"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
                      </svg>
                    </div>
                    <div className="col-7 pt-1 ps-0">
                      <input
                        type="text"
                        class="form-control border-0 ps-0 searchBarTp"
                        name="searchinput"
                        onChange={this.searchChange}
                        value={this.state.searchinput}
                        placeholder="餐廳名(ex.大樹先生)、電話(ex.0426301234)、標籤(ex.兒童座椅)"
                        style={{width: "500px"}}
                      />
                    </div>
                    <div className="col-3 ms-4 ps-5">
                      <button
                        onClick={this.searchBtn}
                        class="btn btn-warning fw-bolder border-dark py-2 px-4 schBtn"
                        type="button"
                      >
                        尋找餐廳
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex">
                {/* 顯示登入者姓名三元 */}
                {token
                  ? (
                    <div style={{ width: "55px", height: "55px" }} alt={this.state.member_name} >
                      <a  href="/membermain" alt={this.state.member_name} >
                        <img src={this.state.member_image} alt={this.state.member_name} style={{ width: "100%", height: "100%", objectFit:"cover", borderRadius:"50%" }}/>
                      </a>
                    </div>
                  )
                  : ""}
                {token ? (
                  ""
                ) : (
                  <a
                    className="btn btn-light border-dark rounded-pill ms-2 me-3 rgsBtn d-flex align-items-center"
                    href="/register"
                  >
                    <div
                      className="d-block mx-auto my-2 d-flex align-items-center"
                      width="20"
                      height="20"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-pencil-square ms-1 align-middle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                      <span className="mx-1 ">註冊</span>
                    </div>
                  </a>
                )}
                {/* 三元判斷是否登入中 */}
                {token ? (
                  <button
                  className="btn btn-light border-dark rounded-pill ms-2 me-3 d-flex align-items-center"
                    onClick={Logout}
                  >
                    <div
                       className="d-block mx-auto my-2 d-flex align-items-center"
                       width="20"
                       height="20"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-box-arrow-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                        />
                      </svg>
                      <span className="mx-1 align-middle align-middle">
                        登出
                      </span>
                    </div>
                  </button>
                ) : (
                  ""
                )}
                {token ? (
                  ""
                ) : (
                  <div class="btn btn-light border-dark rounded-pill lgiBtn">
                    <a
                      href="/login"
                      class="d-block mx-auto my-2 text-dark"
                      style={{ textDecoration: "none" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-person-circle ms-1 align-middle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path
                          fillRule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                        />
                      </svg>
                      <span className="mx-1 align-middle align-middle">
                        登入
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </section>
        {/* <div style={{height: "8vh"}}></div> */}
        <div>
          <SearchBar
            searchChange={this.searchChange}
            searchBtn={this.searchBtn}
            searchinput={this.state.searchinput}
          />
          <div className="container mb-4">
            {/* <h3 className="text-secondary">最新消息</h3> */}
          </div>
          <div className="container mb-5">
            <CarouselNews />
          </div>
          <div className="container mb-2">
            <Promotions />
          </div>
          <div className="container mb-5">
            <Infomation />
          </div>
          <div className="container mb-4">
            {/* <h3 className="bgtext4 text-secondary">你可能會想要...</h3> */}
          </div>
          <div className="container mb-5">
            <CarouselCard searchSet={this.searchSet} />
          </div>
          <BackToTop />
          <ChatBox />
        </div>
        <footer class="text-center text-white majorColor mt-5">
          {/* <div class="container p-4 pb-0">
            <section class="">
              <form action="">
                <div class="row d-flex justify-content-center">
                  <div class="col-auto">
                    <p class="pt-2 text-black">
                      <strong>訂閱我們 取得最新消息</strong>
                    </p>
                  </div>

                  <div class="col-md-5 col-12">
                    <div class="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="form5Example29"
                        class="form-control"
                        placeholder="Email address"
                      />
                    </div>
                  </div>

                  <div class="col-auto">
                    <button type="submit" class="btn btn-outline-dark mb-4">
                      送出
                    </button>
                  </div>
                </div>
              </form>
            </section>
          </div> */}
          <div class="text-center p-3 bgc text-black majorColor">
            © 2023 Copyright:
            <a class="text-black" href="/index">
              DingWe.com
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Index;
