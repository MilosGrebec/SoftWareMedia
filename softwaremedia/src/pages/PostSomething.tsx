import { useState } from "react";
import "./PostSomething.css";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
const PostSomething = () => {
    const navigation = useNavigate();
    const{user}=useAuthContext();
    const [file,setFile]=useState<any>();
    const [text,setText]= useState("");
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
            const response = await fetch("/api/newpost",{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({userID:user.user[0].userID,text:text,image:logo})
            })
            const json=await response.json();
            if (response.ok){
                console.log(json);
                console.log(response.ok);
                navigation("/");
            }
        })
        .catch(er=>console.log(er))
    }
    return (  
        <div className="postsomething">
            <div className="profilePage">
            <div className="container">
                <div className="loginContainer">
                    <form className="LoginForm" >
                        <label>Post description:</label><br/>
                        <textarea onChange={(e)=>{setText(e.target.value)}} value={text}/>
                        <label>Post picture</label><br/>
                        <input type="file" onChange={(e)=>{setFile(e.target.files?.[0])}} name="password" className="postimage"/><br></br>
                        <div className="loginButton"><button onClick={(e)=>{e.preventDefault(); upload()}}>POST NOW!!!!</button></div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
}
 
export default PostSomething;