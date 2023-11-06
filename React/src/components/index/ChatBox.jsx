import React, { Component } from 'react';

class ChatBox extends Component {
    state = {
        chatHistory: [],
        showChatBox: false,
    };

    toggleChatBox = () => {
        this.setState({ showChatBox: !this.state.showChatBox });
    };

    clearChatHistory = () => {
        this.setState({ chatHistory: [] });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const input = event.target.userInput.value;
        const newHistory = [...this.state.chatHistory, { text: input, sender: '' }];
        this.setState({ chatHistory: newHistory });
        event.target.userInput.value = '';
    };
    
    render() {
        return (
        <div>
            <div className="CSpic link-dark" onClick={this.toggleChatBox}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="54"
                            height="54"
                            fill="currentColor"
                            className="bi bi-question-circle-fill"
                            viewBox="0 0 17 17"
                        >
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"
                            />
                        </svg>
                    </div>
            {this.state.showChatBox && (
                <div class="chat-widget">
                    <nav class="chat-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-lightbulb" viewBox="0 0 16 16">
                            <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>
                        </svg>
                        <h4>Din We Q&A</h4>
                        <button onClick={this.toggleChatBox} className='btn-close btn-close-white' aria-label="Close"></button>
                    </nav>
                    <div class="chat-history">
                        <div class="accordion accordion-flush" id="accordionFlushExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingOne1">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne1" aria-expanded="false" aria-controls="flush-collapseOne1">
                                        常見問題
                                    </button>
                                </h2>
                                <div id="flush-collapseOne1" class="accordion-collapse collapse" aria-labelledby="flush-headingOne1" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body" style={{backgroundColor: "transparent"}}>
                                        <div class="accordion accordion-flush" id="nestedAccordion">
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="nestedFlush-headingOne1">
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nestedFlush-collapseOne1" aria-expanded="false" aria-controls="nestedFlush-collapseOne1">
                                                        如何註冊成為會員？
                                                    </button>
                                                </h2>
                                                <div id="nestedFlush-collapseOne1" class="accordion-collapse collapse" aria-labelledby="nestedFlush-headingOne1" data-bs-parent="#nestedAccordion">
                                                    <div class="accordion-body">
                                                    請於登入頁選擇「加入會員」。
                                                    詳細閱讀完 Din We 會員使用條款後，如果同意請按「我同意遵守以上規定」，繼續填寫會員基本資料。
                                                    請點入選項輸入會員資料，過程中您所填寫的會員帳號與密碼，將是日後登入使用的會員帳號與密碼，註冊一般會員，必須完成手機認證，才算完成註冊程序，成為 Din We 會員。
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="nestedFlush-headingTwo1">
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nestedFlush-collapseTwo1" aria-expanded="false" aria-controls="nestedFlush-collapseTwo1">
                                                        我想要修改登入密碼？
                                                    </button>
                                                </h2>
                                                <div id="nestedFlush-collapseTwo1" class="accordion-collapse collapse" aria-labelledby="nestedFlush-headingTwo1" data-bs-parent="#nestedAccordion">
                                                    <div class="accordion-body">
                                                        請您登入後，至會員頁面左側的會員帳號點選「修改」即可進行修改。
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingOne2">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne2" aria-expanded="false" aria-controls="flush-collapseOne2">
                                        預訂詳情
                                    </button>
                                </h2>
                                <div id="flush-collapseOne2" class="accordion-collapse collapse" aria-labelledby="flush-headingOne2" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                        <div class="accordion accordion-flush" id="nestedAccordion">
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="nestedFlush-headingOne2">
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nestedFlush-collapseOne2" aria-expanded="false" aria-controls="nestedFlush-collapseOne2">
                                                        我可如何得知餐廳設施的更<br></br>多資訊？
                                                    </button>
                                                </h2>
                                                <div id="nestedFlush-collapseOne2" class="accordion-collapse collapse" aria-labelledby="nestedFlush-headingOne2" data-bs-parent="#nestedAccordion">
                                                    <div class="accordion-body">
                                                        您可在會員預訂確認或餐廳詳情頁面找到相關資訊。如有其他查詢，請直接聯絡餐廳。
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="nestedFlush-headingTwo2">
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nestedFlush-collapseTwo2" aria-expanded="false" aria-controls="nestedFlush-collapseTwo2">
                                                        我可在哪裏查看預訂詳情和<br></br>狀態？
                                                    </button>
                                                </h2>
                                                <div id="nestedFlush-collapseTwo2" class="accordion-collapse collapse" aria-labelledby="nestedFlush-headingTwo2" data-bs-parent="#nestedAccordion">
                                                    <div class="accordion-body">
                                                        您可隨時登入並在帳戶選單選擇「我的預訂」，在網上查看預訂詳情和狀態。
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingOne3">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne3" aria-expanded="false" aria-controls="flush-collapseOne3">
                                        取消預訂
                                    </button>
                                </h2>
                                <div id="flush-collapseOne3" class="accordion-collapse collapse" aria-labelledby="flush-headingOne3" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                        <div class="accordion accordion-flush" id="nestedAccordion">
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="nestedFlush-headingOne3">
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nestedFlush-collapseOne3" aria-expanded="false" aria-controls="nestedFlush-collapseOne3">
                                                        我可如何取消預訂？
                                                    </button>
                                                </h2>
                                                <div id="nestedFlush-collapseOne3" class="accordion-collapse collapse" aria-labelledby="nestedFlush-headingOne3" data-bs-parent="#nestedAccordion">
                                                    <div class="accordion-body">
                                                        您可以透過 Din We 網站在線取消預訂。任何取消費用均由餐廳決定。
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="nestedFlush-headingTwo3">
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nestedFlush-collapseTwo3" aria-expanded="false" aria-controls="nestedFlush-collapseTwo3">
                                                        我可如何知道預訂已被<br></br>取消？
                                                    </button>
                                                </h2>
                                                <div id="nestedFlush-collapseTwo3" class="accordion-collapse collapse" aria-labelledby="nestedFlush-headingTwo3" data-bs-parent="#nestedAccordion">
                                                    <div class="accordion-body">
                                                        您向我們取消預訂之後，請在會員頁面查看有關確認取消預訂的取消紀錄。
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingOne4">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne4" aria-expanded="false" aria-controls="flush-collapseOne4">
                                        特別要求
                                    </button>
                                </h2>
                                <div id="flush-collapseOne4" class="accordion-collapse collapse" aria-labelledby="flush-headingOne4" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                        <div class="accordion accordion-flush" id="nestedAccordion">
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="nestedFlush-headingOne4">
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nestedFlush-collapseOne4" aria-expanded="false" aria-controls="nestedFlush-collapseOne4">
                                                        我可如何提出特別要求？
                                                    </button>
                                                </h2>
                                                <div id="nestedFlush-collapseOne4" class="accordion-collapse collapse" aria-labelledby="nestedFlush-headingOne4" data-bs-parent="#nestedAccordion">
                                                    <div class="accordion-body">
                                                        您可以使用要求服務說明欄將特別要求發送給餐廳。請注意，所有特別要求均視乎情況而定， Din We 無法保證。
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="nestedFlush-headingTwo4">
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nestedFlush-collapseTwo4" aria-expanded="false" aria-controls="nestedFlush-collapseTwo4">
                                                        我可如何知道特別要求已經<br></br>確認？
                                                    </button>
                                                </h2>
                                                <div id="nestedFlush-collapseTwo4" class="accordion-collapse collapse" aria-labelledby="nestedFlush-headingTwo4" data-bs-parent="#nestedAccordion">
                                                    <div class="accordion-body">
                                                        所有特別要求將視當時情況而定， Din We 無法保證一定能滿足你的要求。 Din We 收到要求後會轉交所選之餐廳，你可於抵達前後向餐廳再次確認。
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* {this.state.chatHistory.map((item, index) => (
                            <div key={index} className='text-end d-block bg-warning rounded-pill my-3'>
                                <span>{item.sender}</span>
                                <span>{item.text} </span>
                            </div>
                        ))} */}
                    </div>
                    {/* <form onSubmit={this.handleSubmit} class="chat-input">
                        <input type="text" name="userInput" placeholder="輸入文字..." />
                        <button type="submit" class="send-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-symmetry-horizontal" viewBox="0 0 16 16">
                                <path d="M13.5 7a.5.5 0 0 0 .24-.939l-11-6A.5.5 0 0 0 2 .5v6a.5.5 0 0 0 .5.5h11zm.485 2.376a.5.5 0 0 1-.246.563l-11 6A.5.5 0 0 1 2 15.5v-6a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .485.376zM11.539 10H3v4.658L11.54 10z"/>
                            </svg>
                        </button>
                    </form> */}
                </div>
            )}
        </div>
        );
    }
    }

export default ChatBox;
