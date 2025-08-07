import exppress from 'express'
import path from "path"
import multer from 'multer';
import cors from "cors";
import { AllPosts, allUsers, loginUser, NotReallySure, registerUser, userById,ChangeProfileImage, NewPost, AddNewFriend, ListFriends, LikedPosts, HomePosts2,Like, UnLikePost, NotFriendsAnyMore, AllUsersAndFriends, BlockedList, Block, UnBlockUser } from './controllers/userController.js';
import { fileURLToPath } from 'url';

const __filename= fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app=exppress();

app.use(cors());

app.use(exppress.json());

app.use('/images',exppress.static(path.join(__dirname,'public/images')));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload=multer({storage});
app.post('/upload',upload.single('file'),(req,res)=>{
    try{
    
    console.log(req.file);
    const fileUrl = `http://localhost:8080/images/${req.file.filename}`;
    res.status(200).json({imageUrl:fileUrl});}
    catch(error){
        res.status(404).json({error:error.message});
    }
})


app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send("Something broke");
})
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})

app.get("/allusers", allUsers);
app.get("/user/:id",userById);
app.post("/user",NotReallySure);
app.get("/homeposts",AllPosts);
app.post("/changelogo",ChangeProfileImage);
app.post("/register",registerUser);
app.post("/login",loginUser);
app.post("/newpost",NewPost);
app.post("/addnewfriend",AddNewFriend);
app.post("/friends",ListFriends);
app.post("/likedposts",LikedPosts);
app.post("/allpost2",HomePosts2);
app.post("/likepost",Like);
app.post("/unlike",UnLikePost);
app.post("/unfriend",NotFriendsAnyMore);
app.post("/allusersFriends",AllUsersAndFriends);
app.post("/blocked",BlockedList);
app.post("/block",Block);
app.post("/unblock",UnBlockUser);

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
})