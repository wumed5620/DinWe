import React, {  useState } from "react";
import { useHistory } from 'react-router-dom';
import LogoImage from '../images/LOGO_A.png';
import axios from "axios";

export default function RegStore() {
	const history = useHistory();

	const [storeData, setStoreData] = useState({
		resturant_account: '',
		resturant_password: '',
		resturant_password2: '',
		resturant_name: '',
		resturant_address: '',
		resturant_phone: '',
		resturant_email: '',
	});

	// const [token, setToken] = useState({
	// 	token: urltoken
	// })

	// axios.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;

	const storeDataChange = (e) => {
		const { name, value } = e.target;
		setStoreData({ ...storeData, [name]: value });
	}

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			console.log(storeData);
			const response = await axios.post('http://127.0.0.1:8000/api/regStore', storeData); // 替換為實際的後端 API URL

			console.log(response.data);
			if (response.data.status === true) {
				alert('資料已收到 請檢查信箱確認審核結果');
			}

		} catch (error) {
			console.error(error);
		}
	}

	return (
		<React.Fragment>
			<section>
				<nav className="navbar fixed-top text-black mx-3">
					<div className="container-fluid">
						<a className="navbar-brand ms-1" href="/">
							<img className="logo" src={LogoImage} alt="" style={{ width: "200px" }} />
						</a>
						<ul className="nav ms-auto gap-3">
							<li className="nav-item btn btn-outline-info">
								店家註冊
							</li>
						</ul>
					</div>
				</nav>
			</section>
			<section className="" id="Login" style={{ marginTop: "150px" }}>
				<div className="container" >
					<div className="row m-0 m-auto border rounded p-5 justify-content-center border-info col-12 col-md-8 col-lg-6" >
						<ul className="nav nav-tabs d-flex justify-content-around" id="myTab" role="tablist">
							<li className="nav-item" role="presentation">
								<button className="nav-link px-5 fs-4 active" id="registerform" data-bs-toggle="tab" data-bs-target="#registerform-pane" type="button">店家註冊</button>
							</li>
						</ul>
						<div className="tab-content container row m-0" id="myTabContent">
							<div className="tab-pane fade show active" id="registerform-pane" role="tabpanel" aria-labelledby="registerform" tabIndex="0">
								<form onSubmit={handleRegister} method="post">
									<div className="d-flex justify-content-center mt-3 mb-2">
										<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-shop" viewBox="0 0 16 16">
											<path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
										</svg>
									</div>
									<div className="mb-3">
										<label htmlFor="resturant_account" className="form-label fs-5">帳號</label>
										<input value={storeData.resturant_account} onChange={storeDataChange} type="phone" className="form-control" id="resturant_account" name="resturant_account" placeholder="請輸入電話號碼" maxLength="10"/>
									</div>
									<div className="mb-3">
										<label htmlFor="resturant_password" className="form-label fs-5">密碼</label>
										<input value={storeData.resturant_password} onChange={storeDataChange} type="password" className="form-control" id="resturant_password" name="resturant_password" placeholder="輸入密碼" maxLength="20"/>
									</div>
									<div className="mb-3">
										<label htmlFor="resturant_password" className="form-label fs-5">密碼確認</label>
										<input value={storeData.resturant_password2} onChange={storeDataChange} type="password" className="form-control" id="resturant_password2" name="resturant_password2" placeholder="再次輸入密碼" maxLength="20"/>
									</div>
									<div className="mb-3">
										<label htmlFor="resturant_name" className="form-label fs-5">店名</label>
										<input value={storeData.resturant_name} onChange={storeDataChange} type="text" className="form-control" id="resturant_name" name="resturant_name" placeholder="輸入店名" maxLength="20"/>
									</div>
									<div className="mb-3">
										<label htmlFor="resturant_address" className="form-label fs-5">地址</label>
										<input value={storeData.resturant_address} onChange={storeDataChange} type="text" className="form-control" id="resturant_address" name="resturant_address" placeholder="輸入地址" maxLength="50"/>
									</div>
									<div className="mb-3">
										<label htmlFor="resturant_phone" className="form-label fs-5">電話</label>
										<input value={storeData.resturant_phone} onChange={storeDataChange} type="text" className="form-control" id="resturant_phone" name="resturant_phone" placeholder="輸入電話" maxLength="15"/>
									</div>
									<div className="mb-3">
										<label htmlFor="resturant_email" className="form-label fs-5">信箱</label>
										<input value={storeData.resturant_email} onChange={storeDataChange} type="email" className="form-control" id="resturant_email" name="resturant_email" placeholder="輸入信箱" maxLength="50"/>
									</div>
									<p className="text-center m-0"><button type="submit" className="btn btn-primary px-3">註冊</button></p>
								</form>
							</div>
						</div>

					</div>
				</div>
			</section>
		</React.Fragment>

	)
}

