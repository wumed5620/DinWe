import React, { Component } from "react";

class MemberOrderDone extends Component {
    state = {
        member_id: sessionStorage.getItem('member_id'),
        orderDones: [
            {
                order_date: "",
                order_id: 0,
                resturant_name: "",
                resturant_address: "",
                order_time: "",
                order_adult: 0,
                order_child: 0,
                order_chair: 0,
                order_tableware: 0,
                order_who: "",
                order_phone: "",
                order_notes: "",
                order_stars: 0,
                order_comment: "",
                order_state: 3,
            }
        ],
    };
    render() {
        const orderCount = this.state.orderDones.length;
        return (
            <div class="container">
                {/* <div class="row">
                    <div class="col-12 px-5 mt-5 me-5">
                        <div class="ms-auto">
                            <select
                                class="form-select ms-auto text-center border border-primary"
                                style={{ maxWidth: "250px" }}
                            >
                                <option value="fromNow" selected>
                                    排序 - 依時間-由近到遠
                                </option>
                                <option value="fromPast">
                                    排序 - 依時間-由遠到近
                                </option>
                            </select>
                        </div>
                    </div>
                </div> */}
                <div style={{ height: "72vh" }} className="row overflow-auto">
                    {orderCount ? (this.state.orderDones.map((order, index) => {
                        return (
                            <div>
                                <div class="col-12 mt-5">
                                    <div class="col-10 mx-auto p-3 rounded">
                                        <table class="table w-100 table-light border table-striped">
                                            <tbody>
                                                <tr>
                                                    <td class="w-50">
                                                        日期：
                                                        {order.order_date}
                                                    </td>
                                                    <td>
                                                        編號：
                                                        {order.order_id}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        餐廳：
                                                        {order.resturant_name}
                                                    </td>
                                                    <td>
                                                        地址：
                                                        {order.resturant_address}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        時段：
                                                        {order.order_time}
                                                    </td>
                                                    <td>
                                                        總人數：
                                                        {order.order_adult + order.order_child}人 (大人：
                                                        {order.order_adult}位 小孩：
                                                        {order.order_child}
                                                        位)
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        訂位人：
                                                        {order.order_who}
                                                    </td>
                                                    <td>
                                                        電話：
                                                        {order.order_phone}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        額外需求：兒童椅
                                                        {order.order_chair}張 兒童餐具
                                                        {order.order_tableware}副
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        備註:
                                                        {order.order_notes}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        class="text-center"
                                                        colspan="2"
                                                    >
                                                        <button
                                                            class="btn w-25"
                                                            id="infobtn_m"
                                                            data-bs-toggle="modal"
                                                            data-bs-target={`#orderDetail${index}`}
                                                        >
                                                            評價
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div
                                    class="modal fade"
                                    id={`orderDetail${index}`}
                                    tabindex="-1"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                >
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5
                                                    class="modal-title"
                                                    id="exampleModalLabel"
                                                >
                                                    訂單詳細內容
                                                </h5>
                                                <button
                                                    type="button"
                                                    class="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                ></button>
                                            </div>
                                            <div class="modal-body">
                                                <form
                                                    class="needs-validation"
                                                    novalidate=""
                                                >
                                                    <div class="row g-3">
                                                        <div class="input-group">
                                                            <span class="input-group-text">
                                                                日期
                                                            </span>
                                                            <input
                                                                type="date"
                                                                class="form-control"
                                                                id="orderTime"
                                                                value={
                                                                    order.order_date
                                                                }
                                                                required
                                                                disabled
                                                            />
                                                        </div>
                                                        <div class="input-group">
                                                            <span class="input-group-text">
                                                                編號
                                                            </span>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="orderTime"
                                                                value={
                                                                    order.order_id
                                                                }
                                                                required
                                                                disabled
                                                            />
                                                        </div>
                                                        <div class="input-group">
                                                            <span class="input-group-text">
                                                                餐廳
                                                            </span>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="orderResturant"
                                                                value={
                                                                    order.resturant_name
                                                                }
                                                                required
                                                                disabled
                                                            />
                                                        </div>
                                                        <div class="input-group">
                                                            <span class="input-group-text">
                                                                地址
                                                            </span>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="orderAddress"
                                                                value={
                                                                    order.resturant_address
                                                                }
                                                                required
                                                                disabled
                                                            />
                                                        </div>
                                                        <div class="input-group">
                                                            <span class="input-group-text">
                                                                時間
                                                            </span>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="orderResturant"
                                                                value={
                                                                    order.order_time
                                                                }
                                                                required
                                                                disabled
                                                            />
                                                        </div>
                                                        <div class="input-group">
                                                            <span class="input-group-text">
                                                                大人
                                                            </span>
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="orderAdult"
                                                                value={
                                                                    order.order_adult
                                                                }
                                                                required
                                                                disabled
                                                            />
                                                            <span class="input-group-text">
                                                                小孩
                                                            </span>
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="orderChild"
                                                                value={
                                                                    order.order_child
                                                                }
                                                                required
                                                                disabled
                                                            />
                                                        </div>
                                                        <div class="input-group">
                                                            <span class="input-group-text">
                                                                訂位人
                                                            </span>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="orderAdult"
                                                                value={
                                                                    order.order_who
                                                                }
                                                                disabled
                                                            />
                                                        </div>
                                                        <div class="input-group">
                                                            <span class="input-group-text">
                                                                電話
                                                            </span>
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="0987987987"
                                                                value={
                                                                    order.order_phone
                                                                }
                                                                required
                                                                disabled
                                                            />
                                                        </div>
                                                        <div class="input-group">
                                                            <span class="input-group-text">
                                                                兒童椅
                                                            </span>
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="chair"
                                                                value={
                                                                    order.order_chair
                                                                }
                                                                required
                                                                disabled
                                                            />
                                                            <span class="input-group-text">
                                                                兒童餐具
                                                            </span>
                                                            <input
                                                                type="number"
                                                                class="form-control"
                                                                id="chop"
                                                                value={
                                                                    order.order_tableware
                                                                }
                                                                required
                                                                disabled
                                                            />
                                                        </div>
                                                        <div class="input-group">
                                                            <span class="input-group-text border border-2 border-warning">
                                                                星數 ★ (1-5)
                                                            </span>
                                                            <input
                                                                type="number"
                                                                class="form-control border border-2 border-warning"
                                                                id="0987987987"
                                                                value={order.order_stars}
                                                                onChange={(e) => { this.doStarChange(e, index) }}
                                                                disabled={order.order_state === 4 ? true : false}
                                                                required
                                                            />
                                                        </div>
                                                        <div class="form-floating ">
                                                            <input
                                                                type="textarea"
                                                                class="form-control"
                                                                id="comment"
                                                                style={{
                                                                    height: "100px",
                                                                    resize: "none",
                                                                }}
                                                                placeholder="撰寫評論"
                                                                value={order.order_comment}
                                                                onChange={(e) => { this.doCommentChange(e, index) }}
                                                                disabled={order.order_state === 4 ? true : false}
                                                            />
                                                            <label for="floatingTextarea2">
                                                                評價
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {order.order_state === 4 ?
                                                        (<div class="modal-footer d-flex justify-content-around">
                                                            <button
                                                                type="button"
                                                                class="btn btn-secondary"
                                                                data-bs-dismiss="modal"
                                                            >
                                                                關閉
                                                            </button>
                                                        </div>)
                                                        :
                                                        (<div class="modal-footer d-flex justify-content-around">
                                                            <button
                                                                type="button"
                                                                class="btn"
                                                                id="infobtn_m"
                                                                onClick={() => { this.doAddComment(order.order_stars, order.order_comment, order.order_id) }}
                                                            >
                                                                送出
                                                            </button>
                                                            <button
                                                                type="button"
                                                                class="btn"
                                                                id="addbtn_m"
                                                                data-bs-dismiss="modal"
                                                            >
                                                                取消
                                                            </button>
                                                        </div>)}
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })) : (
                        <div className="fw-bold p-5">無完成訂單！</div>
                    )}
                </div>
                <div style={{ height: "8vh" }}></div>
            </div>
        );
    }
    async componentDidMount() {
        await fetch('http://127.0.0.1:8000/api/member/orderdones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "member_id": this.state.member_id })
        })
            .then(response => response.json())
            .then(data => {
                var newState = { ...this.state };
                newState.orderDones = data;
                this.setState(newState);
            });
    }

    doStarChange = (e, index) => {
        var newState = { ...this.state };
        newState.orderDones[index].order_stars = parseInt(e.target.value);
        this.setState(newState);
    }

    doCommentChange = (e, index) => {
        var newState = { ...this.state };
        newState.orderDones[index].order_comment = e.target.value;
        this.setState(newState);
    }
    doAddComment = async (o_stars, o_comment, o_id) => {
        let headers = { 'Content-Type': 'application/json' };
        let body = {
            "order_stars": o_stars,
            "order_comment": o_comment,
            "order_id": o_id
        };
        await fetch('http://127.0.0.1:8000/api/member/orderdones/addcomment', {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(message => {
                alert(message);
            });
        window.location = "/membermain/member/orderdone";
    }
}

export default MemberOrderDone;
