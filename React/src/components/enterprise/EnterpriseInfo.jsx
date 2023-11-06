import React, { useState, useEffect } from 'react';
import $ from "jquery";
import axios from "axios";
import "../css/enterprise_info.css";

const EnterpriseInfo = () => {
    const resturantInfo = {
        resturant_id: "",
        resturant_account: "",
        resturant_name: "",
        resturant_uninum: "",
        resturant_phone: "",
        resturant_address: "",
        resturant_email: "",
        businessHours: [
            // { id: 1, weekday: "一", isOpen: 0, opentime: "", closetime: "", breaktimeOP: "", breaktimeED: "" },
            // { id: 2, weekday: "二", isOpen: 0, opentime: "", closetime: "", breaktimeOP: "", breaktimeED: "" },
            // { id: 3, weekday: "三", isOpen: 0, opentime: "", closetime: "", breaktimeOP: "", breaktimeED: "" },
            // { id: 4, weekday: "四", isOpen: 0, opentime: "", closetime: "", breaktimeOP: "", breaktimeED: "" },
            // { id: 5, weekday: "五", isOpen: 0, opentime: "", closetime: "", breaktimeOP: "", breaktimeED: "" },
            // { id: 6, weekday: "六", isOpen: 0, opentime: "", closetime: "", breaktimeOP: "", breaktimeED: "" },
            // { id: 7, weekday: "日", isOpen: 0, opentime: "", closetime: "", breaktimeOP: "", breaktimeED: "" }
            { id: 1, weekday: "一", isOpen: 1, opentime: "11:30", closetime: "21:00", breaktimeOP: "14:30", breaktimeED: "17:00" },
            { id: 2, weekday: "二", isOpen: 1, opentime: "11:30", closetime: "21:00", breaktimeOP: "14:30", breaktimeED: "17:00" },
            { id: 3, weekday: "三", isOpen: 1, opentime: "11:30", closetime: "21:00", breaktimeOP: "14:30", breaktimeED: "17:00" },
            { id: 4, weekday: "四", isOpen: 1, opentime: "11:30", closetime: "21:00", breaktimeOP: "14:30", breaktimeED: "17:00" },
            { id: 5, weekday: "五", isOpen: 1, opentime: "11:30", closetime: "21:00", breaktimeOP: "14:30", breaktimeED: "17:00" },
            { id: 6, weekday: "六", isOpen: 1, opentime: "11:30", closetime: "21:00", breaktimeOP: "14:30", breaktimeED: "17:00" },
            { id: 7, weekday: "日", isOpen: 1, opentime: "11:30", closetime: "21:00", breaktimeOP: "14:30", breaktimeED: "17:00" }
        ],
        resturant_intro: "",
        resturant_ifram: '',
        img: [{ id: 1, name: "", item: "" }],
        menuImg: [],
        resturant_state: "",
        editdate: "",
        edittime: ""
    }

    const myID = sessionStorage.getItem('resturant_id');

    const [resturant, setResturant] = useState(resturantInfo);
    const [resturantInit, setResturantInit] = useState(resturantInfo);

    async function fetchData() {
        const response = await axios.get(`http://localhost:8000/api/enterprise/getInfo/${myID}`);
        setResturant(response.data[0]);
        setResturantInit(response.data[0])
    }

    useEffect(() => fetchData, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.put(`http://localhost:8000/api/enterprise/updateInfo/${resturant.resturant_id}`, resturant, {
            headers: {
                ContentType: 'multipart/form-data'
            }
        }).then(response => {
            console.log(response.data);
            setResturant(resturant);
            setResturantInit(resturant);
            fetchData();
        });
    }

    const handleOpenday = (chgid) => {
        const newState = resturant.businessHours.map((businessHour) => {
            return (businessHour.id === chgid)
                ?
                (businessHour.isOpen === 1) ? { ...businessHour, isOpen: 0 } : { ...businessHour, isOpen: 1 }
                : businessHour
        })
        setResturant({ ...resturant, businessHours: newState })
    }

    const handleOpenTime = (event, chgid) => {
        const newState = resturant.businessHours.map((businessHour) => {
            return (businessHour.id === chgid)
                ?
                (businessHour.isOpen === 1) ? { ...businessHour, opentime: event.target.value } : { ...businessHour, opentime: "" }
                : businessHour
        })
        setResturant({ ...resturant, businessHours: newState })
    }

    const handleCloseTime = (event, chgid) => {
        const newState = resturant.businessHours.map((businessHour) => {
            return (businessHour.id === chgid)
                ?
                (businessHour.isOpen === 1) ? { ...businessHour, closetime: event.target.value } : { ...businessHour, closetime: "" }
                : businessHour
        })
        setResturant({ ...resturant, businessHours: newState })
    }

    const handleBreakOP = (event, chgid) => {
        const newState = resturant.businessHours.map((businessHour) => {
            return (businessHour.id === chgid)
                ?
                (businessHour.isOpen === 1) ? { ...businessHour, breaktimeOP: event.target.value } : { ...businessHour, breaktimeOP: "" }
                : businessHour
        })
        setResturant({ ...resturant, businessHours: newState })
    }

    const handleBreakED = (event, chgid) => {
        const newState = resturant.businessHours.map((businessHour) => {
            return (businessHour.id === chgid)
                ?
                (businessHour.isOpen === 1) ? { ...businessHour, breaktimeED: event.target.value } : { ...businessHour, breaktimeED: "" }
                : businessHour
        })
        setResturant({ ...resturant, businessHours: newState })
    }

    /* // 動態新增/刪除休息時間
    const addbreak = (breakNull, chgdayId) => {
        const chgDay = resturant.businessHours.find((value) => value.id === chgdayId)
        chgDay.breaktime.push({ ...breakNull })
        const newBreak = chgDay.breaktime
        updateBreak(newBreak, chgdayId);
    }

    const rmvbreak = (rmvtime, chgdayId) => {
        const chgDay = resturant.businessHours.find((value) => value.id === chgdayId)
        const newBreak = chgDay.breaktime.filter((breaktime) => {
            return breaktime !== rmvtime
        })
        updateBreak(newBreak, chgdayId);
    } 

    const updateBreak = (newBreak, chgid) => {
        const newState = resturant.businessHours.map((businessHour) => {
            return (businessHour.id === chgid)
                ?
                { ...businessHour, breaktime: newBreak }
                : businessHour
        })
        setResturant({ ...resturant, businessHours: newState })
    } */

    const handleCoverImg = (event) => {
        // console.log(event.target.files[0])
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = async () => {
            const base64Image = reader.result;
            // console.log(reader)
            const newState = resturant.img.map((img) => {
                return (img.id === 1)
                ? { ...img, name: event.target.files[0].name, item: base64Image }
                : img
            })
            setResturant({ ...resturant, img: newState })
        }
    }
 
    const rmvCoverImg = (imgId) => {
        console.log(resturant.img);
        $("#Coverphoto")[0].value = "";
        const newState = resturant.img.map((img) => {
            return (img.id === imgId)
            ? { ...img, name: null, item: null }
            : img
        })
        
        setResturant({ ...resturant, img: newState })
    }
        
    const addImg = (file) => {
        console.log(resturant.img)
        if (resturant.img[0].item === "" || resturant.img[0].item === null) {
            alert("請先上傳封面圖片");
        } else if (resturant.img[4].item !== null) {
            alert("超過可上傳數量，請先移除先前檔案");
        } else {
            for (let i = 1; i < resturant.img.length; i++) {
                if (resturant.img[i].item === null) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = async () => {
                        const base64Image = reader.result;
                        resturant.img[i].name = file.name;
                        resturant.img[i].item = base64Image;

                        const newState = resturant.img
                        setResturant({ ...resturant, img: newState })
                    }
                    break;
                }
            }
            console.log(resturant.img)
        }
    }

    const rmvImg = (imgId) => {
        const newState = resturant.img.filter((img) => img.id !== imgId)
        const lastindex = newState.length
        for (let i = lastindex; i < 5; i++) {
            const num = newState[lastindex - 1].id;
            newState.push({ id: (num + 1), name: null, item: null })
        }
        setResturant({ ...resturant, img: newState })
    }

    const addMenu = (file) => {
        if (resturant.menuImg[2].item !== null) {
            alert("超過可上傳數量，請先移除先前檔案");
        } else {
            // const i = resturant.menuImg.length
            for (let i = 0; i < resturant.menuImg.length; i++) {
                if (resturant.menuImg[i].item === null) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = async () => {
                        const base64Image = reader.result;
                        resturant.menuImg[i].name = file.name;
                        resturant.menuImg[i].item = base64Image;

                        const newState = resturant.menuImg
                        setResturant({ ...resturant, menuImg: newState })
                    }
                    break;
                }
            }
        }
    }

    const rmvMenu = (menuId) => {
        const newState = resturant.menuImg.filter((menuImg) => menuImg.id !== menuId)
        const lastindex = newState.length
        for (let i = lastindex; i < 3; i++) {
            const num = newState[lastindex - 1].id;
            newState.push({ id: (num + 1), name: null, item: null })
        }
        setResturant({ ...resturant, menuImg: newState })
    }
                                
    return <React.Fragment>
        <div className="col-10 mt-2 px-4">
            <div className="row pb-2 justify-content-end text-end">
                上次資料更動日期：{resturant.editdate === null ? "尚未有資料更動紀錄。" : resturant.editdate + "，" + resturant.edittime}<br /><br />
            </div>
            <div className="row h4 pb-2 border-bottom">基本資料</div>
            <div className="row mt-1 p-2">
                <form encType="multipart/form-data">
                    <div className="mb-3 row">
                        <label htmlFor="staticID" className="col-lg-2 col-md-3 col-sm-4 col-form-label">商家代號</label>
                        <div className="col-lg-10 col-md-9 col-sm-8">
                            <input type="text" readOnly className="form-control-plaintext"
                                id="staticID" name='resturant_id'
                                value={resturant.resturant_id} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="staticAccount" className="col-lg-2 col-md-3 col-sm-4 col-form-label">商家帳號</label>
                        <div className="col-lg-10 col-md-9 col-sm-8">
                            <input type="text" readOnly className="form-control-plaintext"
                                id="staticAccount" name='resturant_account'
                                value={resturant.resturant_account} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="staticName" className="col-lg-2 col-md-3 col-sm-4 col-form-label">商家名稱</label>
                        <div className="col-lg-10 col-md-9 col-sm-8">
                            <input type="text" readOnly className="form-control-plaintext"
                                id="staticName" name='resturant_name'
                                value={resturant.resturant_name} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="staticTaxID" className="col-lg-2 col-md-3 col-sm-4 col-form-label">統一編號</label>
                        <div className="col-lg-10 col-md-9 col-sm-8">
                            <input type="text" className="form-control form-controlborder"
                                id="staticTaxID" name='resturant_uninum'
                                value={resturant.resturant_uninum}
                                onChange={(event) => { setResturant({ ...resturant, resturant_uninum: event.target.value }) }} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="staticTel" className="col-lg-2 col-md-3 col-sm-4 col-form-label">聯絡電話</label>
                        <div className="col-lg-10 col-md-9 col-sm-8">
                            <input type="tel" className="form-control input-md"
                                id="staticTel" name='resturant_phone'
                                value={resturant.resturant_phone} required
                                onChange={(event) => { setResturant({ ...resturant, resturant_phone: event.target.value }) }} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="staticAdd" className="col-lg-2 col-md-3 col-sm-4 col-form-label">餐廳地址</label>
                        <div className="col-lg-10 col-md-9 col-sm-8">
                            <input type="text" className="form-control form-controlborder"
                                id="staticAdd" name='resturant_address'
                                value={resturant.resturant_address}
                                onChange={(event) => { setResturant({ ...resturant, resturant_address: event.target.value }) }} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-lg-2 col-md-3 col-sm-4 col-form-label">Email</label>
                        <div className="col-lg-10 col-md-9 col-sm-8">
                            <input type="email" className="form-control form-controlborder"
                                id="staticEmail" name='resturant_email'
                                value={resturant.resturant_email}
                                onChange={(event) => { setResturant({ ...resturant, resturant_email: event.target.value }) }} />
                        </div>
                    </div>
                    <div className="mb-4 row">
                        <label htmlFor="openTime" className="col-lg-2 col-md-3 col-sm-4 col-form-label">營業時間</label>
                        <div className="col-lg-10 col-md-9 col-sm-8 mt-2">
                            {
                                resturant.businessHours.map((businessHour, index) => {
                                    return <React.Fragment key={index}>
                                        <div className='row mb-2 ms-1'>
                                            <div className="col-auto form-check mt-2">
                                                <input className="form-check-input" type="checkbox"
                                                    id={"weekday" + businessHour.id}
                                                    name='businessHour'
                                                    checked={businessHour.isOpen === 1 ? true : false}
                                                    onChange={() => { handleOpenday(businessHour.id) }} />
                                                <label className="form-check-label" htmlFor={"weekday" + businessHour.id}>星期{businessHour.weekday}</label>
                                            </div>
                                            <div className="col-9">
                                                <div className="row mb-3 align-items-center">
                                                    <div className="col-lg-auto col-md-5 text-center">
                                                        <input id={"OP" + businessHour.id} type="time" className="form-control text-center"
                                                            value={businessHour.opentime}
                                                            name='businessHour.opentime'
                                                            onChange={(event) => { handleOpenTime(event, businessHour.id) }} />
                                                    </div>
                                                    <div className="col-lg-auto col-md-auto text-center">~</div>
                                                    <div className="col-lg-auto col-md-5 text-center">
                                                        <input id={"ED" + businessHour.id} type="time" className="form-control text-center"
                                                            value={businessHour.closetime}
                                                            name='businessHour.closetime'
                                                            onChange={(event) => { handleCloseTime(event, businessHour.id) }} />
                                                    </div>
                                                    <div className="col-1 pt-2 text-end">
                                                        <button className="btn btn-outline-light" type="button"
                                                            data-bs-toggle="collapse" data-bs-target={"#collapseBreak" + businessHour.id}
                                                            aria-expanded="false" aria-controls="collapseExample">
                                                            <span className="bi bi-chevron-down text-black" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="collapse ms-5 ps-5" id={"collapseBreak" + businessHour.id}>
                                                <div className='row mb-3'>
                                                    <div className="col align-items-center mb-2">
                                                        <span className="choosew"><b>休息時段：</b></span>
                                                    </div>
                                                    <div className="row align-items-center mb-1">
                                                        <div className="col-lg-auto col-md-auto text-start">
                                                            <input id={"breaktimeOP" + businessHour.id} type="time" className="form-control text-center"
                                                                value={businessHour.breaktimeOP}
                                                                name='businessHour.breaktimeOP'
                                                                onChange={(event) => { handleBreakOP(event, businessHour.id) }} />
                                                        </div>
                                                        <div className="col-lg-auto col-md-auto text-center pt-1">~</div>
                                                        <div className="col-lg-auto col-md-auto text-center">
                                                            <input id={"breaktimeED" + businessHour.id} type="time" className="form-control text-center"
                                                                value={businessHour.breaktimeED}
                                                                name='businessHour.breaktimeED'
                                                                onChange={(event) => { handleBreakED(event, businessHour.id) }} />
                                                        </div>
                                                    </div>
                                                    {/* 動態新增休息時間 */}
                                                    {/* {
                                                        businessHour.breaktime.map((breaktime, index) => {
                                                            return <React.Fragment>
                                                                <div className="row align-items-center mb-1" key={index}>
                                                                    <div className="col-lg-auto col-md-auto text-center ms-1">
                                                                        {index < (businessHour.breaktime.length - 1)
                                                                            ?
                                                                            <button type='button' className="btn btn-outline-light border-0"
                                                                                onClick={() => { rmvbreak(breaktime, businessHour.id) }}><span className="bi bi-dash-circle-fill text-dark" /></button>
                                                                            :
                                                                            <button type='button' className="btn btn-outline-light border-0"
                                                                                onClick={() => { addbreak(breakNull, businessHour.id) }}><span className="bi bi-plus-circle-fill" /></button>
                                                                        }
                                                                    </div>
                                                                    <div className="col-lg-auto col-md-auto text-start">
                                                                        <input id={"breaktimeOP" + (index + 1)} type="time" className="form-control text-center"
                                                                            value={breaktime.OP}
                                                                            onChange={(event) => { handleBreakOP(event, businessHour.id, index) }} />
                                                                    </div>
                                                                    <div className="col-lg-auto col-md-auto text-center pt-1">~</div>
                                                                    <div className="col-lg-auto col-md-auto text-center">
                                                                        <input id={"breaktimeED" + (index + 1)} type="time" className="form-control text-center"
                                                                            value={breaktime.ED}
                                                                            onChange={(event) => { handleBreakED(event, businessHour.id, index) }} />
                                                                    </div>
                                                                </div>
                                                            </React.Fragment>
                                                        })
                                                    } */}
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                })
                            }
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="DesTextarea" className="col-lg-2 col-md-3 col-sm-12 col-form-label">簡介描述</label>
                        <div className="col-lg-10 col-md-9 col-sm-12">
                            <div className="form-floating">
                                <textarea className="form-control" placeholder="Leave a comment here"
                                    id="DesTextarea" name='resturant_intro'
                                    value={resturant.resturant_intro}
                                    onChange={(event) => { setResturant({ ...resturant, resturant_intro: event.target.value }) }}></textarea>
                                {resturant.resturant_intro !== "" ? null : <label htmlFor="DesTextarea">商家簡介...</label>}
                            </div>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="staticMap" className="col-lg-2 col-md-3 col-sm-4 col-form-label">嵌入地圖</label>
                        <div className="col-lg-10 col-md-9 col-sm-8">
                            <input type="text" className="form-control "
                                id="staticMap" name='resturant_ifram'
                                value={resturant.resturant_ifram}
                                onChange={(event) => { setResturant({ ...resturant, resturant_ifram: event.target.value }) }} />
                            <div className="mt-1 ms-1">
                                <span className='text-secondary keyword'>請填寫 由 GoogleMap 提供嵌入地圖碼，無須設定大小，格式開頭為"&lt;iframe src=...&gt;"</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="Coverphoto" className="col-lg-2 col-md-3 col-sm-12 col-form-label">封面圖片</label>
                        <div className="col-lg-10 col-md-9 col-sm-">
                            <input type="file" className="form-control " id="Coverphoto"
                                placeholder="Upload an Image"
                                onChange={(event) => { event.target.files['length'] !== 0 ? handleCoverImg(event) : console.log("") }} />
                            {
                                resturant.img[0].name !== null ?
                                    <div className='mt-2 ms-2'>
                                        <button type='button' className="btn btn-outline-light border-0 mb-1"
                                        onClick={() => { 
                                            rmvCoverImg(resturant.img[0].id)}}
                                        >
                                            <span className="bi bi-dash-circle-fill text-dark" />
                                        </button>
                                        {resturant.img[0].name}
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="photo" className="col-lg-2 col-md-3 col-sm-12 col-form-label">餐廳圖片</label>
                        <div className="col-lg-10 col-md-9 col-sm-12">
                            <div className="input-group mb-1">
                                <input type="file" className="form-control " id="photo" aria-describedby="imgadd" aria-label="Upload" />
                                <button className="btn btn-warning" type="button" id="imgadd"
                                    onClick={() => { $("#photo")[0].value !== "" ? addImg($("#photo")[0].files[0]) : alert("請新增檔案") }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill text-dark" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                    </svg>
                                    <span className='fw-bold'> 增加</span>
                                    {/* <span className="bi bi-plus-circle-fill"> 增加</span> */}
                                </button>
                            </div>
                            {
                                resturant.img.map((img, index) => {
                                    return <React.Fragment key={index}>
                                        {
                                            img.id !== 1 ?
                                                img.item !== null ?
                                                    <div className="ms-2">
                                                        <button type='button' className="btn btn-outline-light border-0 mb-1"
                                                            onClick={() => { rmvImg(img.id) }}>
                                                            <span className="bi bi-dash-circle-fill text-dark" />
                                                        </button>
                                                        {img.name}
                                                    </div>
                                                    : null
                                                : null
                                        }
                                    </React.Fragment>
                                })
                            }
                        </div>
                    </div>
                    <div className="mb-2 row">
                        <label htmlFor="menu" className="col-lg-2 col-md-3 col-sm-12 col-form-label">菜單圖片</label>
                        <div className="col-lg-10 col-md-9 col-sm-12">
                            <div className="input-group mb-1">
                                <input type="file" className="form-control " id="menu" aria-describedby="menuadd" aria-label="Upload" />
                                <button className="btn btn-warning" type="button" id="menuadd"
                                    onClick={() => { $("#menu")[0].value !== "" ? addMenu($("#menu")[0].files[0]) : alert("請新增檔案") }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill text-dark" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                    </svg>
                                    <span className='fw-bold'> 增加</span>
                                </button>
                            </div>
                            {
                                resturant.menuImg.map((menuImg, index) => {
                                    return <React.Fragment key={index}>
                                        {
                                            menuImg.item !== null ?
                                                <div className="ms-2">
                                                    <button type='button' className="btn btn-outline-light border-0 mb-1"
                                                        onClick={() => { rmvMenu(menuImg.id) }}>
                                                        <span className="bi bi-dash-circle-fill text-dark" />
                                                    </button>
                                                    <span>{menuImg.name}</span>
                                                </div>
                                                : null
                                        }
                                    </React.Fragment>
                                })
                            }
                        </div>
                    </div>
                    <br />
                    {/* <div className="mb-3 row text-secondary">
                        <label htmlFor="forgetPwd" className="col-lg-2 col-md-3 col-sm-4 col-form-label">變更密碼？</label>
                        <div className="col-lg-10 col-md-9 col-sm-8">
                            <span className="form-control-plaintext text-secondary" id="forgetPwd">
                                請撥打客服電話：0800-123456，將由專人為您服務。
                            </span>
                        </div>
                    </div> */}
                    <div className="text-center my-2">
                        <button className="btn btn-warning me-2 fw-bolder" type="submit"
                            data-bs-toggle="modal" data-bs-target="#confirmModal"
                            onClick={handleSubmit}
                        >送出修改</button>
                        <button className="btn btn-danger fw-bold" type="button"
                            onClick={() => { setResturant(resturantInit) }}>取消</button>
                    </div>
                </form>
            </div >
        </div >

        {/* 確認修改 Dialog */}
        <div className="modal fade" id="confirmModal" data-bs-backdrop="static" data-bs-keyboard="false"
            tabIndex="-1" aria-labelledby="confirmModal" aria-hidden="true" >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="confirmModal">提醒：</h1>
                    </div>
                    <div className="modal-body">
                        <span>基本資料已確認修改。</span>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">確認</button>
                    </div>
                </div>
            </div>
        </div>

    </React.Fragment >
}

export default EnterpriseInfo;