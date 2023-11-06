import React, { useState, useEffect } from "react"

import axios from "axios";

export default function MemberInfo() {

    // axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;

    const [updatInfo, setUpdatInfo] = useState({
        member_name: '',
        member_birthday: '',
        member_email: '',
        member_id: sessionStorage.getItem('member_id'),
    });

    const handleUpdatInfo = (e) => {
        const { name, value } = e.target;
        setUpdatInfo({ ...updatInfo, [name]: value });
    }

    const UpdatInfo = async (e) => {
        e.preventDefault();
        try {
            console.log(updatInfo);
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

    const FileChange = (event) => {
        // 使用者選擇檔案時觸發
        const file = event.target.files[0];
        // console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64Image = reader.result;
            setUpdatInfo({ ...updatInfo, "member_image": base64Image })
        }
        // console.log(modalData.image);
    };


    return (
        <div className="container">
            <div style={{ height: "81vh" }} className="row">
                <div className="col-3"></div>
                <div className="col-6 align-self-center">
                    <form onSubmit={UpdatInfo} action="post">
                        <div className="mb-3 d-flex flex-column">
                            <label htmlFor="image" className="form-label">會員照片</label>
                            <img src={updatInfo.member_image} alt="" className="mx-auto mb-2" style={{ width: "150px", height: "150px", objectFit: "cover" }} />
                            <input type="file" className="form-control" placeholder="Username" name="image" onChange={FileChange} />
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="member_name" className="col-form-label">
                                姓名：
                            </label>
                            <div className="">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="member_name"
                                    name="member_name"
                                    value={updatInfo.member_name} onChange={handleUpdatInfo}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="member_birthday" className="col-form-label">
                                生日：
                            </label>
                            <div className="">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="member_birthday"
                                    name="member_birthday"
                                    value={updatInfo.member_birthday} onChange={handleUpdatInfo}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="member_email" className="col-form-label">
                                信箱：
                            </label>
                            <div className="">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="member_email"
                                    name="member_email"
                                    value={updatInfo.member_email} onChange={handleUpdatInfo}
                                />
                            </div>
                        </div>
                        <button className="d-block btn btn-large btn-success ms-auto me-auto" type="submit">
                            送出
                        </button>
                    </form>

                </div>
                <div className="col-3"></div>
            </div>
        </div>
    );

}


