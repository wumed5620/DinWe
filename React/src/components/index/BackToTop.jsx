import React, { Component } from 'react';

class BackToTop extends Component {
    componentDidMount() {
        let myButton = document.getElementById("myBtn");

        window.addEventListener("scroll", function() {
            if (document.body.scrollTop > 4000 || document.documentElement.scrollTop > 4000) {
                myButton.style.display = "block";
            } else {
            myButton.style.display = "none";
            }
        });

        function topFunction() {
            let currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentPosition > 0) {
                window.requestAnimationFrame(topFunction);
                window.scrollTo(0, currentPosition - currentPosition / 1);
            }
        }
    
        myButton.addEventListener("click", topFunction);
    }

    render() { 
        return (
            <div>
                <a id="myBtn" href='#top' className='BTTpic link-dark' style={{display: "none"}}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                    width="53"
                    height="53"
                    fill="currentColor"
                    className="bi bi-arrow-up-square-fill"
                    viewBox="0 0 17 17"
                    >
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                    </svg>
                </a>
            </div>
        );
    }
}

export default BackToTop;
