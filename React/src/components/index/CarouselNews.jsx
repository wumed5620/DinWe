import React, { Component } from "react";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";

import A1 from "../images/BGnews1.jpg";
import A2 from "../images/BGnews2.jpg";
import A3 from "../images/BGnews3.jpg";
import A4 from "../images/BGnews4.jpg";
import A5 from "../images/BGnews5.jpg";

class CarouselNews extends Component {
  state = {
    carNews: [
      // {
      //   image: A1,
      //   resturant_name: "大樹先生親子餐廳",
      //   title: "本月壽星打八折",
      //   subtitle:
      //     "一同來慶生",
      //   text:
      //     "感謝您選擇我們的店家來舉辦您的慶生活動。為了慶祝您的生日，我們非常榮幸地為您提供一個特別優惠，即在活動期間享受八折優惠。只要您在我們店家舉辦您的生日慶祝活動，並於活動期間消費滿指定金額，即可享受此特別優惠。我們相信，這將會是您難忘的一天，我們致力於提供最好的產品和服務，為您的慶生活動增添更多的樂趣和回憶。謝謝您對我們的支持，期待在不久的將來為您提供更多的優惠和驚喜！",
      // },
      {
        image: A2,
        resturant_name: "大家書房",
        title: "抓週派對 - 每次的選擇都很重要！",
        subtitle:
          "抓住生命中最重要的一刻",
        text:
          "在中華文化中，抓周是一個重要的傳統習俗，通常在嬰兒滿一歲時舉行。這個儀式代表著對孩子健康成長和未來幸福的祝福，也象徵著對孩子成長道路的祈禱和期望。讓您和您的孩子一起感受中華文化的美麗和傳統。在我們店家舉辦抓周活動，這將會是您和您的家人永難忘懷的一天！",
      },
      {
        image: A3,
        resturant_name: "小島3.5度",
        title: "⭐️ 全新的沙坑來囉 ⭐️",
        subtitle:
          "沙沙沙 沙沙沙 妳是風兒我是沙",
        text:
          "全新打造的供兒童遊玩的沙坑！這個全新的設施將為您和您的孩子帶來一個有趣、刺激和難忘的遊戲體驗。設施是按照最高的安全標準設計和建造的，同時也是為了讓孩子們在遊戲中發揮創意和想像力而設計的。在沙坑裡，孩子們可以盡情挖掘、建造和玩耍，享受自然和創造力的美好體驗。",
      },
      {
        image: A4,
        resturant_name: "小樂圓 Oden Good",
        title: "🌳 全新的玩具 🌳",
        subtitle: "不計成本購入高品質玩具",
        text:
          "最新的兒童玩具遊樂區！這個全新的遊樂區將為您和您的孩子帶來更多的樂趣、刺激和難忘的遊戲體驗。我們的遊樂區設施是根據兒童的特點和需求設計和購入的，同時也是為了讓孩子們在遊戲中發揮創意和想像力而設計的。在遊樂區裡，孩子們可以盡情玩耍、探索和挑戰自己的技能和能力，享受遊戲的樂趣和成就感。",
      },
      {
        image: A5,
        resturant_name: "山豬別館",
        title: "大型水族箱完工啦",
        subtitle: "魚兒魚兒水中游~~~~~",
        text:
          "向您介紹我們最新的設施 - 大祥水族箱！這個水族箱擁有豐富多樣的海洋生物，包括色彩繽紛的熱帶魚、精緻的珊瑚和奇特的海蟲等等，是一個充滿生命力和美麗景象的水中世界。這個水族箱是根據專業設計和製作的，提供最佳的環境和保護，讓這些生物可以健康和快樂地生活，同時也將啟發您對自然界的關注和熱愛。",
      },
    ],
  };

  取得廣告用
  getNews = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/getput"); // 替換成您的 API 端點
      console.log(response);
      let newState = { ...this.state };
      newState.carNews = response.data.data;
      this.setState(newState);

    } catch (error) {
      console.error('取得資料失敗:', error);
    }
  };

  componentDidMount() {
    this.getNews();
  }

  render() {
    return (
      <div>
        <div style={{height:"9vh"}}></div>
        <h3 className="text-secondary text-center bgtext1 letter-spacing10">最新消息</h3>
        <OwlCarousel
          className='owl-theme'
          loop
          margin={50}
          items={1}
          autoplay={true}
          autoplayTimeout={6000}
          autoplayHoverPause={true}
          autoplaySpeed={700}
          dots={true}
          stagePadding={300}
        >
          {this.state.carNews.map((carNew, index) => {
            return (
              <div className="card border border-1 border-secondary pic mt-4 mb-4 overflow-hidden" key={index}>
                <img src={carNew.image} className="card-img rounded-1 opacity-25" alt={carNew.resturant_name} style={{ height: "45vh" }} />
                <div className="row card-img-overlay justify-content-center">
                  <h2 className="col-12 text-center fw-bolder mt-4">{carNew.title}</h2>
                  <p className="col-7 text-center fw-bold fs-5">
                    {carNew.subtitle}
                  </p>

                  <p className="col-9 text-center fw-bold">
                    {carNew.text}
                  </p>
                  <p className="text-center"><a href={"http://localhost:3000/storeinformation/" + carNew.resturant_id}
                    className=" btn btn-warning border-dark text-decoration-none text-center fs-5"
                    style={{ width: "200px" }}
                  > 點擊前往</a></p>

                </div>
              </div>
            );
          })}

        </OwlCarousel>
      </div>
    );
  }
}

export default CarouselNews;
