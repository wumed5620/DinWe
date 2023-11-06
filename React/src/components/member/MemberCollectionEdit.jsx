import React, { Component } from "react";
import axios from "axios";

class MemberCollectionEdit extends Component {
    state = {
        member_id: sessionStorage.getItem('member_id'),
        tags: { tag_name: "" },
    };
    render() {
        return (
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            新增標籤
                        </h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group">
                            <span class="input-group-text">標籤名稱</span>
                            <input
                                type="text"
                                class="form-control"
                                id="tagName"
                                value={this.state.tags.tName}
                                onChange={this.doTnameChange}
                            />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <input
                            type="button"
                            className="btn btn-success"
                            value="新增"
                            onClick={this.doCreateTag}
                        />
                    </div>
                </div>
            </div>
        );
    }
    doTnameChange = (e) => {
        var newState = { ...this.state };
        newState.tags.tag_name = e.target.value;
        this.setState(newState);
        // console.log(this.state.tags.tag_name);
    };

    doCreateTag = async (e) => {
        let headers = { 'Content-Type': 'application/json' };
        let body = { "tag_name": `${this.state.tags.tag_name}`, "member_id": this.state.member_id };
        await fetch('http://127.0.0.1:8000/api/member/collection/edit',
            {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            })
            .then(async (response) => await response.json())
            .then((json) => console.log(json));
        window.location = "/membermain/member/collection";
    };
}

export default MemberCollectionEdit;
