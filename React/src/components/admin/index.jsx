import React, { Component } from 'react';
import $ from "jquery";

class TemIndex extends Component {
  state = {
    admin:{account: "admin", password: "12345678"}
  };

  render() {
    return (
      <section>
        <nav className="navbar navbar-expand-lg bg-light px-3">
          <div className="container-fluid">
            <a className="navbar-brand" href=" ">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
                <li className="nav-item ">
                  <a className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#LoginModal">Login In</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="modal fade" id="LoginModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="account" className="form-label">帳號</label>
                    <input type="email" className="form-control" id="account" aria-describedby="emailHelp" autoComplete='username'/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">密碼</label>
                    <input type="password" className="form-control" id="password" autoComplete='current-password'/>
                  </div>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">取消</button>
                <button type="button" className="btn btn-primary" id='login' onClick={this.doLogin}>登入</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='contaier'>
          <h1 className='h1' id='formData'></h1>
        </div>
      </section>
    );
  }

  doLogin = ()=>{
      let account = $("#account").val();
      let password = $("#password").val();
      if(account === this.state.admin.account & password === this.state.admin.password){
        window.location.href = "http://localhost:3000/admin";
      };
      
  }
}

export default TemIndex;
