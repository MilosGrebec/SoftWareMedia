import "./Profile.css";
import profileLogo from "../assets/Titor_insignia.png";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from "../hooks/useLogout";
import { useRegister } from "../hooks/useRegister";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Profile() {
        const [posts,setPosts] = useState([
        {text:"Loading...",username:"Loading...", logo:"default.png", image:"default.png"},
        {text:"Loading...",username:"Loading...", logo:"default.png", image:"default.png"},
        {text:"Need IBM5100",username:"Loading...", logo:"default.png", image:"default.png"},
        {text:"Loading...",username:"Loading...", logo:"default.png", image:"default.png"},
        {text:"Need IBM5100",username:"Loading...", logo:"default.png", image:"default.png"},
        {text:"Loading...",username:"Loading...", logo:"default.png", image:"default.png"},
    ])
    const navigation = useNavigate();
    const [prifleImage,setProfileImage] =useState(profileLogo);
    const [flex,setFlex] = useState("none");
    const [block,setBlock] = useState("block");
    const [display, setDisplay] = useState("flex");
    const [display2,setDisplay2] = useState("none");
    const [color1,setColor1]= useState("#3f4042");
    const [color2,setColor2]= useState("gray");
    const [username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const [repeatedPass,setReapedtedPass]=useState("");
    const{logout}=useLogout();
    const {user}=useAuthContext();
    const {login,isLoading,error} =useLogin();
    const {register,isLoading2,error2} = useRegister();
    const [file,setFile]=useState<any>();
    const [marked,setMarked] = useState(false);
    const [blocked,setBlocked]=useState(false);
    const [friends,setFriends]=useState(false);
    const [users,setUsers]=useState([
        {user:{logo:"default.png",username:"loading..."},liked:false},
        {user:{logo:"default.png",username:"loading..."},liked:false},
        {user:{logo:"default.png",username:"loading..."},liked:false},
        {user:{logo:"default.png",username:"loading..."},liked:false},
        {user:{logo:"default.png",username:"loading..."},liked:false}
    ]);
    const [blockedList,setBlockedList]=useState([
        {user:{logo:"default.png",username:"loading..."},liked:false},
        {user:{logo:"default.png",username:"loading..."},liked:false},
        {user:{logo:"default.png",username:"loading..."},liked:false},
        {user:{logo:"default.png",username:"loading..."},liked:false},
        {user:{logo:"default.png",username:"loading..."},liked:false}
    ])
    const mClicked= async()=>{
        setMarked(true);
        setBlocked(false);;
        setFriends(false);
        const response = await fetch("/api/likedposts",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({userID:user.user[0].userID})
        })
        const json = await response.json();
        console.log(json);
        if (response.ok){
            setPosts(json);
        }
        else{
            console.log(response.ok)
        }
    }
    const bClicked=async()=>{
        setMarked(false);
        setBlocked(true);
        setFriends(false);
        const response = await fetch("/api/blocked",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({userID:user.user[0].userID})
        })
        const json = await response.json();
        console.log(json);
        if (response.ok){
            setBlockedList(json);
        }
        else{
            console.log(response.ok)
        }
    }
        const fClicked=async()=>{
        console.log("f");
        setMarked(false);
        setBlocked(false);
        setFriends(true);
        const response = await fetch("/api/friends",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({userID:user.user[0].userID})
        })
        const json = await response.json();
        console.log(json);
        if (response.ok){
            setUsers(json);
        }
        else{
            console.log(response.ok)
        }
    }
    useEffect(()=>{
        console.log(profileLogo);
    },[profileLogo])
    const upload = async()=>{
        if (!file) return;
        const formData = new FormData();
        formData.append('file',file)
        axios.post('http://localhost:8080/upload',formData)
        .then(async res=>{
            console.log("image uploaded:", res.data)
            console.log(res.data.imageUrl);
            const x = res.data.imageUrl;
            const logo = x.replace("http://localhost:8080/images/","");
            console.log(logo);
            const response = await fetch("/api/changelogo",{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({username:user.user[0].username,logo:logo})
            })
            const json=await response.json();
            if (response.ok){
                console.log(json);
                console.log(response.ok);
            }
            setProfileImage(res.data.imageUrl);
        })
        .catch(er=>console.log(er))
    }
    async function submit(e:Event){
        e.preventDefault();
        await login(username,password);
    }
    async function submit2(e:Event){
        e.preventDefault();
        console.log(username,password,repeatedPass);
        await register(username,password,repeatedPass);
    }
    useEffect(()=>{
        if(user){
            console.log("logged in");
            setFlex("flex");
            setBlock("none");
            console.log(user);
            console.log(user.user[0].username);
            console.log(user.user[0].logo);
            setProfileImage("http://localhost:8080/images/"+user.user[0].logo);
        }
        else{
            setFlex("none");
            setBlock("block");  
        }
    },[user])
    const handleClick=()=>{
        logout();
    }
  const change=()=>{
    if(display!=="flex"){
        setDisplay("flex");
        setDisplay2("none");
        setColor1("#3f4042");
        setColor2("gray");
    }
  }
  const change2=()=>{
    if(display==="flex"){
        setDisplay("none");
        setDisplay2("flex");
        setColor1("gray");
        setColor2("#3f4042");
    }
  }
      const removeFriend=async(friendID:number)=>{
        console.log(users);
        const response = await fetch("/api/unfriend",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({userID:user.user[0].userID,friendID:friendID})
        })
        const json = await response.json();
        console.log(json);
        if (response.ok){
            console.log("removed him as friend");
            alert("not friedns anymore screw them niggas");
        }
        else{
            console.log(response.ok);
        }
    }
    const unBLock = async(blockId:number)=>{
        const response = await fetch("/api/unblock",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({userID:user.user[0].userID,blockUserID:blockId})
        })
        const json = await response.json();
        console.log(json);
        if (response.ok){
            console.log("unblocked him");
            alert("unblocked this user");
        }
        else{
            console.log(response.ok);
        }
    }
    const handleClick2=(liked:boolean,friendID:number,index:number)=>{
        setUsers((prevUsers)=>(
            prevUsers.map((u,i)=>{
                const nL=!liked;
                if(liked && i===index){
                    removeFriend(friendID);
                    return{...u,liked:nL}
                }
                else if(!liked && i===index){
                    addfriend(friendID);
                    return{...u,liked:nL}
                }
                else{
                    return u;
                }
            })
        ))
    }
    const addfriend=async(friendID:number)=>{
        console.log(users);
        const response = await fetch("/api/addnewfriend",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({userID:user.user[0].userID,friendID:friendID})
        })
        const json = await response.json();
        console.log(json);
        if (response.ok){
            console.log("added him as friend");
            alert("Added as friend");
        }
        else{
            console.log(response.ok);
        }
    }
    return (
    <>
        <div className="LoggedIn" style={{display:flex}}>
            <div className="profileDetails">
                <div className="LogoLogged"><img src={prifleImage} alt="slika"/></div>
                <div className="Username">
                    <p>{user?.user[0].username}</p>
                    <div className="logedbuttons">
                        <button onClick={handleClick}>Log out</button>
                            <input type="file" onChange={(e)=>{setFile(e.target.files?.[0])}}/>
                            <button type="button" onClick={upload}>Change Profile Picture</button>
                        <button onClick={()=>{navigation("/post")}}>Post something</button>
                    </div> 
                </div>
            </div>
            <div className="menu">
                <ul>
                    <li onClick={mClicked}><p style={{backgroundColor:marked?"black":"transparent"}}>Liked</p></li>
                    <li onClick={bClicked}><p style={{backgroundColor:blocked?"black":"transparent"}}>Blocked</p></li>
                    <li onClick={fClicked}><p style={{backgroundColor:friends?"black":"transparent"}}>Friends</p></li>
                </ul>
            </div>
            <div className="lists">
            {marked?
                <div className="mainContent">
                {posts.map((item,index)=>(
                    <div className="mainConteiner" key={index}>
                        <div className="navP">
                            <img className="profileLogo" src={"http://localhost:8080/images/"+item.logo}/>
                            <div className="navPtext">
                                <p>{item.username}</p>
                            </div>
                        </div>
                        <div className="post">
                            <div className="postImg">
                                <img className="postImage"src={"http://localhost:8080/images/"+item.image}/>
                            </div>
                            <div className="postText">
                                <p>{item.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            :<></>}
                {blocked?blockedList?
                blockedList.map((item,index)=>(
                <div className="profileDetails" key={index}>
                    <div className="LogoLogged"><img src={"http://localhost:8080/images/"+item.user.logo} alt="slika"/></div>
                    <div className="Username">
                        <p>{item.user.username}</p>
                        <div className="logedbuttons">
                            <button style={{fontSize:"20px"}} onClick={()=>{unBLock(item.user.userID)}} >Unblock</button>
                        </div> 
                    </div>
                </div>
                )):<></>:<></>}
                {friends?users? users.map((item,index)=>(
                <div className="profileDetails" key={index}>
                    <div className="LogoLogged"><img src={"http://localhost:8080/images/"+item.user.logo} alt="slika"/></div>
                    <div className="Username">
                        <p>{item.user.username}</p>
                        <div className="logedbuttons">
                            <button style={{fontSize:"20px"}} onClick={()=>{handleClick2(item.liked,item.user.userID,index)}}>{!item.liked?<>Add friend</>:<>Unfriend</>}</button>
                        </div> 
                    </div>
                </div> 
                )):<></>:<></>}
            </div>
        </div>
        <div className="profilePage">
            <div className="container" style={{display:block}}>
                <div className="profileButton">
                    <button onClick={change} style={{backgroundColor:color1}}>Login</button>  
                    <button onClick={change2} style={{backgroundColor:color2}}>Register</button>
                </div>
                <div className="loginContainer" style={{display:display}}>
                    <form className="LoginForm" onSubmit={submit}>
                        <label>Username:</label><br/>
                        <input type="text" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} /><br/>
                        <label>Password:</label><br/>
                        <input type="password" value={password} name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                        <div className="loginButton"><button disabled={isLoading}>LOGIN</button></div>
                        {error && <div className="errorDiv"><p className="errorM">Your username or passoword is wrong</p></div>}
                    </form>
                </div>
                <div className="registerContainer" style={{display:display2}}>
                    <form className="LoginForm" onSubmit={submit2}>
                        <label>Username:</label><br/>
                        <input type="text" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/><br/>
                        <label>Password:</label><br/>
                        <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                        <label>Repeat Password:</label><br/>
                        <input type="password" name="password" value={repeatedPass} onChange={(e)=>{setReapedtedPass(e.target.value)}} />
                        <div className="loginButton"><button disabled={isLoading2}>REGISTER</button></div>
                        {error2 && <div className="errorDiv"><p className="errorM">{error2}</p></div>}
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}
