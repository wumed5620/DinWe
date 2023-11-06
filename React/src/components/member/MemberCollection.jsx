import React, { Component } from "react";
import axios from "axios";

import MemberCollectionEdit from "./MemberCollectionEdit";
import MemberCollectionDelete from "./MemberCollectionDelete";

import test from "../images/fff.webp";

class MemberCollection extends Component {
  state = {
    member_id: sessionStorage.getItem('member_id'),
    tags: [{ tag_id: 0, tag_name: "", enable: 0, toggle: false }],
    collections: [
      {
        resturant_id: 0,
        resturant_name: "",
        resturant_address: "",
        resturant_phone: 0,
        resturant_image1: ""
      },
    ],
    tagsOnResturant: [{ resturant_id: 0, tag_id: 0, tag_name: "123" }],
  };
  render() {
    const tagCount = this.state.tags.length;
    const resturantCount = this.state.collections.length;
    return (
      <div class="container">
        <div class="row mt-5">
          <div class="col-1"></div>
          <div class="col-10">
            <div class="row mb-3">
              <div class="mb-2 fw-bold col-9">你的標籤： </div>
              <div class="col-3 d-flex justify-content-end">
                <button
                  class="btn btn-large btn-success text-white me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                >
                  新增標籤
                </button>
                <button
                  class="btn btn-large btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  移除標籤
                </button>
              </div>
            </div>

            <div
              class="modal fade"
              id="editModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <MemberCollectionEdit />
            </div>

            <div
              class="modal fade"
              id="deleteModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <MemberCollectionDelete />
            </div>

            <div class="row">
              <div class="col">
                <div class="d-flex align-content-start flex-wrap">
                  {tagCount ? (
                    this.state.tags.map((tag, index) => {
                      return (
                        <button
                          className="btn me-2 mb-2"
                          id={
                            tag.toggle
                              ? "tagbtntab_m"
                              : "tagbtn_m"
                          }
                          onClick={() => {
                            this.doToggle(index);
                          }}
                        >
                          {tag.tag_name}
                        </button>
                      );
                    })
                  ) : (
                    <button class="btn btn-outline-success me-2 mb-2">
                      新增一些標籤...
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div style={{ height: "65vh" }} className="row overflow-auto mt-3">
              {resturantCount ? (
                this.state.collections
                  .filter((collection) => {
                    let tagFilters = [];
                    this.state.tags.forEach((tag) => {
                      if (tag.toggle === true) {
                        return tagFilters.push(tag);
                      }
                    });
                    let resturantFilters = [];
                    tagFilters.forEach((tagFilter) => {
                      let temp = [];
                      this.state.tagsOnResturant.forEach((tagOnResturant) => {
                        if (tagOnResturant.tag_id === tagFilter.tag_id) {
                          temp.push(tagOnResturant.resturant_id);
                        }
                      });
                      resturantFilters.push(temp);
                    });

                    console.log(resturantFilters);
                    if (
                      this.state.tags.some((tag) => {
                        return tag.toggle === true;
                      })
                    ) {
                      let commonElements = resturantFilters.reduce((accumulator, currentValue) => {
                        return accumulator.filter(value => currentValue.includes(value));
                      });
                      console.log(commonElements);
                      return commonElements.includes(collection.resturant_id);
                    } else {
                      return collection;
                    }
                  })
                  .map((collection, index) => {
                    return (
                      <div class="col-4 my-3">
                        <div class="card fw-bold shadow-sm bg-body-tertiary">
                          <img style={{ height: "200px" }} src={collection.resturant_image1} class="card-img-top rounded" alt="..." />
                          <div class="card-body">
                            <h5 class="card-title">
                              {collection.resturant_name}
                            </h5>
                            <p class="card-text" style={{ height: "32px" }}>
                              地址：
                              {collection.resturant_address}
                            </p>
                            <p class="card-text">
                              電話：
                              {collection.resturant_phone}
                            </p>
                            <a
                              href={"/storeinformation/" + `${collection.resturant_id}`}
                              class="d-block btn mx-auto mb-3"
                              id="infobtn_m"
                            >
                              餐廳資訊
                            </a>
                            <div
                              style={{
                                height: "76px",
                              }}
                              class="d-flex align-content-start flex-wrap overflow-aoto"
                            >
                              <div class="mt-2">標籤：</div>
                              {this.state.tagsOnResturant
                                .filter((tagOnResturant) => {
                                  return (
                                    tagOnResturant.resturant_id ===
                                    collection.resturant_id && this.state.tags.find(tag => tag.tag_id === tagOnResturant.tag_id)
                                  );
                                })
                                .map((tagOnResturant) => {
                                  return (
                                    <button class="btn m-1 p-1" id="tagbtn_m">
                                      {tagOnResturant.tag_name}
                                    </button>
                                  );
                                })}
                              <button
                                class="btn m-1 p-1"
                                id="addbtn_m"
                                data-bs-toggle="modal"
                                data-bs-target={
                                  "#resturant" + collection.resturant_id
                                }
                              >
                                編輯標籤
                              </button>
                              <div
                                class="modal fade"
                                id={"resturant" + collection.resturant_id}
                                tabindex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                              >
                                <div class="modal-dialog modal-dialog-centered">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h1
                                        class="modal-title fs-5"
                                        id="exampleModalLabel"
                                      >
                                        添加/去除標籤
                                      </h1>
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div class="modal-body">
                                      {this.state.tagsOnResturant
                                        .filter((tagOnResturant) => {
                                          return (
                                            tagOnResturant.resturant_id ===
                                            collection.resturant_id && this.state.tags.find(tag => tag.tag_id === tagOnResturant.tag_id)
                                          );
                                        })
                                        .map((tagOnResturant) => {
                                          return (
                                            <div className="container row my-2">
                                              <div className="col-10">
                                                {tagOnResturant.tag_name}
                                              </div>
                                              <div className="col-2">
                                                <input
                                                  type="button"
                                                  className="btn btn-danger"
                                                  value="去除"
                                                  onClick={() => this.doRemove(tagOnResturant.resturant_id, tagOnResturant.tag_id)}
                                                />
                                              </div>
                                            </div>
                                          );
                                        })}
                                    </div>
                                    <hr />
                                    <div class="modal-body">
                                      {this.state.tags
                                        .filter((tag) => {
                                          let tagSelectors = [];
                                          this.state.tagsOnResturant.forEach(
                                            (tagOnResturant) => {
                                              if (
                                                tagOnResturant.resturant_id ===
                                                collection.resturant_id
                                              ) {
                                                return tagSelectors.push(
                                                  tagOnResturant
                                                );
                                              }
                                            }
                                          );

                                          let tagModalFilters = [];
                                          tagSelectors.forEach(
                                            (tagSelector) => {
                                              if (
                                                tagSelector.tag_id ===
                                                tag.tag_id
                                              ) {
                                                return tagModalFilters.push(
                                                  tag
                                                );
                                              }
                                            }
                                          );
                                          return !tagModalFilters.includes(tag);
                                        })
                                        .map((tag) => {
                                          return (
                                            <div className="container row my-2">
                                              <div className="col-10">
                                                {tag.tag_name}
                                              </div>
                                              <div className="col-2">
                                                <input
                                                  type="button"
                                                  className="btn btn-success"
                                                  value="添加"
                                                  onClick={() => this.doAdd(tag.tag_id, collection.resturant_id)}
                                                />
                                              </div>
                                            </div>
                                          );
                                        })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              class="d-block btn btn-outline-primary mx-auto mt-3 mb-2"
                              onClick={() => { this.doUnlike(collection.resturant_id, this.state.member_id) }}
                            >
                              取消收藏
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="fw-bold">快去收藏一些喜愛餐廳～</div>
              )}
            </div>
            <div class="row my-5">
            </div>
          </div>
          <div class="col-1"></div>
        </div>
      </div >
    );
  }
  async componentDidMount() {
    await fetch('http://127.0.0.1:8000/api/member/collection/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "member_id": this.state.member_id })
    })
      .then(response => response.json())
      .then(data => {
        var newState = { ...this.state };
        newState.tags = data;
        this.setState(newState);
      });
    await fetch('http://127.0.0.1:8000/api/member/collection/resturants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "member_id": this.state.member_id })
    })
      .then(response => response.json())
      .then(data => {
        var newState = { ...this.state };
        newState.collections = data;
        this.setState(newState);
      });
    await fetch('http://127.0.0.1:8000/api/member/collection/tagsOnResturant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "member_id": this.state.member_id })
    })
      .then(response => response.json())
      .then(data => {
        var newState = { ...this.state };
        newState.tagsOnResturant = data;
        this.setState(newState);
      });
  }

  doToggle = (index) => {
    let newState = { ...this.state };
    newState.tags[index].toggle = !newState.tags[index].toggle;
    this.setState(newState);
  };

  doRemove = async (r_id, t_id) => {
    let headers = { 'Content-Type': 'application/json' };
    let body = { "tag_id": t_id, "resturant_id": r_id };
    await fetch('http://127.0.0.1:8000/api/member/collection/remove', {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify(body)
    });
    window.location = "/membermain/member/collection";
  }
  doAdd = async (t_id, r_id) => {
    let headers = { 'Content-Type': 'application/json' };
    let body = { "tag_id": t_id, "resturant_id": r_id };
    await fetch('http://127.0.0.1:8000/api/member/collection/add', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });
    window.location = "/membermain/member/collection";
  }
  doUnlike = async (r_id, m_id) => {
    let headers = { 'Content-Type': 'application/json' };
    let body = { "resturant_id": r_id, "member_id": m_id };
    await fetch('http://127.0.0.1:8000/api/member/collection/unlike', {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify(body)
    });
    window.location = "/membermain/member/collection";
  }
}

export default MemberCollection;
