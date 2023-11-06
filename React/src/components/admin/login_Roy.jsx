import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import logo from '../images/LOGO_A.png';
import axios from "axios";

function Login() {

	const token = sessionStorage.getItem('token');

	const history = useHistory();

	// 會員登入
	const [loginData, setLoginData] = useState({
		member_account: '',
		member_password: ''
	})

	const LoginChange = (e) => {
		const { name, value } = e.target;
		setLoginData({ ...loginData, [name]: value });
	}

	const MemberLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://127.0.0.1:8000/api/login', loginData); // 替換為實際的後端 API URL
			console.log(response.data);
			sessionStorage.setItem('token', response.data.token);
			sessionStorage.setItem('member_id', response.data.id);
			sessionStorage.setItem('god', response.data.god);

			if (response.data.status === true && response.data.god === "yes") {
				alert('管理員登入成功');
				history.push('/admin');
			} else if (response.data.status === true) {
				alert('登入成功');
				history.push('/searchIndex');
			}else if (response.data.status === false) {
				alert(response.data.message);
			}

		} catch (error) {
			console.error(error);
		}
	}

	// 登出
	const Logout = async () => {
		// const logout = {token: token}; 
		try {
			const response = await axios.post('http://127.0.0.1:8000/api/logout', { token: token });
			// console.log(response.data);

			alert(response.data.message);
			sessionStorage.removeItem('token');
			sessionStorage.removeItem('member_id');
			sessionStorage.removeItem('resturant_id');
			sessionStorage.removeItem('god');
			window.location.reload('/login')
		} catch (error) {
			console.error(error);
		}
	}

	// 店家登入
	const [storeData, setStoreData] = useState({
		resturant_account: '',
		resturant_password: ''
	})

	const StoreChange = (e) => {
		const { name, value } = e.target;
		setStoreData({ ...storeData, [name]: value });
	}

	const storeLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://127.0.0.1:8000/api/loginStore', storeData); // 替換為實際的後端 API URL
			console.log(response.data);

			if (response.data.status === true) {
				sessionStorage.setItem('token', response.data.token);
				sessionStorage.setItem('resturant_id', response.data.id);
				alert('登入成功');
				history.push('/enterprise/membercenter');
			}

			if (response.data.status === false) {
				alert(response.data.message);
			}

		} catch (error) {
			console.error(error);
		}
	}

	return (
		<React.Fragment>
			<section>
				<nav className="navbar fixed-top bg-white">
					<div className="container-fluid">
						<a href="/index" className="px-3 py-3">
							<img
								className=""
								src={logo}
								style={{ width: "250px" }}
								alt="logo" />
						</a>
						<div
							id="navSh"
							style={{ display: "none" }}
							className="w-50">
							<div className="bg-width border border-dark rounded-1 py-2">
								<div className="row align-items-center justify-content-between">
									<div className="col-1 ms-3">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="30"
											height="30"
											fill="currentColor"
											className="bi bi-shop"
											viewBox="0 0 16 16">
											<path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
										</svg>
									</div>
								</div>
							</div>
						</div>
						<div className="d-flex">
						{token
								? ""
							: <a className="btn btn-light border-dark rounded-pill ms-2 me-3 rgsBtn d-flex align-items-center" href="/register">
							<div
								className="d-block mx-auto my-2 d-flex align-items-center"
								width="20"
								height="20">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="25"
									height="25"
									fill="currentColor"
									className="bi bi-pencil-square ms-1 align-middle"
									viewBox="0 0 16 16">
									<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
									<path
										fillRule="evenodd"
										d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
								</svg>
								<span className="mx-1 ">
									註冊
								</span>
							</div>
						</a>}
							{/* 三元判斷是否登入中 */}
							{token
								? <a className="btn btn-light border-dark rounded-pill ms-2 me-3 rgsBtn  d-flex align-items-center"
									onClick={Logout}>
										<div
											className="d-block mx-auto my-2  d-flex align-items-center"
											width="20"
											height="20">
											<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
												<path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
												<path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
											</svg>
											<span className="mx-1 align-middle align-middle">
												登出
											</span>
										</div>
									</a>
								: ""}
						</div>
					</div>
				</nav>
			</section>
			<section id="Login" style={{ marginTop: "120px" }}>
				<div className="container">
					<div className="row m-0 ">
						<div
							className="m-auto border rounded p-5 pt-4 pb-4 justify-content-center shadow logBg col-12 col-md-8 col-lg-6"
						>
							<nav>
								<div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
									<button className="nav-link active text-secondary fs-5" id="nav-member-tab" data-bs-toggle="tab" data-bs-target="#nav-member" role="tab">會員登入</button>
									<button className="nav-link text-secondary fs-5" id="nav-store-tab" data-bs-toggle="tab" data-bs-target="#nav-store" role="tab">商家登入</button>
								</div>
							</nav>
							<div
								className="tab-content bg-white d-flex justify-content-center border border-top-0 rounded-bottom"
								id="nav-tabContent"
							>
								<form onSubmit={MemberLogin}
									method="post"
									className="col-10 tab-pane fade show active"
									id="nav-member"
									role="tabpanel"
									aria-labelledby="nav-member-tab"
								>
									<div className="d-flex justify-content-center pt-5 mb-5">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="80"
											height="80"
											fill="currentColor"
											className="bi bi-person-circle"
											viewBox="0 0 16 16"
										>
											<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
											<path
												fillRule="evenodd"
												d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
											/>
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
											name="member_account" value={loginData.member_account} onChange={LoginChange} />
									</div>
									<div className="mb-4 input-group">
										<div className="input-group-text bg-white border-end-0 border border-2 border-secondary border-opacity-50" id="btnGroupAddon">
											<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-shield-lock" viewBox="0 0 16 16">
												<path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
												<path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
											</svg>
											<div className="d-inline ms-2 fs-4">│</div>
										</div>
										<input type="password" className="form-control border-start-0 border border-2 border-secondary border-opacity-50 ps-0" autoComplete="username" placeholder="請輸入您的密碼..."
											name="member_password" value={loginData.member_password} onChange={LoginChange} />
									</div>
									<p className="text-center m-0 mb-4">
										<button
											type="submit"
											className="w-100 btn btn-warning px-3 border border-2 border-secondary border-opacity-50 fs-5"
											style={{ height: "50px" }}
										>
											登入
										</button>
									</p>
									<p className="text-center text-secondary mb-4">
										忘記密碼？
										<a href="/forget">點擊找尋</a>
									</p>
								</form>
								<form onSubmit={storeLogin}
									method="post"
									className="col-10 tab-pane fade"
									id="nav-store"
									role="tabpanel"
									aria-labelledby="nav-store-tab"
								>
									<div className="d-flex justify-content-center pt-5 mb-5">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="80"
											height="80"
											fill="currentColor"
											className="bi bi-shop border border-5 border-dark rounded-circle"
											viewBox="-2 -2 20 20"
										>
											<path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
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
											name="resturant_account" value={storeData.resturant_account} onChange={StoreChange} />
									</div>
									<div className="mb-4 input-group">
										<div className="input-group-text bg-white border-end-0 border border-2 border-secondary border-opacity-50" id="btnGroupAddon">
											<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-shield-lock" viewBox="0 0 16 16">
												<path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
												<path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
											</svg>
											<div className="d-inline ms-2 fs-4">│</div>
										</div>
										<input type="password" className="form-control border-start-0 border border-2 border-secondary border-opacity-50 ps-0" autoComplete="username" placeholder="請輸入您的密碼..."
											name="resturant_password" value={storeData.resturant_password} onChange={StoreChange} />
									</div>
									<p className="text-center m-0 mb-4">
										<button
											type="submit"
											className="col-12 btn btn-warning px-3 border border-2 border-secondary border-opacity-50 fs-5"
											style={{ height: "50px" }}
										>  登入
										</button>
									</p>
									<p className="text-center text-secondary mb-4">
										忘記密碼？
										<a href="/">點擊找尋</a>
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

export default Login;