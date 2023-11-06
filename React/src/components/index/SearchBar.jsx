import React, { Component } from "react";

import A1 from "../images/bgsh1.jpg";
var Bgsh = {
  backgroundImage: `url(${A1})`,
  // borderRadius: "30px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100vh",
};

class SearchBar extends Component {
  state = {searchinput: ""};
  render() {
    return (
      <section>
        <div class="container-fluid mb-5 py-4" style={Bgsh}>
          <div style={{ height: "44vh" }}></div>
          <div class="container">
            <div class="row">
              <div class="col-12 h2 fw-bold ms-3">找不到？ 訂不到？</div>
              <div class="col-12 display-5 fw-bolder">
                不如馬上
                <span className="DWcolor display-3 fw-bolder ms-3">
                  Din We！
                </span>
              </div>
            </div>
            <div class="row my-1">
              <div class="col-6 bg-white rounded-1 py-2">
                <div className="row">
                  <div className="col-1 ps-4 pt-1">
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
                  <div className="col-11 pt-1">
                    <input
                      value={this.props.searchinput}
                      onChange={this.props.searchChange}
                      type="text"
                      class="form-control border-0 searchBarTp"
                      placeholder="餐廳名(ex.大樹先生)、電話(ex.0426301234)、標籤(ex.兒童座椅)"
                    />
                  </div>
                </div>
              </div>
              <div className="col-2">
                <btn
                  onClick={this.props.searchBtn}
                  class="btn btn-warning fw-bolder border-dark py-3 px-3 schBtn"
                  type="button"
                >
                  尋找餐廳
                </btn>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SearchBar;
