import React, { useState } from "react"
import LogoImage from '../images/LOGO_A.png';
import axios from "axios";

export default function Forget() {

	const [reset, setReset] = useState({
		member_account: '',
	});

	const handleResetChange = (e) => {
		const { name, value } = e.target;
		setReset({ ...reset, [name]: value });
	}

	// 取得會員重設信件
	const handleGetToken = async (e) => {
		e.preventDefault();
		document.getElementById('loading').setAttribute('class', "d-flex align-items-center px-5 mt-3 d-block");
		try {
			const response = await axios.post('http://127.0.0.1:8000/api/getResetToken', reset); // 替換為實際的後端 API URL

			console.log(response.data);
			if (response.data.status === true) {
				alert("請檢查您的信箱");
			}

		} catch (error) {
			console.error(error);
		}
	}

	const [store, setStore] = useState({
		resturant_account: '',
	});

	const StoreChange = (e) => {
		const { name, value } = e.target;
		setStore({ ...store, [name]: value });
	}

	const resetStore = async (e) => {
		e.preventDefault();
		document.getElementById('loading2').setAttribute('class', "d-flex align-items-center px-5 mt-3 d-block");
		try {
			const response = await axios.post('http://127.0.0.1:8000/api/storeToken', store); // 替換為實際的後端 API URL
			console.log(response.data);

			if (response.data.status === true) {
				alert("請檢查您的信箱");
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
								忘記密碼
							</li>
						</ul>
					</div>
				</nav>
			</section>

			<section className="" id="Login" style={{ marginTop: "150px" }}>
				<div className="container" >
					<div className="row m-0 m-auto border rounded p-5 justify-content-center border-info col-12 col-md-9 col-lg-6" >
						<div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
							<button className="nav-link px-5 fs-4 active" role="tab" id="registerform" data-bs-toggle="tab" data-bs-target="#registerform-pane" >會員重設</button>
							<button className="nav-link px-5 fs-4" role="tab" id="resetStore" data-bs-toggle="tab" data-bs-target="#resetStore-pane" >店家重設</button>
						</div>
						<div className="tab-content container row m-0" id="myTabContent">
							<div className="tab-pane fade show active" id="registerform-pane" role="tabpanel" tabIndex="0">
								<form onSubmit={handleGetToken} method="post">
									<div className="d-flex justify-content-center my-3">
										<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-question-circle-fill" viewBox="0 0 16 16">
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
										</svg>
									</div>
									<div className="mb-4 input-group">
										<div className="input-group-text bg-white border-end-0 border border-2 border-secondary border-opacity-50" id="btnGroupAddon">
											<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
												<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
											</svg>
											<div className="d-inline ms-2 fs-4">│</div>
										</div>
										<input type="text" className="form-control border-start-0 border border-2 border-secondary border-opacity-50 ps-0" autoComplete="username" placeholder="請輸入您的帳號..."
											name="member_account" value={reset.member_account} onChange={handleResetChange} />
									</div>
									<p className="text-center m-0"><button type="submit" className="btn btn-primary px-3">重設密碼</button></p>
									<div class="d-flex align-items-center px-5 mt-3 d-none justify-content-center" id="loading">
										<p className="fs-2 mb-0">系統處理中...</p>
										<div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
									</div>
								</form>
							</div>
							<div className="tab-pane fade show" id="resetStore-pane" role="tabpanel" tabIndex="0">
								<form onSubmit={resetStore} method="post">
									<div className="d-flex justify-content-center my-3">
										<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-question-circle-fill" viewBox="0 0 16 16">
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
										</svg>
									</div>
									<div className="mb-4 input-group">
										<div className="input-group-text bg-white border-end-0 border border-2 border-secondary border-opacity-50" id="btnGroupAddon">
											<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-shop" viewBox="0 0 16 16">
												<path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
											</svg>
											<div className="d-inline ms-2 fs-4">│</div>
										</div>
										<input type="text" className="form-control border-start-0 border border-2 border-secondary border-opacity-50 ps-0" autoComplete="username" placeholder="請輸入您的帳號..."
											name="resturant_account" value={store.resturant_account} onChange={StoreChange} />
									</div>
									<p className="text-center m-0"><button type="submit" className="btn btn-primary px-3">重設密碼</button></p>
									<div class="d-flex align-items-center px-5 mt-3 d-none justify-content-center" id="loading2">
										<p className="fs-2 mb-0">系統處理中...</p>
										<div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</React.Fragment>

	)
}

