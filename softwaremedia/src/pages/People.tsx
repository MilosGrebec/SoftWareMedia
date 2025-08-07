import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import "./People.css";
import { useEffect, useState,useMemo } from "react";
const People = () => {
    const [searchParams] = useSearchParams();
const seacrhtext = searchParams.get("seacrhtext") || "";
    console.log(seacrhtext);
    const {user}=useAuthContext();
    const [users,setUsers]=useState([
        {user:{user:{logo:"default.png",username:"loading..."},liked:false},blocked:false},
        {user:{user:{logo:"default.png",username:"loading..."},liked:false},blocked:false},
        {user:{user:{logo:"default.png",username:"loading..."},liked:false},blocked:false},
        {user:{user:{logo:"default.png",username:"loading..."},liked:false},blocked:false},
        {user:{user:{logo:"default.png",username:"loading..."},liked:false},blocked:false},
        {user:{user:{logo:"default.png",username:"loading..."},liked:false},blocked:false}
    ]);
    useEffect(()=>{
        const allUsers=async function (){
            const response = await fetch("/api/allusersFriends",{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({userID:user.user[0].userID})
            });
            const json = await response.json();
            console.log(json);
            if (response.ok){
                setUsers(json);
            }
            else {
                console.log(response.json());
            }
        }
        allUsers();
    },[]);
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
    const handleClick=(liked:boolean,friendID:number,index:number)=>{
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
    const block=async(id:number)=>{
        const response = await fetch("/api/block",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({userID:user.user[0].userID,blockUserID:id})
        })
        const json = await response.json();
        console.log(json);
        if(response.ok){
            alert("blocked this user");
        }
        else{
            console.log(response.ok);
        }
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
    const filteredUsers = useMemo(() => {
    return users
        .filter((item) =>
        item?.user?.user?.username?.toLowerCase().includes(seacrhtext?.toLowerCase())
        )
        .sort((a, b) =>
        a.user.user.username.toLowerCase().localeCompare(b.user.user.username.toLowerCase())
        );
    }, [users, seacrhtext]);
console.log("d");
console.log(users[0].user.user.username);
console.log(filteredUsers);
    return ( 
        <div className="people">
            {seacrhtext? filteredUsers.map((item,index)=>(
            <div className="profileDetails" key={index}>
                <div className="LogoLogged"><img src={"http://localhost:8080/images/"+item.user.user.logo} alt="slika"/></div>
                <div className="Username">
                    <p>{item.user.user.username}</p>
                    <div className="logedbuttons">
                        <button onClick={()=>{handleClick(item.user.liked,item.user.user.userID,index)}}>{!item.user.liked?<>Add friend</>:<>Unfriend</>}</button>
                        <button onClick={()=>!item.blocked?block:unBLock}>{!item.blocked?<>Block</>:<>Unblock</>}</button>
                    </div> 
                </div>
            </div> 
            )):users? users.map((item,index)=>(
            <div className="profileDetails" key={index}>
                <div className="LogoLogged"><img src={"http://localhost:8080/images/"+item.user.user.logo} alt="slika"/></div>
                <div className="Username">
                    <p>{item.user.user.username}</p>
                    <div className="logedbuttons">
                        <button onClick={()=>{handleClick(item.user.liked,item.user.user.userID,index)}}>{!item.user.liked?<>Add friend</>:<>Unfriend</>}</button>
                        <button onClick={()=>!item.blocked?block:unBLock}>{!item.blocked?<>Block</>:<>Unblock</>}</button>
                    </div> 
                </div>
            </div> 
            )):<></>}
        </div>
     );
}
 
export default People;