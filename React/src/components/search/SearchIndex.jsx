import React, { useState, useEffect } from "react";
import Nav from "./Nav";
// import SearchBar from "./SearchBar";
import Filter from "./Filter";
import Card from "./Card";
import "../css/searchIndex.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

// const items = [
//   {
//     id: 1,
//     name: "大樹先生A",
//     tel: "0423465783",
//     text: "Some quick example text to build",
//     filters: ["兒童座椅", "兒童餐具", "純素食", "APPLE PAY"],
//     time: ["09:00", "10:00", "11:00"],
//     star: 4,
//     price: 782,
//     reviews: [
//       {
//         id: 17,
//         storeId: 1,
//         name: "John",
//         star: 1,
//         comment: "Great product!",
//       },
//       {
//         id: 18,
//         storeId: 1,
//         name: "Mary",
//         star: 1,
//         comment: "Excellent service!",
//       },
//       {
//         id: 19,
//         storeId: 1,
//         name: "Tom",
//         star: 1,
//         comment: "Average quality.",
//       },
//       {
//         id: 20,
//         storeId: 1,
//         name: "Jane",
//         star: 1,
//         comment: "Highly recommend!",
//       },
//     ],
//   },
//   {
//     id: 1,
//     name: "大樹先生A",
//     tel: "0423465783",
//     text: "Some quick example text to build",
//     filters: ["兒童座椅", "兒童餐具", "純素食", "APPLE PAY"],
//     time: ["09:00", "10:00", "11:00"],
//     star: 4,
//     price: 782,
//     reviews: [
//       {
//         id: 17,
//         storeId: 1,
//         name: "John",
//         star: 1,
//         comment: "Great product!",
//       },
//       {
//         id: 18,
//         storeId: 1,
//         name: "Mary",
//         star: 1,
//         comment: "Excellent service!",
//       },
//       {
//         id: 19,
//         storeId: 1,
//         name: "Tom",
//         star: 1,
//         comment: "Average quality.",
//       },
//       {
//         id: 20,
//         storeId: 1,
//         name: "Jane",
//         star: 1,
//         comment: "Highly recommend!",
//       },
//     ],
//   },
//   {
//     id: 1,
//     name: "大樹先生A",
//     tel: "0423465783",
//     text: "Some quick example text to build",
//     filters: ["兒童座椅", "兒童餐具", "純素食", "APPLE PAY"],
//     time: ["09:00", "10:00", "11:00"],
//     star: 4,
//     price: 782,
//     reviews: [
//       {
//         id: 17,
//         storeId: 1,
//         name: "John",
//         star: 1,
//         comment: "Great product!",
//       },
//       {
//         id: 18,
//         storeId: 1,
//         name: "Mary",
//         star: 1,
//         comment: "Excellent service!",
//       },
//       {
//         id: 19,
//         storeId: 1,
//         name: "Tom",
//         star: 1,
//         comment: "Average quality.",
//       },
//       {
//         id: 20,
//         storeId: 1,
//         name: "Jane",
//         star: 1,
//         comment: "Highly recommend!",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "大樹先生B",
//     tel: "0423465783",
//     text: "Some quick example text to build",
//     filters: ["兒童餐具", "禁菸餐廳", "玩具區", "LINE PAY", "APPLE PAY"],
//     time: ["15:00", "19:00", "20:00"],
//     star: 4.3,
//     price: 245,
//     reviews: [
//       {
//         id: 1,
//         storeId: 2,
//         name: "John",
//         star: 2,
//         comment: "Great product!",
//       },
//       {
//         id: 2,
//         storeId: 2,
//         name: "Mary",
//         star: 2,
//         comment: "Excellent service!",
//       },
//       {
//         id: 3,
//         storeId: 2,
//         name: "Tom",
//         star: 2,
//         comment: "Average quality.",
//       },
//       {
//         id: 4,
//         storeId: 2,
//         name: "Jane",
//         star: 2,
//         comment: "Highly recommend!",
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "大樹先生C",
//     tel: "0423465783",
//     text: "Some quick example text to build",
//     filters: ["禁菸餐廳", "供應酒精飲品", "免費無線網路", "現金"],
//     time: ["14:00", "16:00", "19:00"],
//     star: 5,
//     price: 636,
//     reviews: [
//       {
//         id: 5,
//         storeId: 3,
//         name: "John",
//         star: 3,
//         comment: "Great product!",
//       },
//       {
//         id: 6,
//         storeId: 3,
//         name: "Mary",
//         star: 3,
//         comment: "Excellent service!",
//       },
//       {
//         id: 7,
//         storeId: 3,
//         name: "Tom",
//         star: 3,
//         comment: "Average quality.",
//       },
//       {
//         id: 8,
//         storeId: 3,
//         name: "Jane",
//         star: 3,
//         comment: "Highly recommend!",
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "大樹先生D",
//     tel: "0423465783",
//     text: "Some quick example text to build",
//     filters: ["戲水池", "免費無線網路", "玩具區", "素食", "VISA 金融卡"],
//     time: ["11:00", "14:00", "20:00"],
//     star: 2.2,
//     price: 345,
//     reviews: [
//       {
//         id: 9,
//         storeId: 4,
//         name: "John",
//         star: 4,
//         comment: "Great product!",
//       },
//       {
//         id: 10,
//         storeId: 4,
//         name: "Mary",
//         star: 4,
//         comment: "Excellent service!",
//       },
//       {
//         id: 11,
//         storeId: 4,
//         name: "Tom",
//         star: 4,
//         comment: "Average quality.",
//       },
//       {
//         id: 12,
//         storeId: 4,
//         name: "Jane",
//         star: 4,
//         comment: "Highly recommend!",
//       },
//     ],
//   },
//   {
//     id: 5,
//     name: "大樹先生E",
//     tel: "04-23465783",
//     text: "Some quick example text to build",
//     filters: ["禁菸餐廳", "座充插座", "現金", "VISA 金融卡", "LINE PAY"],
//     time: ["20:00", "21:00", "22:00"],
//     star: "1",
//     price: 350,
//     reviews: [
//       {
//         id: 13,
//         storeId: 5,
//         name: "John",
//         star: 5,
//         comment: "Great product!",
//       },
//       {
//         id: 14,
//         storeId: 5,
//         name: "Mary",
//         star: 5,
//         comment: "Excellent service!",
//       },
//       {
//         id: 15,
//         storeId: 5,
//         name: "Tom",
//         star: 5,
//         comment: "Average quality.",
//       },
//       {
//         id: 16,
//         storeId: 5,
//         name: "Jane",
//         star: 5,
//         comment: "Highly recommend!",
//       },
//     ],
//   },
// ];

