import React, { Component } from 'react';

class MemberNav extends Component {
    state = {
        token: sessionStorage.getItem('token')
    }
    render() {
        return (
            <React.Fragment>
                <nav className="navbar fixed-top bg-light">
                    <div className="container-fluid">
                        {/* 這是統一的高度 */}
                        {/* <a className="nav-link text-secondary px-3 py-3" href="/index" id="nav-link" > */}
                        <a className="nav-link text-secondary" href="/index" id="nav-link" >
                            <img className="logo_m" src={require("../images/LOGO_A.png")} alt="" />
                        </a>
                        <ul className="nav justify-content-end">
                            <div className="nav-link">
                                <a id="btncolor" className="btn btn-outline-light px-3 text-decoration-none text-secondary align-middle" href="/membermain">
                                    首頁
                                </a>
                                <div className="btn-group ms-1">
                                    <div id="btncolor" className="btn btn-light">
                                        <a id="linkcolor" className="text-decoration-none text-secondary align-middle" href="/membermain">
                                            會員中心
                                        </a>
                                        <span className="ms-1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span className="bi bi-caret-down-fill"></span>
                                        </span>
                                        <ul className="mt-3 dropdown-menu dropdown-menu-end">
                                            <li>
                                                <a className="dropdown-item" href="/membermain/member/pwd">更改密碼</a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="/membermain/member/info">修改基本資料</a>
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <a className="dropdown-item" href="/membermain/member/order">預約中訂單</a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="/membermain/member/orderdone">已完成訂單</a>
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <button type="button" className="dropdown-item text-end"
                                                    onClick={() => this.logOut(this.state.token)}>登出</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
    logOut = async (token) => {
        let headers = { 'Content-Type': 'application/json' };
        let body = { "token": token };
        await fetch('http://127.0.0.1:8000/api/member/logout', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(message => {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('member_id');
                alert(message['message']);
            });
        window.location = "/login";
    }
}

export default MemberNav;