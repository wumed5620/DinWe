import React, { useState } from "react"
import { useHistory } from 'react-router-dom';
import logo from '../images/LOGO_A.png';
import axios from "axios";

function Register() {

    const history = useHistory();

    // 會員註冊
    const [regData, setRegData] = useState({
        member_name: '',
        member_birthday: '',
        member_email: '',
        member_account: '',
        member_password: '',
        member_password2: '',
    });

    const handleRegChange = (e) => {
        const { name, value } = e.target;
        setRegData({ ...regData, [name]: value });
    }

    const [memberCheck, setMemberCheck] = useState({
        contract: "0",
        RandP: "0"
    })

    const checkChange = (e) => {
        const { name, value } = e.target;
        if (value === "0") {
            setMemberCheck({ ...memberCheck, [name]: "1" })
        } else {
            setMemberCheck({ ...memberCheck, [name]: "0" })
        }
    }

    const memberRegister = async (e) => {
        e.preventDefault();

        if (regData.member_password !== regData.member_password2) {
            alert('密碼與密碼確認不相符，請重新輸入！');
            return;
        }

        if (memberCheck.contract === "1" && memberCheck.RandP === "1") {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/register', regData); // 替換為實際的後端 API URL
                console.log(response.data);

                if (response.data.status === true) {
                    alert('註冊成功');
                    history.push('/login');
                }

            } catch (error) {
                console.error(error);
            }
        } else {
            alert("請閱讀相關條款與聲明並勾選以確保您的權益")
        };

    }

    // 店家註冊
    const [regStore, setRegStore] = useState({
        resturant_name: '',
        resturant_address: '',
        resturant_email: '',
        resturant_phone: '',
        resturant_account: '',
        resturant_password: '',
        resturant_password2: '',
    });

    const storeChange = (e) => {
        const { name, value } = e.target;
        setRegStore({ ...regStore, [name]: value });
    }

    const [storeCheck, setStoreCheck] = useState({
        StoreContract: "0",
        StoreRandP: "0"
    })

    const StoreCheckChange = (e) => {
        const { name, value } = e.target;
        if (value === "0") {
            setStoreCheck({ ...storeCheck, [name]: "1" })
        } else {
            setStoreCheck({ ...storeCheck, [name]: "0" })
        }
    }

    const StoreRegister = async (e) => {
        e.preventDefault();
        if (regStore.resturant_password !== regStore.resturant_password2) {
            alert('密碼與密碼確認不相符，請重新輸入！');
            return;
        }

        if (storeCheck.StoreContract === "1" && storeCheck.StoreRandP === "1") {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/regStore', regStore); // 替換為實際的後端 API URL
                console.log(response.data);

                if (response.data.status === true) {
                    alert(response.data.message);
                }

                history.push('/login');
            } catch (error) {
                console.error(error);
            }
        } else {
            alert("請閱讀相關條款與聲明並勾選以確保貴店的權益")
        };

    }

    return (
        <React.Fragment>
            <section>
                <nav className="navbar fixed-top">
                    <div className="container-fluid">
                        <a href="/" className="px-3 py-3">
                            <img
                                className=""
                                src={logo}
                                style={{ width: "250px" }}
                                alt="logo"
                            />
                        </a>
                        <div className="d-flex">
                            <div className="btn btn-light border-dark rounded-pill lgiBtn me-3">
                                <a className="d-block mx-auto my-2 text-dark"
                                    width="20" style={{textDecoration:"none"}}
                                    height="20"
                                    href="/login" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle ms-1 align-middle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                    </svg>
                                    <span className="mx-1 align-middle align-middle">登入</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </section>

            <section id="Login" style={{ marginTop: "120px" }} className="mb-5">
                <div className="container">
                    <div className="row m-0 ">
                        <div className="m-auto border rounded p-5 pt-4 pb-4 justify-content-center shadow logBg col-12 col-md-8 col-lg-6">
                            <nav>
                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    <button className="nav-link active text-secondary fs-5" id="nav-member-tab" data-bs-toggle="tab" data-bs-target="#nav-member" role="tab">會員註冊</button>
                                    <button className="nav-link text-secondary fs-5" id="nav-store-tab" data-bs-toggle="tab" data-bs-target="#nav-store" role="tab">商家註冊</button>
                                </div>
                            </nav>
                            <div className="tab-content bg-white d-flex justify-content-center border border-top-0 rounded-bottom" id="nav-tabContent">
                                <form  onSubmit={memberRegister}
                                    method="post"
                                    className="col-10 tab-pane fade show active"
                                    id="nav-member"
                                    role="tabpanel"
                                    aria-labelledby="nav-member-tab"
                                >
                                    <div className="d-flex justify-content-center pt-5 mb-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-person-circle"  viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /><path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/></svg>
                                    </div>
                                    <div className="mb-4">
                                        <div className="text-secondary ms-2 mb-2">姓名<span className="text-danger">*</span></div>
                                        <input type="text" className="form-control border" id="username" autoComplete="on" placeholder="請輸入您的姓名..."
                                            name="member_name" value={regData.member_name} onChange={handleRegChange} />
                                    </div>
                                    <div className="mb-4">
                                        <div className="text-secondary ms-2 mb-2">生日(西元)<span className="text-danger">*</span></div>
                                        <input type="date" className="form-control border" id="birthday"
                                            name="member_birthday" value={regData.member_birthday} onChange={handleRegChange} />
                                    </div>
                                    <div className="mb-4">
                                        <div className="text-secondary ms-2 mb-2">電子郵件<span className="text-danger">*</span></div>
                                        <input type="email" className="form-control border" id="mail" autoComplete="on" placeholder="請輸入您的電子郵件..."
                                            name="member_email" value={regData.member_email} onChange={handleRegChange} />
                                    </div>
                                    <div className="mb-4">
                                        <div className="text-secondary ms-2 mb-2">手機號碼(帳號)<span className="text-danger">*</span></div>
                                        <input type="text" className="form-control border" id="account" autoComplete="off" placeholder="請輸入您的帳號..."
                                            name="member_account" value={regData.member_account} onChange={handleRegChange} />
                                        <div className="text-danger ms-2">*請正確填寫，註冊後將無法修改</div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="text-secondary ms-2 mb-2">密碼<span className="text-danger">*</span></div>
                                        <input type="password" className="form-control border" id="password" autoComplete="off" placeholder="請輸入您的密碼..."
                                            name="member_password" value={regData.member_password} onChange={handleRegChange} />
                                    </div>
                                    <div className="mb-4">
                                        <div className="text-secondary ms-2 mb-2">密碼確認<span className="text-danger">*</span></div>
                                        <input type="password" className="form-control border" id="doubleCheckPassword" autoComplete="off" placeholder="請再次輸入您的密碼..."
                                            name="member_password2" value={regData.member_password2} onChange={handleRegChange} />
                                    </div>
                                    <div className="mb-2 form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" name="contract"
                                            value={memberCheck.contract} onChange={checkChange} />
                                        <label className="form-check-label text-secondary" htmlFor="exampleCheck1">同意平台服務條款 <a href="/" className="text-decoration-none">詳細閱讀</a> </label>
                                    </div>
                                    <div className="mb-2 form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck2" name="RandP"
                                            value={memberCheck.RandP} onChange={checkChange} />
                                        <label className="form-check-label text-secondary" htmlFor="exampleCheck2">同意會員責任規範及個資聲明 <a href="/" className="text-decoration-none">詳細閱讀</a></label>
                                    </div>
                                    <p className="text-center m-0 mb-4">
                                        <button type="submit" className="col-12 btn btn-warning px-3 border border-2 border-secondary" style={{ height: "40px" }} >
                                            免費註冊
                                        </button>
                                    </p>
                                    <p className="text-center m-0 mb-4">
                                        <button type="reset" className="col-12 btn btn-light px-3 border border-2 border-secondary" style={{ height: "40px" }}>
                                            清除資料
                                        </button>
                                    </p>
                                    <p className="text-center mb-4">我已有會員帳號了？ <a href="/login">回登入頁面</a></p>
                                </form>
                                <form onSubmit={StoreRegister} 
                                    method="post"
                                    className="col-10 tab-pane fade"
                                    id="nav-store"
                                    role="tabpanel"
                                    aria-labelledby="nav-store-tab">
                                    <div className="d-flex justify-content-center pt-5 mb-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-shop border border-5 border-dark rounded-circle" viewBox="-2 -2 20 20" ><path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" /></svg>
                                    </div>
                                    <div className="mb-4">
                                        <div className="text-secondary ms-2 mb-2">店家名稱<span className="text-danger">*</span></div>
                                        <input type="text" className="form-control border" autoComplete="on" placeholder="請輸入貴公司店名..." id="resturant_name"
                                            name="resturant_name" value={regStore.resturant_name} onChange={storeChange} />
                                    </div>
                                    <div className="mb-4">
                                        <div className="text-secondary ms-2 mb-2">店家地址</div>
                                        <input type="text" className="form-control border" autoComplete="on" placeholder="請輸入貴公司的通訊地址..."
                                            name="resturant_address" value={regStore.resturant_address} onChange={storeChange} />
                                    </div>
                                    <div className="mb-4">
                                        <div className="text-secondary ms-2 mb-2">電子郵件<span className="text-danger">*</span></div>
                                        <input type="email" className="form-control border" autoComplete="on" placeholder="請輸入貴公司的電子郵件..."
                                            name="resturant_email" value={regStore.resturant_email} onChange={storeChange} />
                                    </div>
                                    <div className="mb-4">
                                        <div className="text-secondary ms-2 mb-2">通訊電話<span className="text-danger">*</span></div>
                                        <input type="text" className="form-control border" autoComplete="on" placeholder="請輸入貴公司的通訊號碼..."
                                            name="resturant_phone" value={regStore.resturant_phone} onChange={storeChange} />
                                        <div className="text-danger ms-2">*市話請加上電話冠碼，ex.02...</div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="text-secondary ms-2 mb-2">店家帳號<span className="text-danger">*</span></div>
                                        <input type="text" className="form-control border" autoComplete="off" placeholder="請輸入您的帳號..."
                                            name="resturant_account" value={regStore.resturant_account} onChange={storeChange} />
                                    </div>
                                    <div className="mb-4">
                                        <div className="text-secondary ms-2 mb-2">店家密碼<span className="text-danger">*</span></div>
                                        <input type="password" className="form-control border" autoComplete="off" placeholder="請輸入您的密碼..."
                                            name="resturant_password" value={regStore.resturant_password} onChange={storeChange} />
                                    </div>
                                    <div className="mb-4">
                                        <div className="text-secondary ms-2 mb-2">密碼確認<span className="text-danger">*</span></div>
                                        <input type="password" className="form-control border" autoComplete="off" placeholder="請再次輸入您的密碼..."
                                            name="resturant_password2" value={regStore.resturant_password2} onChange={storeChange} />
                                    </div>
                                    <div className="mb-2 form-check">
                                        <input type="checkbox" className="form-check-input" id="StoreContract"
                                            name="StoreContract" value={storeCheck.StoreContract} onChange={StoreCheckChange} />
                                        <label className="form-check-label text-secondary" htmlFor="StoreContract">同意平台服務條款 <a href="/" className="text-decoration-none">詳細閱讀</a></label>
                                    </div>
                                    <div className="mb-5 form-check">
                                        <input type="checkbox" className="form-check-input" id="StoreRandP"
                                            name="StoreRandP" value={storeCheck.StoreRandP} onChange={StoreCheckChange} />
                                        <label className="form-check-label text-secondary" htmlFor="StoreRandP">同意店家會員責任規範及店家個資聲明 <a href="/" className="text-decoration-none">詳細閱讀</a></label>
                                    </div>
                                    <p className="text-center m-0 mb-4">
                                        <button type="submit" className="col-12 btn btn-warning px-3 border border-2 border-secondary" style={{ height: "40px" }}>
                                            免費註冊
                                        </button>
                                    </p>
                                    <p className="text-center m-0">
                                        <button type="reset" className="col-12 btn btn-light px-3 border border-2 border-secondary" style={{ height: "40px" }}>
                                            清除資料
                                        </button>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Register;