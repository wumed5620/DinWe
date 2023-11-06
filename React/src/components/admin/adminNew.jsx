import React, { Component, Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "../css/chart.css";
import Memlvls from './childs/memLvls';
import ResDis from './childs/resDis';
import ConDis from './childs/conDis';
import MemAge from './childs/memAge';
import ResSta from './childs/resSta';
import ResAllEarn from './childs/resAllEarn';
import axios from 'axios';

export default function Admin() {

  // 取得所有最新消息 與 審核商家資訊
  const handleGet = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/getNews"); // 替換成您的 API 端點
      setNews(response.data.data); // 將取得的資料儲存至狀態中
      console.log(response);

      const stores = await axios.get("http://127.0.0.1:8000/api/getAllStore");
      setAllStores(stores.data.data);
      // console.log(stores.data)
    } catch (error) {
      // console.error('取得資料失敗:', error);
    }
  }

  // 跳轉頁面用
  const history = useHistory();

  // 權限確認
  if (sessionStorage.getItem('god') !== "yes") {
    alert("你不具備管理員權限");
    history.push('/index');
  }

  const [news, setNews] = useState([
    { id: 1, title: "今晚打老虎", image: "https://picsum.photos/200/100?random=1", content: "88888", created_at: "2023-04-04", updated_at: "2023-04-04", state: 1 },
    { id: 2, title: "今晚打老虎", image: "https://picsum.photos/200/100?random=2", content: "88888", created_at: "2023-04-04", updated_at: "2023-04-04", state: 0 },
    {
      id: 1,
      resturant_id: 2,
      resturant_name: "沙拉嗑",
      image: "",
      title: "今天有點忙",
      subtitle: "1234568",
      text: "98765432",
      created_at: "2023-04-28T03:50:02.000000Z",
      updated_at: "2023-04-28T03:50:02.000000Z",
      state: 1
    },
  ])

  // 新增廣告
  const handleFileChange = (event) => {
    // 使用者選擇檔案時觸發
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setFromData({ ...formData, "image": base64Image })
    }
  };

  const [formData, setFromData] = useState({
    resturant_id: 1,
    resturant_name: "大樹先生2",
    title: "",
    subtitle: "",
    image: "",
    content: "",
    state: 1,
    tem: ""
  })

  const NewsChange = (e) => {
    const { name, value } = e.target;
    if (name == "state" && value == 0) {
      setFromData({ ...formData, [name]: 1 });
    } else if (name == "state" && value == 1) {
      setFromData({ ...formData, [name]: 0 });
    } else {
      setFromData({ ...formData, [name]: value });
    }
  }

  const NewsNameChange = (e) => {
    const { name, value } = e.target;
    let id = value.split("|")[0];
    let rname = value.split("|")[1];
    setFromData({ ...formData, resturant_id: id, resturant_name: rname, [name]: value })
  }

  // 新增最新消息
  const handleStoreNews = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/api/storeNews", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        // 處理回應資料
        // console.log("回應資料:", response.data);
        if (response.data.status === true) {
          alert('新增成功');
          window.location.reload()
        }
      })
      .catch(error => {
        console.error("發生錯誤:", error);
      });
  };

  // 登出
  const handleLogout = async () => {
    const token = sessionStorage.getItem('token');
    // const logout = {token: token}; 
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/logout', { token: token });
      console.log(response.data);
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('god');
      window.location.reload('/login')
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleGet()
  }, []);

  // 編輯功能用
  const [modalData, setModalData] = useState({
    id: "",
    resturant_id: "",
    resturant_name: "",
    image: "",
    title: "",
    subtitle: "",
    text: "",
    created_at: "",
    updated_at: "",
    state: 1,
  })

  const ModalChange = (e) => {
    const { name, value } = e.target;
    if (name === "state" && value === 0) {
      setModalData({ ...modalData, [name]: 1 });
    } else if (name === "state" && value === 1) {
      setModalData({ ...modalData, [name]: 0 });
    } else {
      setModalData({ ...modalData, [name]: value });
    }
  }

  const Modalcheck = () => {
    let newmodal = { ...modalData };
    if (newmodal.state === 1) {
      newmodal.state = 0
    } else {
      newmodal.state = 1
    }
    setModalData(newmodal);
  }

  const modalShow = (e) => {
    console.log(e.target.getAttribute("index"))
    setModalData(news[e.target.getAttribute("index")]);
  }

  const FileChange = (event) => {
    // 使用者選擇檔案時觸發
    const file = event.target.files[0];
    // console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setModalData({ ...modalData, "image": base64Image })
    }
    // console.log(modalData.image);
  };

  const UpdateNews = async (e) => {
    e.preventDefault();
    try {
      // console.log(regData);
      const response = await axios.post('http://127.0.0.1:8000/api/updateNews', modalData); // 替換為實際的後端 API URL

      // sessionStorage.setItem('token', response.data.token);
      // const token = sessionStorage.getItem('token');
      console.log(response.data);

      if (response.data.status === true) {
        alert('修改成功');
        window.location.reload()
      }

    } catch (error) {
      console.error(error);
    }
  }

  // 渲染商家資訊用
  const [allStores, setAllStores] = useState([
    {
      "resturant_id": 1,
      "resturant_name": "大樹先生親子餐廳",
      'resturant_account': "0492691671",
      "resturant_address": "No. 64, Yongchang St., Zhongliao Township",
      "resturant_phone": 492691671,
      "resturant_email": "a0919691671@gmail.com",
      "resturant_state": 1
    }
  ]);

  const sendEmail = async (e) => {
    try {
      // console.log(regData);
      const response = await axios.post('http://127.0.0.1:8000/api/sendMail', { resturant_account: e.target.value }); // 替換為實際的後端 API URL

      console.log(response.data);

      if (response.data.status === true) {
        alert('發送成功');
        window.location.reload();
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <section>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-bottom-2 border-white py-3">
          <div className="container-fluid mx-2">
            <a className="navbar-brand" href="/index">DinWe 後台</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarSupportedContent">
              <ul className="navbar-nav mb-2 mb-lg-0 mx-auto gap-3 nav-tabs nav border-bottom-0">
                <li className="nav-item" id="news">
                  <button className="text-white btn btn-outline-secondary active" href="#postnews" data-bs-toggle="tab">
                    商家廣告
                  </button>
                </li>
                <li className="nav-item" >
                  <button className="text-white btn btn-outline-secondary" href="#storemanage" data-bs-toggle="tab">
                    商家資訊
                  </button>
                </li>
                <li className="nav-item" id="dashboard">
                  <button className="text-white btn btn-outline-secondary" href="#stastic" data-bs-toggle="tab">
                    總覽統計
                  </button>
                </li>
                <li className="nav-item" id="memberStastic">
                  <button className="text-white btn btn-outline-secondary" href="#member" data-bs-toggle="tab">
                    會員統計
                  </button>
                </li>
                <li className="nav-item" id="shopStastic">
                  <button className="text-white btn btn-outline-secondary" href="#resturant" data-bs-toggle="tab">
                    商家統計
                  </button>
                </li>
              </ul>
              <ul className="navbar-nav mb-2 mb-lg-0 ">
                <li className="nav-item text-white d-flex justify-content-center align-items-center">
                  <i className="bi bi-person-circle text-white me-2"></i>Admin
                </li>
                <li className="nav-item d-flex justify-content-center align-items-center ms-3">
                  <button className="text-white text-decoration-none btn btn-outline-secondary" onClick={handleLogout}>Login out</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
      <section className="">
        <div className="container-fluid p-0">
          <div className="row m-0 ">
            <div className="tab-content">
              {/* <!-- 最新消息 --> */}
              <div className="col-12 p-0 tab-pane mt-5 active" id="postnews">
                <div className="container">
                  <h1 className="text-center">新增商家廣告</h1>
                  <div className="col-6 mx-auto mt-2">
                    <form onSubmit={handleStoreNews}>
                      <div className="input-group mb-3">
                        <span className="input-group-text">廣告商家</span>
                        <select className="form-control" name='tem' value={formData.tem} onChange={NewsNameChange}>
                          {allStores.map((store, index) => {
                            if(store.resturant_state === 2){
                              return (<option key={index} value={store.resturant_id + "|" + store.resturant_name}>{store.resturant_name}</option>)
                            }
                          })}
                        </select>
                      </div>
                      <div className="mb-3 input-group">
                        <span className="input-group-text">廣告主標題</span>
                        <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={NewsChange} />
                      </div>
                      <div className="mb-3 input-group">
                        <span className="input-group-text">廣告副標題</span>
                        <input type="text" className="form-control" id="subtitle" name="subtitle" value={formData.subtitle} onChange={NewsChange} />
                      </div>
                      <div className="form-floating mb-3">
                        <textarea className="form-control" name="content" style={{ resize: 'none', height: "200px" }} placeholder="消息內文" id="content" value={formData.content} onChange={NewsChange}></textarea>
                        <label htmlFor="floatingTextarea">廣告內文</label>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="new_image" className="form-label">廣告圖片</label>
                        <input type="file" className="form-control" id="image" name="image" onChange={handleFileChange} />
                      </div>
                      <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="state" name="state" value={formData.state} onChange={NewsChange} checked={formData.state === 0 ? "" : "checked"} />
                        <label className="form-check-label" htmlFor="state">是否上架</label>
                      </div>
                      <p className='text-center mb-0'><button type="submit" className="btn btn-primary px-4">新增</button></p>
                    </form>
                  </div>
                  <div className="col-10 mx-auto mt-5">
                    <h3 className="text-center">商家廣告</h3>
                    <table className="table align-middle">
                      <thead>
                        <tr className='border-bottom border-black'>
                          <th scope="col ">店名(編號)</th>
                          <th scope="col">標題</th>
                          <th scope="col">圖片</th>
                          <th scope="col">上架時間</th>
                          <th scope="col">更新時間</th>
                          <th scope="col">編輯</th>
                          <th>是否上架</th>
                        </tr>
                      </thead>
                      <tbody>
                        {news.map((newItem, index) => {
                          return (
                            <tr className='' key={index}>
                              <th>{newItem.resturant_name} ({newItem.resturant_id === 1 ? "10": newItem.resturant_id})</th>
                              <td>{newItem.title}</td>
                              <td width={"200px"}><img src={newItem.image} alt="" className='w-100' /></td>
                              <td>
                                {newItem.created_at.slice(0, 10)}<br />
                                {newItem.created_at.slice(11, 19)}
                              </td>
                              <td>{newItem.updated_at.slice(0, 10)}<br />
                                {newItem.updated_at.slice(11, 19)}</td>
                              <td>
                                <button className='btn btn-outline-primary' index={index} data-bs-toggle="modal" data-bs-target="#formModal" onClick={modalShow}>編輯</button>
                              </td>
                              <td><input type="checkbox" checked={newItem.state === 1 ? "checked" : ""} readOnly /></td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    {/* 編輯modal */}
                    <div className="modal fade" tabIndex="-1" id="formModal">
                      <div className="modal-dialog" >
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title"><span className=''>{modalData.resturant_name}</span> - 廣告</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <form onSubmit={UpdateNews}>
                            <div className="modal-body">
                              <p className='fs-6'>上次修改時間：
                                {modalData.updated_at.slice(0, 10)} {modalData.updated_at.slice(11, 19)}</p>
                              <div className="mb-3 input-group">
                                <span className="input-group-text">廣告主標題</span>
                                <input type="text" className="form-control" name="title" value={modalData.title} onChange={ModalChange} />
                              </div>
                              <div className="mb-3 input-group">
                                <span className="input-group-text">廣告副標題</span>
                                <input type="text" className="form-control" name="subtitle" value={modalData.subtitle} onChange={ModalChange} />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="image" className="form-label">廣告圖片</label>
                                <img src={modalData.image} alt="" className='w-50 mb-3 ms-5' />
                                <input type="file" className="form-control" placeholder="Username" name="image" onChange={FileChange} />
                              </div>
                              <div className="form-floating mb-3">
                                <textarea className="form-control" name="text" style={{ resize: 'none', height: "200px" }} placeholder="消息內文" value={modalData.text} onChange={ModalChange}></textarea>
                                <label htmlFor="floatingTextarea">廣告內文</label>
                              </div>
                              <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" value={modalData.state} name="state" onChange={Modalcheck} checked={modalData.state === 1 ? "checked" : ""} />
                                <label className="form-check-label" htmlFor="exampleCheck1">是否上架</label>
                              </div>
                            </div>
                            <div className="modal-footer d-flex justify-content-between px-3">
                              <button type="button" className="btn btn-secondary px-4" data-bs-dismiss="modal">取消</button>
                              <button type="submit" className="btn btn-primary px-4" data-bs-dismiss="modal" >修改</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 p-0 tab-pane mt-5" id="storemanage">
                <div className="container">
                  <div className="col-12 mx-auto mt-5">
                    <h3 className="text-center">商家列表</h3>
                    <table className="table align-middle">
                      <thead>
                        <tr className='border-bottom border-black '>
                          <th scope="col">店名</th>
                          <th scope="col">地址</th>
                          <th scope="col">電話</th>
                          <th scope="col">信箱</th>
                          <th scope="col">狀態</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allStores.map((newItem, index) => {
                          return (
                            <tr className='' key={index}>
                              <td>{newItem.resturant_name}</td>
                              <td>{newItem.resturant_address}</td>
                              <td>{newItem.resturant_phone} </td>
                              <td>{newItem.resturant_email}</td>
                              <td>{
                                newItem.resturant_state === 1
                                  ? <button className='btn btn-outline-primary' index={index} value={newItem.resturant_account} onClick={sendEmail}>發送過審信件</button>
                                  : <button className='btn btn-outline-primary' index={index} disabled>已通過審核</button>
                              }

                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* <!-- 總覽統計 --> */}
              <div className="col-12 p-0 tab-pane" id="stastic" style={{height:"90vh"}}> 
                <div className="col-12" style={{ backgroundCcolor: 'rgb(222, 253, 204)' }} id="chartTop">
                  <div className="row m-0">
                    <div className="col-6 mt-3" >
                      <h3 className="text-center" id="pieLTitle">會員訂餐日比例</h3>
                      <div id="chartL" style={{ overflow: 'hidden' }}>
                        <Memlvls />
                      </div>
                    </div>
                    <div className="col-6 mt-3">
                      <h3 className="text-center" id="pieLRitle">商家分布比例</h3>
                      <div id="chartR" style={{ overflow: 'hidden' }}>
                        <ResDis />
                      </div>
                    </div>

                  </div>

                </div>

                <div className="col-12 px-5" id="chartDown" style={{ backgroundCcolor: 'rgb(219, 219, 219)' }}>
                  <h3 id="chartTitle" className="text-center">訂單人數分布</h3>
                  <div id="chartdiv" className="w-100 ">
                    <ConDis />
                  </div>
                </div>
              </div>
              {/* <!-- 會員統計 --> */}
              <div className="col-12 p-0 tab-pane " id="member">
                <div className="col-12" style={{ backgroundCcolor: 'rgb(222, 253, 204)' }} id="chartTop">
                  <div className="row m-0">
                    <div className="col-6 mt-3" >
                      <h3 className="text-center" id="pieLTitle">會員訂餐日比例</h3>
                      <div id="chartL" style={{ overflow: 'hidden' }}>
                        <Memlvls />
                      </div>
                    </div>
                    <div className="col-6 mt-3">
                      <h3 className="text-center" id="pieLRitle">會員年齡比例</h3>
                      <div id="chartR" style={{ overflow: 'hidden' }}>
                        <MemAge />
                      </div>
                    </div>

                  </div>

                </div>

                <div className="col-12 px-5" id="chartDown" style={{ backgroundCcolor: 'rgb(219, 219, 219)' }}>
                  <h3 id="chartTitle" className="text-center">訂單人數分布</h3>
                  <div id="chartdiv" className="w-100 ">
                    <ConDis />
                  </div>
                </div>
              </div>
              {/* <!-- 商家統計 --> */}
              <div className="col-12 p-0 tab-pane" id="resturant">
                <div className="col-12" style={{ backgroundCcolor: 'rgb(222, 253, 204)' }} id="chartTop">
                  <div className="row m-0">
                    <div className="col-6 mt-3" >
                      <h3 className="text-center" id="pieLTitle">商家評價比例</h3>
                      <div id="chartL" style={{ overflow: 'hidden' }}>
                        <ResSta />
                      </div>
                    </div>
                    <div className="col-6 mt-3">
                      <h3 className="text-center" id="pieLRitle">商家分布比例</h3>
                      <div id="chartR" style={{ overflow: 'hidden' }}>
                        <ResDis />
                      </div>
                    </div>

                  </div>

                </div>

                <div className="col-12 px-5" id="chartDown" style={{ backgroundCcolor: 'rgb(219, 219, 219)' }}>
                  <h3 id="chartTitle" className="text-center">商家訂單數量</h3>
                  <div id="chartdiv" className="w-100 ">
                    <ResAllEarn />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

