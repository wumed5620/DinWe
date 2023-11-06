import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "axios";
import "../css/enterprise_index.css";

const EnterpriseIndex = () => {
  const orderNull = {
    id: "",
    DB_order_id: "",
    resturant_id: "",
    name: "",
    tel: "",
    orderdate: "",
    ordertime: "",
    adult: 1,
    child: 0,
    chair: 0,
    tableware: 0,
    notes: "",
    orderstate: 1,
  };
  const orderList = [
    // {
    //   id: 230324001,
    //   DB_order_id: "",
    //   resturant_id: "",
    //   name: "王曉明",
    //   tel: "0978902353",
    //   orderdate: "2023-04-12",
    //   ordertime: "11:30",
    //   adult: 2,
    //   child: 1,
    //   chair: 1,
    //   tableware: 1,
    //   notes:
    //     "友人生日要唱生日快樂歌，會提前送蛋糕寄放，小孩子怕拉炮聲，不吃香菜",
    //   orderstate: 1,
    // },
    // {
    //   id: 230331001,
    //   DB_order_id: "",
    //   resturant_id: "",
    //   name: "陳小姐",
    //   tel: "0966895733",
    //   orderdate: "2023-03-31",
    //   ordertime: "12:30",
    //   adult: 5,
    //   child: 0,
    //   chair: 0,
    //   tableware: 0,
    //   notes: "",
    //   orderstate: 2,
    // },
    // {
    //   id: 230403001,
    //   DB_order_id: "",
    //   resturant_id: "",
    //   name: "王大明",
    //   tel: "0978902233",
    //   orderdate: "2023-04-03",
    //   ordertime: "12:30",
    //   adult: 3,
    //   child: 2,
    //   chair: 0,
    //   tableware: 2,
    //   notes: "小朋友感冒，座位不要冷氣口下",
    //   orderstate: 1,
    // },
    // {
    //   id: 230403002,
    //   DB_order_id: "",
    //   resturant_id: "",
    //   name: "黃安安",
    //   tel: "09789023453",
    //   orderdate: "2023-04-03",
    //   ordertime: "16:30",
    //   adult: 2,
    //   child: 2,
    //   chair: 1,
    //   tableware: 0,
    //   notes: "",
    //   orderstate: 1,
    // },
  ];

  const myID = sessionStorage.getItem('resturant_id');

  const [hasData, setHasData] = useState(true);

  const options = ["全部", "未帶位", "已帶位", "已完成", "已取消"];
  const [slcOrder, setSlcOrder] = useState("");
  const [slcDate, setSlcDate] = useState("");

  const [orderData, setOrderData] = useState(orderList);
  const [showData, setShowData] = useState(orderData);

  const [modalData, setModalData] = useState(orderNull);

  async function fetchData() {
    const response = await axios.get(`http://localhost:8000/api/enterprise/getOrders/${myID}`);
    const gettoday = await axios.get('http://localhost:8000/api/enterprise/getDBdate');
    const today = gettoday.data[0].today;
    setSlcDate(today);

    const key = Object.keys(response.data[0]);
    if (key[0] === "message") {
      setOrderData([]);
      setShowData([]);
      setHasData(false);
    } else {
      console.log(response.data)
      setOrderData(response.data);
      const TodayData = response.data.filter((data) => data.orderdate === today)
      showhasData(TodayData);
    }

    setModalData(orderNull);

  }

  useEffect(() => fetchData, []);

  const chgDate = (event) => {
    setSlcDate(event.target.value);
    updateSlcOrderDate(event.target.value);
  };

  const chgSlc = (event) => {
    setSlcOrder(options[event.target.value - 1]);
    updateSlcOrderData(event.target.value - 1);
  };

  const chgIsSeat = (event, id) => {
    const orderPaid = orderData.find((orderData) => orderData.id === id);
    if (orderPaid.orderstate === 0) {
      alert("該訂單已取消！");
    } else {
      event.currentTarget.textContent = "已帶位";
      event.currentTarget.disabled = true;
      updateOrderData(id, 2);
    }
  };

  const chgIsPaid = (tag, id) => {
    // console.log(tag[0]);
    tag.find("button")[1].textContent = "已付款";
    tag.find("button")[1].disabled = true;
    // tag.find("button")[2].disabled = true;
    updateOrderData(id, 3);
  };

  const chgIsCancel = (tag, id) => {
    tag[0].style = "color:gray";
    tag.find("button")[3].textContent = "已取消";
    tag.find("button")[0].disabled = true;
    tag.find("button")[1].disabled = true;
    tag.find("button")[2].disabled = true;
    tag.find("button")[3].disabled = true;
    tag.find("button")[0].className = 'btn btn-secondary mb-sm-1 me-1';
    tag.find("button")[1].className = 'btn btn-secondary mb-sm-1 me-1';
    tag.find("button")[2].className = 'btn btn-secondary mb-sm-1 me-1';
    tag.find("button")[3].className = 'btn btn-secondary mb-sm-1 me-1';
    console.log(tag.find("button")[3].className);
    updateOrderData(id, 0);
  };

  const updateOrderData = async (id, num) => {
    const newState2 = orderData.map((orderObject) => {
      if (orderObject.id === id) {
        if (num === 0) {
          return { ...orderObject, orderstate: 0 };
        } else return { ...orderObject, orderstate: num };
      } else return orderObject;
    });
    setOrderData(newState2);

    const newState = newState2.find((orderObject) => orderObject.id === id)
    await axios.put(`http://localhost:8000/api/enterprise/updateOrderstate/${newState.resturant_id}`, newState)
      .then(response => {
        console.log(response.data);
      });

    // if (num === 2) {
    //   await axios.put(`http://localhost:8000/api/enterprise/updateOrderseat/${newState.resturant_id}`, newState)
    //     .then(response => {
    //       console.log(response.data);
    //     });
    // } else if (num === 3) {
    //   await axios.put(`http://localhost:8000/api/enterprise/updateOrderpaid/${newState.resturant_id}`, newState)
    //     .then(response => {
    //       console.log(response.data);
    //     });
    // } else if (num === 0) {
    //   await axios.put(`http://localhost:8000/api/enterprise/cancelOrder/${newState.resturant_id}`, newState)
    //     .then(response => {
    //       console.log(response.data);
    //     });
    // }
    // fetchData();
  };

  const updateSlcOrderDate = (date) => {
    const orderDate = orderData.filter((orderData) => {
      if (date === "") {
        return orderData;
      } else {
        return orderData.orderdate === date;
      }
    });
    showhasData(orderDate);
  };

  const updateSlcOrderData = (num) => {
    const orderSlcdate = $("#SelectDate")[0].value;
    const orderSlc = orderData.filter((data) => {
      if (orderSlcdate !== "") {
        if (num === 0) {
          return data.orderdate === orderSlcdate;
        } else if (num === 1) {
          return data.orderdate === orderSlcdate && data.orderstate === 1;
        } else if (num === 2) {
          return data.orderdate === orderSlcdate && data.orderstate === 2;
        } else if (num === 3) {
          return data.orderdate === orderSlcdate && data.orderstate >= 3;
        } else if (num === 4) {
          return data.orderdate === orderSlcdate && data.orderstate === 0;
        } else return data;
      } else {
        if (num === 0) {
          return data;
        } else if (num === 1) {
          return data.orderstate === 1;
        } else if (num === 2) {
          return data.orderstate === 2;
        } else if (num === 3) {
          return data.orderstate >= 3;
        } else if (num === 4) {
          return data.orderstate === 0;
        } else return data;
      }
    });

    showhasData(orderSlc);
  };

  const showhasData = (slcData) => {

    if (slcData.length === 0) {
      setHasData(false);
    } else {
      setHasData(true);
    }
    setShowData(slcData);
  }

  const updateModal = async () => {
    const orderPaid = orderData.find(
      (orderData) => orderData.id === modalData.id
    );
    if (orderPaid.orderstate >= 3) {
      alert("訂單已完成無法再確認變更。");
    } else {

      await axios.put(`http://localhost:8000/api/enterprise/updateOrder/${modalData.resturant_id}`, modalData)
        .then(response => {
          console.log(response.data);
        });
      // fetchData();

      const newState = orderData.map((orderObject) => {
        if (orderObject.id === modalData.id) return modalData;
        else return orderObject;
      });
      setOrderData(newState);

      const newShow = showData.map((orderObject) => {
        if (orderObject.id === modalData.id) return modalData;
        else return orderObject;
      });
      setShowData(newShow);

    }
  };

  const addModal = async () => {
    // orderData.push({ ...modalData, id: orderData.length + 1 });
    // setOrderData(orderData);
    // setShowData(showData);
    await axios.post(`http://localhost:8000/api/enterprise/addOrder/${myID}`, modalData)
      .then(response => {
        console.log(response.data);
      });
    fetchData();
  };

  return (
    <React.Fragment>
      <div className="container-95" id="body">
        <div className="row py-2">
          <div className="col-lg-3 col-md-5 col-sm-8 mb-2">
            <div className="input-group">
              <label className="input-group-text" htmlFor="SelectDate">
                <i className="bi bi-calendar-check"></i>
              </label>
              <input type="date" className="form-control text-center"
                id="SelectDate" value={slcDate}
                onChange={(event) => { chgDate(event) }} />
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-4 mb-2">
            <select className="form-select text-start"
              onChange={(event) => { chgSlc(event) }} defaultValue={slcOrder} >
              {options.map((value, index) => (
                <option key={index} value={index + 1}>{value}</option>
              ))}
            </select>
          </div>
          <div className="col-lg-7 col-md-4 col-sm-3 text-end">
            <button id="addbtn" type="button" className="btn btn-warning secColor text-light"
              data-bs-toggle="modal" data-bs-target="#addModal"
              onClick={() => { setModalData(orderNull) }} >
              <span className='bi bi-plus-circle-fill text-dark fw-bold'> 增加</span>
              {/* <span className="bi bi-plus-circle"> 新增</span> */}
            </button>
          </div>
        </div>
      </div>

      <div className="container-95 orderlist border rounded mb-2">
        <div className="row justify-content-between align-items-center majorColor text-light rounded-top">
          <div className="col mt-2 ps-5 align-middle text-center h5 fw-bold letter-spacing30">
            訂位清單
          </div>
        </div>
        <div className="row justify-content-center p-2">
          <div className="row align-items-center text-center mb-2 py-2 border-bottom">
            <div className="col-md-1 col-1">編號</div>
            <div className="col-md-1 col-1">訂單編號</div>
            <div className="col-md-2 col-2">訂位人</div>
            <div className="col-md-2 col-2">日期/時間</div>
            <div className="col-md-1 col-1">人數</div>
            <div className="col-md-3 col-3">需求</div>
            <div className="col-md-2 col-2">狀態</div>
          </div>
          {/* 訂單 */}
          {
            hasData === true
              ? showData.map((data, index) => {
                return <React.Fragment key={data.id} >
                  {
                    data.orderstate === 0
                      ?
                      <div className="row align-items-center text-md-center text-start mb-2 py-3 border-bottom text-secondary" id={data.id} >
                        <div className="col-md-1 col-12">No.{index + 1}</div>
                        <div className="col-md-1 col-12">{data.DB_order_id}</div>
                        <div className="col-md-2 col-12">
                          {data.name}
                          <br />
                          {data.tel}
                        </div>
                        <div className="col-md-2 col-12">
                          {data.orderdate}
                          <br />
                          {data.ordertime}
                        </div>
                        <div className="col-md-1 col-12">
                          {data.adult > 0 && <div>{data.adult}位大人</div>}
                          {data.child > 0 && <div>{data.child}位小孩</div>}
                        </div>
                        <div className="col-md-3 col-12 text-start">
                          <ul>
                            {data.chair > 0 && <li>兒童座椅 x{data.chair}</li>}
                            {data.tableware > 0 && <li>兒童餐具 x{data.tableware}</li>}
                            {data.notes !== "" && <li>{data.notes}</li>}
                          </ul>
                        </div>
                        <div className="col-md-2 col-12">
                          <button id="confirmbtn" type="button" className="btn btn-secondary mb-sm-1 me-1" disabled>
                            <span className="bi bi-exclamation-triangle-fill">帶位</span>
                          </button>
                          <button id="seatbtn" type="button" className="btn btn-secondary mb-sm-1 me-1" disabled>
                            <span className="bi bi-exclamation-triangle-fill">付款</span>
                          </button>
                          <br />
                          <button id="chgbtn" type="button" className="btn btn-secondary mb-sm-1 me-1" disabled>
                            <span className="bi bi-pencil-square">修改</span>
                          </button>
                          <button id="canbtn" type="button" className="btn btn-secondary mb-sm-1 me-1" disabled>
                            <span>已取消</span>
                          </button>
                        </div>
                      </div>
                      :
                      <div className="row align-items-center text-md-center text-start mb-2 py-3 border-bottom" id={data.id} >
                        <div className="col-md-1 col-12">No.{index + 1}</div>
                        <div className="col-md-1 col-12">{data.DB_order_id}</div>
                        <div className="col-md-2 col-12">
                          {data.name}
                          <br />
                          {data.tel}
                        </div>
                        <div className="col-md-2 col-12">
                          {data.orderdate}
                          <br />
                          {data.ordertime}
                        </div>
                        <div className="col-md-1 col-12">
                          {data.adult > 0 && <div>{data.adult}位大人</div>}
                          {data.child > 0 && <div>{data.child}位小孩</div>}
                        </div>
                        <div className="col-md-3 col-12 text-start">
                          <ul>
                            {data.chair > 0 && <li>兒童座椅 x{data.chair}</li>}
                            {data.tableware > 0 && <li>兒童餐具 x{data.tableware}</li>}
                            {data.notes !== "" && <li>{data.notes}</li>}
                          </ul>
                        </div>
                        <div className="col-md-2 col-12">

                          {(data.orderstate === 1)
                            ?
                            <button id="confirmbtn" type="button" className="btn btn-success mb-sm-1 me-1"
                              onClick={(event) => { chgIsSeat(event, data.id) }} >
                              <span className="bi bi-exclamation-triangle-fill">帶位</span>
                            </button>
                            :
                            (data.orderstate === 0)
                              ?
                              <button id="confirmbtn" type="button" className="btn btn-secondary mb-sm-1 me-1" disabled>
                                <span className="bi bi-exclamation-triangle-fill">帶位</span>
                              </button>
                              :
                              <button disabled id="confirmbtn" type="button" className="btn btn-success mb-sm-1 me-1" >
                                <span>已帶位</span>
                              </button>
                          }

                          {data.orderstate >= 3
                            ?
                            <button disabled id="seatbtn" type="button" className="btn btn-dark mb-sm-1 me-1" >
                              <span>已付款</span>
                            </button>
                            :
                            (data.orderstate === 0)
                              ?
                              <button id="seatbtn" type="button" className="btn btn-secondary mb-sm-1 me-1" disabled>
                                <span className="bi bi-exclamation-triangle-fill">付款</span>
                              </button>
                              :
                              <button id="seatbtn" type="button" className="btn btn-dark mb-sm-1 me-1"
                                data-bs-toggle="modal" data-bs-target="#NoSeatModal"
                                onClick={() => { setModalData(data) }} >
                                <span className="bi bi-exclamation-triangle-fill">付款</span>
                              </button>
                          }
                          <br />
                          {(data.orderstate === 0 || data.orderstate >=3 )
                            ?
                            <button id="chgbtn" type="button" className="btn btn-secondary mb-sm-1 me-1" disabled>
                              <span className="bi bi-pencil-square">修改</span>
                            </button>
                            :
                            <button id="chgbtn" type="button" className="btn btn-outline-primary mb-sm-1 me-1"
                              data-bs-toggle="modal" data-bs-target="#modifyModal"
                              onClick={() => { setModalData(data) }}>
                              <span className="bi bi-pencil-square">修改</span>
                            </button>
                          }
                          {(data.orderstate === 0)
                            ?
                            <button id="canbtn" type="button" className="btn btn-secondary mb-sm-1 me-1" disabled>
                              <span>已取消</span>
                            </button>
                            :
                            <button id="canbtn" type="button" className="btn btn-outline-danger mb-sm-1 me-1"
                              data-bs-toggle="modal" data-bs-target="#confirmModal"
                              onClick={() => { setModalData(data) }}>
                              <span className="bi bi-x">取消</span>
                            </button>
                          }
                        </div>
                      </div>
                  }
                </React.Fragment>
              })
              :
              <div className="row justify-content-center align-items-center my-5 py-4 text-center text-secondary">
                目 前 尚 無 訂 單
              </div>}
        </div>
      </div>

      {/* 修改訂單 Modal */}
      <div className="modal fade" id="modifyModal" data-bs-backdrop="static" data-bs-keyboard="false"
        tabIndex="-1" aria-labelledby="modifyModalLabel" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modifyModalLabel">修改訂單編號：{modalData.id}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                onClick={() => { setModalData(orderNull) }} ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="orderName">訂位姓名</span>
                  <input type="text" className="form-control" aria-label="Username" aria-describedby="orderName"
                    value={modalData.name}
                    onChange={(event) => { setModalData({ ...modalData, name: event.target.value }) }} />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="orderTel">聯絡電話</span>
                  <input type="text" className="form-control" aria-label="Usertel" aria-describedby="orderTel"
                    value={modalData.tel} onChange={(event) => { setModalData({ ...modalData, tel: event.target.value }) }} />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="orderDate">訂位日期</span>
                  <input type="date" className="form-control" aria-label="Userdate" aria-describedby="orderDate"
                    value={modalData.orderdate}
                    onChange={(event) => { setModalData({ ...modalData, orderdate: event.target.value }) }}
                  />
                  <span className="input-group-text" id="orderTime">訂位時間</span>
                  <input type="time" className="form-control" aria-label="Usertime" aria-describedby="orderTime"
                    value={modalData.ordertime}
                    onChange={(event) => { setModalData({ ...modalData, ordertime: event.target.value }) }}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="orderPeople">
                    訂位人數
                  </span>

                  {/* 大人人數 */}
                  <button
                    type="button"
                    className="btn btn-outline-secondary border"
                    onClick={() => { modalData.adult > 1 ? setModalData({ ...modalData, adult: modalData.adult - 1 }) : alert("至少一位大人") }}
                  >
                    <i className="bi bi-dash-lg"></i>
                  </button>
                  <div type="num" className="form-control text-center" id="orderAdult" >{modalData.adult}</div>
                  <button
                    type="button"
                    className="btn btn-outline-secondary border"
                    onClick={() => { setModalData({ ...modalData, adult: modalData.adult + 1 }) }}
                  >
                    <i className="bi bi-plus-lg"></i>
                  </button>
                  <span className="input-group-text">大人</span>

                  {/* 小孩人數 */}
                  <button type="button" className="btn btn-outline-secondary border"
                    onClick={() => { setModalData({ ...modalData, child: modalData.child > 0 ? modalData.child - 1 : modalData.child }) }}
                  >
                    <i className="bi bi-dash-lg"></i>
                  </button>
                  <div type="num" className="form-control text-center" id="orderChild" >{modalData.child}</div>
                  <button type="button" className="btn btn-outline-secondary border"
                    onClick={() => { setModalData({ ...modalData, child: modalData.child + 1 }) }}
                  >
                    <i className="bi bi-plus-lg"></i>
                  </button>
                  <span className="input-group-text">小孩</span>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="orderDemand">兒童需求</span>

                  {/* 兒童座椅 */}
                  <button type="button" className="btn btn-outline-secondary border"
                    onClick={() => { setModalData({ ...modalData, chair: modalData.chair > 0 ? modalData.chair - 1 : modalData.chair }) }}
                  >
                    <i className="bi bi-dash-lg"></i>
                  </button>
                  <div type="num" className="form-control text-center" id="orderChair">{modalData.chair}</div>
                  <button type="button" className="btn btn-outline-secondary border"
                    onClick={() => { setModalData({ ...modalData, chair: modalData.chair + 1 }) }}
                  >
                    <i className="bi bi-plus-lg"></i>
                  </button>
                  <span className="input-group-text">座椅</span>

                  {/* 兒童餐具 */}
                  <button type="button" className="btn btn-outline-secondary border"
                    onClick={() => { setModalData({ ...modalData, tableware: modalData.tableware > 0 ? modalData.tableware - 1 : modalData.tableware }) }}
                  >
                    <i className="bi bi-dash-lg"></i>
                  </button>
                  <div type="num" className="form-control text-center" id="orderChair">{modalData.tableware}</div>
                  <button type="button" className="btn btn-outline-secondary border"
                    onClick={() => { setModalData({ ...modalData, tableware: modalData.tableware + 1 }) }}
                  >
                    <i className="bi bi-plus-lg"></i>
                  </button>
                  <span className="input-group-text">餐具</span>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="orderNotes">
                    備註
                  </span>
                  <textarea className="form-control" id="orderNotes" defaultValue={modalData.notes}
                    onChange={(event) => { setModalData({ ...modalData, notes: event.target.value }) }}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                onClick={() => { setModalData(orderNull) }} > 取消 </button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                onClick={() => { updateModal(modalData) }} > 確認修改 </button>
            </div>
          </div>
        </div>
      </div>

      {/* 新增訂單 Modal */}
      <div className="modal fade" id="addModal"
        data-bs-backdrop="static" data-bs-keyboard="false"
        tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addModalLabel">
                新增訂單：{modalData.id}
              </h1>
              <button type="button" className="btn-close"
                data-bs-dismiss="modal" aria-label="Close"
                onClick={() => { setModalData(orderNull) }} />
            </div>
            <div className="modal-body">
              <form action="">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="orderName">訂位姓名</span>
                  <input type="text" className="form-control" aria-label="Username" aria-describedby="orderName"
                    value={modalData.name}
                    onChange={(event) => { setModalData({ ...modalData, name: event.target.value }) }} />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="orderTel">聯絡電話</span>
                  <input type="text" className="form-control"
                    aria-label="Usertel" aria-describedby="orderTel"
                    value={modalData.tel} onChange={(event) => { setModalData({ ...modalData, tel: event.target.value }) }} />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="orderDate">訂位日期</span>
                  <input type="date" className="form-control"
                    aria-label="Userdate" aria-describedby="orderDate"
                    value={modalData.orderdate}
                    onChange={(event) => {
                      setModalData({ ...modalData, orderdate: event.target.value })
                    }} />
                  <span className="input-group-text" id="orderTime">訂位時間</span>
                  <input type="time" className="form-control"
                    aria-label="Usertime" aria-describedby="orderTime"
                    value={modalData.ordertime}
                    onChange={(event) => { setModalData({ ...modalData, ordertime: event.target.value }) }}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="orderPeople">訂位人數</span>

                  {/* 大人人數 */}
                  <button type="button" className="btn btn-outline-secondary border"
                    onClick={() => { modalData.adult > 1 ? setModalData({ ...modalData, adult: modalData.adult - 1 }) : alert("至少一位大人") }}>
                    <i className="bi bi-dash-lg"></i>
                  </button>
                  <div type="num" className="form-control text-center" id="orderAdult">{modalData.adult}</div>
                  <button type="button" className="btn btn-outline-secondary border"
                    onClick={() => { setModalData({ ...modalData, adult: modalData.adult + 1 }) }}>
                    <i className="bi bi-plus-lg"></i>
                  </button>
                  <span className="input-group-text">大人</span>

                  {/* 小孩人數 */}
                  <button type="button" className="btn btn-outline-secondary border"
                    onClick={() => { setModalData({ ...modalData, child: modalData.child > 0 ? modalData.child - 1 : modalData.child }) }}>
                    <i className="bi bi-dash-lg"></i>
                  </button>
                  <div type="num" className="form-control text-center" id="orderChild">{modalData.child}</div>
                  <button type="button" className="btn btn-outline-secondary border"
                    onClick={() => {
                      setModalData({ ...modalData, child: modalData.child + 1 })
                    }}>
                    <i className="bi bi-plus-lg"></i>
                  </button>
                  <span className="input-group-text">小孩</span>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="orderDemand">
                    兒童需求
                  </span>

                  {/* 兒童座椅 */}
                  <button type="button" className="btn btn-outline-secondary border"
                    onClick={() => { setModalData({ ...modalData, chair: modalData.chair > 0 ? modalData.chair - 1 : modalData.chair }) }}>
                    <i className="bi bi-dash-lg"></i>
                  </button>
                  <div type="num" className="form-control text-center" id="orderChair">{modalData.chair}</div>
                  <button type="button" className="btn btn-outline-secondary border"
                    onClick={() => { setModalData({ ...modalData, chair: modalData.chair + 1 }) }}>
                    <i className="bi bi-plus-lg"></i>
                  </button>
                  <span className="input-group-text">座椅</span>

                  {/* 兒童餐具 */}
                  <button type="button" className="btn btn-outline-secondary border">
                    <i className="bi bi-dash-lg"></i>
                  </button>
                  <div type="num" className="form-control text-center" id="orderChair" >{modalData.tableware}</div>
                  <button type="button" className="btn btn-outline-secondary border"
                    onClick={() => { setModalData({ ...modalData, tableware: modalData.tableware + 1 }) }}>
                    <i className="bi bi-plus-lg"></i>
                  </button>
                  <span className="input-group-text">餐具</span>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="orderNotes">備註</span>
                  <textarea className="form-control"
                    id="orderNotes" defaultValue={modalData.notes}
                    onChange={(event) => { setModalData({ ...modalData, notes: event.target.value }) }}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                onClick={() => { setModalData(orderNull) }}>取消</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                onClick={() => { addModal(modalData) }}>確認新增</button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container-95 mb-2">
        <div className="row justify-content-between align-items-center">
          <div className="col-6 text-start">
            <button className="btn btn-secondary">
              <i className="bi bi-caret-left-fill"></i>
              <span>上一頁</span>
            </button>
          </div>
          <div className="col-6 text-end">
            <button className="btn btn-secondary">
              <span>下一頁</span>
              <i className="bi bi-caret-right-fill"></i>
            </button>
          </div>
        </div>
      </div> */}

      <div className="container-95 border rounded mb-2">
        <div className="row justify-content-center align-items-center secColor text-light rounded-top">
          <div className="col mt-2 ps-4 align-middle h5 fw-bold">本日MEMO</div>
        </div>
        <div className="row justify-content-center p-2">
          <div className="row align-items-center text-center mb-2 py-3 border-bottom fs-5">
            <div className="col-md-3 col-6">
              <span className="bi bi-check2-square">
                &nbsp;已確認：&nbsp;
                {orderData.filter((value) => value.orderstate === 1 && value.orderdate === slcDate).length} 筆
              </span>
            </div>
            <div className="col-md-3 col-6">
              <span className="bi bi-check2-square">
                &nbsp;已帶位：&nbsp;
                {orderData.filter((value) => value.orderstate === 2 && value.orderdate === slcDate).length} 筆
              </span>
            </div>
            <div className="col-md-3 col-6">
              <span className="bi bi-check2-square">
                &nbsp;已完成：&nbsp;
                {orderData.filter((value) => value.orderstate >= 3 && value.orderdate === slcDate).length} 筆
              </span>
            </div>
            <div className="col-md-3 col-6">
              <span className="bi bi-tag">
                &nbsp;已取消：&nbsp;
                {orderData.filter((value) => value.orderstate === 0 && value.orderdate === slcDate).length} 筆
              </span>
            </div>
          </div>
          <div className="row align-items-center text-end mb-2 py-2">
            <div className="col h4 fw-bold txttotal">
              總計： {orderData.filter((value) => value.orderdate === slcDate).length} 筆
            </div>
          </div>
        </div>
      </div>

      {/* 取消 Dialog */}
      <div className="modal fade" id="confirmModal"
        data-bs-backdrop="static" data-bs-keyboard="false"
        tabIndex="-1" aria-labelledby="confirmModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            {orderData.map((orderObj, index) => {
              return orderObj.id === parseInt(modalData.id) ? (
                orderObj.orderstate > 1 ? (
                  <React.Fragment key={index}>
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="confirmModal"> 提醒：</h1>
                      <button type="button" className="btn-close"
                        data-bs-dismiss="modal" aria-label="Close"
                        onClick={() => { setModalData(orderNull) }}></button>
                    </div>
                    <div className="modal-body">
                      {
                        orderObj.orderstate >= 3 ?
                          <span>該訂單已完成，無法取消。</span>
                          :
                          <span>該訂單已入座，無法取消。</span>
                      }
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                        onClick={() => { setModalData(orderNull) }}>確認
                      </button>
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment key={index}>
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="confirmModal">
                        確認取消 訂單【{modalData.id}】？
                      </h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        onClick={() => { setModalData(orderNull) }}></button>
                    </div>
                    <div className="modal-body">
                      訂單取消後，將無法復原，請再次確認變更。
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                        onClick={() => { setModalData(orderNull) }}> 取消
                      </button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                        onClick={() => {
                          chgIsCancel($(`#${modalData.id}`), modalData.id)
                        }}>確認</button>
                    </div>
                  </React.Fragment>
                )
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* 付款 Dialog */}
      <div className="modal fade" id="NoSeatModal"
        data-bs-backdrop="static" data-bs-keyboard="false"
        tabIndex="-1" aria-labelledby="confirmModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            {orderData.map((orderObj, index) => {
              return orderObj.id === parseInt(modalData.id) ? (
                orderObj.orderstate < 2 ? (
                  <React.Fragment key={index}>
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="confirmModal">提醒：</h1>
                      <button type="button" className="btn-close"
                        data-bs-dismiss="modal" aria-label="Close"
                        onClick={() => { setModalData(orderNull) }}></button>
                    </div>
                    <div className="modal-body">該訂單尚未帶位。</div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                        onClick={() => { setModalData(orderNull) }}>取消</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                        onClick={() => { setModalData(orderNull) }}>確認</button>
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment key={index}>
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="confirmModal">提醒：</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => { setModalData(orderNull) }}></button>
                    </div>
                    <div className="modal-body">
                      確認付款嗎？付款後，即完成訂單。
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                        onClick={() => { chgIsPaid($(`#${modalData.id}`), modalData.id) }}>確認</button>
                    </div>
                  </React.Fragment>
                )
              ) : null;
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EnterpriseIndex;
