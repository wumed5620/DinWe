import React, { useState, useEffect } from 'react';
import $ from "jquery";
import axios from "axios";
import "../css/enterprise_review.css";

const EnterpriseReview = () => {

    const reviewList = [
        {
            order_id: "",
            orderdate: "",
            star: "",
            comments: "",
        }
    ]

    const options = ["依照日期-由新到舊", "依照星級-由高到低"];
    const [slcOrder, setSlcOrder] = useState("");
    const [slcDate, setSlcDate] = useState("");
    const [today, setToday] = useState("");
    const [finishorder, setFinishorder] = useState("");

    const myID = sessionStorage.getItem('resturant_id');
    // const reviewData = reviewList;
    const [hasData, setHasData] = useState(true);
    const [reviewData, setReviewData] = useState(reviewList);
    const [showData, setShowData] = useState(reviewData);

    const countMonth = reviewData.filter((data) => {
        const orderMonth = new Date(data.orderdate).getMonth();
        const DBMonth = new Date(today).getMonth();
        return orderMonth === DBMonth;
    })

    const averStar = reviewData.length === 0 ? "0.0" : (reviewData.map((data) => data.star).reduce((a, b) => a + b, 0) / reviewData.length).toFixed(1);
    const fourstars = countMonth.filter((countMonth) => { return countMonth.star >= 4 }).length;
    const percent = countMonth.length === 0 ? "0.0" : ((fourstars / countMonth.length) * 100).toFixed(2);

    async function fetchData() {

        await axios.get(`http://localhost:8000/api/enterprise/gettotal/${myID}`)
            .then(response => {
                const finishorder = response.data[0];
                setFinishorder(finishorder);
            });

        await axios.get(`http://localhost:8000/api/enterprise/getcomment/${myID}`)
            .then(response => {
                const key = Object.keys(response.data[0]);
                if (key[0] === "message") {
                    setReviewData(reviewList);
                    setShowData(reviewList);
                    setHasData(false);
                } else {
                    const data = response.data;
                    setReviewData(data);
                    axios.get('http://localhost:8000/api/enterprise/getDBdate')
                        .then(response => {
                            const today = response.data[0].today;
                            setSlcDate(today);
                            setToday(today);
                            const comment = data.filter((data) => data.orderdate === today)
                            showhasData(comment);
                        });
                    // const comment = response.data.filter((data) => { return data.star !== null });
                }
            });
    }

    useEffect(() => fetchData, []);

    const chgDate = (event) => {
        setSlcDate(event.target.value)
        updateSlcOrderDate(event.target.value)
    }

    const chgSlc = (event) => {
        setSlcOrder(options[event.target.value - 1])
        updateSlcOrderData(event.target.value - 1)
    }

    const updateSlcOrderDate = (date) => {
        const reviewDate = reviewData.filter((showData) => {
            if (date === "") {
                return showData
            } else {
                return showData.orderdate === date
            }
        })
        showhasData(reviewDate);
    }

    const updateSlcOrderData = (num) => {
        // 由新到舊
        if (num === 0) {
            const sortReview = reviewData.sort(function (a, b) {
                return Date.parse(b.orderdate) - Date.parse(a.orderdate)
            }).sort(function (a, b) {
                if (a.orderdate === b.orderdate) {
                    return b.order_id - a.order_id
                }
            })
            IsSelectDate(sortReview)
        }
        // 由高到低
        else if (num === 1) {
            const sortReview = reviewData.sort(function (a, b) {
                return b.star - a.star
            })
            IsSelectDate(sortReview)
        }
    }

    const IsSelectDate = (sortReview) => {
        const reviewSlcdate = $("#SelectDate")[0].value;
        const reviewSlc = sortReview.filter((data) => {
            if (reviewSlcdate !== "") {
                return (data.orderdate === reviewSlcdate)
            } else {
                return data
            }
        })
        showhasData(reviewSlc);
    }

    const showhasData = (slcData) => {
        if (slcData.length === 0) {
            setHasData(false);
        } else {
            setHasData(true);
        }
        setShowData(slcData);
    }

    return <React.Fragment>
        <div className="col-10 mt-3 px-4">
            <div className="row h4 pb-2 border-bottom">評價留言</div>
            <div className="row my-3">
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="circle-wrap">
                        <div className="circle">
                            <div className="mask half">
                                <div className="fill" style={{ "--my-parameter": (averStar * 36) + "deg" }}></div>
                            </div>
                            <div className="mask full" style={{ "--my-parameter": (averStar * 36) + "deg" }}>
                                <div className="fill" style={{ "--my-parameter": (averStar * 36) + "deg" }}></div>
                            </div>
                            <div className="inside-circle">
                                <span className="bi bi-star-fill"> {averStar}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-md-6 col-sm-12">
                    <div className="row h4 fw-bold startxt mt-4 ps-2">
                        平均星星數：{averStar} / 5.0
                    </div>
                    <div className="text-start mb-2">
                        <div className="mb-2">本月訂位單數： {finishorder.count}</div>
                        <div className="mb-2">本月評論單數： {countMonth.length}</div>
                        <div className="mb-2">本月好評(4星)：
                            {fourstars}，占比 {percent} %</div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-between mt-4">
                <div className="col-lg-3 col-md-9 col-sm-12">
                    <input type='date' className="form-control text-center" id="SelectDate"
                        value={slcDate}
                        onChange={(event) => { chgDate(event) }} />
                </div>
                <div className="col-lg-3 col-md-8 col-sm-12 mb-2">
                    <select className="form-select text-start"
                        onChange={(event) => { chgSlc(event) }}
                        defaultValue={slcOrder}>
                        {
                            options.map((value, index) =>
                                <option key={index} value={index + 1}>{value}</option>)
                        }
                    </select>
                </div>
            </div>

            <div className="row rounded-top justify-content-center align-items-center majorColor text-light text-center py-1">
                <div className="col-lg-2 col-md-3 col-3">日 期</div>
                <div className="col-lg-2 col-md-3 col-3">訂位單號</div>
                <div className="col-lg-2 col-md-2 col-2">星 級</div>
                <div className="col-lg-6 col-md-4 col-4">評 價</div>
            </div>

            {
                hasData === true
                    ?
                    showData.map((review, index) => {
                        return <React.Fragment key={index}>
                            <div className="row justify-content-center align-items-center mb-2 py-3 border-bottom text-center">
                                <div className="col-lg-2 col-md-3 col-3">{review.orderdate}</div>
                                <div className="col-lg-2 col-md-3 col-3">{review.order_id}</div>
                                <div className="col-lg-2 col-md-2 col-2">
                                    <span className="bi bi-star-fill"> {review.star}</span>
                                </div>
                                <div className="col-lg-6 col-md-4 col-4 text-start">
                                    {review.comments}
                                </div>
                            </div>
                        </React.Fragment>
                    })
                    :
                    <div className="row rounded-top justify-content-center align-items-center text-secondary text-center my-5 py-3">
                        目 前 尚 無 評 論
                    </div>
            }

            <br />
            {/* <div className="row justify-content-between align-items-center mb-2">
                <div className="col-6 text-start">
                    <button className="btn btn-warning text-light">
                        <i className="bi bi-caret-left-fill mb-1"></i>
                        <span>上一頁</span>
                    </button>
                </div>
                <div className="col-6 text-end">
                    <button className="btn btn-warning text-light">
                        <span>下一頁</span>
                        <i className="bi bi-caret-right-fill mb-1"></i>
                    </button>
                </div>
            </div> */}
        </div>
    </React.Fragment>
}

export default EnterpriseReview;