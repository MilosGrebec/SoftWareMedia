import "./Home.css";
import like from "../assets/like.png";
import liked from "../assets/liked.png";
import dots from "../assets/dots.png";
import { useState, useMemo, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigation = useNavigate();
    const {user} = useAuthContext();
        const [blockedList,setBlockedList]=useState([
        {user:{logo:"default.png",username:"loading...",userID:""},liked:false}
    ])
    useEffect(()=>{
        const blockedPeople=async()=>{
            const response = await fetch("/api/blocked",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({userID:user.user[0].userID})
        })
        const json = await response.json();
        console.log(json);
        if (response.ok){
            setBlockedList(json);
            console.log("FD");
        }
        else{
            console.log(response.ok);
        }
        }
        blockedPeople();
    },[user]);
    useEffect(()=>{
        const allposts = async function(){
            const response = await fetch("/api/allpost2",{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({userID:user.user[0].userID})
            })
            const json = await response.json();
            console.log("Evo ga");
            console.log(json);
            if (response.ok){
                console.log("stiglo:", json);
                if(posts.length===1){
                    setPosts(json)
                }
                console.log(json[0].text)
            }
            else{
                console.log(json);
            }
        }
        allposts();
    },[]);
    const [likeImg,setLike]= useState(like);
    const[posts,setPosts]=useState([
        {post:{ post:{text:"Loading..........",username:"Loading..........",userID:"",postId:"",logo:"http://localhost:8080/images/default.png",image:"http://localhost:8080/images/default.png"},
        liked:false},blocked:false}
    ]);
    useEffect(()=>{
        console.log(posts);
    },[posts])
    const likePost = async(userID,postID)=>{
        const respnse = await fetch("/api/likepost",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({userID:userID,postID:postID})
        })
        const json = respnse.json();
        console.log(json);
        if(respnse.ok){
            console.log("liked");
        }
    }
    const unlikePost = async(userID,postID)=>{
        const respnse = await fetch("/api/unlike",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({userID:userID,postID:postID})
        })
        const json = respnse.json();
        console.log(json);
        if(respnse.ok){
            console.log("liked");
        }
    }
    const likd=async(index:number)=>{
        setPosts((prevPosts)=>(
            prevPosts.map((p,i)=>{
                if(!p.post.liked && i===index){
                    console.log(p.post)
                    console.log(p.post.post.postId);
                    likePost(user?.user[0].userID,p.post.post.postId);
                }
                else if(p.post.liked && i===index){
                    unlikePost(user?.user[0].userID,p.post.post.postId);
                }
                const updateLiked=!p.post.liked;
                if(i===index){
                    return {...p,liked:updateLiked}
                }
                else{
                    return p;
                }
    })
        ));
    }
    return (  
        <div className="home">
            <div className="stuff">
                <div className="listStuff">
                    <ul>
                        <li onClick={()=>{navigation("/profile")}}><p>Friends</p></li>
                        <li onClick={()=>{navigation("/profile")}}><p>Blocked</p></li>
                        <li onClick={()=>{navigation("/profile")}}><p>Liked</p></li>
                    </ul>           
                </div>
            </div>
            <div className="mainContent">
                {posts.map((item,index)=>(
                    <div className="mainConteiner" key={index} style={{display:item.blocked?"none":"block"}}>
                        <div className="navP">
                            <img className="profileLogo" src={"http://localhost:8080/images/"+item.post.post.logo}/>
                            <div className="navPtext">
                                <p>{item.post.post.username}</p>
                            </div>
                        </div>
                        <div className="post">
                            <div className="postImg">
                                <img className="postImage"src={"http://localhost:8080/images/"+item.post.post.image}/>
                            </div>
                            <div className="postText">
                                <p>{item.post.post.text}</p>
                            </div>
                        </div>
                        <div className="other">
                            <img className="like" src={item.post.liked?liked:likeImg} onClick={()=>{likd(index)}}/>
                            <img className="dots" src={dots} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat">
            </div>
        </div>
    );
}
 
export default Home;