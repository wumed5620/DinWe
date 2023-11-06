import React, { Component } from "react";

class MemberPrivate extends Component {
    state = {};
    render() {
        return (
            <div class="container">
                <div style={{ height: "88vh" }} class="row">
                    <div class="col-3"></div>
                    <div class="col-6 align-self-center">
                        <div class="mb-3 row ">
                            <label class="col-sm-6 col-form-label">
                                預約中訂單提醒方式:
                            </label>
                            <div class="col-sm-6 form-check d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    value=""
                                    id="local"
                                    checked
                                />
                                <label
                                    class="form-check-label me-3"
                                    for="local"
                                >
                                    本站顯示
                                </label>
                                <input type="checkbox" value="" id="" />
                                <label class="form-check-label me-3" for="">
                                    簡訊
                                </label>
                                <input type="checkbox" value="" id="" />
                                <label class="form-check-label" for="">
                                    E-Mail
                                </label>
                            </div>
                            <label class="col-sm-6 col-form-label">
                                是否訂閱本平台電子報?
                            </label>
                            <div class="col-sm-6 form-check d-flex align-items-center">
                                <input
                                    type="radio"
                                    name="rss"
                                    value="yes"
                                    id="rss_yes"
                                    checked
                                />
                                <label
                                    class="form-check-label m-2"
                                    for="rss_yes"
                                >
                                    是
                                </label>
                                <input
                                    type="radio"
                                    name="rss"
                                    value="no"
                                    id="rss_no"
                                />
                                <label
                                    class="form-check-label ms-2"
                                    for="rss_no"
                                >
                                    否
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-3"></div>
                </div>
            </div>
        );
    }
}

export default MemberPrivate;
