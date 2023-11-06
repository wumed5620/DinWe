import React from "react";
import logoImg from "../images/LOGO_A.png";
import userImage from "../images/user.png";

const Nav = ({ query, setQuery, head, token, Logout }) => {
  return (
    <section>
      <nav className="navbar fixed-top bg-white border shadow">
        <div className="container-fluid">
          <a href="/index" className="px-3 py-3">
            <img src={logoImg} style={{ width: "250px" }} alt="logo" />
          </a>
          <div className="col-8 me-auto ms-5 pt-1 ps-0">
            <input
              type="text"
              class="form-control border-2 text-center ps-0"
              placeholder="餐廳名(ex.大樹先生)、電話(ex.0426301234)、標籤(ex.兒童座椅)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {token ? (
            <div style={{ width: "55px", height: "55px" }}>
              {head.member_image ? (
                <a href="/membermain">
                  <img
                    className="img-style rounded-circle"
                    src={head.member_image}
                    alt={head.member_name}
                  />
                </a>
              ) : (
                <a href="/membermain">
                  <img
                    className="img-style rounded-circle"
                    src={userImage}
                    alt={head.member_name}
                  />
                </a>
              )}
            </div>
          ) : (
            ""
          )}
          {token ? (
            ""
          ) : (
            <a
              className="btn btn-light border-dark rounded-pill m-auto rgsBtn "
              href="/register"
            >
              <div className="d-block mx-auto my-2 d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-pencil-square ms-1 align-middle"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
                <span className="mx-1 ">註冊</span>
              </div>
            </a>
          )}
          {/* 三元判斷是否登入中 */}
          {token ? (
            <a
              className="btn btn-light border-dark rounded-pill ms-2 me-3 rgsBtn  d-flex align-items-center"
              onClick={Logout}
            >
              <div
                className="d-block mx-auto my-2  d-flex align-items-center"
                width="20"
                height="20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-box-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
                <span className="mx-1 align-middle align-middle">登出</span>
              </div>
            </a>
          ) : (
            ""
          )}
          {token ? (
            ""
          ) : (
            <div class="btn btn-light border-dark rounded-pill lgiBtn">
              <a
                href="/login"
                class="d-block mx-auto my-2 text-dark"
                width="20"
                height="20"
                style={{ textDecoration: "none" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-person-circle ms-1 align-middle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
                <span className="mx-1 align-middle align-middle">登入</span>
              </a>
            </div>
          )}
        </div>
      </nav>
    </section>
  );
};

export default Nav;
