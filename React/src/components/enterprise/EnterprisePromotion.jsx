import React, { useState, useEffect } from 'react';
import $ from "jquery";
import axios from "axios";

const EnterprisePromotion = () => {
    const proNull = {
        activity_id: "",
        DB_id: "",
        resturant_id: "",
        title: "",
        editdate: "",
        releasedate: "",
        startdate: "",
        enddate: "",
        img: "",
        img_name: null,
        content: "",
        prostate: 0
    }

    const proList = [
        // {
        //     activity_id: 1,
        //     DB_id: 1,
        //     resturant_id: 1,
        //     title: "勞動節促銷活動",
        //     editdate: "2023-04-08",
        //     releasedate: "2023-04-25",
        //     startdate: "2023-04-28",
        //     enddate: "2023-05-01",
        //     img: "",
        //     img_name: "",
        //     content: "訂位來店消費，出示此優惠畫面送生啤酒1杯",
        //     prostate: 1
        // }
    ]

    const myID = sessionStorage.getItem('resturant_id');

    const checkList = ["尚未/取消發布", "已發布", "進行中"];

    const [proData, setProData] = useState(proList);
    const [modalData, setModalData] = useState(proNull);
    const [hasData, setHasData] = useState(true);

    async function fetchData() {
        const response = await axios.get(`http://localhost:8000/api/enterprise/getactivity/${myID}`);

        const key = Object.keys(response.data[0]);
        if (key[0] === "message") {
            setProData([proNull]);
            setHasData(false);
            // console.log(key[0]);
        } else {
            setProData(response.data);
        }

        setModalData(proNull);
    }

    useEffect(() => fetchData, []);

    const deleteProData = async () => {
        //     // const newState = proData.filter((proObject) => {
        //     //     return proObject.id !== id
        //     // })
        //     // setProData(newState)

        await axios.put(`http://localhost:8000/api/enterprise/deleteactivity/${modalData.resturant_id}`, modalData, {
            headers: {
                ContentType: 'multipart/form-data'
            }
        }).then(response => {
            console.log(response.data);
        });
        fetchData();
    }

    const updateModal = async () => {
        // const newState = proData.map((proObject) => {
        //     if (proObject.id === modalData.id)
        //         return modalData
        //     else return proObject;
        // });
        // setProData(newState)

        await axios.put(`http://localhost:8000/api/enterprise/updateactivity/${modalData.resturant_id}`, modalData, {
            headers: {
                ContentType: 'multipart/form-data'
            }
        }).then(response => {
            console.log(response.data);
            setModalData(proNull)
            fetchData();
        });
    }

    const addModal = async () => {
        // proData.push({ ...modalData, id: proData.length + 1 })
        // setProData(proData);

        await axios.post(`http://localhost:8000/api/enterprise/addactivity/${myID}`, modalData, {
            headers: {
                ContentType: 'multipart/form-data'
            }
        }).then(response => {
            console.log(response.data);
            setModalData(proNull)
        });
        fetchData();
        // setModalData({ ...modalData, img: null, img_name: null })
    }

    const handleModalImg = (event, modalData) => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = async () => {
            const base64Image = reader.result;
            setModalData({ ...modalData, img: base64Image, img_name: event.target.files[0].name })
        }
    }

    const rmvImg = (modalData) => {
        $("#proImgfile")[0].value = "";
        console.log($("#proImgfile"))
        setModalData({ ...modalData, img: null, img_name: null })
    }

    const rmvadImg = (modalData) => {
        $("#proadImgfile")[0].value = "";
        console.log($("#proadImgfile"))
        setModalData({ ...modalData, img: null, img_name: null })
    }

    return <React.Fragment>
        <div className="col-10 mt-3 px-4">
            <div className="row h4 border-bottom justify-content-between">
                優惠活動
                <div className="col-lg-6 col-md-4 col-sm-3 text-end mb-1">
                    <button id="addbtn" type="button" className="btn btn-warning secColor text-dark"
                        data-bs-toggle="modal" data-bs-target="#addModal"
                        onClick={() => { setModalData(proNull) }}>
                        <span className='bi bi-plus-circle-fill text-dark fw-bold'> 增加</span>
                    </button>
                </div>
            </div>
            <div className="row rounded-top justify-content-center align-items-center majorColor text-light text-center py-1">
                <div className="col-lg-1">編 號</div>
                <div className="col-lg-2">發布日期</div>
                <div className="col-lg-4">活動內容</div>
                <div className="col-lg-2">圖 片</div>
                <div className="col-lg-1">狀 態</div>
                <div className="col-lg-2"></div>
            </div>
            {
                hasData === true
                    ?
                    proData.map((proData, index) => {
                        return (
                            <div className="row justify-content-center align-items-center mb-2 py-3 border-bottom text-center" key={index}>
                                <div className="col-lg-1">{proData.activity_id}</div>
                                <div className="col-lg-2">{proData.releasedate}</div>
                                <div className="col-lg-4 text-start">
                                    <ul>
                                        <li>
                                            優惠日期：{proData.startdate}~{proData.enddate}
                                        </li>
                                        <li>
                                            優惠內容：{proData.title}
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-2">
                                    {proData.img_name}
                                </div>
                                <div className="col-lg-1">
                                    <div>
                                        {parseInt(proData.prostate) === 0
                                            ?
                                            <span>未發布</span>
                                            :
                                            parseInt(proData.prostate) === 1
                                                ?
                                                <span>已發布</span>
                                                :
                                                <span>進行中</span>
                                        }
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <button id="chgbtn" type="button" className="btn btn-outline-primary mb-sm-1 me-1"
                                        data-bs-toggle="modal" data-bs-target="#modifyModal"
                                        onClick={() => { setModalData(proData) }}
                                    >
                                        <span className="bi bi-pencil-square me-1"> 詳細</span>
                                    </button>

                                    <button id="canbtn" type="button" className="btn btn-outline-danger mb-sm-1 me-1"
                                        data-bs-toggle="modal" data-bs-target="#confirmModal"
                                        onClick={() => { setModalData(proData) }}>
                                        <span className="bi bi-x me-1"> 刪除</span>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className="row justify-content-center align-items-center my-5 py-4 text-center text-secondary">
                        目 前 尚 無 優 惠 活 動
                    </div>
            }
        </div>

        {/* 修改活動 Modal */}
        <div className="modal fade" id="modifyModal"
            data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modifyModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="modifyModalLabel">編號：{modalData.activity_id}，詳細資料：</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setModalData(proNull) }}></button>
                    </div>
                    <div className="modal-body">
                        <form encType="multipart/form-data">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="proTitle">活動標題</span>
                                <input type="text" className="form-control" aria-label="proTitle" aria-describedby="proTitle"
                                    value={modalData.title}
                                    onChange={(event) => { setModalData({ ...modalData, title: event.target.value }) }} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="releasedate">發布日期</span>
                                <input type="date" className="form-control" aria-label="releasedate" aria-describedby="releasedate"
                                    value={modalData.releasedate}
                                    onChange={(event) => { setModalData({ ...modalData, releasedate: event.target.value }) }} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="startDate">開始日期</span>
                                <input type="date" className="form-control" aria-label="startDate" aria-describedby="startDate"
                                    value={modalData.startdate}
                                    onChange={(event) => { setModalData({ ...modalData, startdate: event.target.value }) }} />
                                <span className="input-group-text" id="endDate">結束日期</span>
                                <input type="date" className="form-control" aria-label="endDate" aria-describedby="endDate"
                                    value={modalData.enddate}
                                    onChange={(event) => { setModalData({ ...modalData, enddate: event.target.value }) }} />
                            </div>
                            <div className="input-group mb-2">
                                <span className="input-group-text" id="proImg">活動照片</span>
                                <input type="file" className="form-control" id="proImgfile"
                                    onChange={(event) => { event.target.files['length'] !== 0 ? handleModalImg(event, modalData) : setModalData({ ...modalData, img: modalData.img, img_name: modalData.img_name }) }} />
                            </div>
                            <div className="mb-3">
                                {
                                    modalData.img_name !== null ?
                                        <div className='ms-5 ps-5'>
                                            <button type='button' className="btn btn-outline-light border-0 mb-1"
                                                onClick={() => { rmvImg(modalData) }}>
                                                <span className="bi bi-dash-circle-fill text-dark" />
                                            </button>
                                            {modalData.img_name}
                                        </div>
                                        : null
                                }
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="procontent">活動內容</span>
                                <textarea className="form-control" id="procontent" value={modalData.content}
                                    onChange={(event) => { setModalData({ ...modalData, content: event.target.value }) }}></textarea>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="prostate">活動狀態</span>
                                <div className="form-control" id="prostate">
                                    {checkList.map((item, index) => (
                                        <div key={index}>
                                            <input name={index} type="checkbox" id={"item" + index}
                                                checked={parseInt(modalData.prostate) === index ? true : false}
                                                onChange={(event) => { setModalData({ ...modalData, prostate: event.target.name }) }} />
                                            <label className='ms-1' htmlFor={"item" + index}> {item}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                            onClick={() => { setModalData(proNull) }}>
                            取消
                        </button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                            onClick={() => { updateModal(modalData) }}>確認修改</button>
                    </div>
                </div>
            </div>
        </div>

        {/* 新增活動 Modal */}
        <div className="modal fade" id="addModal"
            data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="addModalLabel">新增優惠活動：</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setModalData(proNull) }}></button>
                    </div>
                    <div className="modal-body">
                        <form action="">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="proTitle">活動標題</span>
                                <input type="text" className="form-control" aria-label="proTitle" aria-describedby="proTitle"
                                    value={modalData.title}
                                    onChange={(event) => { setModalData({ ...modalData, title: event.target.value }) }} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="releasedate">發布日期</span>
                                <input type="date" className="form-control" aria-label="releasedate" aria-describedby="releasedate"
                                    value={modalData.releasedate}
                                    onChange={(event) => { setModalData({ ...modalData, releasedate: event.target.value }) }} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="startDate">開始日期</span>
                                <input type="date" className="form-control" aria-label="startDate" aria-describedby="startDate"
                                    value={modalData.startdate}
                                    onChange={(event) => { setModalData({ ...modalData, startdate: event.target.value }) }} />
                                <span className="input-group-text" id="endDate">結束日期</span>
                                <input type="date" className="form-control" aria-label="endDate" aria-describedby="endDate"
                                    onChange={(event) => { setModalData({ ...modalData, enddate: event.target.value }) }} />
                            </div>

                            <div className="input-group mb-2">
                                <span className="input-group-text" id="proImg">活動照片</span>
                                <input type="file" className="form-control" id="proadImgfile" placeholder="Upload an Image"
                                    onChange={(event) => { event.target.files['length'] !== 0 ? handleModalImg(event, modalData) : setModalData({ ...modalData, img: modalData.img, img_name: modalData.img_name }) }} />
                            </div>
                            <div className="mb-3">
                                {
                                    modalData.img_name !== null ?
                                        <div className='ms-5 ps-5'>
                                            <button type='button' className="btn btn-outline-light border-0 mb-1"
                                                onClick={() => { rmvadImg(modalData) }}>
                                                <span className="bi bi-dash-circle-fill text-dark" />
                                            </button>
                                            {modalData.img_name}
                                        </div>
                                        : null
                                }
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="procontent">活動內容</span>
                                <textarea className="form-control" id="procontent" value={modalData.content}
                                    onChange={(event) => { setModalData({ ...modalData, content: event.target.value }) }}></textarea>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="prostate">活動狀態</span>
                                <div className="form-control" id="prostate">
                                    {checkList.map((item, index) => (
                                        <div key={index}>
                                            <input name={index} type="checkbox" id={"item" + index}
                                                checked={parseInt(modalData.prostate) === index ? true : false}
                                                onChange={(event) => { setModalData({ ...modalData, prostate: event.target.name }) }} />
                                            <label className='ms-1' htmlFor={"item" + index}> {item}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                            onClick={() => { setModalData(proNull) }}>
                            取消
                        </button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                            onClick={() => { addModal(modalData) }}>確認新增</button>
                    </div>
                </div>
            </div>
        </div>

        {/* 刪除 Dialog */}
        <div className="modal fade" id="confirmModal"
            data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="confirmModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="confirmModal">確認刪除 【{modalData.title}】？</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setModalData(proNull) }}></button>
                    </div>
                    <div className="modal-body">
                        資料刪除後，將無法復原，請再次確認變更。
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                            onClick={() => { setModalData(proNull) }}>
                            取消
                        </button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                            onClick={() => { deleteProData(modalData) }}>
                            確認
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default EnterprisePromotion;