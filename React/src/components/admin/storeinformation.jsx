import React, { useState, Fragment, useEffect } from "react";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Modal } from "react-bootstrap";
import logo from "../images/LOGO_A.png";
import axios from "axios";
import "../css/storeinformation.css";
import userImage from "../images/user.png";
import { FaStar } from "react-icons/fa";

import A1 from "../images/BGnews1.jpg";
import A2 from "../images/BGnews4.jpg";
import A3 from "../images/BGnews3.jpg";

export default function StoreInformation(props) {
  const token = sessionStorage.getItem("token");

  let [comments, setComments] = React.useState([
    {
      order_who: "鄭明哲",
      order_stars: 5,
      order_comment:
        "環境很好，東西好吃，價格很棒，明哉架構來，其他東西不予置評，其他東西不予置評，其他東西不予置評，其他東西不予置評，其他東西不予置評",
    },
    {
      order_who: "珍娜",
      order_stars: 4,
      order_comment:
        "環境很好，東西好吃，偶而會再來吃，其他東西不予置評，其他東西不予置評，其他東西不予置評，其他東西不予置評，其他東西不予置評",
    },
    {
      order_who: "索爾",
      order_stars: 3,
      order_comment:
        "環境很好，其他東西不予置評，其他東西不予置評，其他東西不予置評，其他東西不予置評，其他東西不予置評，其他東西不予置評",
    },
  ]);

  let [resturant, setResturant] = React.useState({
    resturant_name: "大樹餐廳",
    resturant_id: 1,
    resturant_image1: "https://picsum.photos/1500/500?random=1",
    resturant_image2: "https://picsum.photos/1500/500?random=2",
    resturant_image3: "https://picsum.photos/1500/500?random=3",
    resturant_intro:
      "「赤腳ㄚ生態農莊」是2015年中新開的一間生態農場，位於小麥之鄉大雅，收費是門票$100(折抵園內購物$50)，非常歡迎各位大朋友小朋友們到「赤腳ㄚ生態農莊」走走，這邊足夠讓孩子待上三小時都沒有問題，園內設施滿多的，有城堡遊戲室(室內遊戲、球池、溜滑梯)、戲水區、乾濕分離沙坑、生態池、可愛動物區、魚池可以餵魚、魚菜共生生態瓶DIY、烤肉區、餐廳、會議室、蝴蝶園、櫻花林、餐飲部、販賣部…….等等。",
    resturant_menu1: "https://picsum.photos/id/66/1200/900",
    resturant_menu2: "https://picsum.photos/id/68/1200/900",
    resturant_menu3: "https://picsum.photos/id/70/1200/900",
    resturant_menu4: "https://picsum.photos/id/70/1200/900",
  });

  let [facilities, setFacilities] = React.useState({
    pay: ["VISA金融卡", "APPLEPAY"],
    facility: ["兒童餐具", "哺乳室", "免費嬰兒車租借"],
    child: ["沙坑", "慶生派對"],
    food: ["純素食"],
  });

  let [activities, setActivities] = useState([
    {
      id: 2,
      resturant_id: 1,
      img: A1,
      title: "天竺鼠車車開跑拉",
      content:
        "跑起來跑起來，跑起來跑起來，跑起來跑起來，跑起來跑起來，跑起來跑起來，跑起來跑起來～跑起來跑起來，跑起來跑起來，跑起來跑起來，跑起來跑起來，跑起來跑起來，跑起來跑起來～跑起來跑起來，跑起來跑起來，跑起來跑起來，跑起來跑起來，跑起來跑起來，跑起來跑起來～跑起來跑起來，跑起來跑起來，跑起來跑起來，跑起來跑起來，跑起來跑起來，跑起來跑起來～跑起來跑起來，跑起來跑起來，跑起來跑起來，跑起來跑起來，跑起來跑起來，跑起來跑起來～跑起來跑起來，跑起來跑起來，跑起來跑起來，跑起來跑起來，跑起來跑起來，跑起來跑起來～",
      start_date: "2023-05-01",
      end_date: "2023-06-05",
    },
    {
      id: 3,
      resturant_id: 1,
      img: A2,
      title: "爸爸媽媽休揪來",
      content:
        "揪起來揪起來，揪起來揪起來，揪起來揪起來，揪起來揪起來，揪起來揪起來，揪起來揪起來～揪起來揪起來，揪起來揪起來，揪起來揪起來，揪起來揪起來，揪起來揪起來，揪起來揪起來～揪起來揪起來，揪起來揪起來，揪起來揪起來，揪起來揪起來，揪起來揪起來，揪起來揪起來～揪起來揪起來，揪起來揪起來，揪起來揪起來，揪起來揪起來，揪起來揪起來，揪起來揪起來～揪起來揪起來，揪起來揪起來，揪起來揪起來，揪起來揪起來，揪起來揪起來，揪起來揪起來～揪起來揪起來，揪起來揪起來，揪起來揪起來，揪起來揪起來，揪起來揪起來，揪起來揪起來～",
      start_date: "2023-04-15",
      end_date: "2023-07-25",
    },
    {
      id: 3,
      resturant_id: 1,
      img: A3,
      title: "週末吃好吃滿",
      content:
        "吃起來吃起來，吃起來吃起來，吃起來吃起來，吃起來吃起來，吃起來吃起來，吃起來吃起來～",
      start_date: "2023-02-10",
      end_date: "2023-11-30",
    },
  ]);

  // let { resId } = useParams();

  let resId = props.match.params.resId;
  // console.log(resId);

  // comment 渲染用
  const starsNum = (stars, order_who) => {
    // let starsfill = [];
    // let starsempty = [];
    let all = [];

    // for (let i = 0; i < stars; i++) {
    //   starsfill.push(
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="16"
    //       height="16"
    //       fill="currentColor"
    //       className="text-warning bi bi-star-fill ms-1"
    //       viewBox="0 0 16 16"
    //       key={"starfill" + i}
    //     >
    //       <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    //     </svg>
    //   );
    // }

    // for (let i = 0; i < 5 - stars; i++) {
    //   starsfill.push(
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="16"
    //       height="16"
    //       fill="currentColor"
    //       className="text-warning bi bi-star"
    //       viewBox="0 0 16 16"
    //       key={"starnofill" + i}
    //     >
    //       <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
    //     </svg>
    //   );
    // }

    // all.push(starsfill, starsempty);

    return (
      <label
        className="p-2 d-flex align-items-center fs-4"
        htmlFor="flexRadioDefault1"
      >
        {order_who}
        {all}
      </label>
    );
  };

  const id = sessionStorage.getItem("member_id");

  useEffect(() => {
    let result = async () => {
      try {
        let data = await axios.get("http://127.0.0.1:8000/api/getRes/" + resId);
        // console.log(data.data);
        setResturant(data.data[0]);

        let data2 = await axios.get(
          "http://127.0.0.1:8000/api/facilitiesStore/" + resId
        );
        // console.log(data2.data.data);
        setFacilities(data2.data.data);

        let data3 = await axios.get(
          "http://127.0.0.1:8000/api/getActivity/" + resId
        );
        // console.log(data3.data[0]);
        setActivities(data3.data);

        let commemts = await axios.get(
          "http://127.0.0.1:8000/api/order/getComments/" + resId
        );
        // console.log(commemts.data)
        setComments(commemts.data.data);

        let like = await axios.get(
          "http://127.0.0.1:8000/api/getlike/" + id + "/" + resId
        );
        // setLike(like.data.status);

        if (id !== null) {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/member/show",
            { member_id: sessionStorage.getItem("member_id") }
          );
          console.log(response.data.data);
          let newState = { ...head };
          newState.member_image = response.data.data.member_image;
          newState.member_name = response.data.data.member_name;
          setHead(newState);
        }
      } catch (error) {
        console.error(error);
      }
    };
    result();

    // setResturant(resturant);
  }, []);

  // 顯示會員名子或照片
  const [head, setHead] = useState({
    member_image: "",
    member_name: "",
  });

  // -------------------------modal
  const [reviews, setReviews] = useState([
    { id: 1, name: "John", star: 4, comment: "Great product!" },
    { id: 2, name: "Mary", star: 5, comment: "Excellent service!" },
    { id: 3, name: "Tom", star: 3, comment: "Average quality." },
    { id: 4, name: "Jane", star: 5, comment: "Highly recommend!" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedStar, setSelectedStar] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleStarFilter = (star) => {
    setSelectedStar(star);
  };

  // const filteredReviews = selectedStar
  //   ? reviews.filter((review) => review.star === selectedStar)
  //   : reviews;

  const filteredReviews = selectedStar
    ? comments.filter((review) => review.order_stars === selectedStar)
    : comments;

  // 訂單
  const [order, setOrder] = useState({
    member_id: sessionStorage.getItem("member_id"),
    resturant_id: resId,
    order_date: "",
    order_time: "",
    order_adult: 0,
    order_child: 0,
    order_chair: 0,
    order_tableware: 0,
    order_notes: "",
  });

  const orderChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const IncreSeat = () => {
    const newOrder = { ...order };
    newOrder.order_chair++;
    setOrder(newOrder);
  };

  const IncreTool = () => {
    const newOrder = { ...order };
    newOrder.order_tableware++;
    setOrder(newOrder);
  };

  const DecreSeat = () => {
    if (order.order_chair > 0) {
      const newOrder = { ...order };
      newOrder.order_chair--;
      setOrder(newOrder);
    }
  };

  const DecreTool = () => {
    if (order.order_tableware > 0) {
      const newOrder = { ...order };
      newOrder.order_tableware--;
      setOrder(newOrder);
    }
  };

  const orderSubmit = async (e) => {
    e.preventDefault();
    if (
      !sessionStorage.getItem("member_id") &&
      !sessionStorage.getItem("token")
    ) {
      alert("登入後才可以預訂喔~");
      return;
    }

    try {
      console.log(order);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/order/submit",
        order
      ); // 替換為實際的後端 API URL
      console.log(response.data);

      if (response.data.status === true) {
        alert(response.data.message);
        window.location.reload();
        alert(response.data.message);
        setOrder({
          // 將 order 狀態重設為初始值
          member_id: sessionStorage.getItem("id"),
          resturant_id: resId,
          order_date: "",
          order_time: "",
          order_adult: "",
          order_child: 0,
          order_chair: 0,
          order_tableware: 0,
          order_notes: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 收藏
  // const [like, setLike] = useState(1);

  // const likeStore = async () => {
  //   if (id) {
  //     try {
  //       const setlike = await axios.post(
  //         "http://127.0.0.1:8000/api/likeStore",
  //         { member_id: id, resturant_id: resId }
  //       );
  //       console.log(setlike.data);
  //       if (setlike.data.status === true) {
  //         window.location.reload();
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     alert("登入後才能收藏唷~");
  //   }
  // };

  // const unLikeStore = async () => {
  //   try {
  //     const setlike = await axios.post(
  //       "http://127.0.0.1:8000/api/unLikeStore",
  //       { member_id: id, resturant_id: resId }
  //     );
  //     console.log(setlike.data);
  //     if (setlike.data.status === true) {
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // 登出
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
    <Fragment>
      {/* <!-- header --> */}
      <section>
        <nav className="navbar fixed-top bg-white border shadow">
          <div className="container-fluid">
            <a href="/index" className="px-3 py-3">
              <img src={logo} style={{ width: "250px" }} alt="logo" />
            </a>
            <div id="navSh" style={{ display: "none" }} className="w-50">
              <div className="bg-width border border-dark rounded-1 py-2">
                <div className="row align-items-center justify-content-between">
                  <div className="col-1 ms-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-shop"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex">
              {/* {head.member_image
                ? <a className="btn btn-light rounded-pill ms-2 me-3 rgsBtn d-flex align-items-center " style={{ width: "60px", height: "40px" }} href="/membermain" >
                    <img src={head.member_image} alt={head.member_name} className='w-100 overflow-hidden' />
                </a>
                : <a className="btn btn-light rounded-pill ms-2 me-3 rgsBtn d-flex align-items-center" href="/membermain">
                  <div
                    className="d-block mx-auto my-2 d-flex align-items-center"
                    width="20"
                    height="20">
                    <span className="mx-1 ">
                      {head.member_name}
                    </span>
                  </div>
                </a>} */}
              {/* 顯示登入者姓名三元 */}
              {token ? (
                <div
                  style={{ width: "4vw", height: "8vh" }}
                  alt={head.member_name}
                >
                  {head.member_image ? (
                    <a href="/membermain" alt={head.member_name}>
                      <img
                        src={head.member_image}
                        alt={head.member_name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </a>
                  ) : (
                    <a href="/membermain" alt={head.member_name}>
                      <img
                        src={userImage}
                        alt={head.member_name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </a>
                  )}
                </div>
              ) : (
                ""
              )}
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
                <a
                  className="btn btn-light border-dark rounded-pill ms-2 me-3 rgsBtn  d-flex align-items-center"
                  onClick={Logout}
                >
                  <div
                    className="d-block mx-auto my-2  d-flex align-items-center"
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
                    <span className="mx-1 align-middle align-middle">登出</span>
                  </div>
                </a>
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
                    width="20"
                    height="20"
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
                    <span className="mx-1 align-middle align-middle">登入</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </nav>
      </section>

      {/* <!-- body --> */}
      <section style={{ marginTop: "120px" }}>
        <div className="container" style={{ marginTop: "5vh", width: "75vw" }}>
          <div className="row">
            {/* <button
              className="btn btn-danger position-absolute m-3"
              style={{
                top: "110px",
                right: "180px",
                width: "110px",
                zIndex: "1",
              }}
              // onClick={like === 0 ? likeStore : unLikeStore}
            >
              <span>{like === 0 ? "Like" : "Unlike"}</span>
              {like === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  key="heart"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="ms-2 bi bi-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  key="heart2"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="ms-2 bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              )}
            </button> */}
            <div className="row d-flex justify-content-around">
              <Gallery>
                <div className="col-5">
                  {resturant.resturant_image1 != null && (
                    <Item
                      original={resturant.resturant_image1}
                      thumbnail={resturant.resturant_image1}
                      width="1200"
                      height="900"
                    >
                      {({ ref, open }) => (
                        <div
                          className="col-12 stInfoImg"
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            ref={ref}
                            onClick={open}
                            src={resturant.resturant_image1}
                            className="w-100 rounded-3"
                            style={{ height: "360px", overflow: "hidden" }}
                            alt="..."
                          />
                        </div>
                      )}
                    </Item>
                  )}
                </div>
                <div className="col-7">
                  <div className="row d-flex justify-content-around">
                    <div className="col-6">
                      {resturant.resturant_image2 != null && (
                        <Item
                          original={resturant.resturant_image2}
                          thumbnail={resturant.resturant_image2}
                          width="1200"
                          height="900"
                        >
                          {({ ref, open }) => (
                            <div
                              className="col-12 stInfoImg"
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                ref={ref}
                                onClick={open}
                                src={resturant.resturant_image2}
                                style={{ height: "165px", overflow: "hidden" }}
                                className="w-100 rounded-3"
                                alt="..."
                              />
                            </div>
                          )}
                        </Item>
                      )}
                    </div>
                    <div className="col-6">
                      {resturant.resturant_image3 != null && (
                        <Item
                          original={resturant.resturant_image3}
                          thumbnail={resturant.resturant_image3}
                          width="1200"
                          height="900"
                        >
                          {({ ref, open }) => (
                            <div
                              className="col-12 stInfoImg"
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                ref={ref}
                                onClick={open}
                                src={resturant.resturant_image3}
                                style={{ height: "165px", overflow: "hidden" }}
                                className="w-100 rounded-3"
                                alt="..."
                              />
                            </div>
                          )}
                        </Item>
                      )}
                    </div>
                  </div>
                  <div className="row d-flex justify-content-around mt-4">
                    <div className="col-6">
                      {resturant.resturant_image4 != null && (
                        <Item
                          original={resturant.resturant_image4}
                          thumbnail={resturant.resturant_image4}
                          width="1200"
                          height="900"
                        >
                          {({ ref, open }) => (
                            <div
                              className="col-12 stInfoImg"
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                ref={ref}
                                onClick={open}
                                src={resturant.resturant_image4}
                                style={{ height: "165px", overflow: "hidden" }}
                                className="w-100 rounded-3"
                                alt="..."
                              />
                            </div>
                          )}
                        </Item>
                      )}
                    </div>
                    <div className="col-6">
                      {resturant.resturant_image5 != null && (
                        <Item
                          original={resturant.resturant_image5}
                          thumbnail={resturant.resturant_image5}
                          width="1200"
                          height="900"
                        >
                          {({ ref, open }) => (
                            <div
                              className="col-12 stInfoImg"
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                ref={ref}
                                onClick={open}
                                src={resturant.resturant_image5}
                                style={{ height: "165px", overflow: "hidden" }}
                                className="w-100 rounded-3"
                                alt="..."
                              />
                            </div>
                          )}
                        </Item>
                      )}
                    </div>
                  </div>
                </div>
              </Gallery>
              <span
                className="shadow bg-white position-relative d-inline rounded px-5"
                style={{
                  bottom: "10px",
                  left: "-170px",
                  zIndex: "2",
                  width: "auto",
                }}
              >
                <span className="text-center display-5 fw-bold letter-spacing10 py-2 px-0">
                  {resturant.resturant_name}
                </span>
              </span>
            </div>
            {/* <div className="col-12">
              <div id="carouselstoreimage" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators m-0" style={{ bottom: "-90px" }}>
                  <img src={resturant.resturant_image1} className="active ms-3"
                    data-bs-target="#carouselstoreimage" data-bs-slide-to="0" aria-current="true"
                    aria-label="Slide 1" style={{ height: "70px", width: "100px", borderRadius: "10%" }}></img>
                  <img src={resturant.resturant_image2} className="ms-3"
                    data-bs-target="#carouselstoreimage" data-bs-slide-to="1"
                    aria-label="Slide 2" alt='...' style={{ height: "70px", width: "100px", borderRadius: "10%" }}></img>
                  <img src={resturant.resturant_image3} className="ms-3"
                    data-bs-target="#carouselstoreimage" data-bs-slide-to="2"
                    aria-label="Slide 3" alt='...' style={{ height: "70px", width: "100px", borderRadius: "10%" }}></img>
                </div>
                <div className="carousel-inner ">
                  <div className="carousel-item active " >
                    <img src={resturant.resturant_image1} className="w-100 img-fluid border rounded-3" alt="..." />
                  </div>
                  <div className="carousel-item" >
                    <img src={resturant.resturant_image2} className="w-100 img-fluid border rounded-3" alt="..." />
                  </div>
                  <div className="carousel-item" >
                    <img src={resturant.resturant_image3} className="w-100 img-fluid border rounded-3" alt="..." />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          {/* <!-- select bar --> */}
          <div className="col-12 my-4" style={{ marginTop: "10vh" }} id="intro">
            <div className="shadow" style={{ height: "67.7px" }}>
              <div className="row d-flex justify-content-around">
                <a
                  className="col-1 text-center py-3 mx-3 stifBtn stifBtnHo"
                  href="#intro"
                >
                  關於
                </a>
                <a
                  className="col-1 text-center py-3 mx-3 stifBtn stifBtnHo"
                  href="#menu"
                >
                  菜單
                </a>
                <a
                  className="col-1 text-center py-3 mx-3 stifBtn stifBtnHo"
                  href="#service"
                >
                  設施
                </a>
                <a
                  className="col-1 text-center py-3 mx-3 stifBtn stifBtnHo"
                  href="#book"
                >
                  訂位
                </a>
                <a
                  className="col-1 text-center py-3 mx-3 stifBtn stifBtnHo"
                  href="#comment"
                >
                  評論
                </a>
              </div>
            </div>
          </div>
          {/* <!-- information --> */}
          <div className="row">
            <div className="col-md-8 col-12">
              <div className="card mb-4 shadow px-4" id="menu">
                <div className="card-body">
                  <h4 className="text-center mb-3 text-secondary">
                    關於『 {resturant.resturant_name} 』
                  </h4>
                  <hr />
                  <p style={{ textIndent: "1em" }}>
                    {resturant.resturant_intro}
                  </p>
                </div>
              </div>
              <div className="card mb-4 shadow px-4">
                <div className="card-body">
                  <h4 className="text-center text-secondary mb-3">菜單</h4>
                  <hr />
                  <div className="owl-carousel text-center d-flex justify-content-center mt-4">
                    <Gallery>
                      <div className="row d-flex justify-content-center">
                        {resturant.resturant_menu1 != null && (
                          <Item
                            original={resturant.resturant_menu1}
                            thumbnail={resturant.resturant_menu1}
                            width="664"
                            height="932"
                          >
                            {({ ref, open }) => (
                              <div
                                className="col-4 mb-3"
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  ref={ref}
                                  onClick={open}
                                  src={resturant.resturant_menu1}
                                  className="w-100 rounded-3"
                                  alt="..."
                                />
                              </div>
                            )}
                          </Item>
                        )}
                        {resturant.resturant_menu2 != null && (
                          <Item
                            original={resturant.resturant_menu2}
                            thumbnail={resturant.resturant_menu2}
                            width="664"
                            height="932"
                          >
                            {({ ref, open }) => (
                              <div
                                className="col-4 mb-3"
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  ref={ref}
                                  onClick={open}
                                  src={resturant.resturant_menu2}
                                  className="w-100 rounded-3"
                                  alt="..."
                                />
                              </div>
                            )}
                          </Item>
                        )}
                        {resturant.resturant_menu3 != null && (
                          <Item
                            original={resturant.resturant_menu3}
                            thumbnail={resturant.resturant_menu3}
                            width="664"
                            height="932"
                          >
                            {({ ref, open }) => (
                              <div
                                className="col-4 mb-3"
                                style={{ cursor: "pointer" }}
                                id="service"
                              >
                                <img
                                  ref={ref}
                                  onClick={open}
                                  src={resturant.resturant_menu3}
                                  className="w-100 rounded-3"
                                  alt="..."
                                />
                              </div>
                            )}
                          </Item>
                        )}
                      </div>
                    </Gallery>
                  </div>
                </div>
              </div>
              <div className="card mb-4 shadow px-4">
                <div className="card-body">
                  <h4 className="text-center text-secondary mb-3">設施</h4>
                  <hr />
                  <div className="d-flex flex-wrap">
                    <div className="col-3">
                      <div className="card-body">
                        <h4 className="d-flex justify-content-center fs-5">
                          付款方式
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ms-2"
                            width={"22px"}
                            viewBox="0 0 576 512"
                          >
                            <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zM272 192H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16s7.2-16 16-16zM256 304c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16zM164 152v13.9c7.5 1.2 14.6 2.9 21.1 4.7c10.7 2.8 17 13.8 14.2 24.5s-13.8 17-24.5 14.2c-11-2.9-21.6-5-31.2-5.2c-7.9-.1-16 1.8-21.5 5c-4.8 2.8-6.2 5.6-6.2 9.3c0 1.8 .1 3.5 5.3 6.7c6.3 3.8 15.5 6.7 28.3 10.5l.7 .2c11.2 3.4 25.6 7.7 37.1 15c12.9 8.1 24.3 21.3 24.6 41.6c.3 20.9-10.5 36.1-24.8 45c-7.2 4.5-15.2 7.3-23.2 9V360c0 11-9 20-20 20s-20-9-20-20V345.4c-10.3-2.2-20-5.5-28.2-8.4l0 0 0 0c-2.1-.7-4.1-1.4-6.1-2.1c-10.5-3.5-16.1-14.8-12.6-25.3s14.8-16.1 25.3-12.6c2.5 .8 4.9 1.7 7.2 2.4c13.6 4.6 24 8.1 35.1 8.5c8.6 .3 16.5-1.6 21.4-4.7c4.1-2.5 6-5.5 5.9-10.5c0-2.9-.8-5-5.9-8.2c-6.3-4-15.4-6.9-28-10.7l-1.7-.5c-10.9-3.3-24.6-7.4-35.6-14c-12.7-7.7-24.6-20.5-24.7-40.7c-.1-21.1 11.8-35.7 25.8-43.9c6.9-4.1 14.5-6.8 22.2-8.5V152c0-11 9-20 20-20s20 9 20 20z" />
                          </svg>
                        </h4>
                        {facilities.pay.map((facility) => {
                          return (
                            <p
                              className="my-2 me-2"
                              style={{
                                textIndent: "-1.9em",
                                marginLeft: "39px",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="me-2"
                                width={"12px"}
                                viewBox="0 0 320 512"
                              >
                                <path d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z" />
                              </svg>{" "}
                              {facility}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="card-body">
                        <h4 className="d-flex justify-content-center fs-5">
                          餐廳設施
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ms-2"
                            width={"22px"}
                            viewBox="0 0 640 512"
                          >
                            <path d="M36.8 192H603.2c20.3 0 36.8-16.5 36.8-36.8c0-7.3-2.2-14.4-6.2-20.4L558.2 21.4C549.3 8 534.4 0 518.3 0H121.7c-16 0-31 8-39.9 21.4L6.2 134.7c-4 6.1-6.2 13.2-6.2 20.4C0 175.5 16.5 192 36.8 192zM64 224V384v80c0 26.5 21.5 48 48 48H336c26.5 0 48-21.5 48-48V384 224H320V384H128V224H64zm448 0V480c0 17.7 14.3 32 32 32s32-14.3 32-32V224H512z" />
                          </svg>
                        </h4>
                        {facilities.facility.map((facility) => {
                          return (
                            <p
                              className="my-2 me-2"
                              style={{
                                textIndent: "-1.9em",
                                marginLeft: "39px",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="me-2"
                                width={"17px"}
                                viewBox="0 0 448 512"
                              >
                                <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                              </svg>{" "}
                              {facility}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="card-body">
                        <h4 className="d-flex justify-content-center fs-5">
                          兒童服務
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ms-2"
                            width={"22px"}
                            viewBox="0 0 512 512"
                          >
                            <path d="M315.4 15.5C309.7 5.9 299.2 0 288 0s-21.7 5.9-27.4 15.5l-96 160c-5.9 9.9-6.1 22.2-.4 32.2s16.3 16.2 27.8 16.2H384c11.5 0 22.2-6.2 27.8-16.2s5.5-22.3-.4-32.2l-96-160zM288 312V456c0 22.1 17.9 40 40 40H472c22.1 0 40-17.9 40-40V312c0-22.1-17.9-40-40-40H328c-22.1 0-40 17.9-40 40zM128 512a128 128 0 1 0 0-256 128 128 0 1 0 0 256z" />
                          </svg>
                        </h4>
                        {facilities.child.map((facility) => {
                          return (
                            <p
                              className="my-2 me-2"
                              style={{
                                textIndent: "-1.9em",
                                marginLeft: "39px",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="me-2"
                                width={"17px"}
                                viewBox="0 0 448 512"
                              >
                                <path d="M96 152v8H48v-8C48 68.1 116.1 0 200 0h48c83.9 0 152 68.1 152 152v8H352v-8c0-57.4-46.6-104-104-104H200C142.6 48 96 94.6 96 152zM0 224c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32h-5.1L388.5 469c-2.6 24.4-23.2 43-47.7 43H107.2c-24.6 0-45.2-18.5-47.7-43L37.1 256H32c-17.7 0-32-14.3-32-32z" />
                              </svg>{" "}
                              {facility}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="card-body">
                        <h4 className="d-flex justify-content-center fs-5">
                          特殊餐飲
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ms-2"
                            width={"22px"}
                            viewBox="0 0 512 512"
                          >
                            <path d="M0 192c0-35.3 28.7-64 64-64c.5 0 1.1 0 1.6 0C73 91.5 105.3 64 144 64c15 0 29 4.1 40.9 11.2C198.2 49.6 225.1 32 256 32s57.8 17.6 71.1 43.2C339 68.1 353 64 368 64c38.7 0 71 27.5 78.4 64c.5 0 1.1 0 1.6 0c35.3 0 64 28.7 64 64c0 11.7-3.1 22.6-8.6 32H8.6C3.1 214.6 0 203.7 0 192zm0 91.4C0 268.3 12.3 256 27.4 256H484.6c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4z" />
                          </svg>
                        </h4>
                        {facilities.food.map((facility) => {
                          return (
                            <p
                              className="my-2 me-2"
                              style={{
                                textIndent: "-1.9em",
                                marginLeft: "39px",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="me-2"
                                width={"20px"}
                                viewBox="0 0 512 512"
                              >
                                <path d="M346.7 6C337.6 17 320 42.3 320 72c0 40 15.3 55.3 40 80s40 40 80 40c29.7 0 55-17.6 66-26.7c4-3.3 6-8.2 6-13.3s-2-10-6-13.2c-11.4-9.1-38.3-26.8-74-26.8c-32 0-40 8-40 8s8-8 8-40c0-35.7-17.7-62.6-26.8-74C370 2 365.1 0 360 0s-10 2-13.3 6zM244.6 136c-40 0-77.1 18.1-101.7 48.2l60.5 60.5c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0l-55.3-55.3 0 .1L2.2 477.9C-2 487-.1 497.8 7 505s17.9 9 27.1 4.8l134.7-62.4-52.1-52.1c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L199.7 433l100.2-46.4c46.4-21.5 76.2-68 76.2-119.2C376 194.8 317.2 136 244.6 136z" />
                              </svg>{" "}
                              {facility}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-4 shadow">
                <div className="card-body px-5" id="book">
                  <h4 className="text-center text-secondary mb-3">訂位</h4>
                  <hr />
                  <form onSubmit={orderSubmit} className="row" method="post">
                    <div className="col-6">
                      <div className="input-group mb-3">
                        <span className="input-group-text">日期</span>
                        <input type="hidden" value={1} name="member_id" />
                        <input
                          type="date"
                          className="form-control"
                          id="order_date"
                          name="order_date"
                          value={order.order_date}
                          onChange={orderChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group mb-3">
                        <span className="input-group-text">時間</span>
                        <select
                          className="form-control"
                          id="order_time"
                          name="order_time"
                          value={order.order_time}
                          onChange={orderChange}
                        >
                          <option value="10:00:00">10:00</option>
                          <option value="11:00:00">11:00</option>
                          <option value="12:00:00">12:00</option>
                          <option value="13:00:00">13:00</option>
                          <option value="14:00:00">14:00</option>
                          <option value="15:00:00">15:00</option>
                          <option value="16:00:00">16:00</option>
                          <option value="17:00:00">17:00</option>
                          <option value="18:00:00">18:00</option>
                          <option value="19:00:00">19:00</option>
                          <option value="20:00:00">20:00</option>
                          <option value="21:00:00">21:00</option>
                          <option value="22:00:00">22:00</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group mb-3">
                        <span className="input-group-text">成人</span>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="人數"
                          min={1}
                          name="order_adult"
                          value={order.order_adult}
                          onChange={orderChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-group mb-3">
                        <span className="input-group-text">兒童</span>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="人數"
                          min={0}
                          name="order_child"
                          value={order.order_child}
                          onChange={orderChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 d-flex align-items-center justify-content-center my-2">
                      <span className="fs-5">額外需求</span>
                    </div>
                    <div className="col-12 d-flex row justify-content-around">
                      <div className="col-5 d-flex d-flex align-items-center justify-content-around">
                        <span className="me-3">兒童座椅</span>
                        <button
                          className="btn btn-outline-secondary fs-5 rounded-circle"
                          onClick={DecreSeat}
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="26"
                            fill="currentColor"
                            class="bi bi-dash"
                            viewBox="3 2 10 10"
                          >
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                          </svg>
                        </button>
                        <p id="childseat" className="mx-2 text-center mb-0">
                          {" "}
                          {order.order_chair}
                        </p>
                        <button
                          className="btn btn-outline-secondary fs-5 rounded-circle"
                          name="childseat"
                          onClick={IncreSeat}
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="26"
                            fill="currentColor"
                            class="bi bi-plus"
                            viewBox="3 2 10 10"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                          </svg>
                        </button>
                      </div>
                      <div className="col-5 d-flex d-flex align-items-center justify-content-around">
                        <span className="me-3">兒童餐具</span>
                        <button
                          className="btn btn-outline-secondary fs-5 rounded-circle"
                          onClick={DecreTool}
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="26"
                            fill="currentColor"
                            class="bi bi-dash"
                            viewBox="3 2 10 10"
                          >
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                          </svg>
                        </button>
                        <p id="childseat" className="mx-2 text-center mb-0">
                          {" "}
                          {order.order_tableware}
                        </p>
                        <button
                          className="btn btn-outline-secondary fs-5 rounded-circle"
                          onClick={IncreTool}
                          type="button"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="26"
                            fill="currentColor"
                            class="bi bi-plus"
                            viewBox="3 2 10 10"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                          </svg>
                        </button>
                      </div>
                      <div className="col-12 mt-3 p-0 ms-4">
                        <div className="form-floating">
                          <textarea
                            placeholder="123"
                            name="order_notes"
                            className="form-control px-4"
                            style={{
                              height: "100px",
                              resize: "none",
                              paddingTop: "30px",
                            }}
                            value={order.order_notes}
                            onChange={orderChange}
                          ></textarea>
                          <label className="px-4 text-secondary">
                            請備註您額外的需求...
                          </label>
                        </div>
                      </div>
                      <div className="col-12 text-center mt-3 mb-2 p-0 ms-4">
                        <button
                          type="submit"
                          className="btn btn-warning w-100 btn-lg"
                          style={{ letterSpacing: "10 px" }}
                        >
                          {" "}
                          送出訂單
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* <!-- evaluate & MAP --> */}
            <div className="col-md-4">
              <div className="card mb-4 shadow">
                <div className="card-body">
                  <h4 className="text-center text-secondary mb-3">營業地區</h4>
                  <hr />
                  <div className="rounded w-100 border border-top">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.3302011868386!2d120.68301151492707!3d24.160149784389002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d61a5364761%3A0x86249dcf46d88e04!2z5aSn5qi55YWI55Sf6Kaq5a2Q6aSQ5buz!5e0!3m2!1szh-TW!2stw!4v1679493132350!5m2!1szh-TW!2stw"
                      className="w-100"
                      height="250px"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="resturantName"
                    ></iframe>
                  </div>
                </div>
              </div>
              <div className="card mb-4 shadow">
                <div
                  style={{ height: "340px" }}
                  className="card-body"
                  id="activity"
                >
                  <h4 className="text-center text-secondary mb-3">餐廳活動</h4>
                  <hr />
                  <div
                    id="activities"
                    className="carousel slide"
                    data-bs-ride="carousel"
                    data-bs-interval="4000"
                  >
                    <div className="carousel-inner" id="comment">
                      {activities.map((activity, index) => {
                        return (
                          <div
                            className={
                              index === 0
                                ? "carousel-item active"
                                : "carousel-item"
                            }
                          >
                            <div
                              style={{ height: "245px" }}
                              className="card text-dark"
                            >
                              <img
                                style={{ height: "100%", objectFit: "cover" }}
                                src={activity.img}
                                className="card-img"
                                alt="..."
                              />
                              <div
                                className="card-img-overlay"
                                style={{
                                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                                  overflow: "auto",
                                }}
                              >
                                <h5 className="card-title text-center mb-3 mt-2">
                                  {activity.title}
                                </h5>
                                <p
                                  className="card-text px-2"
                                  style={{ textIndent: "2em" }}
                                >
                                  {activity.content}
                                </p>
                                <p className="card-text pt-3">
                                  活動期間: {activity.start_date} ~{" "}
                                  {activity.end_date}
                                </p>
                                {/* <p className="card-text">結束時間: {activity.end_date}</p> */}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {/* <button className="carousel-control-prev" type="button"
                      data-bs-target="#activities" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button"
                      data-bs-target="#activities" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button> */}
                  </div>
                </div>
              </div>
              <div className="card shadow">
                <div className="card-body">
                  <h4 className="text-center text-secondary mb-3">評論</h4>
                  <hr />
                  <div
                    id="carouselExampleControls"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {comments.map((comment, index) => {
                        if (index < 3) {
                          return (
                            // onclick呼叫modal
                            <div
                              className={
                                index === 0
                                  ? "carousel-item active"
                                  : "carousel-item"
                              }
                              onClick={handleShow}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="card">
                                <div className="card-body">
                                  <h5>
                                    {comment.order_who}
                                    <span className="ms-3">
                                      {comment.order_stars}
                                      <FaStar
                                        className="ms-1"
                                        style={{ color: "#f9bf45" }}
                                      />
                                    </span>
                                  </h5>

                                  <p
                                    className="ps-2 pt-1"
                                    style={{ textIndent: "2em" }}
                                  >
                                    {comment.order_comment}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                    {/* <button className="carousel-control-prev" type="button"
                        data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button className="carousel-control-next" type="button"
                        data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                      </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title style={{ marginLeft: "200px" }}>評價</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="btn-group d-flex">
              {[5, 4, 3, 2, 1].map((_, index) => {
                const star = _;
                return (
                  <button
                    key={index}
                    type="button"
                    className={`btn ${
                      selectedStar === star
                        ? "btn-warning active"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() => handleStarFilter(star)}
                  >
                    {star} <FaStar style={{ color: "#f9bf45" }} />
                  </button>
                );
              })}
            </div>
          </div>
          <hr />
          {/* 以下是使用者留言區 */}
          <div className="overflow-hidden" style={{ maxHeight: "70vh" }}>
            {filteredReviews.map((review, index) => (
              <div className="card mb-2 p-3" key={index}>
                <h5 className="ms-2">
                  {review.order_who} - {review.order_stars}{" "}
                  <FaStar style={{ color: "#f9bf45" }} />
                </h5>
                <p className="mb-0 mx-2" style={{ textIndent: "2em" }}>
                  {review.order_comment}
                </p>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
      <footer class="text-center text-white majorColor mt-5">
        <div class="text-center p-3 bgc text-black majorColor">
          © 2023 Copyright:
          <a class="text-black" href="/index">
            DingWe.com
          </a>
        </div>
      </footer>
    </Fragment>
  );
}
