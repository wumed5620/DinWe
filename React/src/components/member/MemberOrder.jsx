import React, { Component } from "react";

class MemberOrder extends Component {
    state = {
        member_id: sessionStorage.getItem('member_id'),
        orders: [
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
                order_notes: ""
            },
        ],
        test: { order_adult: 0 }
    };
    render() {
        const orderCount = this.state.orders.length;
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
                    {orderCount ? (this.state.orders.map((order, index) => {
                        return (
                            <div>
                                <div class="col-12 mt-5">
                                    <div class="col-10 mx-auto p-3 rounded">
                                        <table class="table w-100 table-light border table-striped">
                                            <tbody>
                                                <tr>
                                                    <td class="w-50">
                                                        日期：{order.order_date}
                                                    </td>
                                                    <td>
                                                        編號：
                                                        {order.order_id}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>餐廳：{order.resturant_name}</td>
                                                    <td>
                                                        地址：{order.resturant_address}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>時間：{order.order_time}</td>
                                                    <td>
                                                        總人數：{order.order_adult + order.order_child}
                                                        人 (大人：{order.order_adult}
                                                        位小孩：{order.order_child} 位)
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        訂位人：{order.order_who}
                                                    </td>
                                                    <td>電話：{order.order_phone}</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        額外需求：兒童椅
                                                        {order.order_chair} 張
                                                        兒童餐具 {order.order_tableware} 副
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2">
                                                        備註：{order.order_notes}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">
                                                        <button
                                                            class="btn"
                                                            id="infobtn_m"
                                                            data-bs-toggle="modal"
                                                            data-bs-target={`#orderDetail${index}`}
                                                        >
                                                            修改
                                                        </button>
                                                    </td>
                                                    <td class="text-center">
                                                        <button class=" btn btn-outline-danger fw-bold" onClick={() => this.doCancel(order.order_id)}>
                                                            取消訂位
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
                                                                type="text"
                                                                class="form-control"
                                                                id="orderTime"
                                                                value={
                                                                    order.order_date
                                                                }
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
                                                                disabled
                                                            />
                                                        </div>
                                                        <div class="input-group">
                                                            <span class="input-group-text">
                                                                時間
                                                            </span>
                                                            <input
                                                                type="phone"
                                                                class="form-control"
                                                                id=""
                                                                value={
                                                                    order.order_time
                                                                }
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
                                                                onChange={(e) => { this.doAdultChange(e, index) }}
                                                                required
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
                                                                onChange={(e) => { this.doChildChange(e, index) }}
                                                                required
                                                            />
                                                        </div>
                                                        <div class="input-group">
                                                            <span class="input-group-text">
                                                                訂位人
                                                            </span>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="orderWho"
                                                                value={
                                                                    order.order_who
                                                                }
                                                                onChange={(e) => { this.doWhoChange(e, index) }}
                                                                required
                                                            />
                                                        </div>
                                                        <div class="input-group">
                                                            <span class="input-group-text">
                                                                電話
                                                            </span>
                                                            <input
                                                                type="phone"
                                                                class="form-control"
                                                                id="0987987987"
                                                                value={
                                                                    order.order_phone
                                                                }
                                                                onChange={(e) => { this.doPhoneChange(e, index) }}
                                                                required
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
                                                                onChange={(e) => { this.doChairChange(e, index) }}
                                                                required
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
                                                                onChange={(e) => { this.doTablewareChange(e, index) }}
                                                                required
                                                            />
                                                        </div>
                                                        <div class="form-floating">
                                                            <input
                                                                type="textarea"
                                                                class="form-control"
                                                                id="note"
                                                                style={{
                                                                    height: "100px",
                                                                    resize: "none",
                                                                }}
                                                                placeholder="撰寫備註"
                                                                value={order.order_notes}
                                                                onChange={(e) => { this.doNoteChange(e, index) }}
                                                            />
                                                            <label for="floatingTextarea2">
                                                                備註
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer d-flex justify-content-around">
                                                        <button
                                                            type="button"
                                                            class="btn"
                                                            id="infobtn_m"
                                                            onClick={() => this.doModOrders(order.order_adult, order.order_child, order.order_who, order.order_phone, order.order_chair, order.order_tableware, order.order_notes, order.order_id)}
                                                        >
                                                            修改
                                                        </button>
                                                        <button
                                                            type="button"
                                                            class="btn"
                                                            id="addbtn_m"
                                                            data-bs-dismiss="modal"
                                                        >
                                                            取消
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    ) : (
                        <div className="fw-bold p-5">目前無預約中訂單！</div>
                    )}
                    <div class="col-2"></div>
                </div>
                <div style={{ height: "8vh" }}></div>
            </div>
        );
    }
    async componentDidMount() {
        await fetch('http://127.0.0.1:8000/api/member/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "member_id": this.state.member_id })
        })
            .then(response => response.json())
            .then(data => {
                var newState = { ...this.state };
                newState.orders = data;
                this.setState(newState);
            });
    }

    doCancel = async (o_id) => {
        let headers = { 'Content-Type': 'application/json' };
        let body = { "order_id": o_id };
        await fetch('http://127.0.0.1:8000/api/member/orders/cancel', {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(message => {
                alert(message);
            });
        window.location = "/membermain/member/order";
    }

    doAdultChange = (e, index) => {
        var newState = { ...this.state };
        newState.orders[index].order_adult = parseInt(e.target.value);
        this.setState(newState);
    }
    doChildChange = (e, index) => {
        var newState = { ...this.state };
        newState.orders[index].order_child = parseInt(e.target.value);
        this.setState(newState);
    }
    doWhoChange = (e, index) => {
        var newState = { ...this.state };
        newState.orders[index].order_who = e.target.value;
        this.setState(newState);
    }
    doPhoneChange = (e, index) => {
        var newState = { ...this.state };
        newState.orders[index].order_phone = e.target.value;
        this.setState(newState);
    }
    doChairChange = (e, index) => {
        var newState = { ...this.state };
        newState.orders[index].order_chair = parseInt(e.target.value);
        this.setState(newState);
    }
    doTablewareChange = (e, index) => {
        var newState = { ...this.state };
        newState.orders[index].order_tableware = parseInt(e.target.value);
        this.setState(newState);
    }
    doNoteChange = (e, index) => {
        var newState = { ...this.state };
        newState.orders[index].order_notes = e.target.value;
        this.setState(newState);
    }

    doModOrders = async (o_adult, o_child, o_who, o_phone, o_chair, o_tw, o_note, o_id) => {
        let headers = { 'Content-Type': 'application/json' };
        let body = {
            "order_adult": o_adult,
            "order_child": o_child,
            "order_who": o_who,
            "order_phone": o_phone,
            "order_chair": o_chair,
            "order_tableware": o_tw,
            "order_notes": o_note,
            "order_id": o_id
        };
        await fetch('http://127.0.0.1:8000/api/member/orders/mod', {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(message => {
                alert(message);
            });
        window.location = "/membermain/member/order";
    }
}

export default MemberOrder;
