import React, { Component } from "react";
import axios from "axios";

class MemberCollectionDelete extends Component {
    state = { 
        member_id:sessionStorage.getItem('member_id'),
        tags: [{ tag_id: 0, tag_name: "", enable: 0 }] 
    };
    render() {
        return (
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                            移除標籤
                        </h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-check">
                            {this.state.tags.map((tag, index) => {
                                return (
                                    <div className="container row my-1">
                                        <div className="col-10">
                                            <div>{tag.tag_name}</div>
                                        </div>
                                        <div className="col-2">
                                            <input
                                                type="button"
                                                className="btn btn-danger"
                                                value="移除"
                                                onClick={() =>
                                                    this.doDeleteTag(tag.tag_id)
                                                }
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    async componentDidMount() {
        await fetch('http://127.0.0.1:8000/api/member/collection/tags', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"member_id" : this.state.member_id})
        })
        .then(response => response.json())
        .then(data => {
        var newState = { ...this.state };
        newState.tags = data;
        this.setState(newState);
      });
    }

    doDeleteTag = async (index) => {
        let headers = {'Content-Type': 'application/json'};
        let body = {"tag_id" : index};
        await fetch('http://127.0.0.1:8000/api/member/collection/delete', {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body)
        });
        window.location = "/membermain/member/collection";
    };
}

export default MemberCollectionDelete;
