import React, { Component } from "react";

import Userlogo from "../images/user.png";

class MemberIndex extends Component {
  state = {
    member_id: sessionStorage.getItem('member_id'),
    member_image: "",
    member_name: ""
  };
  render() {
    return (
      <div style={{ height: "80vh" }} class="container ">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-10">
            <div style={{ height: "12vh" }} class="row"></div>
            <div class="row">
              <div class="col-3"></div>
              <div class="col-6 d-flex justify-content-center">
                <img style={{ width: "180px", height: "180px", objectFit: "cover" }} className="border rounded-circle" src={this.state.member_image ? (this.state.member_image) : (Userlogo)} alt="user" />
              </div>
              <div class="col-3"></div>
            </div>
            <div class="row mt-3">
              <div class="col-3"></div>
              <div class="col-6 d-flex justify-content-center">
                <div class="fs-3 fw-bold">Hello, {this.state.member_name}</div>
              </div>
              <div class="col-3"></div>
            </div>
            <div class="row my-4">
              <div class="col-12 fs-2 fw-bold">快速存取:</div>
            </div>
            <div class="row">
              <div class="col-4">
                <div style={{ height: "240px" }} class="card">
                  <div class="card-body">
                    <div style={{ height: "160px" }}>
                      <h5 class="card-title fw-bold">帳號設定</h5>
                      <p class="card-text">點擊連結進行帳號管理</p>
                    </div>
                    <div class="d-flex justify-content-around">
                      <a
                        href="/membermain/member/pwd"
                        class="btn"
                        id="infobtn_m"
                      >
                        更改密碼
                      </a>
                      <a
                        href="/membermain/member/info"
                        class="btn"
                        id="infobtn_m"
                      >
                        修改基本資料
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div style={{ height: "240px" }} class="card">
                  <div class="card-body">
                    <div style={{ height: "160px" }}>
                      <h5 class="card-title fw-bold">收藏餐廳</h5>
                      <p>立刻查看您的收藏餐廳!</p>
                      <p>透過標籤快速篩選出您的最愛!</p>
                    </div>
                    <div class="d-flex justify-content-center">
                      <a
                        href="/membermain/member/collection"
                        class="btn"
                        id="infobtn_m"
                      >
                        管理收藏
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div style={{ height: "240px" }} class="card">
                  <div class="card-body">
                    <div style={{ height: "160px" }}>
                      <h5 class="card-title fw-bold">訂單管理</h5>
                      <p class="card-text">查看預約中的訂單以及過往訂單</p>
                    </div>
                    <div class="d-flex justify-content-around">
                      <a
                        href="/membermain/member/order"
                        class="btn"
                        id="infobtn_m"
                      >
                        預約中
                      </a>
                      <a
                        href="/membermain/member/orderdone"
                        class="btn"
                        id="infobtn_m"
                      >
                        已完成
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-1"></div>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    await fetch('http://127.0.0.1:8000/api/member/show', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "member_id": this.state.member_id })
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        var newState = { ...this.state };
        newState.member_name = data.data.member_name;
        newState.member_image = data.data.member_image;
        this.setState(newState);
        console.log(this.state.member_name);
        console.log(this.state.member_image);
      });
  }
}
export default MemberIndex;
