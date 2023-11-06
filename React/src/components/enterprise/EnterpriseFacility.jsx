import React, { useState, useEffect } from 'react';
import axios from "axios";

const EnterpriseFacility = () => {
    const amenityList = {
        resturant_id: "",
        people: "",
        averagesum: "",
        payments: [],
        services: [],
        facilities: [],
        foodCulture: [],
        editdate: "",
        edittime: ""
    }

    const myID = sessionStorage.getItem('resturant_id');

    const [amenity, setAmenity] = useState(amenityList);
    const [amenityInit, setAmenityInit] = useState(amenityList);

    async function fetchData() {
        const response = await axios.get(`http://localhost:8000/api/enterprise/getfacility/${myID}`);
        setAmenity(response.data[0]);
        setAmenityInit(response.data[0])
    }

    useEffect(() => fetchData, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.put(`http://localhost:8000/api/enterprise/updatefacility/${amenity.resturant_id}`, amenity)
        .then(response => {
            console.log(response.data);
        });
        setAmenity(amenity);
        setAmenityInit(amenity);
        fetchData();
    }

    const handlePayment = (chgpayment) => {
        const newState = amenity.payments.map((payment) => {
            return (payment.id === chgpayment.id)
                ?
                (payment.isChecked === 1) ? { ...payment, isChecked: 0 } : { ...payment, isChecked: 1 }
                : payment
        })
        setAmenity({...amenity, payments:newState})
    }

    const handleService = (chgservice) => {
        const newState = amenity.services.map((service) => {
            return (service.id === chgservice.id)
                ?
                (service.isChecked === 1) ? { ...service, isChecked: 0 } : { ...service, isChecked: 1 }
                : service
        })
        setAmenity({...amenity, services:newState})
    }

    const handleFacility = (chgfacility) => {
        const newState = amenity.facilities.map((facility) => {
            return (facility.id === chgfacility.id)
                ?
                (facility.isChecked === 1) ? { ...facility, isChecked: 0 } : { ...facility, isChecked: 1 }
                : facility
        })
        setAmenity({...amenity, facilities:newState})
    }

    const handleFood = (chgfood) => {
        const newState = amenity.foodCulture.map((food) => {
            return (food.id === chgfood.id)
                ?
                (food.isChecked === 1) ? { ...food, isChecked: 0 } : { ...food, isChecked: 1 }
                : food
        })
        setAmenity({...amenity, foodCulture:newState})
    }

    return <React.Fragment>
        <div className="col-10 mt-2 px-4">
            <div className="row pb-2 justify-content-end text-end">
                上次資料更動日期：{amenity.editdate===null ? "尚未有資料更動紀錄。" : amenity.editdate+"，"+amenity.edittime}<br /><br />
            </div>
            <div className="row h4 pb-2 border-bottom">設施服務</div>
            <div className="row mt-1 p-2">
                <form>
                    <div className="mb-3 row align-items-center">
                        <label htmlFor="people" className="col-lg-2 col-md-3 col-sm-4 col-5 col-form-label">可容納人數</label>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-4">
                            <input type="number" className="form-control text-center" id="people"
                                value={amenity.people}
                                onChange={(event) => { setAmenity({ ...amenity, people: event.target.value }) }} />
                        </div>
                        <div className="col-lg-1 col-md-1 col-sm-1 col-1 text-start">
                            <span>人</span>
                        </div>
                    </div>
                    <div className="mb-3 row align-items-center">
                        <label htmlFor="averagesum" className="col-lg-2 col-md-3 col-sm-4 col-5 col-form-label">平均消費金額</label>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-4">
                            <input type="number" className="form-control text-center" id="averagesum"
                                value={amenity.averagesum}
                                onChange={(event) => { setAmenity({ ...amenity, averagesum: event.target.value }) }} />
                        </div>
                        <div className="col-lg-1 col-md-1 col-sm-1 col-1 text-start">
                            <span>元</span>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="payment" className="col-lg-2 col-md-3 col-sm-12 col-form-label">付款方式</label>
                        <div className="col-lg-10 col-md-9 col-sm-12 pt-2">
                            {
                                amenity.payments.map((payment, index) => {
                                    return <React.Fragment key={index}>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox"
                                                id={"payment" + payment.id}
                                                checked={payment.isChecked === 1 ? true : false}
                                                onChange={() => { handlePayment(payment) }} />
                                            <label className="form-check-label" htmlFor={"payment" + payment.id}>{payment.name}</label>
                                        </div>
                                    </React.Fragment>
                                })
                            }
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="fac_service" className="col-lg-2 col-md-3 col-sm-12 col-form-label">設施服務</label>
                        <div className="col-lg-10 col-md-9 col-sm-12 pt-2">
                            {
                                amenity.services.map((service, index) => {
                                    return <React.Fragment key={index}>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox"
                                                id={"service" + service.id}
                                                checked={service.isChecked === 1 ? true : false} 
                                                onChange={() => { handleService(service) }} />
                                            <label className="form-check-label" htmlFor={"service" + service.id}>{service.name}</label>
                                        </div>
                                    </React.Fragment>
                                })
                            }
                            <hr />
                            {
                                amenity.facilities.map((facility, index) => {
                                    return <React.Fragment key={index} >
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox"
                                                id={"facility" + facility.id}
                                                checked={facility.isChecked === 1 ? true : false}
                                                onChange={() => { handleFacility(facility) }}/>
                                            <label className="form-check-label" htmlFor={"facility" + facility.id}>{facility.name}</label>
                                        </div>
                                    </React.Fragment>
                                })
                            }
                            <hr />
                            {
                                amenity.foodCulture.map((food, index) => {
                                    return <React.Fragment key={index}>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox"
                                                id={"food" + food.id}
                                                checked={food.isChecked === 1 ? true : false}
                                                onChange={() => { handleFood(food) }}/>
                                            <label className="form-check-label" htmlFor={"food" + food.id}>{food.name}</label>
                                        </div>
                                    </React.Fragment>
                                })
                            }
                        </div>
                    </div>

                    <div className="text-center my-2">
                        <button className="btn btn-warning me-2 fw-bolder"
                                type="sumbit"
                                data-bs-toggle="modal" data-bs-target="#confirmModal"
                                onClick={handleSubmit}
                            >送出修改</button>
                        <button className="btn btn-danger fw-bold" type="button"
                                onClick={()=>{setAmenity(amenityInit)}}>取消</button>
                    </div>
                </form>
            </div>
        </div>

        {/* 確認修改 Dialog */}
        <div className="modal fade" id="confirmModal" data-bs-backdrop="static" data-bs-keyboard="false"
            tabIndex="-1" aria-labelledby="confirmModal" aria-hidden="true" >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="confirmModal">提醒：</h1>
                    </div>
                    <div className="modal-body">
                        <span>基本資料已確認修改。</span>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">確認</button>
                    </div>
                </div>
            </div>
        </div>

    </React.Fragment>
}

export default EnterpriseFacility;