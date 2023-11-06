import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import UserLogo from "../images/user.png";

import axios from "axios";

export default function MemberDestroy() {

    // const history = useHistory();
    // axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;

    const [updatInfo, setUpdatInfo] = useState({
        member_name: '',
        member_birthday: '',
        member_email: '',
        member_id: sessionStorage.getItem('member_id'),
        member_image: ""
    });

    const handleUpdatInfo = (e) => {
        const { name, value } = e.target;
        setUpdatInfo({ ...updatInfo, [name]: value });
    }

    const UpdatInfo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/member/updateInfo', updatInfo); // 替換為實際的後端 API URL
            // console.log(regData);
            console.log(response.data);

            if (response.data.status === true) {
                alert(response.data.message)
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMember();
    }, [])

    const getMember = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/member/show', { 'member_id': sessionStorage.getItem('member_id') }); // 替換為實際的後端 API URL
            // console.log(regData);
            console.log(response.data);
            setUpdatInfo(response.data.data)

        } catch (error) {
            console.error(error);
        }
    }

    const destroyMember = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/member/destroy', { 'member_id': updatInfo.member_id }); // 替換為實際的後端 API URL
            // console.log(regData);
            console.log(response.data);
            if (response.data.status === true) {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('member_id');
                window.location.href = '/login';
                alert(response.data.message);
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container">
            <div style={{ height: "80vh" }} className="d-flex align-items-center">
                <div className="col-6 mt-5 mx-auto">
                    <div className="row border border-secondary py-5 rounded">
                        <div className="col">
                            <div className="row text-center">
                                <div className="col">
                                    <img className="border rounded-circle" style={{ width: "100px", height: "100px", objectFit: "cover" }} src={updatInfo.member_image ? (updatInfo.member_image) : (UserLogo)} alt="user" />
                                </div>
                            </div>
                            <div className="row text-center mx-auto">
                                <div className="col fs-3">{updatInfo.member_name}</div>
                            </div>
                            <div className="d-flex fs-5 my-3">
                                <div className="col-3 mx-auto">
                                    <div className="ms-0 text-center">信箱：</div>
                                </div>
                                <div className="col-7 mx-auto">
                                    <div className="ms-0 ">{updatInfo.member_email}</div>
                                </div>
                            </div>
                            <div className="d-flex fs-5 ">
                                <div className="col-3 mx-auto">
                                    <div className="ms-0 text-center">電話： </div>
                                </div>
                                <div className="col-7 mx-auto">
                                    <div className="ms-0 ">{updatInfo.member_account}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row text-center mt-5">
                        <div className="col-12 fs-2">按下確定後註銷帳號</div>
                    </div>
                    <div className="row text-center">
                        <div className="col-12 text-danger">*注意:被註銷的帳號無法回復</div>
                    </div>
                    <button className="d-block btn btn-large btn-danger ms-auto me-auto mt-5" onClick={destroyMember}>
                        確定註銷
                    </button>
                </div>
            </div>
        </div>
    );

}


