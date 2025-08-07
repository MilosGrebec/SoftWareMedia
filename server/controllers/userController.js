import jwt from "jsonwebtoken";
import { createUser, FindUser, findUserByName,getUsers, getUser, ChangeLogo, HomePosts, MakePost, addFriend, allFriendsOfUser, LikePostsOfUser, LikedPostsIDsofUser, UserLikePost, UnLike, UnFriend, FriendsIDofUser, BlockedProfilesOfUser, BlockedIDSProfilesOfUser, BlockUser, UnBlock  } from "../models/database.js"
const CreateToken=(_id)=>{
    return jwt.sign({_id},'dsadnjsbnajbsjbdsajdas')
}
export const loginUser= async(req,res)=>{
    const {username,password}=req.body;
    try{
        const user = await FindUser(username,password);
        const token= CreateToken(user.userID);
        res.status(200).json({user,token});
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}
export const registerUser = async(req,res)=>{
    const{username,password}=req.body;
    console.log(username,password)
    try{
        const user= await createUser(username,password);
        const token = CreateToken(user.userID);
        res.status(200).json({user,token})
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}
export const allUsers = async(req,res)=>{
    const users = await getUsers();
    res.send(users);
};
export const userById =async(req,res)=>{
    const id= req.params.id;
    const user = await getUser(id);
    res.send(user);
};
export const NotReallySure = async(req,res)=>{
    const {username,password}=req.body;
    const user= await createUser(username,password);
    res.status(201).send(user);
}
export const AllPosts= async(req,res)=>{
    try{
    const posts = await HomePosts();
    res.status(200).send(posts);
    }
    catch(error){
        res.status(400).send({error:error.message})
    }
}
export const ChangeProfileImage= async(req,res)=>{
    try{
        const {username,logo}=req.body;
        const result = await ChangeLogo(username,logo);
        res.status(201).send(result);
    }
    catch(error){
        res.status(400).send({error:error.message})
    }
}
export const NewPost = async(req,res)=>{
    try{
        const {userID,text,image}=req.body;
        const result = await MakePost(userID,text,image);
        res.status(200).send(result);
    }
    catch(error){
        res.status(400).send({error:error.message});
    }
};
export const AddNewFriend = async (req,res)=>{
    try{
        const{userID,friendID}=req.body;
        const result = await addFriend(userID,friendID);
        res.status(200).send(result);
    }
    catch(error){
        res.status(400).send({error:error.message})
    }
}
export const ListFriends = async(req,res)=>{
    try{
        const{userID}=req.body;
        const result = await allFriendsOfUser(userID);
        const nFriends = []
        result.map((user)=>{
            nFriends.push({user,liked:true});
        })
        res.status(200).send(nFriends);
    }
    catch(error){
        res.status(400).send({error:error.message});
    }
}
export const LikedPosts= async(req,res)=>{
    try{
        const {userID}=req.body;
        const result=await LikePostsOfUser(userID);
        res.status(200).send(result);
    }
    catch (error){
        res.status(400).send({error:error.message});
    }
}

export const HomePosts2 = async(req,res)=>{
    try{
        console.log("dsadsa");
        const {userID}= req.body;
        const response = await LikedPostsIDsofUser(userID);
        const posts = await HomePosts();
        const blocked = await BlockedIDSProfilesOfUser(userID);
        var postsLiked=[];
        var postsLikedBlocked=[];
        posts.forEach(post => {
            var x = post.postId;
            console.log(x);
            var l=0;
            for (var i=0;i<response.length;i++){
                if(x===response[i]){
                    postsLiked.push({post,liked:true});
                    l=1;
                    break;
                }
            }
            if(l==0){
                postsLiked.push({post,liked:false});
            }
        });
        postsLiked.forEach(post=>{
            var y=post.post.userID;
            var g=0;
            for (var i =0;i<blocked.length;i++){
                if(y===blocked[i]){
                    postsLikedBlocked.push({post,blocked:true})
                    g=1;
                }
            }
            if(g==0){
                postsLikedBlocked.push({post,blocked:false});
            }
        })
        console.log(postsLikedBlocked);
        res.status(200).send(postsLikedBlocked);
    }
    catch(error){
        res.status(400).send({error:error.message});
    }
}

export const Like=async (req,res)=>{
    try{
        const{ userID,postID}=req.body;
        const result=await UserLikePost(userID,postID);
        res.status(200).send(result);
    }
    catch(error){
        res.status(400).send({error:error.message});
    }
}
export const UnLikePost = async(req,res)=>{
    try{
        const {userID,postID}=req.body;
        const result=await UnLike(userID,postID);
        res.status(200).send(result);
    }
    catch(error){
        res.stats(400).send({error:error.message});
    }
}
export const NotFriendsAnyMore = async(req,res)=>{
    try{
        const {userID,friendID}=req.body;
        console.log(friendID);
        const result=await UnFriend(userID,friendID);
        res.status(200).send(result);
    }
    catch(error){
        res.status(400).send({error:error.message});
    }
}
export const AllUsersAndFriends = async(req,res)=>{
    try{
        const{userID}=req.body;
        const result=await FriendsIDofUser(userID);
        const users= await getUsers();
        const blockedList = await BlockedIDSProfilesOfUser(userID);
        var likedUsers=[];
        const likedAndBlockedUsers=[];
        users.forEach(user => {
            var x = user.userID;
            console.log(x);
            var l=0;
            for (var i=0;i<result.length;i++){
                if(x===result[i]){
                    likedUsers.push({user,liked:true});
                    l=1;
                    break;
                }
            }
            if(l==0){
                likedUsers.push({user,liked:false});
            }
        });
        likedUsers.forEach(user=>{
            var g=user.user.userID;
            console.log(blockedList);
            console.log(user.user.userID);
            var y=0;
            for(var i=0;i<blockedList.length;i++){
                if(g==blockedList[i]){
                    likedAndBlockedUsers.push({user,blocked:true});
                    y=1;
                    break;
                }
            }
            if(y==0){
                likedAndBlockedUsers.push({user,blocked:false});
            }
        })
        console.log(likedAndBlockedUsers);
        res.status(200).send(likedAndBlockedUsers);
    }
    catch(error){
        res.status(400).send({error:error.message});
    }
}
export const BlockedList =async (req,res)=>{
    try{
        const{userID}=req.body;
        const result = await BlockedProfilesOfUser(userID);
        const nFriends = []
        result.map((user)=>{
            nFriends.push({user,liked:true});
        })
        console.log(nFriends);
        res.status(200).send(nFriends);
    }
    catch(error){
        res.status(400).send({error:error.message});
    }
}
export const Block=async(req,res)=>{
    try{
        const{userID,blockUserID}=req.body;
        const result = await BlockUser(userID,blockUserID);
        res.status(200).send(result);
    }
    catch(error){
        res.status(400).send({error:error.message});
    }
}
export const UnBlockUser=async(req,res)=>{
    try{
        const {userID,blockUserID}=req.body;
        const result = await UnBlock(userID,blockUserID);
        res.status(200).send(result);
    }
    catch(error){
        res.status(400).send({error:error.message});
    }
}