import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
const pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,

}).promise();


export async function getUsers() {
    const [result] = await pool.query("select * from users");
    return result;
}
export async function findUserByName(username){
    const [result] = await pool.query("select * from users where username=?",[username]);
    return result;
}
export async function getUser(id) {
    const [result] = await pool.query("select * from users where userID = ?",[id]);
    return result;
}
export async function createUser(username,password) {
    const [result] =await pool.query("INSERT INTO users (username, password) values (?, ?)",[username,password]);
    const id = result.insertId;
    return getUser(id);
}
export async function FindUser(username,password){
    const [result] = await pool.query("select * from users where username = ? and password = ?",[username,password]);
    console.log(result);
    if (result.length===0){
        throw Error("there is no such user");
    }
    return result;
}
export async function ChangeLogo(username,logo){
    const[result]= await pool.query("update users set logo=? where username=?",[logo,username])
    console.log(result);
    return result;
}
export async function HomePosts(){
    const [result] = await pool.query( "select posts.userID, postId,text,username,logo,image from users, posts where users.userID=posts.userID;" )
    console.log(result);
    return result;
}
export async function MakePost(userID,text,image){
    const [result] = await pool.query("INSERT INTO Posts (userID, text, image) VALUES (?,?,?)",[userID,text,image]);
    console.log(result);
    return result;
}
export async function addFriend(userID,friendID){
    const [result] = await pool.query("insert into FriendsList (userID,FriendID) values (?,?);",[userID,friendID]);
    console.log(result);
    return result;
}
export async function allFriendsOfUser(userID){
    const [result] =await pool.query("SELECT u.userID, u.username, u.logo FROM FriendsList f INNER JOIN Users u ON f.friendID = u.userID WHERE f.userID = ?;",[userID]);
    console.log(result);
    return result;
}
export async function LikePostsOfUser(userID){
    const [result] = await pool.query("select text,username,logo,image from users, posts where users.userID=posts.userID and posts.postID in (select p.postID from Liked l inner join Posts p on l.postID=p.postID where l.userID=?);",[userID])
    console.log("liked posts so far");
    console.log(result);
    return result;
}
export async function LikedPostsIDsofUser(userID){
    const [result] = await pool.query("select postID from users, posts where users.userID=posts.userID and posts.postID in (select p.postID from Liked l inner join Posts p on l.postID=p.postID where l.userID=?);",[userID]);  
    console.log("ids of liked posts so far");
    console.log(result.map(post=>post.postID));
    return result.map(post=>post.postID);
}
export async function UserLikePost(userID,postID){
    const [result] = await pool.query("insert into Liked(userID,postID) values(?,?);",[userID,postID]);
    console.log("liked");
    console.log(result);
    return result;
}
export async function UnLike(userID,postID){
    const [result]= await pool.query("delete from Liked where userID=? and postID=?;",[userID,postID]);
    console.log("deleted");
    console.log(result);
    return result;
}
export async function UnFriend(userID,friendID){
    const [result]=await pool.query("delete from FriendsList where userID=? and friendID=?;",[userID,friendID]);
    console.log(result);
    return result;
}
export async function FriendsIDofUser(userID) {
    const[result]=await pool.query("SELECT u.userID, u.username, u.logo FROM FriendsList f INNER JOIN Users u ON f.friendID = u.userID WHERE f.userID = ?;",[userID]);
    console.log(result.map(user=>user.userID));
    return result.map(user=>user.userID);
}
export async function BlockedProfilesOfUser(userID){
    const [result]=await pool.query("SELECT u.userID, u.username, u.logo FROM BlockedList f INNER JOIN Users u ON f.blockedID = u.userID WHERE f.userID = ?;",[userID])
    console.log(result);
    return result;
}
export async function BlockedIDSProfilesOfUser(userID){
    const [result]=await pool.query("SELECT u.userID FROM BlockedList f INNER JOIN Users u ON f.blockedID = u.userID WHERE f.userID = ?;",[userID])
    console.log(result.map(user=>user.userID));
    return result.map(user=>user.userID);
}
export async function BlockUser(userID,BlockUserID) {
    const [result]=await pool.query("insert into BlockedList values (?,?);",[userID,BlockUserID]);
    console.log(result);
    return result;
}
export async function UnBlock(userID,blockUID){
    const [result]=await pool.query("delete from BlockedList where userID=? and blockedID=?",[userID,blockUID]);
    console.log(result);
    return result;
}