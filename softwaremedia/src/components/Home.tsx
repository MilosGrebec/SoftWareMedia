import "./Home.css";
import profileLogo from "../assets/Titor_insignia.png";
import profileImg from "../assets/IBM_5100_-_MfK_Bern.jpg";
import mark from "../assets/save.png";
import like from "../assets/like.png";
import marke from "../assets/saved.png";
import liked from "../assets/liked.png";
import { useState } from "react";
const Home = () => {
    const [markImg,setMark] = useState(mark);
    const [likeImg,setLike] = useState(like);
    const likd= ()=>{
        if (likeImg===like){
            setLike(liked);
        }
        else{
            setLike(like);
        }
    }
    const marked = ()=>{
        if(markImg===mark){
            setMark(marke);
        }
        else {
            setMark(mark);
        }
    }

    return (  
        <div className="home">
            <div className="stuff">
                <ul>
                    <li><p>Friends</p></li>
                    <li><p>Hidden From</p></li>
                    <li><p>Blocked</p></li>
                    <li><p>Best Friends</p></li>
                    <li><p>Marked</p></li>
                    <li><p>Liked</p></li>
                </ul>
            </div>
            <div className="mainContent">
                <div className="mainConteiner">
                    <div className="navP">
                        <img className="profileLogo" src={profileLogo}/>
                        <div className="navPtext">
                            <p>BerCogged</p>
                        </div>
                    </div>
                    <div className="post">
                        <div className="postImg">
                            <img className="postImage"src={profileImg}/>
                        </div>
                        <div className="postText">
                            <p>Need IBM 5100</p>
                        </div>
                    </div>
                    <div className="other">
                        <img className="like" src={likeImg} onClick={likd}/>
                        <img className="marked" src={markImg} onClick={marked}/>
                    </div>
                </div>
            </div>
            <div className="chat">
                <div className="navChat">
                    <img className="profileLogo" src={profileLogo}/>
                    <div className="navPtext">
                        <p>BerCogged</p>
                    </div>
                </div>
                <div className="navChat">
                    <img className="profileLogo" src={profileLogo}/>
                    <div className="navPtext">
                        <p>BerCogged</p>
                    </div>
                </div>
                <div className="navChat">
                    <img className="profileLogo" src={profileLogo}/>
                    <div className="navPtext">
                        <p>BerCogged</p>
                    </div>
                </div>
                <div className="navChat">
                    <img className="profileLogo" src={profileLogo}/>
                    <div className="navPtext">
                        <p>BerCogged</p>
                    </div>
                </div>
                <div className="navChat">
                    <img className="profileLogo" src={profileLogo}/>
                    <div className="navPtext">
                        <p>BerCogged</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Home;