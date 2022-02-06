import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";

function AddComment({userData, postData}) {
  const [text, setText] = useState("");

  const handleClick= async()=>{
    let docRef = await addDoc(collection(firestore, "comments"), {
      text: text,
      userProfileImage: userData.profileUrl,
      userName: userData.username,
    });
    const postsRef = doc(firestore, "posts", postData.postId);
    await updateDoc(postsRef, {
      comments: [...postData.comments, docRef.id],
    });
    setText('');
  }

  return (
    <div style={{ width: "100%" }}>
      <TextField
        id="outlined-basic"
        label="Comment"
        variant="outlined"
        size="small"
        sx={{ width: "70%" }}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Button variant="contained" onClick={handleClick}>
        Post
      </Button>
    </div>
  );
}

export default AddComment;