const starTag = [
  {
    title: "評價相關",
    starBox: [
      { id: 49, star: 5, btnName: 5 },
      { id: 50, star: 4, btnName: 4 },
      { id: 51, star: 3, btnName: 3 },
      { id: 52, star: 2, btnName: 2 },
      { id: 53, star: 1, btnName: 1 },
      { id: 54, star: 0, btnName: "ALL" },
    ],
  },
];

const filterTag = [
  {
    title: "兒童相關",
    filterBox: [
      { id: 26, filters: "玩具區" },
      { id: 27, filters: "溜滑梯" },
      { id: 28, filters: "球池" },
      { id: 29, filters: "沙坑" },
      { id: 30, filters: "農場" },
      { id: 31, filters: "草地" },
      { id: 32, filters: "動物" },
      { id: 33, filters: "魚池" },
      { id: 34, filters: "生態池" },
      { id: 35, filters: "戲水池" },
      { id: 36, filters: "家家酒" },
      { id: 37, filters: "電玩設施" },
      { id: 38, filters: "兒童書區" },
      { id: 39, filters: "課程體驗" },
      { id: 40, filters: "滿月活動" },
      { id: 41, filters: "收涎活動" },
      { id: 42, filters: "抓周活動" },
      { id: 43, filters: "性別派對" },
      { id: 44, filters: "慶生派對" },
    ],
  },
  {
    title: "餐廳相關",
    filterBox: [
      { id: 10, filters: "供應酒精飲品" },
      { id: 11, filters: "免費無線網路" },
      { id: 12, filters: "座充插座" },
      { id: 13, filters: "禁菸餐廳" },
      { id: 14, filters: "兒童座椅" },
      { id: 15, filters: "兒童餐具" },
      { id: 16, filters: "哺乳室" },
      { id: 17, filters: "尿布台" },
      { id: 18, filters: "免費嬰兒車租借" },
      { id: 19, filters: "國民旅遊卡" },
      { id: 20, filters: "專車接送" },
      { id: 21, filters: "汽車專區" },
      { id: 22, filters: "機車專區" },
      { id: 23, filters: "停車場折抵優惠" },
      { id: 24, filters: "場地租借" },
      { id: 25, filters: "無障礙設施" },
    ],
  },
  {
    title: "支付相關",
    filterBox: [
      { id: 1, filters: "現金支付" },
      { id: 2, filters: "Visa" },
      { id: 3, filters: "信用卡" },
      { id: 4, filters: "街口支付" },
      { id: 5, filters: "悠遊卡" },
      { id: 6, filters: "LINE Pay" },
      { id: 7, filters: "Apple Pay" },
      { id: 8, filters: "Google Pay" },
      { id: 9, filters: "台灣 Pay" },
    ],
  },
  {
    title: "飲食限制",
    filterBox: [
      { id: 45, filters: "素食" },
      { id: 46, filters: "純素食" },
      { id: 47, filters: "清真菜" },
      { id: 48, filters: "無麩質" },
    ],
  },
];
const SearchIndex = () => {
  //GET所有card資料
  const [items, setItems] = useState([]);

  const [head, setHead] = useState({
    member_image: "",
    member_name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "http://127.0.0.1:8000/api/searchindexget/",
        {
          params: {
            member_id: member_id,
          },
        }
      );

      setItems(result.data);
    };
    const searchindexlogout = async () => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/member/show",
        { member_id: sessionStorage.getItem("member_id") }
      );
      let newState = { ...head };
      newState.member_image = response.data.data.member_image;
      newState.member_name = response.data.data.member_name;
      setHead(newState);
    };
    fetchData();
    memberlikeget();
    searchindexlogout();
    //下面這行註解用來忽略useEffect missing dependencies 的錯誤提示
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const memberlikeget = async () => {
    const memberlike = await axios.get(
      "http://127.0.0.1:8000/api/searchindexlikeget/",
      {
        params: {
          member_id: member_id,
        },
      }
    );
    setIsLiked(memberlike.data);
  };

  //session
  // sessionStorage.setItem("member_id", 3);
  const member_id = sessionStorage.getItem("member_id");
  const searchinput = sessionStorage.getItem("searchinput");
  const token = sessionStorage.getItem("token");

  const [selectedCategories, setSelectedCategories] = useState([]); //篩選區
  const [starItems, setStarItems] = useState(items); //評價區
  const [starValue, setStarValue] = useState(0); //取評價區點擊的值
  const [minPrice, setMinPrice] = useState(0); //最低價格
  const [maxPrice, setMaxPrice] = useState(9999); //最高價格
  const [query, setQuery] = useState(searchinput || ""); //搜索Bar
  const [showModal, setShowModal] = useState(false); //評價Modal
  const [selectedStar, setSelectedStar] = useState(5); //評價星星
  const [storeIid, setStoreIid] = useState([]); //評價id對應
  const [isLiked, setIsLiked] = useState([]); //收藏功能

  const Logout = async () => {
    // const logout = {token: token};
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/logout", {
        token: token,
      });
      // console.log(response.data);

      alert(response.data.message);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("member_id");
      sessionStorage.removeItem("resturant_id");
      sessionStorage.removeItem("god");
      window.location.reload("/login");
    } catch (error) {
      console.error(error);
    }
  };

  //收藏區
  const history = useHistory();
  const handleClick = (rid) => {
    if (!member_id) {
      history.push("/login");
    } else {
      if (
        isLiked.filter((isLiked) => isLiked.resturant_id === rid).length === 0
      ) {
        isLiked.push({
          member_id: member_id,
          resturant_id: rid,
        });
        setIsLiked(isLiked);
        axios
          .post("http://127.0.0.1:8000/api/searchindexpost", isLiked)
          .then((response) => {
            console.log(response);
            memberlikeget();
          })
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        const newState = isLiked.filter(
          (isLiked) => isLiked.resturant_id !== rid
        );
        setIsLiked(newState);
        const data = { member_id: member_id, resturant_id: rid };
        axios
          .delete(`http://127.0.0.1:8000/api/searchindexdelete`, { data: data })
          .then((response) => {
            console.log(response);
            memberlikeget();
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }
  };

  //評價區
  const handleClose = () => setShowModal(false);
  const handleShow = (id, modal) => {
    setStoreIid(id);
    setShowModal(modal);
  };
  const handleStarFilter = (star) => {
    setSelectedStar(star);
  };
  //價格區
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  // 評價區
  const handleStar = (e) => {
    const value = e.target.value;
    setStarValue(value);
    const filtered = starItems.filter((item) => item.star >= value);
    setStarItems(filtered);
  };

  // 篩選區
  const toggleChecked = (index, innerIndex) => {
    const newFilterTag = [...filterTag];
    newFilterTag[index].filterBox[innerIndex].checked =
      !newFilterTag[index].filterBox[innerIndex].checked;
    const selectedFilters = newFilterTag.reduce((acc, curr) => {
      const filters = curr.filterBox
        .filter((filter) => filter.checked)
        .map((filter) => filter.filters);
      if (filters.length > 0) {
        acc.push(filters);
      }
      return acc;
    }, []);
    setSelectedCategories(selectedFilters);
  };

  // 輸出判斷區
  const filteredItems = items.filter((item) => {
    const lowerCaseQuery = query.toLowerCase();
    return (
      item.price >= minPrice &&
      item.price <= maxPrice &&
      item.star >= starValue &&
      selectedCategories.every((filters) =>
        filters.every((filter) => item.filters.includes(filter))
      ) &&
      (item.name.toLowerCase().includes(lowerCaseQuery) ||
        item.tel.toLowerCase().includes(lowerCaseQuery) ||
        item.text.toLowerCase().includes(lowerCaseQuery) ||
        item.filters.some((filter) =>
          filter.toLowerCase().includes(lowerCaseQuery)
        ))
    );
  });

  return (
    <div>
      <section>
        <Nav
          query={query}
          setQuery={setQuery}
          head={head}
          token={token}
          Logout={Logout}
        />
        {/* <SearchBar query={query} setQuery={setQuery} /> */}
      </section>
      <section id="searchbody">
        <div className="container">
          <div className="row p-3">
            <Filter
              filterTag={filterTag}
              toggleChecked={toggleChecked}
              handleStar={handleStar}
              starTag={starTag}
              minPrice={minPrice}
              handleMinPriceChange={handleMinPriceChange}
              maxPrice={maxPrice}
              handleMaxPriceChange={handleMaxPriceChange}
            />
            <div className="col-8 overflow-auto" style={{ height: "83vh" }}>
              <Card
                filteredItems={filteredItems}
                items={items}
                showModal={showModal}
                selectedStar={selectedStar}
                handleClose={handleClose}
                handleShow={handleShow}
                handleStarFilter={handleStarFilter}
                storeIid={storeIid}
                handleClick={handleClick}
                isLiked={isLiked}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchIndex;
