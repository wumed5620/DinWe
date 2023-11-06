import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import LogoImage from '../images/LOGO_A.png';
import axios from "axios";

export default function ResetStore(props) {
	let urltoken = props.match.params.token;
	let id = props.match.params.id;

	const history = useHistory();

	const [reset, setReset] = useState({
		resturant_password: '',
		resturant_password2: '',
		resturant_id: id
	});
	
	const [token] = useState({
		token: urltoken
	})

	axios.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
	
	const handleResetChange = (e) => {
    const { name, value } = e.target;
    setReset({ ...reset, [name]: value });
  }

	const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/resetStore', reset); // 替換為實際的後端 API URL
			if(response.data.status===true){
				alert('更改成功 請重新登入');
				history.push('/login');
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
								店家重設密碼
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
								<button className="nav-link px-5 fs-4 active" id="registerform" data-bs-toggle="tab" data-bs-target="#registerform-pane" type="button">重設密碼</button>
							</li>
						</ul>
						<div className="tab-content container row m-0" id="myTabContent">
							<div className="tab-pane fade show active" id="registerform-pane" role="tabpanel" aria-labelledby="registerform" tabIndex="0">
								<form onSubmit={handleRegister} method="post">
									<div className="d-flex justify-content-center mt-3 mb-2">
										<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-question-circle-fill" viewBox="0 0 16 16">
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
										</svg>
									</div>
									<div className="mb-3">
										<label htmlFor="resturant_password" className="form-label fs-5">輸入密碼</label>
										<input value={reset.resturant_password} onChange={handleResetChange} type="password" className="form-control" id="resturant_password" name="resturant_password" placeholder="請輸入密碼" maxLength="20"/>
									</div>
									<div className="mb-3">
										<label htmlFor="resturant_password2" className="form-label fs-5">確認密碼</label>
										<input value={reset.resturant_password2} onChange={handleResetChange} type="password" className="form-control" id="resturant_password2" name="resturant_password2" placeholder="請輸入密碼" maxLength="20"/>
									</div>
									<p className="text-center m-0"><button type="submit" className="btn btn-primary px-3">重設店家密碼</button></p>
								</form>
							</div>
						</div>

					</div>
				</div>
			</section>
		</React.Fragment>

	)
}

 