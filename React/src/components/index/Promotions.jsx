import React, { Component } from "react";
import axios from "axios";

import A1 from "../images/prom1.jpg";
import A2 from "../images/prom2.jpg";
import A3 from "../images/prom3.jpg";

class Promotions extends Component {
  state = {
    pros: [
      {
        resturant_id:1,
        img: A1,
        title: "悠閒下午茶 想窩享優惠",
        content: "★ 下午茶單人套餐 $300/人 (6.3折) 內容包含：任選輕食+任選飲料",
        start_date: "2023-05-01",
        end_date: "2023-05-31",
      },
      {
        resturant_id:2,
        img: A2,
        title: "大家書房📖 X DinWe🌟",
        content: "#用DinWe下訂，現場消費優惠6折起❤️打折後額滿2000贈送蠟筆一盒",
        start_date: "2023-05-01",
        end_date: "2023-05-31",
      },
      {
        resturant_id:3,
        img: A3,
        title: "小島3.5度 - 獨家方案🌟",
        content: "透過 DinWe訂位 ，享有特別79折優惠，並且贈送薯條炸雞拼盤乙份",
        start_date: "2023-05-01",
        end_date: "2023-05-31",
      },
    ],
  };

  // getActivities = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://127.0.0.1:8000/api/get3activities"
  //     ); // 替換成您的 API 端點
  //     console.log(response.data);
  //     let newState = { ...this.state };
  //     newState.pros = response.data;
  //     this.setState(newState);
  //   } catch (error) {
  //     console.error("取得資料失敗:", error);
  //   }
  // };

  // componentDidMount() {
  //   this.getActivities();
  // }

  render() {
    return (
      <section className="container">
        <div style={{height:"8vh"}}></div>
        <div className="row">
          <div className="col-12 stickyTitle">
            <h3 className="text-center letter-spacing10 mt-1 mb-5 bgtext2 text-secondary">
              優惠活動
            </h3>
          </div>
          <div className="col-8 box1 sticky1">
            <img
              src={this.state.pros[0].img}
              className="offset-md-1 rounded-3"
              style={{ width: "50vw", marginLeft: "36px"}}
              alt={this.state.pros[0].title}
            />
          </div>
          <div className="col-9 box2 stickytxt1">
            <div className="row offset-md-7 rounded-3 boxtxt txt1 justify-content-center">
              <div className="col-12 h3 text-center">
                {this.state.pros[0].title}
              </div>
              <div className="col-12 mt-2 text-center">
                {this.state.pros[0].content}
              </div>
              <div className="col-12 mt-2 text-center">
                活動期間:<br></br>
                {this.state.pros[0].start_date +
                  "~" +
                  this.state.pros[0].end_date}
              </div>
              <a
                href={"/storeinformation/" + this.state.pros[0].resturant_id}
                className="btn btn-sm btn-success letter-spacing10 mt-4 bottom-0 py-2 d-flex align-items-center justify-content-center fs-6"
              >
                瞭解更多
              </a>
            </div>
          </div>
          <div className="col-8 box1 sticky2">
            <img
              src={this.state.pros[1].img}
              className="offset-md-1 rounded-3"
              style={{ width: "53vw" }}
              alt={this.state.pros[1].title}
            />
          </div>
          <div className="col-9 box2 stickytxt2">
            <div className="row offset-md-7 rounded-3 boxtxt txt1 justify-content-center">
              <div className="col-12 h3 text-center">
                {this.state.pros[1].title}
              </div>
              <div className="col-12 mt-2 text-center">
                {this.state.pros[1].content}
              </div>
              <div className="col-12 mt-2 text-center">
                活動期間:{" "}
                {this.state.pros[1].start_date +
                  "~" +
                  this.state.pros[1].end_date}
              </div>
              <a
                href={"/storeinformation/" + this.state.pros[1].resturant_id}
                className="btn btn-sm btn-success letter-spacing10 mt-4 bottom-0 py-2 d-flex align-items-center justify-content-center fs-6"
              >
                瞭解更多
              </a>
            </div>
          </div>
          <div className="col-12 box1 sticky3">
            <img
              src={this.state.pros[2].img}
              className="offset-md-1 rounded-3"
              style={{ width: "53vw" }}
              alt={this.state.pros[2].title}
            />
          </div>
          <div className="col-9 box2 stickytxt3">
            <div className="row offset-md-7 rounded-3 boxtxt txt1 justify-content-center">
              <div className="col-12 h3 text-center">
                {this.state.pros[2].title}
              </div>
              <div className="col-12 mt-2 text-center">
                {this.state.pros[2].content}
              </div>
              <div className="col-12 mt-2 text-center">
                活動期間:{" "}
                {this.state.pros[1].start_date +
                  "~" +
                  this.state.pros[1].end_date}
              </div>
              <a
                href={"/storeinformation/" + this.state.pros[2].resturant_id}
                className="btn btn-sm btn-success letter-spacing10 mt-4 bottom-0 py-2 d-flex align-items-center justify-content-center fs-6"
              >
                瞭解更多
              </a>
            </div>
          </div>
          <div className="box3"></div>
        </div>
      </section>
    );
  }
}

export default Promotions;
