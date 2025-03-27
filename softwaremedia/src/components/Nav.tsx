import "./Nav.css";
import profileImg from "../assets/user.png";
import chatImg from "../assets/chat.png";
import notificitionOn from "../assets/bell(1).png";
import notificitionOff from "../assets/bell.png"
import seacrh from "../assets/loupe.png";
const Nav = () => {
    return ( 
        <div className="nav">
            <div className="navContainer">
                <img className="SearchImage" src={seacrh} style={{marginLeft:"0px"}}/>
                <input type="text"/>
                <div className="imgs">
                    <img className="buttons" src={profileImg} alt="profile" color="white"/>
                    <img className="buttons" src={chatImg} alt="chat"/>
                    <img className="buttons" src={notificitionOff} alt="profile"/>
                </div>
            </div>
        </div>
     );
}
 
export default Nav;