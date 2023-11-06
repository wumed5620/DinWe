import React, { useState } from "react";

import axios from "axios";

export default function MemberPwd() {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${sessionStorage.getItem("token")}`;

  const [changePwd, setChangePwd] = useState({
    member_password: "",
    member_password2: "",
    member_password3: "",
    member_id: sessionStorage.getItem("member_id"),
  });

  const changeData = (e) => {
    const { name, value } = e.target;
    setChangePwd({ ...changePwd, [name]: value });
  };

  const ChangePwd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/member/changePwd",
        changePwd
      ); // 替換為實際的後端 API URL
      // console.log(regData);
      console.log(response.data);

      if (response.data.status === true) {
        alert(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //     setUpdatInfo({ ...updatInfo, id: sessionStorage.getItem('id') });
  //     if (sessionStorage.getItem('token')) {
  //         // console.log(sessionStorage.getItem('id'))
  //         setUpdatInfo({ ...updatInfo, id: sessionStorage.getItem('id') });

  //     } else {
  //         // this.props.history.push('/login');
  //     }
  // })

  return (
    <div className="container">
      <div style={{ height: "81vh" }} className="row">
        <div className="col-3"></div>
        <div className="col-6 align-self-center">
          <form onSubmit={ChangePwd}>
            <div className="mb-3 row">
              <label htmlFor="member_password" className="col-form-label">
                請輸入舊密碼：
              </label>
              <div className="">
                <input
                  type="password"
                  className="form-control"
                  id="member_password"
                  name="member_password"
                  value={changePwd.member_password}
                  onChange={changeData}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="member_password2" className=" col-form-label">
                請輸入新密碼：
              </label>
              <div className="">
                <input
                  type="password"
                  className="form-control"
                  id="member_password2"
                  name="member_password2"
                  value={changePwd.member_password2}
                  onChange={changeData}
                  maxLength="20"
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="member_password3" className="col-form-label">
                再輸入新密碼：
              </label>
              <div className="">
                <input
                  type="password"
                  className="form-control"
                  id="member_password3"
                  name="member_password3"
                  value={changePwd.member_password3}
                  onChange={changeData}
                  maxLength="20"
                />
              </div>
            </div>
            <button
              className="d-block btn btn-large btn-success ms-auto me-auto"
              type="submit"
            >
              送出
            </button>
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}
