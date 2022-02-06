import React, { useEffect, useState } from 'react'
import { query, orderBy, limit, onSnapshot,collection } from "firebase/firestore"; 
import { firestore } from "../firebase"; 
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import './Posts.css'
import Avatar from "@mui/material/Avatar";
import Like from './Like'
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {CardActionArea, CardActions } from "@mui/material";

import Like2 from './Like2';
import AddComment from './AddComment';
import Comments from './Comments';
// const q = query(citiesRef, orderBy("name", "desc"), limit(3));

function Posts({ userData }) {
  console.log("post in userData.userId", userData.userId )
  const [posts, setPosts] = useState(null);

  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    console.log("inside useEffect posts")
    let parr = [];
    const allPosts = collection(firestore, "posts");
    const q = query(allPosts, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      parr = [];
      console.log("querySnapshot inside snap", querySnapshot);
      querySnapshot.forEach((doc) => {
        console.log("doc.data", doc.data()); ///////////////
        let data = { ...doc.data(), postId: doc.id };
        parr.push(data);
        console.log("querySnapshort forEach", data)
        console.log("userinposts", userData.userId);
        
      });
      setPosts(parr);
      console.log("parr final arr",parr)
      
    });
    return unsubscribe;
  }, []);

  const callback = (entries) =>{
    entries.forEach((entry)=>{
      let ele = entry.target.childNodes[0];
      console.log(ele);
      ele.play().then(()=>{
        if(!ele.paused && !entry.isIntersecting){
          ele.pause()
        }
      })
    })
  }

  let observer = new IntersectionObserver(callback,{threshold:0.6});
  useEffect(()=>{
    const elements = document.querySelectorAll(".videos");
    elements.forEach((element)=>{
      observer.observe(element)
    })
    return ()=>{
      observer.disconnect();
    }
  },[posts])

  return (
      <div>{console.log("inside posts render")}
          {
              posts==null || userData==null ?<CircularProgress />:
              <div className="video-container">
                  {
                      posts.map((post,index)=>(
                        <React.Fragment key={index}>
                          <div className="videos">
                            <Video src={post.pUrl} />
                            <div className="fa" style={{display:'flex'}}>
                                <Avatar src={userData.profileUrl} />
                                <h4>{userData.username}</h4>
                            </div>
                            <Like userData={userData} postData={post} />
                            <ChatBubbleIcon className='chat-styling'onClick={()=>handleClickOpen(post.pId)}/>
                            
                            <Dialog
                              open={open == post.pId}
                              onClose={handleClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                              fullWidth={true}
                              maxWidth='md'
                            >
                              <div className="modal-container">
                                <div className="video-modal">
                                  <video autoPlay={true} muted="muted" controls>
                                    <source src={post.pUrl}/>
                                  </video>
                                </div>
                                <div className="comment-modal">
                                    <Card className='card1' style={{padding:'1rem'}}>
                                      <Comments postData={post} />
                                    </Card>
                                        
                                    <Card variant='outlined' className="card2" >
                                      <Typography style={{padding:'0.4rem'}}>{post.likes.length==0 ?'Liked by nobady':`Liked by ${post.likes.length} users`}</Typography>
                                      <div style={{display:'flex'}}>
                                        <Like2 postData={post} userData={userData} style={{display:'flex', alignItems:'center', justifyContent:'center'}}/>
                                        <AddComment style={{display:'flex', alignItems:'center', justifyContent:'center'}} userData={userData} postData={post}/>
                                      </div>
                                    </Card>
                                </div>
                              </div>
                              
                            </Dialog>
                          </div>
                        </React.Fragment>
                      ))
                  }
              </div>
          }
      </div>
  )
}

export default Posts
