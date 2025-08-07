import "./Nav.css";
import profileImg from "../assets/user.png";
import chatImg from "../assets/group(1).png";
//import notificitionOn from "../assets/bell(1).png";
import notificitionOff from "../assets/bell.png"
import seacrh from "../assets/loupe.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Nav = () => {
    const navigation=useNavigate();
    const [seacrhtext,setSeacrhText]=useState("")
    const Ppage = ()=>{
        navigation('/profile')
    }
    const home = ()=>{
        navigation("/");
    }
    return ( 
        <div className="nav">
            <div className="navContainer">
                <img className="SearchImage" onClick={home} src={seacrh} style={{marginLeft:"0px"}}/>
                <input type="text" 
                onChange={(e)=>{setSeacrhText(e.target.value)}}
                onKeyDown={(e)=>{
                    if(e.key=="Enter"){
                        navigation(`/people?seacrhtext=${encodeURIComponent(seacrhtext)}`)
                    }
                }}
                />
                <div className="imgs" >
                    <img className="buttons" onClick={Ppage} src={profileImg} alt="profile" color="white"/>
                    <img className="buttons" onClick={()=>{navigation("/people")}} src={chatImg} alt="chat"/>
                    <img className="buttons" src={notificitionOff} alt="profile"/>
                </div>
            </div>
        </div>
     );
}
 
export default Nav;