import React, { useState, useEffect } from "react";
import { firestore } from "../firebase"; 
import { doc, getDoc } from "firebase/firestore";
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from "@mui/material/Avatar";

function Comments({postData}) {
    const[comments, setComments] = useState(null);
    useEffect(async()=>{
        let arr = [];
        for(let i = 0; i < postData.comments.length; i++){
            let docRef = doc(firestore, "comments", postData.comments[i]);
            let data = await getDoc(docRef);
            console.log("data in comments", data)
            arr.push(data.data());
            console.log("data in comments", data.data());
        }
        setComments(arr);
    },[postData])
    return (
        <div>
            {
                comments == null ? <CircularProgress /> :
                <>
                {
                    comments.map((comment, index)=>(
                        <div style={{display:'flex'}} key={index}>
                          <Avatar src={comment.userProfileImage} />
                          <p>&nbsp;&nbsp;<span style={{fontWeight:'bold'}}>{comment.userName}</span>&nbsp;&nbsp;{comment.text}</p>
                        </div>
                    ))
                }
                </>
            }
        </div>
    )
}

export default Comments
