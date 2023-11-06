import { useState } from "react";
import {
Navbar,
Nav,
NavDropdown,
Button,
Form,
FormControl,
Image,
} from "react-bootstrap";

function Page2() {
const [loggedIn, setLoggedIn] = useState(false); // 是否已登入
const [userEmail, setUserEmail] = useState(""); // 用戶信箱帳號
const [userAvatar, setUserAvatar] = useState(""); // 用戶頭像

// 模擬登入的函式
const handleLogin = () => {
// 在這裡應該實現真正的登入功能
setUserEmail("example@gmail.com");
setUserAvatar("https://via.placeholder.com/150"); // 使用 placeholder 圖片作為頭像
setLoggedIn(true);
};

// 模擬登出的函式
const handleLogout = () => {
// 在這裡應該實現真正的登出功能
setUserEmail("");
setUserAvatar("");
setLoggedIn(false);
};

return (
<Navbar className="bg-light">
<Navbar.Brand href="#home">My Website</Navbar.Brand>
<Navbar.Toggle data-bs-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
<Nav className="me-auto"></Nav>
<Form className="me-auto d-flex d-block">
<FormControl type="text" placeholder="Search" />
<Button>Search</Button>
</Form>
{loggedIn ? ( // 如果已登入，顯示會員頭像和信箱帳號
<Nav className="">
<Image
src={userAvatar}
roundedCircle
width={30}
height={30}
className="ms-2"
/>
<NavDropdown title={userEmail}>
<NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
<NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
<NavDropdown.Divider />
<NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
</NavDropdown>
</Nav>
) : (
// 如果未登入，顯示登入和註冊按鈕
<Nav>
<Button className="mr-2" onClick={handleLogin}>
Login
</Button>
<Button className="mx-3">Register</Button>
</Nav>
)}
</Navbar.Collapse>
</Navbar>
);
}

export default Page2;