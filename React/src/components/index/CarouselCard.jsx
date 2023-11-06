import React, { Component } from "react";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import A1 from "../images/toy.jpg";
import A2 from "../images/sandPool.jpg";
import A3 from "../images/ball pit.jpg";
import A4 from "../images/swimmingpool.jpg";
import A5 from "../images/slide.jpg";
import A6 from "../images/PreschoolArea.jpg";

class CarouselCard extends Component {
    state = {};


    render() {
        return (
            <div>
                <div style={{height:"1px"}}></div>
                <div className="text-center letter-spacing10 bgtext4" style={{marginBottom:"117px", marginTop: "-30px"}}></div>
                <h3 className="text-secondary text-center letter-spacing10">你可能會想要...</h3>
                <OwlCarousel
                    className='owl-theme'
                    loop
                    margin={20}
                    items={4}
                    autoplay={true}
                    autoplayTimeout={3000}
                    autoplayHoverPause={true}
                    autoplaySpeed={1500}
                    dots={false}
                    stagePadding={100}
                >
                    <div className="card border-0 pic mt-4" style={{ width: "14rem", cursor: "pointer" }}>
                        <img src={A1} onClick={this.props.searchSet} value="" className="card-img-top rounded-circle" alt="玩具區" style={{ width: "14rem", height: "14rem" }} />
                        <div className="card-body mt-1">
                            <h5 className="card-title text-center mt-2">玩具專區</h5>
                        </div>
                    </div>
                    <div className="card border-0 pic mt-4" style={{ width: "14rem", cursor: "pointer" }}>
                        <img src={A2} onClick={this.props.searchSet} value="" className="card-img-top rounded-circle" alt="沙坑" style={{ width: "14rem", height: "14rem" }} />
                        <div className="card-body mt-1">
                            <h5 className="card-title text-center mt-2">砂池專區</h5>
                        </div>
                    </div>
                    <div className="card border-0 pic mt-4" style={{ width: "14rem", cursor: "pointer" }}>
                        <img src={A3} onClick={this.props.searchSet} value="" className="card-img-top rounded-circle" alt="球池" style={{ width: "14rem", height: "14rem" }} />
                        <div className="card-body mt-1">
                            <h5 className="card-title text-center mt-2">球池專區</h5>
                        </div>
                    </div>
                    <div className="card border-0 pic mt-4" style={{ width: "14rem", cursor: "pointer" }}>
                        <img src={A4} onClick={this.props.searchSet} value="" className="card-img-top rounded-circle" alt="戲水池" style={{ width: "14rem", height: "14rem" }} />
                        <div className="card-body mt-1">
                            <h5 className="card-title text-center mt-2">戲水池專區</h5>
                        </div>
                    </div>
                    <div className="card border-0 pic mt-4" style={{ width: "14rem", cursor: "pointer" }}>
                        <img src={A5} onClick={this.props.searchSet} value="" className="card-img-top rounded-circle" alt="溜滑梯" style={{ width: "14rem", height: "14rem" }} />
                        <div className="card-body mt-1">
                            <h5 className="card-title text-center mt-2">溜滑梯設施</h5>
                        </div>
                    </div>
                    <div className="card border-0 pic mt-4" style={{ width: "14rem", cursor: "pointer" }}>
                        <img src={A6} onClick={this.props.searchSet} value="" className="card-img-top rounded-circle" alt="兒童書區" style={{ width: "14rem", height: "14rem" }} />
                        <div className="card-body mt-1">
                            <h5 className="card-title text-center mt-2">兒童書區</h5>
                        </div>
                    </div>
                </OwlCarousel>
            </div>
        );
    }
}

export default CarouselCard;
