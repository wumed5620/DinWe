import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import LogoImage from '../images/LOGO_A.png';
import axios from "axios";

export default function OpenStore(props) {
	let urltoken = props.match.params.token;
	let account = props.match.params.account;

	const history = useHistory();

	const [store] = useState({
		resturant_account: account
	});
	
	console.log(urltoken);
	console.log(account);
	
	// const [token] = useState({
	// 	token: urltoken
	// })

	axios.defaults.headers.common['Authorization'] = `Bearer ${urltoken}`;


	const handleOpen = async (e) => {
		try {
			console.log(store);
			const response = await axios.post('http://127.0.0.1:8000/api/openStore', store); // 替換為實際的後端 API URL

			console.log(response.data);
			if(response.data.status===true){
				alert('開通成功 請登入');
				history.push('/login');
			}

		} catch (error) {
			console.error(error);
		}
	}

	handleOpen();
	
	// const handleResetChange = (e) => {
  //   const { name, value } = e.target;
  //   setReset({ ...reset, [name]: value });
  // }



	// useEffect(()=>{
		// setToken({token: urltoken})
		// console.log(urltoken);
	// })


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
								開通帳號中
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
								<button className="nav-link px-5 fs-4 active" id="registerform" data-bs-toggle="tab" data-bs-target="#registerform-pane" type="button">開通帳號中</button>
							</li>
						</ul>
						<div className="tab-content container row m-0" id="myTabContent">
							<div className="tab-pane fade show active" id="registerform-pane" role="tabpanel" aria-labelledby="registerform" tabIndex="0">
								<form method="post">
									<div class="d-flex align-items-center px-5 mt-3 justify-content-center" id="loading">
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

 